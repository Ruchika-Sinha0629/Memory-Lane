import { NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, content, media } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Capsule ID is required" },
        { status: 400 }
      );
    }

    const capsule = await Capsule.findById(id);
    if (!capsule) {
      return NextResponse.json(
        { error: "Capsule not found" },
        { status: 404 }
      );
    }

    // 🔒 PERMISSION CHECK
    const canEdit =
      capsule.createdBy === session.user.email ||
      capsule.collaborators.includes(session.user.email);

    if (!canEdit) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 🔒 LOCK AFTER UNLOCK DATE
    const now = new Date();
    const unlockDate = new Date(capsule.unlockDate);

    if (now >= unlockDate) {
      return NextResponse.json(
        { error: "Capsule is unlocked and can no longer be edited" },
        { status: 403 }
      );
    }

    // ✅ Normalize media types
    const normalizedMedia = (media || []).map((m: any) => ({
      url: m.url,
      type: m.type.startsWith("image")
        ? "image"
        : m.type.startsWith("video")
        ? "video"
        : "audio",
    }));

    capsule.title = title;
    capsule.content = content;
    capsule.media = normalizedMedia;

    await capsule.save();

    return NextResponse.json({ success: true, capsule });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update capsule" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";
import { sendUnlockEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { capsuleId } = await req.json();

    if (!capsuleId) {
      return NextResponse.json({ error: "Capsule ID is required" }, { status: 400 });
    }

    const capsule = await Capsule.findById(capsuleId);

    if (!capsule) {
      return NextResponse.json({ error: "Capsule not found" }, { status: 404 });
    }

    const unlockTime = new Date(capsule.unlockDate);

    if (!capsule.isUnlocked && new Date() >= unlockTime) {
      capsule.isUnlocked = true;
      await capsule.save();

      await sendUnlockEmails({
        creatorEmail: capsule.createdBy,
        collaborators: capsule.collaborators,
        recipients: capsule.recipients,
        title: capsule.title,
        capsuleId: capsule._id.toString(),
      });
    }
    return NextResponse.json({ isUnlocked: capsule.isUnlocked });
  } catch (err) {
    console.error("UNLOCK ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
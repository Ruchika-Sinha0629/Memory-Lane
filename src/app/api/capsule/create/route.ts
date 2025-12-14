import { NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  // ✅ Normalize media BEFORE saving
  const normalizedMedia = (body.media || []).map((m: any) => ({
  url: m.url,
  type:
    m.type === "image" || m.type === "video" || m.type === "audio"
      ? m.type
      : m.type.startsWith("image")
      ? "image"
      : m.type.startsWith("video")
      ? "video"
      : m.type.startsWith("audio")
      ? "audio"
      : "image",
}));


 const recipients = Array.isArray(body.recipients)
  ? [...new Set(body.recipients)]
  : [];

const collaborators = Array.isArray(body.collaborators)
  ? [...new Set(body.collaborators)]
  : [];

const capsule = await Capsule.create({
  title: body.title,
  content: body.content,
  media: normalizedMedia,
  recipients,
  collaborators,
  theme: body.theme,
  unlockDate: body.unlockDate,
  privacy: body.privacy,
  createdBy: body.createdBy,
});


  return NextResponse.json({ capsule });
}

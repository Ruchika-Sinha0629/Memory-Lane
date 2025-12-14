import { NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  const capsule = await Capsule.create({
    title: body.title,
    content: body.content,
    media: body.media || [],
    recipients: body.recipients || [],
    collaborators: body.collaborators || [],
    theme: body.theme,
    unlockDate: body.unlockDate,
    privacy: body.privacy,
    createdBy: body.createdBy, // ✅ MUST BE SAVED
  });

  return NextResponse.json({ capsule });
}

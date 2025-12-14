import { NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";
import { sendUnlockEmails } from "@/lib/email";

export async function GET() {
  await dbConnect();

  const now = new Date();

  const capsules = await Capsule.find({
    isUnlocked: false,
    unlockDate: { $lte: now },
  });

  for (const capsule of capsules) {
    capsule.isUnlocked = true;
    await capsule.save();
    await sendUnlockEmails(capsule);
  }

  return NextResponse.json({ unlocked: capsules.length });
}

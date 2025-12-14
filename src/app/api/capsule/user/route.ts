import { NextRequest, NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ capsules: [] });
  }

  await dbConnect();

  const capsules = await Capsule.find({
    $or: [
      { createdBy: email },
      { collaborators: email },
    ],
  }).sort({ createdAt: -1 });

  return NextResponse.json({ capsules });
}

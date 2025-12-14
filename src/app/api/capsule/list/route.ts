import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const capsules = await Capsule.find({
    $or: [
      { createdBy: session.user.id },
      { collaborators: session.user.email },
      { privacy: "public" },
    ],
  }).sort({ createdAt: -1 });

  return NextResponse.json({ capsules });
}

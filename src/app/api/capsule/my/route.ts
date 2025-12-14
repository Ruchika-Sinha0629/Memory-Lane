import { NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ capsules: [] });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = 6;
  const skip = (page - 1) * limit;

  const query = {
    $or: [
      { createdBy: session.user.email },
      { collaborators: session.user.email },
    ],
  };

  const capsules = await Capsule.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Capsule.countDocuments(query);

  return NextResponse.json({
    capsules,
    totalPages: Math.ceil(total / limit),
  });
}

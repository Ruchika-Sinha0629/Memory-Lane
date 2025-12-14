import { NextResponse } from "next/server";
import Comment from "@/models/Comment";
import { dbConnect } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const capsuleId = searchParams.get("capsuleId");

  await dbConnect();

  const comments = await Comment.find({ capsuleId }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ comments });
}

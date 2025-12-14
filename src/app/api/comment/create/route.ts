import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Comment from "@/models/Comment";
import { dbConnect } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { capsuleId, text } = await req.json();
  await dbConnect();

  const comment = await Comment.create({
    capsuleId,
    text,
    user: {
      id: session.user.email,
      name: session.user.name,
    },
  });

  return NextResponse.json({ comment });
}

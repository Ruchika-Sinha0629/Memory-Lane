import { NextRequest, NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const userEmail = req.nextUrl.searchParams.get("email");

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await dbConnect();

  const capsule = await Capsule.findById(id);
  if (!capsule) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const canEdit =
    userEmail &&
    (capsule.createdBy === userEmail ||
      capsule.collaborators.includes(userEmail));

  return NextResponse.json({ capsule, canEdit });
}

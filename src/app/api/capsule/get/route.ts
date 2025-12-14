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

  // Determine user permissions
  const canEdit =
    userEmail &&
    (capsule.createdBy === userEmail || capsule.collaborators.includes(userEmail));

  const canView =
    userEmail &&
    (capsule.createdBy === userEmail ||
      capsule.collaborators.includes(userEmail) ||
      capsule.recipients.includes(userEmail) ||
      capsule.privacy === "public");

  if (!canView) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ capsule, canEdit });
}

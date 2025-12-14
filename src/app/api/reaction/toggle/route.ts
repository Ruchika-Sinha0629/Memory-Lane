
import { NextRequest, NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const { capsuleId, userEmail } = await req.json();
    if (!capsuleId || !userEmail)
      return NextResponse.json({ error: "Capsule ID & userEmail required" }, { status: 400 });

    if (!mongoose.Types.ObjectId.isValid(capsuleId))
      return NextResponse.json({ error: "Invalid Capsule ID" }, { status: 400 });

    await dbConnect();
    const capsule = await Capsule.findById(capsuleId);
    if (!capsule) return NextResponse.json({ error: "Capsule not found" }, { status: 404 });

    // Initialize hearts array if undefined
    capsule.reactions = capsule.reactions || { hearts: [] };

    const userIndex = capsule.reactions.hearts.indexOf(userEmail);
    let liked = false;

    if (userIndex === -1) {
      // Add like
      capsule.reactions.hearts.push(userEmail);
      liked = true;
    } else {
      // Remove like
      capsule.reactions.hearts.splice(userIndex, 1);
      liked = false;
    }

    await capsule.save();

    return NextResponse.json({ liked, count: capsule.reactions.hearts.length });
  } catch (err) {
    console.error("Reaction toggle error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

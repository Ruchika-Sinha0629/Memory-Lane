import { NextRequest, NextResponse } from "next/server";
import Capsule from "@/models/Capsule";
import { dbConnect } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const { capsuleId } = await req.json();

    if (!capsuleId) {
      return NextResponse.json({ error: "Capsule ID required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(capsuleId)) {
      return NextResponse.json({ error: "Invalid Capsule ID" }, { status: 400 });
    }

    await dbConnect();

    const capsule = await Capsule.findById(capsuleId);
    if (!capsule) {
      return NextResponse.json({ error: "Capsule not found" }, { status: 404 });
    }

    // Increment ❤️ reactions
    capsule.reactions = capsule.reactions || 0;
    capsule.reactions += 1;

    await capsule.save();

    return NextResponse.json({ reactions: capsule.reactions });
  } catch (err) {
    console.error("Reaction toggle error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

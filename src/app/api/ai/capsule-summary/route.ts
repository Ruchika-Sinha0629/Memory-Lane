import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Capsule from "@/models/Capsule";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const { id, content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GOOGLE_API_KEY" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
Summarize the following memory capsule in 3–4 sentences.
Then generate a short emotional one-line caption.

CONTENT:
${content}

Return output strictly in this format:

SUMMARY:
<summary text>

CAPTION:
<caption text>
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", err);
      return NextResponse.json(
        { error: "Gemini API failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const clean = (s: string) => s.replace(/^[:\-–\s]+/, "").trim();

    const summary = clean(
      text.match(/SUMMARY:\s*([\s\S]*?)CAPTION:/)?.[1] || ""
    );

    const caption = clean(
      text.match(/CAPTION:\s*([\s\S]*)/)?.[1] || ""
    );

    if (!summary && !caption) {
      return NextResponse.json(
        { error: "AI returned empty response" },
        { status: 500 }
      );
    }

    let updatedCapsule = null;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      await dbConnect();
      updatedCapsule = await Capsule.findByIdAndUpdate(
        id,
        { summary, caption },
        { new: true }
      );
    }

    return NextResponse.json({ summary, caption, capsule: updatedCapsule });
  } catch (err) {
    console.error("Capsule AI error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

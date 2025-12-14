import mongoose, { Schema, models } from "mongoose";

const MediaSchema = new Schema({
  url: String,
  type: {
    type: String,
    enum: ["image", "video", "audio"],
  },
});

const CapsuleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: String,

    media: [MediaSchema],

    recipients: [String], // emails
    collaborators: [String], // emails

    theme: String,

    privacy: {
      type: String,
      enum: ["private", "collaborators", "public"],
      default: "private",
    },

    unlockDate: { type: Date, required: true },
    isUnlocked: { type: Boolean, default: false },

    reactions: { type: Object, default: {} },

    // ✅ REQUIRED FOR DASHBOARD
    createdBy: { type: String, required: true }, // creator email
  },
  { timestamps: true }
);

export default models.Capsule || mongoose.model("Capsule", CapsuleSchema);

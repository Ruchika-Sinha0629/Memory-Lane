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

    recipients: {
      type: [String],
      default: [],
    },

    collaborators: {
      type: [String],
      default: [],
    },

    theme: String,

    privacy: {
      type: String,
      enum: ["private", "collaborators", "public"],
      default: "private",
    },

    unlockDate: { type: Date, required: true },
    isUnlocked: { type: Boolean, default: false },

     reactions: {
    hearts: { type: [String], default: [] },
  },

    summary: {
  type: String,
  default: "",
},

caption: {
  type: String,
  default: "",
},

    createdBy: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default models.Capsule || mongoose.model("Capsule", CapsuleSchema);

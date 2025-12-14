import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
  {
    capsuleId: {
      type: Schema.Types.ObjectId,
      ref: "Capsule",
      required: true,
    },
    user: {
      id: String,
      name: String,
    },
    text: String,
  },
  { timestamps: true }
);

export default models.Comment || mongoose.model("Comment", CommentSchema);

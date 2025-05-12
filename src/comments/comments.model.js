import { Schema, model } from "mongoose";
import moment from "moment";

const commentSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      maxLength: [50, "Username cannot exceed 50 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxLength: [500, "Content cannot exceed 500 characters"],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Associated post is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

commentSchema.methods.toJSON = function () {
  const { _id, createdAt, ...comment } = this.toObject();
  return {
    uid: _id,
    createdAt: comment.createdAt,
    ...comment,
  };
};

export default model("Comment", commentSchema);
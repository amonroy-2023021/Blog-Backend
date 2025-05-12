import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [150, "Title cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: [2500, "Description cannot exceed 500 characters"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Associated course is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

postSchema.methods.toJSON = function () {
  const { _id, ...post } = this.toObject();
  return {
    uid: _id,
    createdAt: post.createdAt,
    ...post,
  };
};

export default model("Post", postSchema);
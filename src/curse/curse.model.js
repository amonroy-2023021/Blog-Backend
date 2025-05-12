import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    CurseName: {
      type: String,
      required: [true, "Course is required"],
      maxLength: [25, "Name cannot exceed 25 characters"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

courseSchema.methods.toJSON = function () {
  const { _id, CurseName, ...Course } = this.toObject();
  return { uid: _id, CurseName, ...Course };
};

export default model("Course", courseSchema);
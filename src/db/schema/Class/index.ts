import mongoose from "mongoose";
const { Schema, model } = mongoose;

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  teacherId: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  profileImageUrl: {
    type: String,
    trim: true,
    default: null,
  },
  studentCount: { type: String, default: 0 },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

classSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Classes = model("Classes", classSchema);
export default Classes;

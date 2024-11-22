import mongoose from "mongoose";
const { Schema, model } = mongoose;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: { type: String, unique: true, required: true },
  profileImageUrl: {
    type: String,
    trim: true,
    default: null,
  },
  subject: {
    type: String,
    trim: true,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

teacherSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Teachers = model("Teachers", teacherSchema);
export default Teachers;

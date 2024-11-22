import mongoose from "mongoose";
const { Schema, model } = mongoose;

const studentSchema = new Schema({
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
  classID: { type: Schema.Types.ObjectId, ref: "Class", required: true },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

studentSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Student = model("Students", studentSchema);
export default Student;

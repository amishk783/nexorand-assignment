import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sessionSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  refreshToken: {
    type: String,
    required: true,
    validUpto: Date,
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

sessionSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Session = model("Session", sessionSchema);
export default Session;

// models/user.model.ts
import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/users.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "faculty"],
      required: true,
    },

    failedAttempts: { type: Number, default: 0 },
    block: { type: Boolean, default: false },
    lastLoginTime: { type: Date },

    studentInfo: {
      department: { type: String },
      semester: { type: String },
    },

    facultyInfo: {
      subject: { type: String },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<IUser>("User", userSchema);

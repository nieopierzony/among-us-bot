import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    joinDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export default model('user', UserSchema);

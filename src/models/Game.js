import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const GameSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    players: {
      name: String,
    },
  },
  { versionKey: false },
);

export default model('game', GameSchema);

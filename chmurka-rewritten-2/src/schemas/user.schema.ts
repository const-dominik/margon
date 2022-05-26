import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Number,
  charId: Number,
  nickname: String,
  lvl: Number,
  lastDead: Date,
  deads: [Number]
});
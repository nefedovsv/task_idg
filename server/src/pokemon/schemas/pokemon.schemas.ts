import * as mongoose from 'mongoose';

export const PokemonSchema = new mongoose.Schema({
  height: Number,
  isFavourite: Boolean,
  id: Number,
  name: String,
  avatar: String,
  types: String,
  weight: Number,
  user: String,
});

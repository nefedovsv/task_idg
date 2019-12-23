"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.PokemonSchema = new mongoose.Schema({
    height: Number,
    isFavourite: Boolean,
    id: Number,
    name: String,
    avatar: String,
    types: String,
    weight: Number,
    user: String,
});
//# sourceMappingURL=pokemon.schemas.js.map
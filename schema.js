import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    title: String,
    author: String,
    ingredients: [{
      name: String,
      quantity: Number,
      unit: String
    }],
    instructions: String,
    difficulty_level: String,
    cuisine: String,
    created_at: Date,
    updated_at: Date
  });

  export const Recipe = mongoose.model("Recipe",RecipeSchema)



import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    title: String,
    author: String,
    ingredients: [{
      name: String,
      quantity: String,
      unit: String
    }],
    instructions: String,
    rating: {
        type : Number,
        min : 1,
        max : 5,
        default : 0
    },
    totalRating : {
        type : Number,
        default : 0
    },
    comments: [
        {
            name : String,
            desc : String

        }

    ],
    difficulty_level: String,
    cuisine: String,
    created_at: Date,
    updated_at: Date
  });

  export const Recipe = mongoose.model("Recipe",RecipeSchema)



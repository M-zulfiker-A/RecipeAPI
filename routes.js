import express from 'express';
import { Recipe } from './schema.js'
import { log } from 'console';

const router = express.Router()

router.get("/recipes" ,async (req, res)=>{
    try {
        const data =await Recipe.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
})
router.get("/recipes/meal-plan",async (req, res)=>{
    try {
        const mealPlan  = await Recipe.aggregate().sample(3)
        console.log(mealPlan)
        const mealNames = mealPlan.map(item => ({name : item.title , cuisine :  item.cuisine}))
        res.status(200).json({
            mealPlan : mealNames
        }
        )
    } catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
})

router.get("/recipes/:id" ,async (req, res)=>{
    try {
        const data =await Recipe.findById(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
})


router.post("/recipes", async (req, res)=>{
    try{
        const data = await Recipe.insertMany(req.body)
        res.status(201).json({
            message : "Successfully created new Recipe",
            data
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

router.put("/recipes/:id", async (req, res)=>{
    try{
        const data = await Recipe.findByIdAndUpdate(req.params.id,req.body, {new : true})
        res.status(201).json({
            message : "Successfully edited Recipe",
            data
        })
    }catch(err){
        frames.status(400).json({
            message : err.message
        })
    }
})

router.delete("/recipes/:id", async (req, res)=>{
    try{
        const data = await Recipe.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).json({
            message : "Successfully edited Recipe",
            data
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

router.get("/recipes/:id/ingredients",async (req, res)=>{
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.status(200).json({
            ingredients : recipe.ingredients
        })
    } catch (error) {
        res.status(400).json({
            message : err.message
        })
    }
})

router.get("/recipes/:id/comments",async (req, res)=>{
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.status(200).json({
            comments : recipe.comments
        })
    } catch (error) {
        res.status(400).json({
            message : err.message
        })
    }
})

router.get("/recipes/:id/instructions",async (req, res)=>{
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.status(200).json({
            instructions : recipe.instructions
        })
    } catch (error) {
        res.status(400).json({
            message : err.message
        })
    }
})

router.post("/recipes/:id/rating", async(req, res)=>{
    try {
        const {rating} = req.body
        const recipe = await Recipe.findById(req.params.id)
        let currTotRating = recipe.rating * recipe.totalRating
        log(currTotRating);
        recipe.totalRating +=1
        recipe.rating = (currTotRating + rating) / recipe.totalRating
        await recipe.save()
        res.status(200).json({
            message : "Rating updated",
            rating : recipe.rating
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})


router.get("/recipes/:id/rating",async (req, res)=>{
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.status(200).json({
            rating : recipe.rating
        })
    } catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
})







export default router
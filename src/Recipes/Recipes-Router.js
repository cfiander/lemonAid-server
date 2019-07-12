const express = require('express')
const RecipeService = require('./Recipes-Service')
const recipeRouter = express.Router()
const unirest = require ('unirest')

const jsonBodyParser = express.json()

recipeRouter
  .route('/')
    .post(jsonBodyParser, (req, res, next) => {
    // const { number, ranking, ignorePantry = null, ingredients = [] } = req.query;
    const {ingredients} = req.body
   
    unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=1&ignorePantry=false&ingredients=${ingredients}`)
    .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "db5a101104mshcf69cbd8b65f653p1ddc40jsn7f91d36c4804")
    .end(function (result) {
    res.status(200).send(result.body);
  })
  })

recipeRouter
  .route(`/url`)
    .post(jsonBodyParser, (req, res, next) => {
        const {recipeId} = req.body
        unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`)
        .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "db5a101104mshcf69cbd8b65f653p1ddc40jsn7f91d36c4804")
        .end(function (result) {
            res.status(200).json(result.body.sourceUrl);
        });
    })

  module.exports = recipeRouter


  
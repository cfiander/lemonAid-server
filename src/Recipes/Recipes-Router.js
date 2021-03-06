const express = require('express')
const RecipeService = require('./Recipes-Service')
const recipeRouter = express.Router()
const unirest = require ('unirest')
const config = require('../config')
const jsonBodyParser = express.json()

recipeRouter
  .route('/')
    .post(jsonBodyParser, (req, res, next) => {
    // const { number, ranking, ignorePantry = null, ingredients = [] } = req.query;
    console.log(req.body.ingredients)
    const {ingredients} = req.body
    let limit;
    if (req.body.limit) {
      limit = req.body.limit
    } else {
      limit = '50';
    }
    unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=${limit}&ranking=1&ignorePantry=false&ingredients=${ingredients}`)
    .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", `${config.API_TOKEN}`)
    .end(function (result) {
        console.log(result.body)
    res.status(200).send(result.body);
  })
  })

recipeRouter
  .route(`/url`)
    .post(jsonBodyParser, (req, res, next) => {
        const {recipeId} = req.body
        unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`)
        .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", `${config.API_TOKEN}`)
        .end(function (result) {
            res.status(200).json(result.body.sourceUrl);
        });
    })

  module.exports = recipeRouter


  
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Recipes Endpoints', function() {

    const {expectedRecipes} = helpers.makeFixtures()

  describe.only(`Getting recipes from /api/recipes`, () => {
    context(`Given no recipes`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .post('/api/recipes')
          .expect(200, [])
      })
    })


    context('Given there are recipes', () => {
        it('responds with 200 and all of the recipes', () => {
        app.post((req, res, next) => {
            const {ingredients} = [apples, sugar, flour]
            unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=1&ranking=2&ignorePantry=false&ingredients=${ingredients}`)
            .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "db5a101104mshcf69cbd8b65f653p1ddc40jsn7f91d36c4804")
            .end(function (result) {
            console.log(result.body)
            const actualRecipes = result.body;
            expect(actualRecipes).to.deep.equal(expectedRecipes)
          })
          return supertest(app)
          .post('/api/recipes')
          .expect(200, expectedRecipes)
        })
        })
    })
  })
})
const knex = require('knex')
const app = require('../src/app')

describe('Recipes Endpoints', function() {

  describe.only(`GET /api/recipes`, () => {
    context(`Given no recipes`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .post('/api/recipes')
          .expect(200, [])
      })
    })

    context('Given there are recipes', () => {
        it('responds with 200 and all of the things', () => {
        app.post((req, res, next) => {
            // const { number, ranking, ignorePantry = null, ingredients = [] } = req.query;
            const {ingredients} = [apples, sugar, flour]
            const ingredientsString = ingredients.join('2%C')
            
            unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=2&ignorePantry=false&ingredients=${ingredients}`)
            .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "db5a101104mshcf69cbd8b65f653p1ddc40jsn7f91d36c4804")
            .end(function (result) {
            const expectedRecipes = helpers.expectedResults
            expect(testRecipes).to.deep.equal(expectedRecipes)
          })
          return supertest(app)
          .post('/api/recipes')
          .expect(200, expectedRecipes)
        })
        })
    })
  })
})
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Recipes Endpoints', function() {

    const {expectedRecipes} = helpers.makeFixtures()
    const goodSearch = { ingredients: "apples,flour,sugar", limit: "1" }
  describe(`Getting recipes from /api/recipes`, () => {
    context(`Given no recipes`, () => {
      it(`responds with 200`, () => {
        return supertest(app)
          .post('/api/recipes')
          .send({ingredients:"asdf%2Cfdsa"})
          .expect(200, [])
      })
    })


    context('Given there are recipes', () => {
        it('responds with 200 and all of the recipes', () => {
          return supertest(app)
          .post('/api/recipes')
          .send(goodSearch)
                    .expect(200)
                    .expect(res => {
                        expect(res.body).to.eql(expectedRecipes)
                    })
        })
        })
    })
  })
  describe(`Getting url from recipes at /api/recipes/url`, () => {
})
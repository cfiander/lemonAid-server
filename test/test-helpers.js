const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeExpectedRecipes() {
    return [ 
        { 
        id: 591006,
        title: 'Apple Sandwiches with Almond Butter and Granola',
        image: 'https://spoonacular.com/recipeImages/591006-312x231.jpg',
        imageType: 'jpg',
        usedIngredientCount: 1,
        missedIngredientCount: 2,
        missedIngredients: [ {
        aisle: "Nut butters, Jams, and Honey",
        amount: 1,
        id: 12195,
        image: "https://spoonacular.com/cdn/ingredients_100x100/almond-butter.jpg",
        metaInformation: [],
        name: "almond butter",
        original: "Almond butter",
        originalName: "Almond butter",
        originalString: "Almond butter",
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving"}, 
        {aisle: "Cereal",
        amount: 1,
        id: 8212,
        image: "https://spoonacular.com/cdn/ingredients_100x100/granola.jpg",
        metaInformation: [],
        name: "granola",
        original: "Granola",
        originalName: "Granola",
        originalString: "Granola",
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving"
        } 
        ],
        usedIngredients: [
            {
            aisle: "Produce",
            amount: 1,
            id: 9003,
            image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
            metaInformation: (2) ["cored", "sliced into rings"],
            name: "apple",
            original: "1 apple, cored and sliced into rings",
            originalName: "apple, cored and sliced into rings",
            originalString: "1 apple, cored and sliced into rings",
            unit: "",
            unitLong: "",
            unitShort: "",
            }],
        unusedIngredients: [],
        likes: 2882 
        }
    ]
}


function makeFixtures() {
  const testUsers = makeUsersArray()
  const expectedRecipes = makeExpectedRecipes()
  return { testUsers, expectedRecipes}
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      lemonstand_users,
      saved_recipes,
      user_recipes
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
   ...user,
     password: bcrypt.hashSync(user.password, 1)
   }))
   return db.into('lemonstand_users').insert(preppedUsers)
     .then(() =>
       // update the auto sequence to stay in sync
       db.raw(
         `SELECT setval('lemonstand_users_id_seq', ?)`,
         [users[users.length - 1].id],
       )
     )
}


function seedThingsTables(db, users, recipes, reviews=[]) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('saved_recipes').insert(recipes)
  
    await trx.raw(`SELECT setval('saved_recipes_id_seq',?)`,
    [recipes[recipes.length -1].id])
  })
  .then(()=>
  reviews.length && db('user_recipes').insert(reviews)
  )
}



function seedMaliciousThing(db, user, recipe) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('user_recipes')
        .insert([recipe])
    )
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,

  makeFixtures,
  cleanTables,
  seedThingsTables,
  seedMaliciousThing,
  makeAuthHeader,
  seedUsers,
}

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
        "id": 534573,
        "image": "https://spoonacular.com/recipeImages/534573-312x231.jpg",
        "imageType": "jpg",
        "likes": 7,
        "missedIngredientCount": 5,
        "missedIngredients": [
          {
            "aisle": "Spices and Seasonings",
            "amount": 0.5,
            "id": 2010,
            "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
            "metaInformation": [],
            "name": "cinnamon",
            "original": "1/2 tsp cinnamon",
            "originalName": "cinnamon",
            "originalString": "1/2 tsp cinnamon",
            "unit": "tsp",
            "unitLong": "teaspoons",
            "unitShort": "tsp",
          },
          {
            "aisle": "Baking",
            "amount": 0.25,
            "id": 19334,
            "image": "https://spoonacular.com/cdn/ingredients_100x100/dark-brown-sugar.png",
            "metaInformation": [
              "light"
            ],
            "name": "light brown sugar",
            "original": "1/4 cup light brown sugar",
            "originalName": "light brown sugar",
            "originalString": "1/4 cup light brown sugar",
            "unit": "cup",
            "unitLong": "cups",
            "unitShort": "cup",
          },
          {
            "aisle": "Cereal",
            "amount": 0.5,
            "id": 8120,
            "image": "https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg",
            "metaInformation": [
              "uncooked",
              "(not instant)",
            ],
            "name": "oats",
            "original": "1/2 cup uncooked oats (not instant)",
            "originalName": "uncooked oats (not instant)",
            "originalString": "1/2 cup uncooked oats (not instant)",
            "unit": "cup",
            "unitLong": "cups",
            "unitShort": "cup",
          },
          {
            "aisle": "Spices and Seasonings",
            "amount": 1,
            "id": 2047,
            "image": "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
            "metaInformation": [],
            "name": "salt",
            "original": "pinch salt",
            "originalName": "pinch salt",
            "originalString": "pinch salt",
            "unit": "pinch",
            "unitLong": "pinch",
            "unitShort": "pinch",
          },
          {
            "aisle": "Milk, Eggs, Other Dairy",
            "amount": 0.25,
            "id": 1001001,
            "image": "https://spoonacular.com/cdn/ingredients_100x100/butter.jpg",
            "metaInformation": [
              "salted"
            ],
            "name": "salted butter",
            "original": "1/4 cup salted butter",
            "originalName": "salted butter",
            "originalString": "1/4 cup salted butter",
            "unit": "cup",
            "unitLong": "cups",
            "unitShort": "cup",
          },
        ],
        "title": "Brown Butter Apple Crumble",
        "unusedIngredients": [],
        "usedIngredientCount": 3,
        "usedIngredients": [
          {
            "aisle": "Produce",
            "amount": 4,
            "id": 9003,
            "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
            "metaInformation": [
              "cored",
              "peeled",
              "sliced",
            ],
            "name": "apples",
            "original": "4 apples, peeled, cored and sliced",
            "originalName": "apples, peeled, cored and sliced",
            "originalString": "4 apples, peeled, cored and sliced",
            "unit": "",
            "unitLong": "",
            "unitShort": "",
          },
          {
            "aisle": "Baking",
            "amount": 0.25,
            "id": 20081,
            "image": "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
            "metaInformation": [
              "all-purpose"
            ],
            "name": "flour",
           "original": "1/4 cup all-purpose flour",
            "originalName": "all-purpose flour",
            "originalString": "1/4 cup all-purpose flour",
            "unit": "cup",
            "unitLong": "cups",
            "unitShort": "cup",
          },
          {
            "aisle": "Baking",
            "amount": 2,
            "id": 19335,
            "image": "https://spoonacular.com/cdn/ingredients_100x100/sugar-in-bowl.png",
            "metaInformation": [],
            "name": "sugar",
            "original": "2 tbsp sugar",
            "originalName": "sugar",
            "originalString": "2 tbsp sugar",
            "unit": "tbsp",
            "unitLong": "tablespoons",
            "unitShort": "Tbsp",
          }
        ]
      }
    ]
}


function makeFixtures() {
      const testUsers = makeUsersArray()
      const expectedRecipes = makeExpectedRecipes()
      return { testUsers, expectedRecipes }
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
      makeAuthHeader,
      seedUsers,
    }

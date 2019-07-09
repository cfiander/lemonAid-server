// const express = require('express')
// const logger = require('../logger')
// const uuid = require('uuid')
// const ingredientsRouter = express.Router()
// const bodyParser = express.json()
// const store = require('../store')



// ingredientsRouter
//   .route('/')
//   .get((req, res) => {
//     console.log('echo')
//     res.json(store.ingredients)
//   })
//   .post(bodyParser, (req, res) => {
//     for (const field of ['name']) {
//       if (!req.body[field]) {
//         logger.error(`${field} is required`)
//         return res.status(400).send(`'${field}' is required`)
//       }
//     }
//     const { name } = req.body

//     const ingredient = { databaseid: uuid(), name }

//     store.ingredients.push(ingredient)

//     logger.info(`Ingredient with id ${ingredient.databaseid} created`)
//     res
//       .status(201)
//       .location(`http://localhost:8000/api`)
//       .json(ingredient)
    
//   })

//   bookmarksRouter
//   .route('/bookmarks/:bookmark_id')
//   .get((req, res) => {
//     const { bookmark_id } = req.params

//     const bookmark = store.bookmarks.find(c => c.id == bookmark_id)

//     if (!bookmark) {
//       logger.error(`Bookmark with id ${bookmark_id} not found.`)
//       return res
//         .status(404)
//         .send('Bookmark Not Found')
//     }

//     res.json(bookmark)
//   })
//   .delete((req, res) => {
//     const { bookmark_id } = req.params

//     const bookmarkIndex = store.bookmarks.findIndex(b => b.id === bookmark_id)

//     if (bookmarkIndex === -1) {
//       logger.error(`Bookmark with id ${bookmark_id} not found.`)
//       return res
//         .status(404)
//         .send('Bookmark Not Found')
//     }

//     store.bookmarks.splice(bookmarkIndex, 1)

//     logger.info(`Bookmark with id ${bookmark_id} deleted.`)
//     res
//       .status(204)
//       .end()
//   })

// module.exports = ingredientsRouter
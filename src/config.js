module.exports = {
  // EXTERNAL_API: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=1&ignorePantry=false&ingredients=`,
  PORT: process.env.PORT || 8000,
  API_TOKEN: process.env.API_TOKEN || 'none',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://dunder-mifflin@localhost/blogful',
  JWT_SECRET: process.env.JWT_SECRET || 'my-new-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}

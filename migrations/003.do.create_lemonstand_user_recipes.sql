create table user_recipes
(
    id integer not null references lemonstand_users(id),
    recipe_id   integer not null references saved_recipes(recipe_id)
);
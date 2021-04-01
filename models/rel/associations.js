module.exports = function(models) {
    //users to recipes
    models.users.hasMany(models.recipes, { foreignKey: 'UserId' });
    models.recipes.belongsTo(models.users, { foreignKey: 'UserId' });
    //users to fav
    models.users.hasMany(models.favorites, { foreignKey: 'UserId' });
    models.favorites.belongsTo(models.users, { foreignKey: 'UserId' });
    //recipe to fav
    models.recipes.hasMany(models.favorites, { foreignKey: 'RecipeId' });
    models.favorites.belongsTo(models.recipes, { foreignKey: 'RecipeId' });
}
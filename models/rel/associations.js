module.exports = function(models) {
    models.users.hasMany(models.recipes, { foreignKey: 'UserId' });
    
    //models.users.hasMany(models.favorite,  { foreignKey: 'UserId' });
    
    models.recipes.belongsTo(models.users, { foreignKey: 'UserId' });
    
    //models.favorite.belongsTo(models.users, { foreignKey: 'UserId' });
    
    //models.recipes.hasMany(models.favorite,  { foreignKey: 'RecipeId' });
    
    //models.favorite.belongsTo(models.recipes, { foreignKey: 'RecipeId' });
}
module.exports = function(models) {
    models.users.belongsToMany(models.recipes, 
        { 
            through: models.user_rec,
            foreignKey: 'UserId'
        });
    models.recipes.belongsToMany(models.users,
        {
            through: models.user_rec,
            foreignKey: 'RecipeId'
        });
    models.users.belongsToMany(models.recipes, 
        { 
            through: models.favorite,
            foreignKey: 'UserId'
        });
    models.recipes.belongsToMany(models.users,
        {
            through: models.favorite,
            foreignKey: 'RecipeId'
        });
}
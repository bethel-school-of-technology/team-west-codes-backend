module.exports = function(models) {
    models.users.hasMany(models.recipes, 
        { 
            //through: models.users,
            foreignKey: 'UserId'
        });
    models.recipes.belongsTo(models.users,
        {
            foreignKey: 'UserId'
        });/**/
}
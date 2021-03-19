var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recipes from the Heart' });
});
*/
//recipes

router.get('/editRecipe', function(req, res, next) {
  models.recipes
    .findAll({include: [{ model: models.users }]})
    .then(recipesFound => {
      res.render('createRecipe', { title: 'Recipes from the Heart' });
      //res.setHeader('Content-Type', 'application/json');
      //res.send(JSON.stringify(recipesFound));
    });
});

router.get('/editRecipe/:id', function(req, res, next) {
  models.recipes
    .findByPk(parseInt(req.params.id), { 
      include: [{ model: models.users }]
    })
    .then(recipesFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(recipesFound));
    })
});

router.post('/createRecipe', function (req, res, next) {
  models.recipes.findOrCreate({
    where: { 
      Title: req.body.Title, 
      Ingredients: req.body.Ingredients,
      Steps:  req.body.Steps,
      //UserId: req.body.UserId
    }
  })
  .spread(function(result, created) {
    if (created) {
      res.redirect('/recipes/editRecipe/' + result.RecipeId);
    } else {
      res.status(400);
      res.send('Recipe already exists');
    }
  })
});

router.put('/editRecipe/:id', function (req, res, next) {
  let RecipeId = parseInt(req.params.id);
  models.recipes
    .update(req.body, { where: { Recipeid: RecipeId } })
    .then(result => res.redirect('/recipes/editRecipe/' + RecipeId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the recipe.  Please check the recipe's information.");
    });
});

router.delete('/deleteRecipe/:id', function (req, res, next) {
  let RecipeId = parseInt(req.params.id);
  models.recipes
    .destroy({
      where: { Recipeid: RecipeId }
    })
    .then(result => res.redirect('/recipes/createRecipe'))
    .catch(err => { 
      res.status(400); 
      res.send("There was a problem deleting the recipe. Please make sure you are specifying the correct id."); 
    }
);
});

module.exports = router;

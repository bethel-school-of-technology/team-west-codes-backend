var express = require('express');
var router = express.Router();
//var mysql = require('mysql2');
var models = require('../models');
var passport = require('../services/passport');
var authService = require('../services/auth');

router.get('/createPost', function (req, res, next) {
  res.render('posts', { title: 'Create A Post' });
});

// ADD A Recipoe (user only)
router.post('/createRecipe', function (req, res, next) {
  let token = req.cookies.jwt;
  models.users
  authService.verifyUser(token).then(user => {
      if (user) {
          models.recipes
              .findOrCreate({
                  where: {
                      UserId: user.UserId,
                      RecipeTitle: req.body.Title,
                      RecSteps: req.body.Steps,
                      RecInstruction: req.body.Instruction
                  }
              })
              .spread(function (result, created) {
                  if (created) {
                      res.redirect('/users/profile');
                  } else {
                      res.send('Recipe did not post please try again.');
                  }
              })
      }
  });
});

// GET A POST BY ID TO EDIT (user only)
router.get("/editRecipe/:id", function (req, res, next) {
  let RecipeId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  models.users
  if (token) {
      authService.verifyUser(token).then(user => {
          if (user) {
              models.recipes
                  .findByPk(RecipeId)
                  .then(post => res.render('editRecipe', { recipe }));
          } else {
              res.send("Sorry, there was a problem editing this post.");
          }
      });
  }
});

// EDIT A POST BY ID (user or admin)
router.post("/editRecipe/:id", function (req, res, next) {
  let RecipeID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
      authService.verifyUser(token).then(user => {
          if (user) {
              models.recipe
                  .update(
                      { Title: req.body.Title, Ingredients: req.body.Ingredients },
                      { where: { RecipeID: RecipeID } })
                  .then(user => res.redirect('/users/profile'));
          } else {
              res.send("Sorry, there was a problem editing this recipe.");
          }
      });
  }
});

// DELETE A POST BY ID (admin only)
router.post("/admin/deleteRecipe/:id", function (req, res, next) {
  let RecipeID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
      authService.verifyUser(token)
          .then(user => {
              if (user.Admin) {
                  models.recipe
                      .update({ Deleted: true }, { where: { RecipeId: RecipeID } })
                      .then(user => res.redirect('/users/admin'));
              } else {
                  res.send("You are not logged in as Admin. Unable to delete recipe.");
              }
          });
  }
});

// DELETE A POST BY ID (user)
router.post("/deleteRecipe/:id", function (req, res, next) {
  let RecipeID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
      authService.verifyUser(token)
          .then(user => {
              if (user) {
                  models.recipe
                      .update({ Deleted: true }, { where: { RecipeId: RecipeID } })
                      .then(user => res.redirect('/users/profile'));
              } else {
                  res.send("Unable to Delete");
              }
          });
  }
});

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recipes from the Heart' });
});

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
      UserId: req.body.UserId
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
*/
module.exports = router;

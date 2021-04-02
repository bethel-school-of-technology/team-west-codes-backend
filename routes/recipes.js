var express = require('express');
var router = express.Router();
//var mysql = require('mysql2');
var models = require('../models');
var passport = require('../services/passport');
var authService = require('../services/auth');


router.post('/createRecipe', function (req, res, next) {
  let token = req.cookies.jwt;
  models.users
  authService.verifyUser(token).then(user => {
      if (user) {
          models.recipes
              .findOrCreate({
                  where: {
                      UserId: user.UserId,
                      Title: req.body.Title,
                      Steps: req.body.Steps,
                      Ingredients: req.body.Ingredients
                  }
              })
              .spread(function (result, created) {
                  if (created) {
                      res.send(JSON.stringify({ recipeData: result }));
                  } else {
                      res.send('Recipe did not post please try again.');
                  }
              })
      }
  });
});


router.get("/editRecipe/:id", function (req, res, next) {
  let RecipeId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  models.users
  if (token) {
      authService.verifyUser(token).then(user => {
          if (user) {
              models.recipes
                  .findByPk(RecipeId)
                  .then(recipe => { 
                    res.send(JSON.stringify({ recipe }));
                  })
          } else {
              res.send("Sorry, there was a problem editing this post.");
          }
      });
  }
});


router.post("/editRecipe/:id", function (req, res, next) {
  let RecipeID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
      authService.verifyUser(token).then(recipe => {
          if (recipe) {
              models.recipes
                  .update(
                      { Title: req.body.Title, Ingredients: req.body.Ingredients },
                      { where: { RecipeID: RecipeID } })
                  .then(recipe => { 
                    res.send(JSON.stringify({ recipeData: recipe }));
                  })
          } else {
              res.send("Sorry, there was a problem editing this recipe.");
          }
      });
  }
});


router.delete("/admin/deleteRecipe/:id", function (req, res, next) {
  let RecipeID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
      authService.verifyUser(token)
          .then(user => {
              if (user.Admin) {
                  models.recipes
                  .delete({ where: { RecipeID: RecipeID } })
                  .then(recipe => { 
                        res.send(JSON.stringify({ recipe }));
                      })
              } else {
                  res.send("You are not logged in as Admin. Unable to delete recipe.");
              }
          });
  }
});


router.post("/deleteRecipe/:id", function (req, res, next) {
  let RecipeID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
      authService.verifyUser(token)
          .then(user => {
              if (user) {
                  models.recipe
                  .then(recipe => { 
                    res.send(JSON.stringify({ recipe }));
                  })
              } else {
                  res.send("Unable to Delete");
              }
          });
  }
});
/*
router.post('/createFavorite', function (req, res, next) {
  let token = req.cookies.jwt;
  //let RecipeId = parseInt(req.params.RecipeId);
  //let UserId = parseInt(req.params.UserId);
  models.users
  authService.verifyUser(token).then(user => {
      if (user) {
          models.favorite
              .findOrCreate({
                  where: {
                      FavId: user.UserId
                  },
                  defaults: {
                      UserId: req.body.UserId,
                      RecipeId: req.body.RecipeId,
                      Tried: req.body.Tried,
                      Loved_it: req.body.Loved_it
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
*/

/*router.post('/createRecipe', function (req, res, next) {
  let token = req.cookies.jwt;
  models.users
  authService.verifyUser(token).then(user => {
      if (user) {
          models.recipes
              .findOrCreate({
                  where: {
                      UserId: user.UserId,
                      Title: req.body.Title,
                      Steps: req.body.Steps,
                      Ingredients: req.body.Ingredients
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


router.get("/editRecipe/:id", function (req, res, next) {
  let RecipeId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  models.users
  if (token) {
      authService.verifyUser(token).then(user => {
          if (user) {
              models.recipes
                  .findByPk(RecipeId)
                  .then(recipe => res.render('editRecipe', { recipe }));
          } else {
              res.send("Sorry, there was a problem editing this post.");
          }
      });
  }
});


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
*/
module.exports = router;
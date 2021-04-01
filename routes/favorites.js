var express = require('express');
var router = express.Router();
//var mysql = require('mysql2');
var models = require('../models');
var passport = require('../services/passport');
var authService = require('../services/auth');


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

  /*
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
                      res.redirect('/users/profile');
                  } else {
                      res.send('Recipe did not post please try again.');
                  }
              })
      }
  });
});*/


router.get("/editFavorite/:id", function (req, res, next) {
  let FavId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  models.users
  if (token) {
      authService.verifyUser(token).then(user => {
          if (user) {
              models.favorites
                  .findByPk(FavId)
                  .then(favorites => res.render('editFavorite', { 
                      FavId: favorites.FavId,
                      RecipieId: favorites.RecipeId,
                      UserId: favorites.UserId,
                      TriedIt: favorites.Tried,
                      LovedIt: favorites.Loved_it
                    }));
          } else {
              res.send("Sorry, there was a problem editing this favorite.");
          }
      });
  }
});

/*
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


router.delete("/admin/deleteRecipe/:id", function (req, res, next) {
  let RecipeID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
      authService.verifyUser(token)
          .then(user => {
              if (user.Admin) {
                  models.recipe
                      .then(user => res.redirect('/users/admin'));
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
                      .then(user => res.redirect('/users/profile'));
              } else {
                  res.send("Unable to Delete");
              }
          });
  }
});




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
});*/

/*
router.get("/editFavorite/:id", function (req, res, next) {
  let FavId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  models.users
  if (token) {
      authService.verifyUser(token).then(user => {
          if (favorite) {
              models.favorites
                  .findByPk(FavId)
                  .then(favorite => res.render('editRecipe', { favorite }));
          } else {
              res.send("Sorry, there was a problem editing this favorite.");
          }
      });
  }
});
*/

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

module.exports = router;
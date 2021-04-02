var express = require('express');
var router = express.Router();
//var mysql = require('mysql2');
var models = require('../models');
var passport = require('../services/passport');
var authService = require('../services/auth');


router.post('/createFavorite', function (req, res, next) {
    let token = req.cookies.jwt;
    console.log('this is a test', req.body);
    models.users
    authService.verifyUser(token).then(user => {
        if (user) {            
            models.favorites
                .findOrCreate({
                    where: {
                        UserId: req.body.UserId,
                        RecipeId: req.body.RecipeId
                    },
                    defaults: {
                        Tried: req.body.Tried,
                        Loved_it: req.body.Loved_it
                    }
                })
                .spread(function (result, created) {
                    if (created) {
                        res.send(JSON.stringify({ favoriteData: result }));
                    } else {
                        res.send('Recipe did not post please try again.');
                    }
                })
        }
    });
  });

  router.get('/allFavorite/:id', function (req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
      authService.verifyUser(token)
        .then(user => {
          
          if (user) {
            models.users.findOne({
              where: {
                UserId: user.UserId
              },
              include: [{
                model: models.favorites
              }]
            }).then(userfavoritesFound => {
              console.log(userfavoritesFound);
              res.send(JSON.stringify({ userData: userfavoritesFound }));
              //res.render('profile', { userData: userRecipesFound });
            })
          } else {
            res.status(401);
            res.send('Must be logged in');
          }
        });
    }
  });
  /*
  router.get("/allFavorite/:id", function (req, res, next) {
    let UserId = parseInt(req.params.id);
    let token = req.cookies.jwt;
    models.users
    if (token) {
        authService.verifyUser(token).then(user => {
            if (user) {
                models.users.findOne({
                    where: { UserId: user.UserId},
                  include: [( models.favorites
                    .findAll({ where: {UserId: req.body.UserId}}) )]  
                })
                .then( userfavoritesFound => {
                    console.log(userfavoritesFound);
                    res.send(JSON.stringify({ userData: userfavoritesFound }))});
            } else {
                res.send("Sorry, there was a problem editing this favorite.");
            }
        });
    }
  });
*/
  router.get("/editFavorite/:id", function (req, res, next) {
    let FavId = parseInt(req.params.id);
    let token = req.cookies.jwt;
    models.users
    if (token) {
        authService.verifyUser(token).then(user => {
            if (user) {
                models.favorites
                    .findByPk(FavId)
                    .then(favorites => res.send(JSON.stringify({ favoriteData: favorites })));
                    /*.then(favorites => res.render('editFavorite', { 
                        FavId: favorites.FavId,
                        RecipieId: favorites.RecipeId,
                        UserId: favorites.UserId,
                        TriedIt: favorites.Tried,
                        LovedIt: favorites.Loved_it
                      }));*/
            } else {
                res.send("Sorry, there was a problem editing this favorite.");
            }
        });
    }
  });

router.post("/editFavorite/:id", function (req, res, next) {
  let FavId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
      authService.verifyUser(token).then(user => {
          if (user) {
              models.favorites
                  .update(
                      { Tried: req.body.Tried, Loved_it: req.body.Loved_it },
                      { where: { FavId: FavId } })
                  .then(favorite => res.send(JSON.stringify({ favoriteData: favorite })));
          } else {
              res.send("Sorry, there was a problem editing this recipe.");
          }
      });
  }
});

module.exports = router;
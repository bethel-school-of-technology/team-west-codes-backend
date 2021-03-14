var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recipes from the Heart' });
});

router.get('/users', function(req, res, next) {
  models.users
    .findAll({include: [{ model: models.recipes }]})
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});

router.get('/users/:id', function(req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id), { 
      include: [{ model: models.recipes }]
    })
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    })
});

router.post('/', function (req, res, next) {
  models.users.findOrCreate({
    where: { 
      FirstName: req.body.FirstName, 
      LastName: req.body.LastName,
      Email:  req.body.Email,
      Username:  req.body.Username
    }
  })
  .spread(function(result, created) {
    if (created) {
      res.redirect('/users/' + result.UserId);
    } else {
      res.status(400);
      res.send('Users already exists');
    }
  })
});

router.put("/users/:id", function (req, res, next) {
  let UserId = parseInt(req.params.id);
  models.users
    .update(req.body, { where: { Userid: UserId } })
    .then(result => res.redirect('/users/' + UserId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the user.  Please check the user's information.");
    });
});

router.delete("/users/:id", function (req, res, next) {
  let UserId = parseInt(req.params.id);
  models.users
    .destroy({
      where: { Userid: UserId }
    })
    .then(result => res.redirect('/users'))
    .catch(err => { 
      res.status(400); 
      res.send("There was a problem deleting the user. Please make sure you are specifying the correct id."); 
    }
);
});

module.exports = router;

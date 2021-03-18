var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
//var passport = require('../services/passport');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
//users

router.get('/profile', function(req, res, next) {
  models.users
    .findAll({include: [{ model: models.recipes }]})
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    });
});

router.get('/profile/:id', function(req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id), { 
      include: [{ model: models.recipes }]
    })
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    })
});

router.post('/signup', function (req, res, next) {
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
      res.redirect('/users/profile/' + result.UserId);
    } else {
      res.status(400);
      res.send('Users already exists');
    }
  })
});

router.put('/profile/:id', function (req, res, next) {
  let UserId = parseInt(req.params.id);
  models.users
    .update(req.body, { where: { Userid: UserId } })
    .then(result => res.redirect('/users/profile/' + UserId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the user.  Please check the user's information.");
    });
});

router.delete('/profile/:id', function (req, res, next) {
  let UserId = parseInt(req.params.id);
  models.users
    .destroy({
      where: { Userid: UserId }
    })
    .then(result => res.redirect('/users/profile'))
    .catch(err => { 
      res.status(400); 
      res.send("There was a problem deleting the user. Please make sure you are specifying the correct id."); 
    }
);
});

module.exports = router;

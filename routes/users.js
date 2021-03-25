var express = require('express');
var router = express.Router();
//const mysql = require('mysql2');
var models = require('../models');
var passport = require('../services/passport');
var authService = require('../services/auth');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
//users

router.get('/', function (req, res, next) {
  res.render('login', { title: 'Users' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: authService.hashPassword(req.body.Password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.redirect('login');
      } else {
        res.send('This username already exists. Choose a different username and try again.');
      }
    });
});


router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  console.log(req.body)
  models.users.findOne({
    where: {
      Username: req.body.Username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      res.status(401);
      res.send('Login Failed. Usernames are case sensitive. Check your username and try again.');
    } else {
      let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.redirect('/users/profile')
      } else {
        console.log('Wrong password');
        res.redirect('login');
      }
    }
  });
});


router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        
        if (user) {
          models.users.findOne({
            where: {
              Username: user.Username
            },
            include: [{
              model: models.recipes
            }]
          }).then(userRecipesFound => {
            console.log(userRecipesFound);
            res.render('profile', { userData: userRecipesFound }
            );
          })
        } else {
          res.status(401);
          res.send('Must be logged in');
        }
      });
  }
});

router.get('/admin', function (req, res, next) {
  
  let token = req.cookies.jwt;
  console.log(token);
  if (token) {
    authService.verifyUser(token)
    .then(user => {
      if (user.Admin) {
        models.users.findAll({
          where: {
            Deleted: false
          }
        }).then(usersFound => {
          res.render('admin',
            { title: 'ADMIN PAGE', users: usersFound }
          );
        })
      } else {
        res.send("Sorry, you are not authorized to view this page!");
      }
    });
  }
});

router.get('/admin/editUser/:id', function (req, res, next) {
  let userID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.users.findOne({
            
            where: {UserId: UserID},
            include: [{
              model: models.recipes,
              
            }]
          }).then(userrecipesFound => {
            res.render('editUser', { userData: userrecipesFound }
            );
          })
        } else {
          res.status(401);
          res.send('Cannot view user');
        }
      });
  }
});

router.post("/admin/delete/:id", function (req, res, next) {
  let UserID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.users
            .update({ Deleted: true }, { where: { UserId: UserID } })
            .then(user => res.redirect('/users/admin'));
        } else {
          res.send("Sorry, there was a problem deleting the user.");
        }
      });
  }
});

router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.redirect('login');
});
/*
router.get('/profile', function(req, res, next) {
  models.users
    .findAll({include: [{ model: models.recipes }]})
    .then(usersFound => {
      res.render('profile', { title: 'profile' });
      //res.setHeader('Content-Type', 'application/json');
      //res.send(JSON.stringify(usersFound));
    });
});

router.get('/profile/:id', function(req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id), { 
      include: [{ model: models.recipes }]
    })
    .then(usersFound => {
      res.render('profile', { title: 'profile' });
      //res.setHeader('Content-Type', 'application/json');
      //res.send(JSON.stringify(usersFound));
    })
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
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
    .update(req.body, { where: { UserId: UserId } })
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
      where: { UserId: UserId }
    })
    .then(result => res.redirect('/users/profile'))
    .catch(err => { 
      res.status(400); 
      res.send("There was a problem deleting the user. Please make sure you are specifying the correct id."); 
    }
);
});*/

module.exports = router;

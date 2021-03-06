var express = require('express');
var router = express.Router();
var models = require('../models');
const associations = require('../models/rel/associations');
var authService = require('../services/auth');


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
        res.json({
          message: "User created",
          status: 200 });
      } else {
        res.send('This username already exists. Choose a different username and try again.');
      }
    });
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
        res.json({
          message: "User Logged in",
          status: 200,
          token
        })
      } else {
        console.log('Wrong password');
        res.json({
          message: 'Failed to login',
          status: 400
        });
      }
    }
  });
});


router.get('/profile', async (req, res, next) => {
  let appToken = req.headers.authorization;
  console.log(appToken);

  if(appToken) {
    let currentUser = await authService.verifyUser(appToken);
    console.log(currentUser);

    if (currentUser) {
      let responseUser = {
        FirstName: currentUser.FirstName,
        LastName: currentUser.LastName,
        Email: currentUser.Email,
        Username: currentUser.Username,
        Deleted: currentUser.Deleted,
        Admin: currentUser.Admin
    }
      res.json({
        message: "User profile loaded successfully",
        status: 200,
        user: responseUser
      })
    }
    else {
      res.json({
        message: "Token is invalid or expired",
        status: 403
      })
    }
  }
  else {
    res.json({
      message: "No token received",
      status: 403
    })
  }
})
/*
router.get('/profile', function (req, res, next) {
  let token = gettoken(req);
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
          }).then(userrecipesFound => {
            console.log(userrecipesFound);
            res.send(JSON.stringify({ userData: userrecipesFound }));
          })
        } else {
          res.status(401);
          res.send('Must be logged in');
        }
      });
  }
});
*/
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
          res.send(JSON.stringify({ userData: usersFound }));
          //res.render('admin', { title: 'ADMIN PAGE', users: usersFound });
        })
      } else {
        res.send("Sorry, you are not authorized to view this page!");
      }
    });
  }
});

router.get('/admin/editUser/:id', function (req, res, next) {
  let UserID = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.users.findOne({
            
            where: {UserId: UserID,
            //include: [{
             // model: models.recipes,
            }//]
          }).then(userrecipesFound => {
            res.send(JSON.stringify({ userData: userrecipesFound }));
            //res.render('editUser', { userData: userrecipesFound });
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
            .then(userdeleted => {
              res.send(JSON.stringify({ UserID } + ' ' + 'was deleted'));
              console.log(userdeleted);
        }) 
      } else {
          res.send("Sorry, there was a problem deleting the user.");
        }
      });
  }
});

function getToken (req ) {
   let token = req.headers [ "authheader" ]
   return token;
}
module.exports = router;
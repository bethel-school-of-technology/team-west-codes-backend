var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
//var passport = require('../services/passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
  res.send('respond with profiles');
});

module.exports = router;

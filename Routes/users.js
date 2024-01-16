const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const {storeReturnTo} = require('../isLogin')
const users = require('../controllers/users')

router.route('/registers')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;
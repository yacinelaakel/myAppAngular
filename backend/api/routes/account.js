const express = require('express');
const router  = express.Router();
const jwt 	  = require('express-jwt');

const authRequired = jwt({
  	secret: process.env.JWT_SECRET_MESSAGE,
  	requestProperty: 'userJwt'
});

const ctrlAccount = require('../controllers/account');

router.post('/login', ctrlAccount.login);

router.post('/register', ctrlAccount.register);

router.post('/facebook', ctrlAccount.facebook);

router.put('/user', authRequired, ctrlAccount.editUser);

router.post('/forgotten-password', ctrlAccount.forgottenPassword);

router.post('/reset-password', ctrlAccount.resetPassword);

module.exports = router;
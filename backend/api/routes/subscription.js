const express = require('express');
const router  = express.Router();
const jwt 	  = require('express-jwt');

const authRequired = jwt({
  	secret: process.env.JWT_SECRET_MESSAGE,
  	userProperty: 'userJwt'
});

const ctrlSub = require('../controllers/subscription');

router.route('/subscribe')
	  .get(authRequired, ctrlSub.getSubscribe)
	  .post(authRequired, ctrlSub.postSubscribe);

router.get('/unsubscribe', authRequired, ctrlSub.unsubscribe);

router.get('/resubscribe', authRequired, ctrlSub.resubscribe);

module.exports = router;
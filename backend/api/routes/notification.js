const express = require('express');
const router  = express.Router();
const webpush = require('web-push');
// const jwt 	  = require('express-jwt');

// const authRequired = jwt({
//   	secret: process.env.JWT_SECRET_MESSAGE,
//   	requestProperty: 'userJwt'
// });

webpush.setVapidDetails(
	'mailto:yacine.laakel@hotmail.fr', 
	process.env.PUBLIC_VAPID, 
	process.env.PRIVATE_VAPID
);

const Notification = require('../models/Notification');

router.post('/subscribe', (req, res) => {
	const subscription = req.body;

	let newNotification = new Notification();
	
	newNotification.subscription = JSON.stringify(subscription);
	newNotification.save((err, notif) => {
		if(err) {
			return res.status(500).send('Erreur de connexion');
		}
		return res.status(200).send(true);
	});
});

// router.get('/unsubscribe');

module.exports = router;
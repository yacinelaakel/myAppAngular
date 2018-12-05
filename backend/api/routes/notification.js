const express = require('express');
const router  = express.Router();

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
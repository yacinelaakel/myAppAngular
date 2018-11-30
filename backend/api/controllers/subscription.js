const stripe 	   = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DateManager  = require('../utils/date_manager');

const Subscription = require('../models/Subscription');

const plans = [
	{
		id: 'plan_E3anYqP7779Vxu', //https://dashboard.stripe.com
		name: 'Classic',
		amount: 3000,
		offers: 80
	},
	{
		id: 'plan_E3bS1gBVh8xQvV', //https://dashboard.stripe.com
		name: 'Pro',
		amount: 4500,
		offers: 120
	}
];

module.exports.getSubscribe = function(req, res) {
	// subscription  = database object
	// subscriptions = stripe object
	Subscription.findOne({user: req.userJwt._id}, (err, subscription) => {
		if(err) {
			return res.status(500).send('Erreur de connexion.');
		}
		if(subscription) {
			stripe.subscriptions.retrieve(subscription.stripe_sub_id, (err, subscriptions) => {
				if(err) {
					return res.status(500).send('Erreur de connexion.');
				}
				if(subscriptions.ended_at) { // user is not subscribed anymore (expired or deleted)
					return res.status(200).send(null);
				}
				const sub_info = { 
					current_period_end: DateManager.timeStampToDate(subscriptions.current_period_end),
					plan_name: subscriptions.plan.nickname,
					cancel_at_period_end: subscriptions.cancel_at_period_end,
					offers: subscription.offers
				};
				return res.status(200).send(sub_info);
			});			
		}
		else {
			return res.status(200).send(null);
		}
	});
}

module.exports.postSubscribe = function(req, res) {
	const { token, amount } = req.body;
	const plan = plans.find(plan => plan.amount === amount);

	Subscription.findOne({user: req.userJwt._id}, (err, subscription) => {
		if(err) {
			return res.status(500).send('Erreur de connexion.');
		}
		if(subscription) {
			// We update existing customer for stripe. NEVER DELETE CUSTOMER ON STRIPE DASHBOARD 
			stripe.customers.update(subscription.customer_id, {
			  	source: token.id
			}, (err, customer) => {
				if(err) {
					return res.status(500).send('Erreur de connexion.');
				}
				// We have to create a new subscription			
				stripe.subscriptions.create({
				  	customer: customer.id,
				  	items: [{plan: plan.id}]
				}, (err, subscriptions) => {
					if(err) {
						return res.status(500).send('Erreur de connexion.');
					}	
					// stripe_sub_id = id of the user's subscription that we store in db
					subscription.stripe_sub_id = subscriptions.id;
					subscription.offers = plan.offers;

					subscription.save((err, subscription) => {
						if(err) {
							return res.status(500).send('Erreur de connexion.');
						}
						const sub_info = { 
							current_period_end: DateManager.timeStampToDate(subscriptions.current_period_end),
							plan_name: subscriptions.plan.nickname,
							cancel_at_period_end: subscriptions.cancel_at_period_end,
							offers: subscription.offers
						};
						return res.status(200).send(sub_info);
					});
				});
			})
		}
		else {
			stripe.customers.create({
			  	email: token.email,
			  	source: token.id
			}, (err, customer) => {
				if(err) {
					return res.status(500).send('Erreur de connexion.');
				}				
				stripe.subscriptions.create({
				  	customer: customer.id,
				  	items: [{plan: plan.id}]
				}, (err, subscriptions) => {
					if(err) {
						return res.status(500).send('Erreur de connexion.');
					}	
					let newSubscription = new Subscription();
					// stripe_sub_id = id of the user's subscription that we store in db
					newSubscription.stripe_sub_id = subscriptions.id;
					newSubscription.customer_id = customer.id;
					newSubscription.user = req.userJwt._id;
					newSubscription.offers = plan.offers;

					newSubscription.save((err, newSubscription) => {
						if(err) {
							return res.status(500).send('Erreur de connexion.');
						}
						const sub_info = { 
							current_period_end: DateManager.timeStampToDate(subscriptions.current_period_end),
							plan_name: subscriptions.plan.nickname,
							cancel_at_period_end: subscriptions.cancel_at_period_end,
							offers: newSubscription.offers
						};
						return res.status(200).send(sub_info);
					});
				});
			});
		}
	});
}

module.exports.unsubscribe = function(req, res) {
	Subscription.findOne({user: req.userJwt._id}, (err, subscription) => {
		if(err) {
			return res.status(500).send('Erreur de connexion.');
		}
		// never happen (normally)
		if(!subscription) {
			return res.status(401).send('Utilisateur sans abonnement.');
		}
		stripe.subscriptions.update(subscription.stripe_sub_id, {cancel_at_period_end: true});
		return res.status(200).send(true);
	});
}

module.exports.resubscribe = function(req, res) {
	Subscription.findOne({user: req.userJwt._id}, (err, subscription) => {
		if(err) {
			return res.status(500).send('Erreur de connexion.');
		}
		// never happen (normally)
		if(!subscription) {
			return res.status(401).send('Utilisateur sans abonnement.');
		}
		stripe.subscriptions.update(subscription.stripe_sub_id, {cancel_at_period_end: false});
		return res.status(200).send(false);
	});
}
const mongoose 		  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema   		  = mongoose.Schema;

const SubscriptionSchema = new Schema({
	stripe_sub_id: String,
	customer_id: String,
	user: { 
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	offers: Number
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
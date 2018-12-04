const mongoose 		  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema   		  = mongoose.Schema;

const NotificationSchema = new Schema({
	subscription: { type: String, required: true }
	// user: { 
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'User',
	// 	required: false
	// },
});

module.exports = mongoose.model('Notification', NotificationSchema);
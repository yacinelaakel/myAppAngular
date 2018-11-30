const mongoose 		  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt   		  = require('bcryptjs');
const jwt 			  = require('jsonwebtoken');
const Schema   		  = mongoose.Schema;

const UserSchema = new Schema({
	firstname: { type: String, trim: true, required: true },
	lastname: { type: String, trim: true, required: true },
    email: { type: String, unique: true, trim: true, required: true },
    password: String,
    // isActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tokenForgottenPassword: { type: String, default : null }
});
UserSchema.plugin(uniqueValidator, { message: '{VALUE} déjà existant.' });

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateJwt = function() {
  	const expiry = new Date();
  	expiry.setDate(expiry.getDate() + 7);

  	return jwt.sign({
    	_id: this._id,
    	firstname: this.firstname,
    	lastname: this.lastname,
    	email: this.email,
    	createdAt: this.createdAt,
    	updatedAt: this.updatedAt,
    	exp: parseInt(expiry.getTime() / 1000),
  	}, process.env.JWT_SECRET_MESSAGE); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', UserSchema);
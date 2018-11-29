const mongoose 		  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt   		  = require('bcryptjs');
const Schema   		  = mongoose.Schema;

const UserSchema = new Schema({
	firstname: String,
	lastname: String,
    email: { type: String, unique: true },
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

module.exports = mongoose.model('User', UserSchema);
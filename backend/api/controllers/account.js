const transporter = require('../utils/mailer');

const User = require('../models/User');

module.exports.login = function(req, res) {
    const { email, password } = req.body;

    User.findOne({email: email}, (err, user) => {
        if(err) { 
            return res.status(500).send('Erreur de connexion.'); 
        }
        if(!user || !user.password) {
            return res.status(401).send('Utilisateur ou mot de passe inexistant.');
        } 
        if(!user.validPassword(password)) {
            return res.status(401).send('Identifiants incorrect.');
        }
        // if(!user.isActive) {
        // 	return res.status(401).send('Compte inactif.');
        // }
        // We send a token (string) that contain all user data encoded
        let token = user.generateJwt();
        return res.status(200).send(token);
    });
}

module.exports.register = function(req, res) {
    let newUser = new User(req.body);
    newUser.password = newUser.generateHash(req.body.password);

    newUser.save((err, newUser) => {
        if(err) { 
            let error = {};
            let field = Object.keys(err.errors)[0];
            let value = err.errors[field].message;
            error[field] = value;
            return res.status(400).send(error[field]); 
        }
        let token = newUser.generateJwt();
        return res.status(200).send(token);
    });
}

// Login OR Register with Facebook
module.exports.facebook = function(req, res) {
	const { email, firstName, lastName } = req.body;

    User.findOne({email: email}, (err, user) => {
        if(err) { 
        	return res.status(500).send('Erreur de connexion');
        }
        if(user) {
	        let token = user.generateJwt();
	        return res.status(200).send(token);
        }
        let newUser = new User();
        newUser.email = email;
        newUser.firstname = firstName;
        newUser.lastname = lastName;

        newUser.save((err, newUser) => {
	        if(err) { 
	            let error = {};
	            let field = Object.keys(err.errors)[0];
	            let value = err.errors[field].message;
	            error[field] = value;
	            return res.status(400).send(error[field]); 
	        }
	        let token = newUser.generateJwt();
	        return res.status(200).send(token);
        });
    });
}

module.exports.editUser = function(req, res) {
	const {
		firstname,
		lastname,
		email
	} = req.body;

	User.findOne({'_id': req.userJwt._id}, (err, user) => {
		if(err) {
			return res.status(500).send('Erreur de connexion');
		}
		if(!user) {
			return res.status(400).send('Utilisateur inexistant');
		}
		user.firstname = firstname;
		user.lastname = lastname;
		user.email = email;
		user.updatedAt = new Date();

		user.save((err, user) => {
			if(err) {
				return res.status(500).send('Erreur de connexion');
			}
	        let token = user.generateJwt();
	        return res.status(200).send(token);
		});
	});
}

module.exports.forgottenPassword = function(req, res) {
	const { email } = req.body;

	User.findOne({email: email}, (err, user) => {
		if(err) {
			return res.status(500).send('Erreur de connexion');
		}
		if(!user) {
			return res.status(400).send('Ce mail ne correspond à aucun compte.');
		}
		let token = new Date().valueOf().toString();
		user.tokenForgottenPassword = token;

		user.save((err, user) => {
			if(err) {
				return res.status(500).send('Erreur de connexion');
			}
			const mailOptions = {
			  	from: 'yacinelaakel@gmail.com',
			  	to: email,
			  	subject: 'Mot de passe oublié - MyAngularApp',
			  	html: '<p>Click <a href="http://localhost:4200/reset-password/' + token + '/' + user._id + '">here</a></p>'
			};
			transporter.sendMail(mailOptions, (err, info) => {
			  	if(err) {
			    	return res.status(500).send('L\'envoi du mail a échoué.');
			  	} 
		  		return res.status(200).send('Un mail a été envoyé à ' + email);
			});
		});
	});
}

module.exports.resetPassword = function(req, res) {
	const { token, user_id, password } = req.body;

	User.findOne({"_id": user_id}, (err, user) => {
		if(err) {
			return res.status(500).send('Erreur de connexion');
		}
		if(!user) {
			return res.status(400).send('Cet id ne correspond à aucun utilisateur.');
		}
		if(user.tokenForgottenPassword != token) {
			return res.status(400).send('Erreur de token');
		}
		user.password = user.generateHash(password);
		user.tokenForgottenPassword = null;

		user.save((err, user) => {
			if(err) {
				return res.status(500).send('Erreur de connexion');
			}
			return res.status(200).send('Mot de passe changé avec succès. Vous pouvez vous connecter à votre compte');
		});
	});
}
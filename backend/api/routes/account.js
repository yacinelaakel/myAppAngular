const express     = require('express');
const router      = express.Router();
const transporter  = require('../utils/mailer');

const User = require('../models/User');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({email: email.trim()}, (err, user) => {
        if(err) { 
            return res.status(500).send('Erreur de connexion.'); 
        }
        if(!user || !user.password) {
            return res.status(401).send('Utilisateur inexistant.');
        } 
        if(!user.validPassword(password)) {
            return res.status(401).send('Identifiants incorrect.');
        }
        // if(!user.isActive) {
        // 	return res.status(401).send('Compte inactif.');
        // }
        return res.status(200).send(user);
    });
});

router.post('/register', (req, res) => {
    const { 
        firstname, 
        lastname,
        email,
        password
    } = req.body;

    let newUser = new User();
    newUser.firstname = firstname.trim();
    newUser.lastname = lastname.trim();
    newUser.email = email.trim();
    newUser.password = newUser.generateHash(password.trim());

    newUser.save((err, newUser) => {
        if(err) { 
            let error = {};
            let field = Object.keys(err.errors)[0];
            let value = err.errors[field].message;
            error[field] = value;
            return res.status(400).send(error[field]); 
        }
        return res.status(200).send(newUser);
    });
});

router.post('/facebook', (req, res) => {
	const { email, firstName, lastName } = req.body;

    User.findOne({email: email}, (err, user) => {
        if(err) { 
        	return res.status(500).send('Erreur de connexion');
        }
        if(user) {
            return res.status(200).send(user);
        }
        let newUser = new User();
        newUser.email = email;
        newUser.firstname = firstName;
        newUser.lastname = lastName;

        newUser.save((err, user) => {
            if (err) { 
            	return res.status(500).send('Erreur de connexion');
            }
            return res.status(200).send(user);
        });
    });
});

router.put('/user', (req, res) => {
	const {
		firstname,
		lastname,
		email,
		user_id
	} = req.body;

	User.findOne({"_id": user_id.trim()}, (err, user) => {
		if(err) {
			return res.status(500).send('Erreur de connexion');
		}
		if(!user) {
			return res.status(400).send('Utilisateur inexistant');
		}
		user.firstname = firstname.trim();
		user.lastname = lastname.trim();
		user.email = email.trim();
		user.updatedAt = new Date();

		user.save((err, user) => {
			if(err) {
				return res.status(500).send('Erreur de connexion');
			}
			return res.status(200).send(user);
		});
	});
});

router.post('/forgotten-password', (req, res) => {
	const { email } = req.body;

	User.findOne({email: email.trim()}, (err, user) => {
		if(err) {
			return res.status(500).send('Erreur de connexion');
		}
		if(!user) {
			return res.status(400).send('Ce mail ne correspond à aucun compte.');
		}
		const token = new Date().valueOf().toString();
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
});

router.post('/reset-password', (req, res) => {
	const { token, user_id, password } = req.body;

	User.findOne({"_id": user_id.trim()}, (err, user) => {
		if(err) {
			return res.status(500).send('Erreur de connexion');
		}
		if(!user) {
			return res.status(400).send('Cet id ne correspond à aucun utilisateur.');
		}
		if(user.tokenForgottenPassword != token) {
			return res.status(400).send('Erreur de token');
		}
		user.password = user.generateHash(password.trim());
		user.tokenForgottenPassword = null;

		user.save((err, user) => {
			if(err) {
				return res.status(500).send('Erreur de connexion');
			}
			return res.status(200).send('Mot de passe changé avec succès. Vous pouvez vous connecter à votre compte');
		});
	});

});


// router.put('/editblogs/:blog', function (req, res) {
//     Blog. findById(req.body.item._id, function (err, blog) {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             blog.title = req.body.item.title || blog.title;
//             blog.content = req.body.item.content || blog.content;
//             blog.tags = req.body.item.tags || blog.tags;
//             blog.save(function (err, blog) {
//                 if (err) {
//                     res.status(500).send(err)
//                 }
//                 res.send(blog);
//             });
//         }
//     });
// });

// router.delete('/:blog_id', (req, res, next) => {
//     Blog.findByIdAndRemove(req.params.blog_id, function(error, blog) {
//         var response = {
//             message: 'Blog post successfully deleted',
//             id: blog.blog_id
//         };
//         Blog.find({}, (err, blog) => {
//             if (err) {console.error(err); return res.sendStatus(500);}
//             res.json(blog)
//         });
//     });
// })

module.exports = router;
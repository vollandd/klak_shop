const User = require('../models/user.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const passwordValidator = require('password-validator');

// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
    .is().min(8,'minimum 8 caractere')                                    // Minimum length 8
    .has().symbols(1,'doit contenir au moins 1 symbol')
    .has().uppercase(1, 'doit contenir au moins 1 majuscule')                              // Must have uppercase letters
    .has().lowercase(1, 'doit contenir au moins 1 minuscule')                              // Must have lowercase letters
    .has().digits(1,'doit contenir au moins 1 chiffre')                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces





exports.login = (req, res, next) =>
{





    // Validate parameters
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({error: 'Invalid parameters'});
    }

    // Search for user with provided username
    User.findOne({email: email}, (err, user) => {
        if (err) {
            return res.status(500).json({error: 'Error searching for user'});
        }
        if (!user) {
            return res.status(400).json({error: 'Invalid username or password'});
        }

        // Compare provided password to hashed password in database
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({error: 'Error comparing passwords'});
            }
            if (!result) {
                return res.status(400).json({error: 'Invalid username or password'});
            }

            // Create JWT
            const token = jwt.sign({userId: user._id}, process.env.PRIVATE_TOKEN, {expiresIn: '1h'});

            // Return JWT to client
            res.send({
                success: true,
                message: 'Vous êtes connecté avec le token',
            });

        });
    });
}

exports.signup = (req, res, next) =>
{
    username = req.body.username;
    password = req.body.password;
    email = req.body.email;

    console.log(username);

    // Validate the sign-up information
    if (!username || !password || !email) {
        return res.status(400).send({ error: 'Tout les champs sont requis' });
    }
    if(!validator.validate(email)){
        return res.status(400).send({error: 'email invalide'})
    }
    if (!schema.validate(password)){
        return res.status(400).send({error: schema.validate(password , { details: true })})

    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Store the user in the database
    const user =new User({
        username: username,
        email: email,
        password: hashedPassword,

    });
    user.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}


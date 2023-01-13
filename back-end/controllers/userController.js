const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const nodeoutlook = require('nodejs-nodemailer-outlook');

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL
  }
});

const schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', 'password', 'Password']); // Blacklist these values

exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, userWithSameEmail) => {
    if (err) {
      res.status(400).json({message: 'Error getting email try gain',});
    } 
    else if (userWithSameEmail) {
      res.status(400).json({ message: 'This email is taken' });
    } 
    else {
      const user = new User({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      streetNumber: req.body.streetNumber,
      streetName: req.body.streetName,
      zipCode: req.body.zipCode
      });

      if (!schema.validate(user.password)) {
        res.status(400).json({message: "format password incorrect"})
      }
      else {
        if(!emailValidator.validate(user.email)){
          res.status(400).json({message: "format email incorrect"})
        }
        else {
          const mailOptions = {
            from: "test@2mn.info",
            to: user.email,
            subject: 'mabrouk',
            text: 'Bravo!!! Vous avez gagné un voyage au maroc tout frais payé pour une semaine!!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            user.save().then( () => {
              res.status(201).json({message: 'User added !'});
            }
            ).catch( (error) => {
              res.status(400).json({error: error});
            });
            });
          });
        }
      }
    }
  });
};


exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyUser = (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    zipCode: req.body.zipCode
  });
  User.updateOne({_id: req.params.id}, user).then(
    () => {
      res.status(201).json({
        message: 'User updated!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllUser = (req, res, next) => {
  User.find().then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: '24h' });
          res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
}

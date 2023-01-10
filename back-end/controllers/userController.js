const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');

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
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
  user.save().then(
    () => {
      res.status(201).json({
        message: 'User added !'
      });
    }
    
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});
});
}
}
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
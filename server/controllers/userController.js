const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

module.exports = {

  signup: function (req,res) {
  
    let dataUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })


    dataUser.save()
      .then((user) => {
        res.status(201).json({
          user,
          message: `signup success`
        })
      }).catch((err) => {
        res.status(404).json({
          err,
          message: `signup failed`
        })
      });

      
  },

  signin: function (req,res) {
  
    User.findOne(
      {email : req.body.email}
    )
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          jwt.sign(
            { userId: user._id,
              statusDel: user.statusDelete },
            process.env.ACCESS_TOKEN,
            function(err, token) {
              if (!err) {
                res.status(201).json({
                  name: user.name,
                  email: user.email,
                  token: token
                });
              } else {
                res.status(500).json({
                  message: `Email and password didn't match`
                });
              }
            }
          );
        } else { 
          res.status(500).json({
            message: "email and password didnt match"
          });
        }
      } else {
        res.status(500).json({
          message: "email and password didnt match"
        });
      }
    }).catch((err) => {
      res.status(404).json({
        err,
        message: `email and password didn't match`
      })  
    });
    

  },

}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name:  {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator(val) {
        var emailRegex = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        if(!emailRegex.test(val)){
          throw new Error('your email is not valid');
        } 
      }
    },
    required: [true, "email is required"]
  },
  password: {
    type: String,
    validate: {
      validator(val) {
        var numstrRegex = new RegExp(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/)
        if(!numstrRegex.test(val)){
          throw new Error('please combine number and string');
        } 
      }
    },
    required: [true, "password is required"],
    minlength: [6, "password minimal 6 character"]
  }
}, {
  timestamps: true
});

userSchema.post("validate", doc => {
  doc.password = bcrypt.hashSync(
    doc.password,
    Number(process.env.SALT_PASSWORD)
  );
});

const User = mongoose.model('User', userSchema);

module.exports = User

const { Schema, model } = require("mongoose");
const { hashPassword } = require("../helpers/bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please input your name"]
    },
    email: {
      type: String,
      required: [true, "please input your email"],
      validate: {
        validator: function(v) {
          return User.findOne({
            email: v
          }).then(response => {
            if (response) {
              return false;
            }
          });
        },
        message: "email already exists"
      },
      //   unique: [true, "email is exits, try another email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "email not valid"
      ]
    },
    password: {
      type: String,
      required: [true, "please input your password"],
      minlength: [6, "password minim 6 characters"]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.pre("save", function(next) {
  this.password = hashPassword(this.password);
  next();
});

const User = model("User", userSchema);

module.exports = User;

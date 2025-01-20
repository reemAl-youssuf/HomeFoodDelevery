const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DB_URL = "mongodb://127.0.0.1/homefooddelivery";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  favoriteDishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dishes",
    },
  ],
});
const User = mongoose.model("user", userSchema);

exports.createNewUser = (username, email, password) => {
  //ckeck if email exists
  //yes ==> error
  //no ==> creat new account
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("الايميل مُستخدم");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        let user = new User({
          username: username,
          email: email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.login = (email, password) => {
  //check for email
  //no ==> error
  //yes ==> check for password
  //no ==>error
  //yes ==> set session
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => User.findOne({ email: email }))
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("الايميل غير موجود");
        } else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("كلمة المرور خاطئة");
            } else {
              //set session
              /// mongoose.disconnect()

              resolve(user._id);
            }
          });
        }
        //})
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.Fav = (userId) => {
  return User.findById(userId); // Use findById with the user ID directly
};

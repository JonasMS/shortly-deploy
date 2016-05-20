var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var hash = function(pass) {
  var cipher = bcrypt.hash;
  return cipher(pass, null, null, function(err, hash) {
    if (err) { return console.error(err); }
    console.log('hash: ', hash);
    return hash;
  });
};


var userSchema = new db.Schema({
  username: String,
  password: String
});

// userSchema.pre('save', function(next) {
//   var cipher = Promise.promisify(bcrypt.hash);
//   console.log(this);



//   return cipher(this.password, null, null).bind(this)
//     .then(function(hash) {
//       this.update( {'password': this.password}, 'password', hash);
//     });
//   next();
// });

var User = db.model('User', userSchema);


// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
  // initialize: function() {
  //   this.on('creating', this.hashPassword);
  // },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
  // hashPassword: function() {
  //   var cipher = Promise.promisify(bcrypt.hash);
  //   return cipher(this.get('password'), null, null).bind(this)
  //     .then(function(hash) {
  //       this.set('password', hash);
  //     });
  // }
// });

module.exports = User;

var path = require('path');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });


var db = require('mongoose');
db.connect('mongodb://localhost/test');

var mo = db.connection;
mo.on('error', console.error.bind(console, 'connection error:'));
mo.once('open', function() {
  console.log('mongo connected');
});

var urlsSchema = new db.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

// urlsSchema.methods.initialize = function() {
//   this.on('creating', function(model, attrs, options) {
//     var shasum = crypto.createHash('sha1');
//     shasum.update(db.get('url'));
//     model.set('code', shasum.digest('hex').slice(0, 5));
//   });
// };



// var User = db.model('User', userSchema);

// var example = new Link({
//   url: '/test',
//   baseUrl: 'example.com',
//   title: 'example',
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   }
// }).save();


// var exampleUser = new User({
//   username: 'jimmy',
//   password: 'jimmy'
// }).save(function (err) {
//   if (err) { return console.error(err); }
// });

module.exports = db;




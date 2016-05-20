var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  console.log('Link: ', Link);
  Link.find({}).exec(function(err, links) {
    console.log('links: ', links);
    res.status(200).send(links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    res.sendStatus(404);
  }

  Link.findOne({ 'url': uri }, function(err, doc) {
    if (err) { res.status(500).send(err); }
    if (doc) {
      res.status(200).send(doc.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.sendStatus(404);
        }
        var newLink = new Link({
          url: uri,
          title: title,
          baseUrl: req.headers.origin,
          visit: 0
        });

        newLink.save(function(err, newLink) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(newLink);
          }
        });
      });
    }
  });
};

//TODO: hash password
exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  
  User.findOne({'username': username}, function(err, doc) {
    if (err) { return console.error(err); }
    if (!doc) {
      res.redirect('/login');
    } else {
      if (password = doc.password) {
        util.createSession(req, res, doc);
      } else {
        res.redirect('/login');
      }
      // doc.comparePassword(password, function())
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  //if username is not taken
  console.log('line 96');
  User.findOne({ 'username': username }, function(err, doc) {
    if (err) { return console.error(err); }
    console.log('doc: ', doc);
    if (!doc) { 
      new User({
        username: username,
        password: password
      }).save(function(err, newUser) {
        if (err) { res.status(500).send(err); }

        util.createSession(req, res, newUser);
      });
    } else {
      res.redirect('/signup');
    }

  });
};

exports.navToLink = function(req, res) {
  // new Link({ code: req.params[0] }).fetch().then(function(link) {
  //   if (!link) {
  //     res.redirect('/');
  //   } else {
  //     link.set({ visits: link.get('visits') + 1 })
  //       .save()
  //       .then(function() {
  //         return res.redirect(link.get('url'));
  //       });
  //   }
  // });
};
const pgp = require('pg-promise')();
const db = pgp('postgres://ceg@localhost:5432/auth_p2');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

var login = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var auth_error = 'Incorrect Email / Password!';

  db.one(
    "SELECT * FROM users WHERE email = $1",
    [email]
  ).catch(function(){
    res.error = auth_error;
    next();
  }).then(function(user){
    bcrypt.compare(
      password,
      user.password_digest,
      function(err, cmp){
        if(cmp){
          req.session.user = {
            'email': user.email,
            'f_name': user.f_name,
            'l_name': user.l_name
          };
          next();
        } else {
          res.error = auth_error;
          next();
        }
      }
    );
  });
};

var logout = function(req, res, next){
  req.session.user = null;
  next()
};

var create_user = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var f_name = req.body.f_name;
  var l_name = req.body.l_name;

  bcrypt.hash(password, 10, function(err, hashed_password){
    db.none(
      "INSERT INTO users (f_name, l_name, email, password_digest) VALUES ($1, $2, $3, $4)",
      [f_name, l_name, email, hashed_password]
    ).catch(function(){
      res.error = 'Error. User could not be created.';
      next();
    }).then(function(user){
      req.session.user = {
        'email': email
      };
      next();
    });
  });
};

var create_book = function(req, res, next){
  console.log(req.body)
  var title = req.body.title;
  var author = req.body.authors;
  var image = req.body.image;
  var user_email = req.body.email;

  db.none(
    "INSERT INTO books (title, author, image, user_email) VALUES ($1, $2, $3, $4)",
    [title, author, image, user_email]
  ).then(function(){
    console.log('created book');
    next();
  }).catch(function(err){
    console.log(err);
    res.error = "whoops";
    next();
  });

}

module.exports = { create_book, login, logout, create_user };

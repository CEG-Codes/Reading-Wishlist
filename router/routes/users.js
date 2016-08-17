const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const pgp = require('pg-promise')();
const db2 = pgp('postgres://ceg@localhost:5432/auth_p2');


router.get('/new', function (req, res) {
  var error = req.flash('error')[0];
  res.render('users/new', { 'error': error });
});

router.post('/create', db.create_user, function (req, res) {
  if(res.error){
    req.flash('error', res.error);
    res.redirect('new');
  } else {
    res.redirect('/');
  }
});

router.get('/:email', function (req, res){
  var userEmail = req.params.email;
  db2.any('SELECT * FROM books WHERE user_email = $1',[userEmail]).then(function(data){
    var userData = {
      favorites : data,
      'email': req.session.user.email,
      'f_name': req.session.user.f_name,
      'l_name': req.session.user.l_name
    }
    res.render('users/favorites', userData)
  });
});



module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const pgp = require('pg-promise')();
const db2 = pgp('postgres://ceg@localhost:5432/auth_p2');
const pry = require('pryjs')

router.post('/create', db.create_book, function (req, res) {
  if(res.error){
    req.flash('error', res.error);
    //res.redirect('new');
  } else {
    res.send("success");
  }
});

router.delete('/delete',function(req,res,next){
  var idtodelete = req.body.id;

  // eval(pry.it)
  db2.none("DELETE FROM books WHERE id = $1",[idtodelete]).then(function(data){
      console.log('delete done!!!!!')
     res.render('users/favorites')
      // next();
    })
})
module.exports = router;

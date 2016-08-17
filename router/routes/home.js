const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
  console.log(req.session.user);
  if(!req.session.user){
    res.redirect('sessions/new');
  } else {
    res.render('index', {
      'email': req.session.user.email,
      'f_name': req.session.user.f_name,
      'l_name': req.session.user.l_name

    });
  }
});

module.exports = router;

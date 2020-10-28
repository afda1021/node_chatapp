const express = require('express');
const session = require('express-session');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('chat_app.sqlite3');
const bcrypt = require('bcrypt');



router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.render('room', {
      userName: req.session.name
    }); 
  } else {
    res.render('login', {
    });
  }
});

router.post('/', function(req, res, next) {
  const user = req.body.name;
  const password =  req.body.password;
  const query = 'SELECT * FROM user WHERE name ="'+user+'"';

  db.get(query, function(err, row){
    const console_return = factor => console.log(factor) || factor
    const check = console_return(row);
    if (check==undefined){
      res.render('login', {
      noUser: 'ユーザー名とパスワードが一致するユーザーはいません'
    });
    }else if(bcrypt.compareSync(password, check.password)){
      req.session.user_id = check.id;
      req.session.name = check.name;
      res.render('room', {
        userName: req.body.name,
        success_login: "ログインに成功しました！"
      });
    }else{
      res.render('login', {
      noUser: 'ユーザー名とパスワードが一致するユーザーはいません'
    });
  }
});
});

module.exports = router;
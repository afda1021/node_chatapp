const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('chat_app.sqlite3');
const bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
  res.render('register', {
    title: '新規会員登録'
  });
});


router.post('/', function(req, res, next) {
  const user = req.body.user_name;
  const email = req.body.email;
  const password =  bcrypt.hashSync(req.body.password, 10);
  
  db.get("select * from user where name='"+user+"' or email='"+email+"'", function(err, row){
    // console.logに戻り値を持たせる
    const console_return = factor => console.log(factor) || factor
    //　入力データと比較するための変数を定義
    const check = console_return(row);

    // もし、入力データがDB内に含まれていないなら情報を追記する
    if (check==undefined){
      db.run("INSERT INTO user(name, email, password) VALUES('"+user+"', '"+email+"', '"+password+"')");
      res.render('login', {
        success_register: "ユーザー登録が完了しました"
      });
    // 入力データがDBないに含まれている場合には、ユーザーに知らせる
    }else if(check.name==user && check.email==email){
      res.render('register', {
        nameExists: "（" +user+" は既に登録されているユーザー名です）",
        emailExists: "（" +email+" は既に登録されているメールアドレスです）"
      });
    }else if(check.name==user){
      res.render('register', {
        nameExists: "（" +user+" は既に登録されているユーザー名です）"
      });
    }else if(check.email==email){
      res.render('register', {
        emailExists: "（" +email+" は既に登録されているメールアドレスです）"
      });
    }
  });
});
module.exports = router;
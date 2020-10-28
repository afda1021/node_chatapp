//　データベース周りの処理

const mysql = require('mysql');

// データベースの定義
const dbConfig ={
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'chat_app'
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
//const table_name = "User";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('chat_app.sqlite3');

//db.run("insert into User values('user', 'user@user', 'user')");

//db.close();



// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('chat_app.sqlite3');
// db.get("select name from user where password='rakus' and email='rakus@rakus' ", function(err, row){
//     const a = e => console.log(e) || e
//     const c = a(row);
//     console.log(c);
//     if (c==undefined){
//         console.log("c:");
//         console.log(c);
//         console.log("row:");
//         console.log(row);
//         console.log("true");
//     }else if(c.name=="user" || c.email=="rakus@rakus"){
//         console.log("c:");
//         console.log(c["name"]);
//         console.log("row:");
//         console.log(row);
//         console.log("false");
//     }
// });

const query = "SELECT id FROM user WHERE name ='rakus' LIMIT 1";

db.get(query, function(err, row){
    const a = e => console.log(e) || e
    const c = a(row);
    const c2 = row;
    console.log("c2")
    console.log(c2)
    console.log(c);
    if (c==undefined) {
        console.log("c:");
        console.log(c);
        console.log("row:");
        console.log(row);
        console.log("メールアドレスとパスワードが一致するユーザーはいません");
    } else {
        console.log("c:");
        console.log(c);
        console.log("row:");
        console.log(row);
        console.log("true");
    }
});

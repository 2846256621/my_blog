//简单的封装sql
let db  = {};
const mysql = require('mysql');
let pool = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'yu15353308064.',
    database : 'blog'
});

// db.query = function(sql, callback){
//
//     if (!sql) {
//         callback();
//         return;
//     }
//     pool.query(sql, function(err, rows, fields) {
//         if (err) {
//             console.log(err);
//             callback(err, null);
//             return;
//         }
//
//         callback(null, rows, fields);
//     });
// };
// module.exports = db;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const showdown = require('showdown');
const fs =require('fs');
const mysql = require('mysql');

let connection= mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ',,,,,,,,,',
    database : 'blog'
});
connection.connect();

let marked = require('marked');

// 同步使用 highlight.js 转换代码
marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
});

app.use('/public/',express.static('./public'));
app.use('/views/',express.static('./views'));

app.engine('html',require('express-art-template'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function (req,res) {
    let sql = 'select * from article';  //查询
    connection.query(sql,[],function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        for(var i =0;i<result.length;i++){
            result[i].date =  timestampToTime(Date.parse( result[i].date));
        }
        res.render('home.html',{
            data: result
        });
    });

});

app.get('/about',function (req,res) {
    res.render('about.html');
});
app.get('/files',function (req,res) {
    let sql = "select * from article where date between '2018-01-01' and '2018-12-30'";
    let result1 ,result2;
    connection.query(sql,[],function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        result1 = result;
    });

    let sql2 = "select * from article where date between '2019-01-01' and '2019-12-30'";
    connection.query(sql2,[],function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        result2 = result;
        res.render('files.html',{
            data: result1,
            data1:result2
        });
    });



});
app.get('/message',function (req,res) {

    connection.query('select  * from comment order by comment_id desc ',[],function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR]',err.message);
            return;
        }
        res.render('message.html',{
            data: result
        });
    });
});
//将提交的留言添加到数据库
app.post('/message',function (req,res) {
    console.log(req.body);
    let data = req.body;
    let  addSql = 'insert into comment(username,content,date,froms,comment_id,headimg) VALUES(?,?,?,?,0,?)';
    let  addSqlParams = [data.username,data.content,data.date,'来自windows 10','https://upload.jianshu.io/users/upload_avatars/2558050/7761b285-2805-4534-9870-ba7dcc7538ec.jpg?imag'];
    connection.query(addSql,addSqlParams,function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR]',err.message);
            return result;
        }
        res.redirect('/message');
    });
});
app.get('/add',function (req,res) {
    res.render('add.html');
});
app.post('/add',function (req,res) {
    let data = req.body;
    let  addSql = 'insert into article(title,content,date) VALUES(?,?,?)';
    let  addSqlParams = [data.title,data.content,new Date().toLocaleString()];
    connection.query(addSql,addSqlParams,function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR]',err.message);
            return result;
        }
        res.redirect('/');
    });
});


///TODO  先点击阅读全文 请求数据 然后将数据修改成 innerHtml 然后在请求渲染页面 本地存储数据  再手动渲染到页面
app.get('/view',function (req,res) {
    let sql = 'select title,content from article where id='+req.query.id;
    connection.query(sql,function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR]',err.message);
            return;
        }
        // let converter = new showdown.Converter();
        // let title = converter.makeHtml(result[0].title);
        // let content = converter.makeHtml(result[0].content);
        // console.log( typeof  title, typeof content);
        res.render('view.html',{
             title: result[0].title,
             content: result[0].content
        });
    });
});
//删除文章
app.get('/delete',function (req,res) {
    let sql = 'delete from article where id='+req.query.id;
    connection.query(sql,[],function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR]',err.message);
            return;
        }
        res.redirect('/');
    });
});

//修改文章
app.get('/modify',function (req,res) {
   let sql = 'select* from article where id='+ req.query.id;
    connection.query(sql,[],function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR]',err.message);
            return;
        }
        res.render('modify.html',{
            data:result
        });
    });
});
app.post('/modify',function (req,res) {
    let modSql = 'UPDATE article SET title= ?,content= ? WHERE id = ?';
    let modSqlParams = [req.body.title, req.body.content,parseInt(req.body.id)];
    connection.query(modSql,modSqlParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] ',err.message);
            return;
        }
        res.redirect('/');
    });
});


//搜索
app.get('/search',function (req,res) {

    let sql = `select* from article where title='${req.query.search}'`;
    console.log(sql);
    connection.query(sql,[],function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR]',err.message);
            return;
        }
        console.log(result);
        res.render('view.html',{
            title: req.query.search,
            content: result[0].content
        });
    });
});
app.listen(9090,function () {
    console.log("http://localhost:9090");
});

function timestampToTime(timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    return Y+M+D;
}

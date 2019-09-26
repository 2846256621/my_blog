let http = require("http");
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let url = require('url');
let template = require('art-template');
let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'yu15353308064.',
    database : 'blog'
});
connection.connect();  //连接数据库

http.createServer(function (req,res) {
    req.url = req.url.toLowerCase();
    req.method = req.method.toLowerCase();
    /*TODO  数据库查询所有数据 渲染到 模板中*/
   if(req.url === '/' || req.url === '/home.html'&& req.method === 'GET'){  //模板渲染
        fs.readFile(path.join(__dirname,'views','home.html'),function (err,html) {
            if(err){
               throw  err;
            }
            else{
                let sql = 'select * from article';  //查询
                connection.query(sql,function (err, result) {
                    if(err){
                        console.log('[SELECT ERROR] - ',err.message);
                        return;
                    }
                    let rest = template.render(html.toString(),{
                        data: result
                    });
                    res.end(rest);

                });
            }
        })
   }
   /*TODO  得到url里的id  然后去数据库进行查询到内容 渲染到 模板中*/
   else if(req.url.startsWith('/view') && req.method === 'GET'){
       let urlObj = url.parse(req.url,true);
       console.log(urlObj.query);
       fs.readFile(path.join(__dirname,'views','view.html'),function (err,data) {
           if(err){
               throw  err;
           }
           else{
               let sql = 'select * from article where id='+urlObj.query.id;
               connection.query(sql,function (err, result) {
                   if(err){
                       console.log('[SELECT ERROR] - ',err.message);
                       return;
                   }
                   let rest = template.render(html.toString(),{
                       data: result
                   });
                   res.end(rest);

               });
           }
       })
   }

   /*TODO  按时间 对文章 进行分类，然后每组 渲染到模板中*/
   else if(req.url === "/files.html" && req.method === 'GET'){
       fs.readFile(path.join(__dirname,'views','files.html'),function (err,html) {
           if(err){
               throw  err;
           }
           else{
               let sql = 'select title,tag from article group by date ';
               connection.query(sql,function (err, result) {
                   if(err){
                       console.log('[SELECT ERROR] - ',err.message);
                       return;
                   }
                   let rest = template.render(html.toString(),{
                       data: result
                   });
                   res.end(rest);
               });
           }
       })
   }
   /*TODO 不需要进行数据查询  但是 表单内容得提交  存储到数据库*/
   else if(req.url === '/about.html' ){
       fs.readFile(path.join(__dirname,'views','about.html'),function (err,data) {
           if(err){
               throw  err;
           }
           res.end(data);
       })
   }
   else if(req.url === '/message.html' ){
       fs.readFile(path.join(__dirname,'views','message.html'),function (err,html) {
           if(err){
               throw  err;
           }
           else{
               //得到留言内容
               connection.query('select * from comment',function (err, result) {
                   if(err){
                       console.log('[SELECT ERROR]',err.message);
                       return;
                   }
                   let rest = template.render(html.toString(),{
                       data: result
                   });
                   res.end(rest);
               });
           }
       })
   }
   /*TODO 进行数据查询  查询 每组标签及其对应的文章   分组存*/
   else if(req.url === '/sort.html' ){
       fs.readFile(path.join(__dirname,'views','sort.html'),function (err,html) {
           if(err){
               throw  err;
           }

           else{
               //得到标签
               connection.query('select distinct tag from article',function (err, result) {
                   if(err){
                       console.log('[SELECT ERROR]',err.message);
                       return;
                   }
                   let rest = template.render(html.toString(),{
                       data: result
                   });
                   res.end(rest);
               });
           }
       })
   }
   else if(req.url.startsWith('/public') ){
     fs.readFile(path.join(__dirname ,req.url),function (err,data) {
         if(err){
             throw err;
         }
         res.setHeader('Content-Type',mime.getType(req.url));
         res.end(data);
     })
   }

   else{
      res.writeHead(404,'Not Found',{
         'Content-Type':'text/html;charset=utf-8'
      });
      res.end('404,Not Found Page');
   }
}).listen(8080,function () {
   console.log("http://localhost:8080");
});





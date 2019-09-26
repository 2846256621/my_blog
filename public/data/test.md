####1.什么是express？
>[Express](http://www.expressjs.com.cn/)是基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架
####2.有什么好处呢？
> - 易上手：nodejs最初就是为了开发高性能web服务器而被设计出来的，然而相对底层的API会让不少新手望而却步。express对web开发相关的模块进行了适度的封装，屏蔽了大量复杂繁琐的技术细节，让开发者只需要专注于业务逻辑的开发，极大的降低了入门和学习的成本。
>- 高性能：express仅在web应用相关的nodejs模块上进行了适度的封装和扩展，较大程度避免了过度封装导致的性能损耗。
>- 扩展性强：基于中间件的开发模式，使得express应用的扩展、模块拆分非常简单，既灵活，扩展性又强。

##3.express怎么用呢？
+ #### **1. 安装**
 ``` npm install express --save ```
+ #### **2 .项目目录结构**
  - 项目目录清晰很重要，会使操作变得简单很多。
  - express应用的核心概念主要包括：路由、中间件、模板引擎
.
├── `app.js`    # 应用的主入口
├── `bin`  # 启动脚本
├── `node_modules` # 依赖的模块
├──` package.json` # node模块的配置文件
├── `public` # 静态资源，如css、js、img等存放的目录
├── `routes` # 路由规则存放的目录
└──` views `# 模板文件存放的目录
---------------------
+ #### **3. 引入express模块搭建服务器**
```
const express = require("express"); //引入模块

(创建服务器 相当于 http.createServer)
const app = express();

当服务器收到 get/post 请求时  app.get()  相当于一次次 判断
 ( res.end()  send的好处是 能够自动设置mime类型）

app.get('/',function (req,res) {
    res.send();
});
app.get('/test',function (req,res) {

});
app.post'/test',function (req,res){

});
//相当于http.listen 监听
app.listen(8080,function () {
    console.log("http://localhost:8080");
});
```
>很显然这比基础学习的node路由判断，很多个 if-else 简单很多，看起来也很明了。
其次不需要判断资源的加载的类型，res.send() 能够自动设置mime类型

- ####**4. 资源开放**

- **指定开放目录**
指定开放的目录，即可访问此目录下的所有文件。
公开目录的三种方式：
1.可以访问此目录下的文件资源  , 即 http://localhost:3030/static/home.html
```app.use('/static/',express.static('./static'));  ---> 用的多```

  2.当没有第一个参数时，访问时也要删除第一个参数 , 即 http://localhost:3030/home.html
 ```app.use(express.static('./static'));```

  3.可以给目录起别名 即 http://localhost:3030/public/home.html    即 static 的别名是 public
 ```app.use('/public/',express.static('./static'));```

- ####**5. 数据交互**
 前端ajax发送的数据可以直接是个JSON对象，或者直接发送个数字，字符串，都可以，**无需以字符串形式接收或者发送数据，但发送对象，后台接收的键值中 键的值是字符串**。
- **4.1 get 请求**
```
app.get('/',function (req,res) {
    console.log(req.query);  //得到get请求发送的数据  req.query
    res.send("ok");
});

```
> get 请求的参数可以直接由 `req.query` 获得，得到的是一个JSON对象。

- **4.2 post 请求**
post请求有点复杂，得引入 第三方包 **body-parser**

 * 安装 ```npm install body-parser```
 * 配置
```
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
```
  * 引入第三方包 ```const bodyParser = require('body-parser');```
> 引入第三方包，req也多了一个属性，通过`req.body`就可得到post请求发送的数据,得到的也是一个JSON对象

```
app.post('/',function (req,res) {
   console.log(req.body);
    res.send("ok");
});
```
- **4.3 后台响应数据**

> 后台响应数据 通过 `res.send()`即可，参数是JSON对象即可。

- ####**6. 重定向**
```  res.redirect('/'); ```

----
下面可以看一个简单的小demo
 ```
后台 代码
let express = require("express");
const bodyParser = require('body-parser');
let app = express();
app.use('/public/',express.static('./public'));  //公开资源目录
app.use('/views/',express.static('./views')); //公开html文件目录
let datas = [
    {
        "name":"小仙女",
        "content":"你好哇，我是第一次来到这里"
    },{
        "name":"我的新留言",
        "content":"像梦一样，像梦一样自由"
    }];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
(post 方式)
app.post('/add',function (req,res) {
    let rest = req.body; //得到前台post传过来的数据
    datas.unshift(rest); //加入到datas JSON数组里

    let data = {title:'post方式'};
    res.send(data); //后台返回数据
    res.redirect('/'); //重定向

});
(get 方式)
app.get('/add',function (req,res) {
    let rest = req.query; //前台get传过来的数据
    datas.unshift(rest); //加入到datas JSON数组里

    let data = {title:'get方式'};
    res.send(data) ;//后台返回数据 json
    res.redirect('/'); //重定向
});
app.listen(8080,function () {
    console.log("http://localhost:8080");
});


前端 ajax
 $.ajax({
            type:'POST',
            url:'/add',
            dataType:'json',
            data:{
                name:"你好",
                content:"hello,express!"
            },
            success:function (data) {
                console.log(data); //后台响应的数据
                window.location.href ="http://localhost:8080/"; //前端页面重定向
            }
        })

```

----
express的基本使用就是这样啦，下次会讲深入的使用。会更加清晰的讲解它的三个核心概念：路由、中间件、模板引擎



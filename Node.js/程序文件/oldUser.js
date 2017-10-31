
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var express = require('express');
var router = express.Router();
//var Post=require('../models/post');

/* GET users listing. */
router.get('/:uid', function(req, res, next) {
  if(req.session.user.name!=req.params.uid)  {
      req.session.message="用户不存在";
      return res.redirect('/');
  }
  //Post.find({user:req.params.uid},function(err,posts){
  //    if(err){
  //        req.session.message=err.message;
  //        return res.redirect('/');
  //    }
  //    res.render('user',{
  //        title:"发表文章",
  //        username:req.params.uid,
  //        posts:posts
  //    });
  //});

});

/* GET login page. */
router.route("/login").get(function (req, res) {//到达此路径则渲染login文件，并传出title值供 login.html使用
    res.render("login", { title: '用户登录', result: rsNum });
}).post(function (req, res) {                        // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    //var User = global.dbHandel.getModel('users');
    var uname = req.body.username;                //获取post上来的 data数据中 uname的值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.findOne({ name: uname }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
        if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
            //res.send(500 + " Network Error!");
            req.session.error = '网络异常错误！';
            console.log(err);
            rsNum = 500;//500代表异常错误
            res.redirect("/login");
        } else if (!doc) {                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在！';
            //res.send(404 + "Customer is null!"); 
            rsNum = 404;//    状态码返回404
            res.redirect("/login");
        } else {
            if (password != doc.pwd) {     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.session.error = "密码错误！";
                //res.send(404 + "Pawssord is error!");
                rsNum = 404;
                res.redirect("/login");
            } else {                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息
                rsNum = 200;
                res.redirect("/home");
            }
        }
    });
});

/* GET register page. */
router.route("/reg").get(function (req, res) {    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("reg", { title: '用户注册', result: rsNum });
}).post(function (req, res) {
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    //console.log("开始判断！");
    //var User = global.dbHandel.getModel('users');
    var uname = req.body.username;//获取页面表单信息
    var inpwd = req.body.password;
    var repwd = req.body.passwordconf;
    var uintro = req.body.intro;
    var md5 = crypto.createHash('md5');
    var upwd = md5.update(inpwd).digest('base64');
    //console.log("判断密码是否一致！");
    if (inpwd != repwd) {
        req.session.error = "两次密码不一致";
        rsNum = 404;
        return res.redirect('/reg');
    }

    var newUser = new User({
        name: uname,
        pwd: upwd,
        introinfo: uintro
    });
    //console.log("判断账户是否存在！");
    User.findOne({ name: uname }, function (err, doc) {   // 同理 /login 路径的处理方式
        if (err) {
            //res.send(500 + " Network Error!");
            rsNum = 500;
            req.session.error = '网络异常错误！';
            console.log(err + "网络异常错误！");

            res.redirect('/reg');
        } else if (doc) {
            rsNum = 300;
            req.session.error = "<script>alert('用户名已存在！')</script>";//'用户名已存在！';
            //res.send(500 + " Customer already existence!");

            console.log("用户名已存在！");
            res.redirect('/reg');

        } else {
            //User.create({
            //    name: uname,
            //    pwd:upwd
            //}, 
            newUser.save(function (err) {
                if (err) {
                    //res.send(500 + " Insert data fail!");
                    rsNum = 500;
                    req.session.error = "<script>alert('插入数据失败！')</script>";//err.message;
                    console.log(err + "插入数据失败！");

                    res.redirect('/reg');

                } else {
                    rsNum = 200;
                    req.session.user = newUser;
                    req.session.success = "<script>alert('注册成功！')</script>";//"注册成功";
                    //res.send(200 + " Register success!");                    
                    res.redirect('/');
                    console.log("用户创建成功！");
                }
            });
        }
    });

});

/* GET home page. */
router.get("/home", function (req, res) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    res.render("home", { title: '主页信息', result: rsNum });         //已登录则渲染home页面
});

/* GET user page. */
var content = "123";
router.route("/user").get(function (req, res) {    // 从home页面跳转到user页面，发表个人动态信息
    res.render("user", { title: '个人主页', obj: content });//页面显示,html渲染
}).post(function (req, res) {
    //获取当前用户
    var currUser = req.session.user;
    debugger;
    //var artic = req.body.article;//获取页面表单信息    
    var uname = currUser.name;

    Article.find({ name: uname }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
        if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
            //res.send(500 + " Network Error!");
            req.session.error = '网络异常错误！';
            content = "网络异常错误";
            rsNum = 500;//500代表异常错误
            res.redirect("/home");
        } else if (!doc) {                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在！';
            //res.send(404 + "Customer is null!"); 
            rsNum = 404;//    状态码返回404
            content = "用户名不存在";
            res.redirect("/login");
        } else {
            //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
            req.session.article = doc;
            console.log(doc);
            content = doc;
            //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息
            rsNum = 200;
            res.redirect("/home");
        }
    });
});


/* GET logout page. */
router.get("/logout", function (req, res) {    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});

/* GET articles page. */
router.route("/articles").get(function (req, res) {    // 从home页面跳转到user页面，发表个人动态信息
    res.render("articles", { title: 'User articles', result: rsNum });//页面显示,html渲染
}).post(function (req, res) {
    //var Articles = global.dbHandel.getModel('articles');
    //获取当前用户
    var currUser = req.session.user
    var article = req.body.article;//获取页面表单信息    
    var uname = currUser.name;

    var activity = new Article({
        name: currUser.name,
        content: article,
        updateTime: getTime(new Date())
    });

    //Articles.create({
    //    name: currUser.name,
    //    content: req.body.article,
    //    updateTime: getTime(new Date())

    //}, 
    activity.save(function (err) {
        if (err) {
            req.session.message = err.message;
            rsNum = 500;
            return res.redirect('/articles');
        } else {
            req.session.success = "发表成功";
            rsNum = 200;
            res.redirect('/user');
        }
    });
});
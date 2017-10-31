var express = require('express');

var Article = require('../models/article');


module.exports = function (app) {
    /* GET articles page. */
   
    var str = ""; 
    
    app.get("/details/:id", function (req, res) {
        var atcId = req.query.id; //获取查询参数id的值
         
        //var artic = req.body.article;//获取页面表单信息    
         
        Article.find({ _id: atcId }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
            if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
                //res.send(500 + " Network Error!");
                req.session.error = '网络异常错误！';
                rs = "网络异常错误";
                res.redirect("/home");
            } else if (!doc) {                                 //查询不到用户名匹配信息，则用户名不存在
                req.session.error = '用户名不存在！';
                //res.send(404 + "Customer is null!");  
                rs = "用户名不存在";
                res.redirect("/login");
            } else {
                if (doc == "" || doc == null) {
                    rs = "该用户还没有发表过文章哦~";
                    console.log(rs);
                }
                else {
                    //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
                    rs = "";
                    req.session.article = doc;
                    console.log("user中article 的session：" + req.session.article);

                    str = req.session.article;//JSON.stringify(doc);
                    //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息 
                }
            }
            res.render("article", { title: '发表文章', articleDetails: str });//页面显示,html渲染
        });

    }); 
   
    function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登入');
            return res.redirect('/login');
        }
        next();
    }
    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登入');
            return res.redirect('/');
        }
        next();
    }

};

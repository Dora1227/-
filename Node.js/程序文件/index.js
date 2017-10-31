var express = require('express');
var router = express.Router();
//引入路由控制功能模块
var users = require('./users');
var articles = require('./articles');

//引入模型类
var Article = require('../models/article');

//var jsdom = require("jsdom");
//var window = jsdom.jsdom().defaultView;
//var $ = require('jquery')(window);
//var db = require('../db');
//var User = require('../models/user');
//var Post = require('../models/post');

/* GET home page. */
//router.route("/").get(function (req, res, next) {
//    res.render('index', { title: 'Express首页' });
//});
//    .post(function (req, res) {

//    Article.findOne({ name: 'Joke' }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
//        console.lo("12333333");
//        if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
//            res.send(500 + " Network Error!");
//            req.session.error = '网络异常错误！';
//            content = "网络异常错误";
//            rsNum = 500;//500代表异常错误
//            //res.redirect("/");
//        } else if (!doc) {  //查询不到用户名匹配信息，则用户名不存在
//            req.session.error = '用户名不存在！';
//            res.send(404 + "Customer is null!"); 
//            rsNum = 404;//    状态码返回404
//            content = "用户名不存在";
//            //res.redirect("/login");
//        } else {
//            //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
//            req.session.article = doc;
//            console.log(doc);
//            content = doc;
//            //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息
//            rsNum = 200;
//            //res.redirect("/home");
//            res.render('index', {"content":doc });
//        }

//    })
//});

//module.exports = function (app) {
//    require('./users')(app);
//};
//router.route('/login').get(function (req, res) {
//    res.render('/users', {title:""});
//})

//var username = [];
//router.route('/list').get(function (req, res) {
//    res.render('list', {
//        title: "List",
//        items: username //[2017, 'Node.js', 'Express.js', 'MongoDB']
//    });
//}).post(function (req, res) {
//        User.find(function (err, doc) {
//            if (err) {
//                rsNum = 500;
//                req.session.error = '网络异常错误！';
//                console.log(err + "网络异常错误！");

//                res.redirect('/reg');
//            }
//            else {
//                username.push(doc);
//            }
//        })

//    });


module.exports = function (app) {
    var rs = "";
    var str = "";
    var userinfo = "";
    var userrs = "";
    var dfindex = 0;

    app.get('/', function (req, res) {
        //判断用户是否登录，登录则显示当前用户信息
        if (req.session.user) {
            var currUser = req.session.user;
            var uname = currUser.name;

            Article.find({ name: uname }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
                if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
                    //res.send(500 + " Network Error!");
                    req.session.error = '网络异常错误！';
                    userrs = "网络异常错误";
                    // res.redirect("/home");

                } else if (!doc) {                                 //查询不到用户名匹配信息，则用户名不存在
                    req.session.error = '用户名不存在！';
                    //res.send(404 + "Customer is null!");  
                    userrs = "用户名不存在！";
                    res.redirect("/login");
                } else {
                    if (doc == "" || doc == null) {
                        userrs = "该用户还没有发表过文章哦~";
                        console.log(userinfo);
                    }
                        //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
                    else {
                        userrs = "";
                        req.session.article = doc;
                        console.log("user中article 的session：" + req.session.article);
                        userinfo = req.session.article;//JSON.stringify(doc);
                        //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息 
                    }
                }
                // res.render("index", { title: '主页信息', articles: str, personrs: rs, contList: userinfo });//页面显示,html渲染
            });
        }
        //首页默认加载所有文章中的前六条文章信息
        Article.find(function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
            if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
                //res.send(500 + " Network Error!");
                req.session.error = '网络异常错误！';
                rs = "网络异常错误";
                res.redirect("/");
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
                    console.log("首页中article 的session：" + req.session.article);

                    str = req.session.article;//JSON.stringify(doc);
                    //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息 
                }
            }
            res.render("index", { title: 'Express.js首页', articles: str, result: rs, contList: userinfo, personrs: userrs });//页面显示,html渲染
        }).limit(6).sort({ _id: -1 });
        //根据上传时间序，查找   
    });

    app.post('/searchPage', function (req, res) {
        var words = req.body.keywords;
        var pageSize = req.query.pageSize;
        var currentIndex = req.query.recordIndex;
        // var urlIndex = parseInt(req.query.recordIndex);
        var moreData = "";
        //req.session.searchrs = null;//清除之前的搜寻结果缓存  
        if (words != "undefined" && words != "" && words != null) {
            Article.find({ $or: [{ artcTitle: new RegExp(words) }, { content: new RegExp(words) }] }, function (err, doc) {
                if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
                    //res.send(500 + " Network Error!");
                    req.session.error = '网络异常错误！' + err;
                    rs = "网络异常错误！" + err;
                    // res.redirect("/");
                } else if (doc == "" || doc == null) {                                 //查询不到用户名匹配信息，则用户名不存在
                    req.session.error = '查询的信息不存在！';
                    req.session.counts = 0;
                    rs = "查询的信息不存在!";
                    //res.redirect("/");  
                } else {
                    req.session.counts = doc.length;
                    console.log("统计条目数：" + req.session.counts); 
                }
                 
            });
        }

        if (pageSize == "" || pageSize == null || pageSize == "undefined") {
            pageSize = 3;
        }
         
        if (currentIndex == "" || currentIndex == null || currentIndex == "undefined") {
            currentIndex = 0;
        }
        console.log("接收ajax的参数值：" + pageSize + "，" + currentIndex + "，关键字信息：" + words);
        if (currentIndex == 0) {
            dfindex = 3;
        } else
        {
            dfindex = currentIndex;
        }
        
        //判断首页是否有传值，如果没有传值，则判断在搜索页面的search方法
        if (words == "undefined" || words == "" || words == null) {
            words = req.body.keywords;//根据标签的name获取信息
        }

        if (words != "undefined" && words != "" && words != null) {
            Article.find({ $or: [{ artcTitle: new RegExp(words) }, { content: new RegExp(words) }] }, function (err, doc) {
                if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误 
                    req.session.error = '网络异常错误！' + err;
                    rs = "网络异常错误！" + err;
                    // res.redirect("/");
                } else if (doc == "" || doc == null) {                                 //查询不到用户名匹配信息，则用户名不存在
                    req.session.error = '查询的信息不存在！';
                    req.session.counts = 0;
                    rs = "查询的信息不存在!";
                } else {
                    //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
                    rs = "";
                    req.session.searchrs = doc;
                    console.log("搜索_查询结果：" + req.session.searchrs);
                    //dfindex = 0;
                    str = req.session.searchrs;//JSON.stringify(doc);
                    console.log("搜索_总记录数：" + req.session.counts);
                    //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息  
                }
                res.render("searchPage", { title: words + "_页面搜索", contList: str, loadList: moreData, result: rs, keywords: words, pageIndex: dfindex, allTotal: req.session.counts });//页面显示,html渲染
                console.log("加载更多数据2：" + moreData);
            }).sort({ _id: -1 }).skip(currentIndex).limit(pageSize);
        }
        else {
            Article.find(function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
                if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误 
                    req.session.error = '网络异常错误！' + err;
                    rs = "网络异常错误！" + err;
                    res.redirect("/");
                } else if (doc == "" || doc == null) {                                 //查询不到用户名匹配信息，则用户名不存在
                    req.session.error = '查询信息不存在！';
                    req.session.counts = 0;
                    rs = "查询信息不存在！";
                    res.redirect("/");
                } else {
                    //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
                    rs = "";
                    req.session.article = doc;
                    console.log("搜索页面中article 的session：" + req.session.article);
                    req.session.counts = 0;
                    str = req.session.article;//JSON.stringify(doc);
                    //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息  
                }
                res.render("searchPage", { title: "页面搜索", contList: str, result: rs, loadList: moreData, keywords: words, pageIndex: dfindex, allTotal: req.session.counts });//页面显示,html渲染
                console.log("加载更多数据2-2：" + moreData);
            }).sort({ _id: -1 }).skip(currentIndex).limit(pageSize);

            console.log("查询条件为空！" + words);
        }
        // res.render('searchPage', { title: words +"_页面搜索",contList:str,result:rs});
    });

    //计算搜索结果总数
    app.get('/searchPage', function (req, res, next) {
        var words = req.query.keywords;
        if (words != "undefined" && words != "" && words != null) {
            Article.find({ $or: [{ artcTitle: new RegExp(words) }, { content: new RegExp(words) }] }, function (err, doc) {
                if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误 
                    req.session.error = '网络异常错误！' + err;
                    rs = "网络异常错误！" + err;
                } else if (doc == "" || doc == null) {                                 //查询不到用户名匹配信息，则用户名不存在
                    req.session.error = '查询的信息不存在！';
                    req.session.counts = 0;
                    rs = "查询的信息不存在!";
                } else {
                    req.session.counts = doc.length;
                    console.log("统计条目数：" + req.session.counts);
                }
                
            });
        }
        next();
    });

    //首页搜索跳转的搜索页面
    app.get('/searchPage', function (req, res, next) {
        var words = req.query.keywords;
        var page = req.query.pageSize;
        var moreData = "";
        console.log("判断是首页还是加载更多：首页跳转的查询条件：" + words + "，页码：" + page);

        //req.session.searchrs = null;//清除之前的搜寻结果缓存 

        if (page == "" || page == null) {//说明是“点击加载更多”事件
            if (words != "undefined" && words != "" && words != null) {
                //{ $or: [{ artcTitle: /words/ }, { content: /words/ }] }
                Article.find({ $or: [{ artcTitle: new RegExp(words) }, { content: new RegExp(words) }] }, function (err, doc) {
                    if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
                        //res.send(500 + " Network Error!");
                        req.session.error = '网络异常错误！' + err;
                        rs = "网络异常错误！" + err;
                        // res.redirect("/");
                    } else if (doc == "" || doc == null) {                                 //查询不到用户名匹配信息，则用户名不存在
                        req.session.error = '首页跳转的查询的信息不存在！';
                        req.session.counts = 0;
                        rs = "首页跳转的查询的信息不存在!";
                        //res.redirect("/");  
                    } else {
                        //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
                        rs = "";
                        req.session.searchrs = doc;
                        console.log("首页中搜索的结果：" + req.session.searchrs);
                        dfindex = 3;
                        str = req.session.searchrs;//JSON.stringify(doc);
                        //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息 
                    }
                    res.render("searchPage", { title: words + "_页面搜索", contList: str, loadList: moreData, result: rs, keywords: words, pageIndex: dfindex, allTotal: req.session.counts });//页面显示,html渲染
                    console.log("加载更多数据1：" + moreData);
                }).sort({ _id: -1 }).limit(3);

            }
            else {
                Article.find(function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
                    if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
                        //res.send(500 + " Network Error!");
                        req.session.error = '网络异常错误！' + err;
                        rs = "网络异常错误！" + err;
                        res.redirect("/");
                    } else if (doc == "" || doc == null) {                                 //查询不到用户名匹配信息，则用户名不存在
                        req.session.error = '查询信息不存在！';
                        req.session.counts = 0;
                        rs = "查询信息不存在！";
                        res.redirect("/");
                    } else {

                        //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
                        rs = "";
                        req.session.searchrs = doc;
                        console.log("首页中搜索的结果：" + req.session.searchrs);
                        dfindex = 3;
                        req.session.counts = 0;
                        str = req.session.searchrs;//JSON.stringify(doc);
                        //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息  
                    }
                    res.render("searchPage", { title: "页面搜索", contList: str, loadList: moreData, result: rs, keywords: words, pageIndex: dfindex, allTotal: req.session.counts });//页面显示,html渲染
                    console.log("加载更多数据1-1：" + moreData);
                }).sort({ _id: -1 }).limit(3);
                console.log("查询条件为空！" + words);

            }
        } else {

            next();
        }
        //res.render("searchPage", { title: "_页面搜索", contList: str, result: rs }); 
    });

    //点击加载更多
    app.get('/searchPage', function (req, res) {
        var words = req.query.keywords;
        var pageSize = parseInt(req.query.pageSize);
        var currentIndex = parseInt(req.query.recordIndex);
        //var newData = "";
        var moreData = "";
        //dfindex = currentIndex;

        console.log("加载更多：接收ajax的参数值：" + pageSize + "，" + currentIndex);
        if (pageSize == "" || pageSize == null) {
            pageSize = 3;
        }
        if (currentIndex == "" || currentIndex == null) {
            currentIndex = 0;
        }
                
        var counts = req.session.counts;
        var yu = counts % pageSize;
        var pageNum = parseInt(counts / pageSize);
        //当数据取到最后一页，且数据不够pageSize时，则显示全部
        if ( currentIndex == (pageNum * pageSize) && yu < pageSize ) {
            dfindex = counts;
            currentIndex = pageNum * pageSize;
        }

        console.log("加载更多的查询条件：" + words);

        if (words != "undefined" && words != "" && words != null) {

            Article.find({ $or: [{ artcTitle: new RegExp(words) }, { content: new RegExp(words) }] }, function (error, data) {
                if (error) {//错误就返回给原post处（login.html) 状态码为500的错误

                    req.session.error = '网络异常错误！' + error;
                    rs = "网络异常错误:" + error;
                    console.log("网络异常1：" + error);
                } else if (!data) {                                 //查询不到用户名匹配信息，则用户名不存在
                    req.session.error = '查询数据有异常！';
                    req.session.counts = 0;
                    rs = "查询数据有异常！";
                } else {
                    if (data == "" || data == null){                                 //查询不到用户名匹配信息，则用户名不存在
                        req.session.error = '查询信息不存在！';
                        req.session.counts = 0;
                        rs = "查询信息不存在！";
                        console.log("data 为空时：" + rs);
                        res.send("1001");//返回给ajax进行判断
                    } else {
                        //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
                        rs = "";
                        //newData = data;//保存最新数据
                        //不将新查询的结果赋值给str，直接追加成string类型的数据在页面显示，str保存之前查询出的数据
                        //str = req.session.searchrs;//JSON.stringify(doc);

                        console.log("===============保存最新数据之前==========：" + str);
                        for (var i in data) {
                            moreData += "<article class='searchList'><a href='/details?articleId=" + data[i]._id + "' class='showDetails'>"
                                            + "<span class='listTitle'>" + data[i].artcTitle + "</span>"
                                            + "<span class='listCont'>" + (data[i].content).replace(new RegExp("<br>", 'g'), "\n").substr(0, 70) + "</span>"
                                            + "<span class='artcInfo'><span class='listAuthor'>作者：" + data[i].name + "</span>"
                                            + "<span class='listTime'>" + data[i].updateTime + "</span>"
                                            + "</span> </a></article>";
                        }

                        if (currentIndex == counts) {
                            $("#loadMore").text("数据已全部加载~");
                            alert("数据已全部加载~！");
                            location.href = "#loadMore";
                            //alert("12345");
                            setTimeout(hiddenMore, 2000);
                        }
                        //req.session.searchrs = str + newData;
                        res.send(moreData);//返回给ajax数据追加
                    }
                }
              
            }).sort({ _id: -1 }).skip(currentIndex).limit(pageSize);
            //res.render("searchPage", { title: words + "_页面搜索", contList: str, loadList: moreData, result: rs, keywords: words, pageIndex: dfindex });//页面显示,html渲染
            //console.log("加载更多数据1：" + moreData); 
        }
        else {
            Article.find(function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
                if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
                    //res.send(500 + " Network Error!");
                    req.session.error = '网络异常错误！';
                    rs = "网络异常错误";
                    res.redirect("/");
                } else if (doc == "" || doc == null) {                                 //查询不到用户名匹配信息，则用户名不存在
                    req.session.error = '查询信息不存在！';
                    req.session.counts = 0;
                    rs = "查询信息不存在！";
                    res.redirect("/");
                } else {

                    //信息匹配成功，则将此对象（匹配到的Articles) 赋给session.Articles  并返回成功
                    rs = "";
                    req.session.article = doc;
                    req.session.counts = 0;
                    console.log("加载更多的结果：" + req.session.article);
                    str = req.session.article;//JSON.stringify(doc);
                    //res.send(200 + "Login success!");//);重定向与send不能同时运用，send是发送到页面显示信息  
                }
                res.render("searchPage", { title: "页面搜索", contList: str, loadList: moreData, result: rs, keywords: words, pageIndex: dfindex, allTotal: req.session.counts });//页面显示,html渲染
                console.log("加载更多数据3-2：" + moreData);
            }).sort({ _id: -1 }).limit(pageSize);

            console.log("查询条件为空！" + words);
        }
        //res.render("searchPage", { title: "_页面搜索", contList: str, result: rs });
    });
    //引用用户方法
    users(app);
    //引用发表文章方法
    articles(app);
    //引用显示文章详细
    //form(app);
};

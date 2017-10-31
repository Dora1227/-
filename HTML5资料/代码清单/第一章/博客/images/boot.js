if(typeof window.staticTime=="undefined")
	window.staticTime=new Date().getTime();

var $_GLOBAL = {};

// pageid.js version
$_GLOBAL.ver = {
	 "blog7"		: "156"
	,"blog7photo"	: "72"
	,"blog7icp"		: "95"
	,"blog7activity": "14"
	,"blog7crowd"	: "2"
};

//群博客的 接口域名
$_GLOBAL.qURL = 'http://admin.qun.blog.sina.com.cn';

$_GLOBAL.grzxTipBlack = {'other' : 1,'editor' : 1,'pageSetM' : 1,'editor_film' : 1,'other' : 1};

$_GLOBAL.cssBasicURL = 'http://simg.sinajs.cn/blog7style/css/';

//flash的基本地址
//新的:'http://sjs.sinajs.cn/blog7swf/';
$_GLOBAL.flashBasicURL = 'http://sjs.sinajs.cn/blog7swf/';

//顶踩的标志位代码,用于和老的PHP代码结合或者出现线上问题，可快速下线,如果没有问题，可在一个月以后摘除
$_GLOBAL.diggerOpenFlag = true;
//等待flash的加载超时时间,如果flash的加载超过了这个时间，就认为它无效
$_GLOBAL.diggerFlashTimeout = 5000;

//访问统计上的'新'小图标
$_GLOBAL.newPVAddString = '<img title="新" src="http://simg.sinajs.cn/blog7style/images/common/shan.gif" style="vertical-align:3px;margin-left:2px;">';

// flash template info
$_GLOBAL.flash_template = {};

// 推广位数据配置  考虑到 以后也会经常区分三种 参数 干脆 提供三种链接 兼容方案是暂时保留content
$_GLOBAL.popularizeConfig={
	"content" : '<a style="color:red" href="http://blog.sina.com.cn/s/blog_4b0f529901017lyy.html" target="_blank">让你的微博变成经典语录</a>',
	"noBlog"  : '<a style="color:red" href="http://blog.sina.com.cn/s/blog_4b0f529901017lyy.html" target="_blank">让你的微博变成经典语录</a>',
	"login"   : '<a style="color:red" href="http://blog.sina.com.cn/s/blog_4b0f529901017lyy.html" target="_blank">让你的微博变成经典语录</a>',
	"logout"  : '<a style="color:red" href="http://blog.sina.com.cn/s/blog_4b0f529901017lyy.html" target="_blank">让你的微博变成经典语录</a>'
};
//编辑器 推广影评的id以及type
$_GLOBAL.film={
	'id':9728,
	'type':'movie',
	'picUrl':'http://simg.sinajs.cn/blog7style/images/common/editor/television_module1.gif'
};

// 克隆模板数据配置以及名人广告模板数据 
$_GLOBAL.clone_conf=['9_4','10_66'];
$_GLOBAL.famous_conf={
	"10_58":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_58/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: ""
	},
	"10_56":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_56/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: ""
	},
	"10_67":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_67/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: ""
	}
};
$_GLOBAL.GUANWANG={
	"10_26":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_26/images/anniu.jpg" />',
		template_clone_link: "http://kobe.sina.com.cn/",
		template_clone_other: ""
	}
};
$_GLOBAL.cloneTemplateConfig = {
	"9_4": {
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/9/9_4/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"16_10": {
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/16/16_10/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: '<a href="http://gongyi.sina.com.cn/z/siyuan/index.shtml" target="_blank" style="right: 0px; position: absolute; top: -116px;"><div style="width:100px;height:100px;">&nbsp;</div></a>'
	},
	"10_38":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_38/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: ""
	},
	"10_68":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_68/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: ""
	},
	"10_69":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_69/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: ""
	},
	"10_71":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_71/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: ""
	},
	"10_72":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_72/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000205",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_73":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_73/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000206",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_74":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_74/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000207",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_75":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_75/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000208",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_76":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_76/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000209",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_77":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_77/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000210",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_78":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_78/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000211",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_79":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_79/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000212",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_80":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_80/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000213",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_81":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_81/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000214",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_82":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_82/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000215",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_86":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_86/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000216",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_87":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_87/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000217",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_88":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_88/images/anniu.gif" />',
		template_clone_link: "",
		template_clone_other: "",
		count_id:"00000218",
		count_text:"<span style='right:0px;position:absolute;top:-28px;'>新浪网友已传递了<span style='color:#ff00ff'>#{template_pv}</span>次</span>"
	},
	"10_103":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_103/images/anniu.gif" onclick="v7sendLog(\'84_02_01\')" />',
		template_clone_link: '<a href="http://sina.allyes.com/main/adfclick?db=sina&bid=204720,300798,306076&cid=0,0,0&sid=299931&advid=358&camid=37389&show=ignore&url=http://client.sina.com.cn/dilanshengxue2011/index.html" target="_blank">越自然 悦倾心有奖专题</a>',
		template_clone_other: ''
	},
	"10_104":{
		template_clone_pic: '<img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_104/images/btn_link.png" alt="" />',
		template_clone_link: '<a href="http://www.subaru-china.cn/" target="_blank"><img src="http://simg.sinajs.cn/blog7newtpl/image/10/10_104/images/btn_other.png" alt="" /></a>',
		template_clone_other: ''
	},
	"10_105":{
		template_clone_pic: '<img onclick="v7sendLog(\'88_02_01\')" src="http://simg.sinajs.cn/blog7newtpl/image/10/10_105/images/btn01.png" />',
		template_clone_link: '',
		template_clone_other: '<a onclick="v7sendLog(\'88_02_02\')" href="http://client.sina.com.cn/fenjiuwyw/" target="_blank">立即点击</a>'
	},
	"11_3":{
		template_clone_pic: '<br style="display:none;"/>',
		template_clone_link: '<a href="http://sina.allyes.com/main/adfclick?db=sina&bid=197210,245056,250080&cid=0,0,0&sid=240475&advid=5476&camid=35809&show=ignore&url=http://client.sina.com.cn/201004greatwall/" target="_blank"><div style="width:100%;height:100%;cursor:pointer;"></div></a>',
		template_clone_other: ''
	},
	"11_4":{
		template_clone_pic: '<br style="display:none;"/>',
		template_clone_link: '<a href="http://sina.allyes.com/main/adfclick?db=sina&bid=197211,245057,250081&cid=0,0,0&sid=240476&advid=5476&camid=35809&show=ignore&url=http://client.sina.com.cn/201004greatwall/" target="_blank"><div style="width:100%;height:100%;cursor:pointer;"></div></a>',
		template_clone_other: ''
	},
	"11_5":{
		template_clone_pic: '<br style="display:none;"/>',
		template_clone_link: '<a href="http://sina.allyes.com/main/adfclick?db=sina&bid=197209,245055,250079&cid=0,0,0&sid=240474&advid=5476&camid=35809&show=ignore&url=http://client.sina.com.cn/201004greatwall/" target="_blank"><div style="width:100%;height:100%;cursor:pointer;"></div></a>',
		template_clone_other: ''
	},
	"11_11":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_11/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_12":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_12/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_13":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_13/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_14":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_14/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_15":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_15/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_16":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_16/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_17":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_17/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_18":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_18/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_19":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_19/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_20":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_20/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_21":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_21/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_22":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_22/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_23":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_23/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_24":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_24/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_25":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_25/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_26":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_26/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_27":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_27/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_28":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_28/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_29":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_29/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_30":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_30/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_31":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_31/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_32":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_32/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_33":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_33/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_34":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_34/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_35":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_35/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_36":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_36/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_37":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_37/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_38":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_38/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_39":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_39/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_40":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_40/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_41":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_41/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_42":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_42/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_43":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_43/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	},
	"11_44":{
		template_clone_pic: "<img src='http://simg.sinajs.cn/blog7newtpl/image/11/11_44/images/anniu.gif' />",
		template_clone_link: "",
		template_clone_other: ""
	}
};

// 动态模板的配置信息，宽|高
$_GLOBAL.flashtemplate = {
	"13_1": { width:950,height:266 },
	"13_2": { width:950,height:266 },
	"13_3": { width:950,height:266 },
	"13_4": { width:950,height:266 },
	"13_5": { width:950,height:306 },
	"13_6": { width:950,height:306 },
	"13_7": { width:950,height:286 },
	"13_8": { width:950,height:266 },
	"13_9": { width:950,height:266 },
	"13_10": { width:950,height:265 },
	"13_11": { width:950,height:266 },
	"13_12": { width:950,height:276 },
	"13_13": { width:950,height:286 },
	"13_14": { width:950,height:266 },
	"13_15": { width:950,height:306 },
	"13_16": { width:950,height:266 },
	"13_17": { width:950,height:266 },
	"13_18": { width:950,height:266 },
	"13_19": { width:950,height:313 },
	"13_20": { width:950,height:266 },
	"13_21": { width:950,height:265 },
	"10_57": { width:950,height:302 },
	"10_94": { width:292,height:190 }
};

//表情点击左侧表情选择的统计,结构为{pageID:{回复中点击(0):功能参数,评论中点击(1):功能参数}}
$_GLOBAL.faceChooseTable = {
	'photo' : {'0':'05','1':'04'},
	'articleM' : {'0':'02','1':'01'},
	'personalM' : {'0':'07','1':'07'},
	'article' : {'0':'02','1':'01'},
	'personal' : {'0':'07','1':'07'},
	'profile_commlist' : {'0':'03','1':'03'},
	'profile_commphotolist' : {'0':'06','1':'06'}
};

//表情点击'更多>>'按钮的统计,结构为{pageID:{父节点的父节点的ID:[功能参数,置一个参数用于区分是回复还是评论]}}
//0是从回复中点击，1是从评论中点击
$_GLOBAL.faceCountMoreLinkTable = {
	'photo' : {'reply':['05','0'],'smilesSortShow':['04','1']},
	'articleM' : {'reply':['02','0'],'smilesSortShow':['01','1']},
	'personalM' : {'smilesSortShow':['07','1']},
	'article' : {'reply':['02','0'],'smilesSortShow':['01','1']},
	'personal' : {'smilesSortShow':['07','1']},
	'profile_commlist' : {'reply':['03','1']},
	'profile_commphotolist' : {'reply':['06','1']}
};

//活动提示黑名单
$_GLOBAL.activityBlackList = {'blogMove':true};

//MSN搬家权限提示黑名单
$_GLOBAL.msnMoveBlackList = {'blogMove':true};

//表情点击推荐表情的统计,结构为{pageID:{父节点的父节点的ID:功能参数}}
$_GLOBAL.faceCountRecommLinkTable = {
	'photo' : '04',
	'articleM' : '01',
	'personalM' : '07',
	'article' : '01',
	'personal' : '07',
	'profile_commlist' : '03',
	'profile_commphotolist' : '06'
};

//组件推广提示配置
//是否显示提示
$_GLOBAL.showComponentPromotion = true;
//黑名单,如果是以下模板,将不会显示提示
//可写做:11_11,表示只是11_11模板,或者11#11~44,表示从模板11号的11开始至44结束
$_GLOBAL.showComponentPromotionBlackList = ['11#11~44'];
//显示推广的唯一ID，每更新一次提示时，这个需要更新
$_GLOBAL.showComponentPromotionUID = 'newComponentPromotion_fcp22';
//点关闭按钮前,会把Lib.Tip对象传递过来，返回true为终止向下执行
$_GLOBAL.showComponentPromotionBeforeDel = function(tip){};
//点击关闭按钮以后,会把Lib.Tip对象传递过来
$_GLOBAL.showComponentPromotionAfterDel = function(tip){};
//要显示的tip内容,传递Lib.Tip,还有父节点
$_GLOBAL.showComponentPromotionHTML = function(tip,parentNode) {
	var temp=['<div id="'+tip.layoutId+tip.id+'" class="tb_layer_Y tb_layer_w5" style="right: 0px; bottom:50px;">'
		, '<div class="tb_layer_Y_main tip_layer_main">'
			, '<div style="display: inline-block;">'
				, '<div style="text-align: left; display: inline-block; float: right;width:140px;*padding-left:2px" class="tip_ps">'
					, '<a title="\u5220\u9664" id="'+tip.del_id+tip.id+'" class="tb_friend_inputDel" href="#" onclick="return false"></a>'
					, '<a style="color: red;" id="newModuleAddBtn" href="#" onclick="return false">\u5b89\u88c5\u7ec4\u4ef6</a> \u8ba9\u597d\u53cb\u6765\u8ba2\u9605<br>\u60a8\u7684\u535a\u5ba2\uff01'
				, '</div><a id="newModuleAddBtn2" style="float: left; padding-left: 34px; padding-top: 6px;" title="\u70b9\u51fb\u6dfb\u52a0\u7ec4\u4ef6" href="#" onclick="return false">'
					, '<img width="40" src="http://simg.sinajs.cn/blog7style/images/common/RssDemo.jpg">'
				, '</a>'
			, '</div>'
		, '</div>'
		, '<div class="tb_layer_arrow tip_arrow"></div>'
	, '</div>'].join("");
	Core.Dom.addHTML(parentNode,temp);
	Core.Events.addEvent(document.getElementById('newModuleAddBtn'),tip.addModule(113),"click");
	Core.Events.addEvent(document.getElementById('newModuleAddBtn2'),tip.addModule(113),"click");
};
//要添加组件以前的一些事情,会把Lib.Tip对象传递过来，返回true为终止向下执行
$_GLOBAL.showComponentPromotionBeforeAdd = function(tip){};
//要添加组件以后的一些事情,会把Lib.Tip对象传递过来
$_GLOBAL.showComponentPromotionAfterAdd = function(tip){
	Utils.Io.JsLoad.request('http://hits.sinajs.cn/A2/b.html?type=10_30_rss_tip&pageid=1&msg=1', {
		onComplete: function(){
		}
	});
};

//RSS订阅的URL地址
$_GLOBAL.rssIcons = [{
						href:'http://www.xianguo.com/subscribe.php?url=',
						cls:'rss_xianguo',
						title:'\u8ba2\u9605\u5230\u9c9c\u679c'
					},
					{
						href:'http://www.google.com/ig/addtoreader?feedurl=',
						cls:'rss_goole',
						title:'\u8ba2\u9605\u5230Google'//,
						//encode:true
					}];
//scope.$uhost
$_GLOBAL.rssMethod = '$uid';

//是否在人气接口合并好友接口
$_GLOBAL.mashAddFriend = true;

//配置浮层广告的一些参数,现在暂时不会使用
//浮层广告类型:img 或者 swf
$_GLOBAL.outSearchType = 'swf';

// --- End of GLOBAL config ---
(function (){
	//- debug -
	var __debug_mode = false; //should be false
	//- sina lib version - TODO 
	var __sina_ver = "0.0.1";
	
	// js base domain
	var __js_domain = "http://sjs.sinajs.cn/";
	
	// @desc add DOM onload Event
	var __addDOMLoadEvent = function(func){
	    var __load_events;
	    var __load_timer;
//		var binded = false;
	    if (!__load_events) {
	        var init = function(){
	            // quit if this function has already been called
	            if (arguments.callee.done) {
	                return;
	            }
	            // flag this function so we don't do the same thing twice
	            arguments.callee.done = true;
	            // kill the timer
	            if (__load_timer) {
	                clearInterval(__load_timer);
	                __load_timer = null;
	            }
	            // execute each function in the stack in the order they were added
	            for (var i = 0; i < __load_events.length; i++) {
	                __load_events[i]();
	            }
	            __load_events = null;
	        };
	        // for Mozilla/Opera9
	        if (document.addEventListener) {
	            document.addEventListener("DOMContentLoaded", init, false);
//				binded = true;
	        }
	        // for Internet Explorer
	        /*@cc_on @*/
	        /*@if (@_win32)
	         var domlen = document.getElementsByTagName("*").length;
	         var domnum = 0;
	         (function () {
	         if(domnum != domlen) {
	         setTimeout(arguments.callee, 500);
	         }
	         else {
	         setTimeout(init, 500);
	         }
	         domnum = domlen;
	         })();
	         @end @*/
	        // for Safari
	        if (/WebKit/i.test(navigator.userAgent)) { // sniff
	            __load_timer = setInterval(function(){
	                if (/loaded|complete/.test(document.readyState)) {
	                    init(); // call the onload handler
//	                    binded = true;
	                }
	            }, 10);
	        }
	        // for other browsers
//			if(binded == false){
				window.onload = init;
//			}
	        // create event function stack
	        __load_events = [];
	    }
	    // add function to event stack
	    __load_events.push(func);
	};
	
	// 绑定事件
	var addEvent = function(elm, func, evType, useCapture) {
		var _el = $E(elm);
		if(_el == null){ return; }
		if(typeof useCapture == "undefined"){
			useCapture = false;
		}
		if(typeof evType == "undefined"){
			evType = "click";
		}
		if(_el.addEventListener){
			_el.addEventListener(evType, func, useCapture);
			return true;
		}else if(_el.attachEvent){
			var r = _el.attachEvent("on" + evType, func);
			return true;
		}else{
			_el['on' + evType] = func;
		}
	};
	var __addFocusEvent = function(fFocusFunction){
		//TODO not available during the dev
		if(window.excute != null && typeof window.excute == "function"){
			excute();
			excute = null;
		}
	};
	if(__debug_mode){
		document.write('<script type="text/javascript" src="' + __js_domain + 'bind2/debug/debug_base.js"></script>');
		document.write('<script type="text/javascript" src="' + __js_domain + 'bind2/debug/debug.js"></script>');
	}
	
	window.__load_js = function(){
	    var url = "";
		if(__debug_mode == true){
			url = 	__js_domain + "bind2/index.php?product=" + scope.$PRODUCT_NAME + "&pageid=" + scope.$pageid
						+ "&rnd=" + new Date().getTime();
		}else{
			// 取得 JS 版本号
			var jsver =	(typeof $_GLOBAL != "undefined" && $_GLOBAL.ver != null)
							? $_GLOBAL.ver[scope.$PRODUCT_NAME] || "-1"
							: "-1";
			url = 	__js_domain + scope.$PRODUCT_NAME + "/" + scope.$pageid + ".js?"
					+ jsver + ".js";
		}
		function render_page(){
			__addDOMLoadEvent(main);
			addEvent(document.body, __addFocusEvent, "focus");
			addEvent(window, __addFocusEvent, "scroll");
			addEvent(document.body, __addFocusEvent, "mousemove");
			addEvent(document.body, __addFocusEvent, "mouseover");
		}
		function report_error(time){
			var err_log_url = "http://control.blog.sina.com.cn/admin/article/ria_debug.php?type=js_err_log&page=" + scope.$PRODUCT_NAME
				+ "_" + scope.$pageid + "&code=404&desc=&usetime=" + (new Date().getTime() - startTime);
			new Image().src = err_log_url;
			clearTimeout(loadCheck);loadCheck = null;
			report_error = function (){};
		}
		if(__debug_mode == true){
			window.__render_page = render_page;
			document.write('<script src="' + url +'" charset="utf-8"></script>');
		} else {
			var js = document.createElement("script");
			js.src = url;
			js.charset = "utf-8";
			js.onload = js.onreadystatechange = function () {
				if (js && js.readyState && js.readyState != "loaded" && js.readyState != "complete") {
					return;
				}
				js.onload = js.onreadystatechange = js.onerror = null;
				js.src = "";
				js.parentNode.removeChild(js);
				js = null;
				clearTimeout(loadCheck);loadCheck = null;
				if(typeof main != "undefined"){ render_page(); } else { report_error(); }
			};
			js.onerror = function () {
				js.onload = js.onreadystatechange = js.onerror = null;
				js.src = "";
				js.parentNode.removeChild(js);
				js = null;
				clearTimeout(loadCheck); loadCheck = null;
				report_error();
			};			
			var startTime = new Date().getTime();
			document.getElementsByTagName("head")[0].appendChild(js);
			var loadCheck = setTimeout(function () {
				report_error(-1);
			}, 30000);
		}
	};
	window.__render_page = function(){};
	
	if (typeof scope.$setDomain == "undefined" || scope.$setDomain == true) {
		document.domain = "sina.com.cn";
	}
	if(/\((iPhone|iPad|iPod)/i.test(navigator.userAgent) == false){return;}
	document.addEventListener('mouseover', function(e){
		var ele = e.target;
		do{
			if(ele.tagName == 'A'){
				ele.target = '_self';
				return;
			}
			if(ele.tagName == 'DIV'){return;}
			ele = ele.parentNode;
		}while(ele);
	},false);
})();

scope.testboot={};//千万别删除，此代码测试发博文页面的Boot.js是否加载
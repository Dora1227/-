

(function($) {
	$.fn.validationEngineLanguage = function() {};
	$.validationEngineLanguage = {
		newLang: function() {
			$.validationEngineLanguage.allRules = 	{"required":{    			// Add your regex rules here, you can take telephone as an example
						"regex":"none",
						"alertText":"* 必须输入内容",
						"alertTextCheckboxMultiple":"* 必须选择一个选项",
						"alertTextCheckboxe":"* 必须为选取状态"},
					"length":{
						"regex":"none",
						"alertText":"*文字长度必须在 ",
						"alertText2":" 个文字到 ",
						"alertText3": " 个文字之间"	},
					"maxCheckbox":{
						"regex":"none",
						"alertText":"* 超出允许复选的项目个数"},	
					"minCheckbox":{
						"regex":"none",
						"alertText":"* 请至少选择 ",
						"alertText2":" 个选项"},	
					"confirm":{
						"regex":"none",
						"alertText":"* 密码与确认密码不匹配"},		
					"email":{
						"regex":"/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
						"alertText":"* 电子邮件格式不正确"},	
					"date":{
                         "regex":"/^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/",
                         "alertText":"* 日期格式不正确,必须为YYYY-MM-DD格式"},
					"onlyNumber":{
						"regex":"/^[0-9\ ]+$/",
						"alertText":"* 只允许输入数字"},
		"price": {
		    "regex": "/^(([1-9][0-9]{0,3}((\.[0-9]{1,2}){0,1}))|(0\.[0-9]{1,2}))+$/",
		    "alertText": "* 输入单价格式不正确"
		},							
					"noSpecialCharacters":{
						"regex":"/^[0-9a-zA-Z]+$/",
						"alertText":"* 不允许输入特殊字符"},	
					"onlyLetter":{
						"regex":"/^[a-zA-Z\ \']+$/",
						"alertText":"* 只允许输入字母"}
					}	
		}
	}
})(jQuery);

$(document).ready(function() {	
	$.validationEngineLanguage.newLang()
});
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<title>欢迎页面</title>
<style type="text/css">
iframe{
    display:none;
}
</style>
<script language="javascript">
function iframe_load()
{
<s:if test="crossDomainFlag==true">
    alert("Java版HTML5测试系统登录成功.");
</s:if>
<s:elseif test="userName!=null&&!userName.equals('')">
    var data = new Object();
    data.userName = "<s:property value='userName'/>";
    data.userPass =  "<s:property value='userPass'/>";
    var iframe = window.frames[0];
    iframe.postMessage(JSON.stringify(data), "http://localhost:1116");
</s:elseif>
}
</script>
</head>  
<s:if test="userName!=null&&!userName.equals('')">
<body>
用户名:<s:property value='userName'/>
<iframe src="http://localhost:1116" onload="iframe_load()"></iframe>
</body>
</s:if>
</html>

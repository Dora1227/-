<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>   
<title>登录</title>
</head>
<style type="text/css">
input[type="text"],input[type="password"]{
    width: 90px;
    height: 20px;
    font-size:12px;
}
input[type="button"]{
    font-size: 12px;
    width: 68px;
    height: 20px;	
    cursor: hand;
    border:none;
    font-family:宋体;
    background-color:White;
    background-image:  url(images/but_bg.gif);
    color: white;
}
</style>	
 <script language="javascript">
function Login_Btn_Click() {
    if(document.getElementById("userName").value=="")
        alert("必须输入用户名。");
    else if(document.getElementById("userPass").value=="")
        alert("必须输入密码。");	
    else
        document.getElementById("LoginForm").submit();
}

function Cancel_Btn_Click() {
    window.close();
}
window.addEventListener("message", function(ev) {   
    if (ev.origin != "http://localhost:1618"&&ev.origin != "http://localhost:1116") {
       return;
    }
    var data=JSON.parse(ev.data); 
    document.getElementById("userName").value=data.userName;
    document.getElementById("userPass").value=data.userPass;
    document.getElementById("crossDomainFlag").value="true";    
    document.getElementById("LoginForm").submit();
}, false);
moveTo((screen.width-400)/2,(screen.height-300)/2);
resizeTo(400,340);
var t;
t="<s:property value='tip'/>";
if(t!="")
<s:if test="crossDomainFlag!=null&&!crossDomainFlag.equals('')">
alert("Java版HTML5测试系统登录失败\r\n错误:"+t);
</s:if>
<s:else>
alert(t);
</s:else>
</SCRIPT>
<body background="images/backbar.JPG">
<s:form id="LoginForm" name="LoginForm" action="login">
<center>
<table border="0">
    <tr>
        <td colspan="2">
            <div align="center"><img src="images/HTML5-TEST.jpg" width="157" height="52"></div>
        </td>
    </tr>
    <tr>
        <td><font size="3"><b>用户名</b></font></td>
        <td><s:textfield id="userName" maxlength="16" name="userName"></s:textfield></td>
    </tr>
    <tr>
        <td><font size="3"><b>密码</b></font></td>
        <td><s:password id="userPass" maxlength="16" name="userPass"></s:password></td>
    </tr>
    <tr>
        <td colspan="2" align="center"><input type="button" value="登录" onclick="Login_Btn_Click()"/><input type="button" value="取消" onClick="Cancel_Btn_Click()"/></td>
    </tr>
</table>
</center>
<s:hidden id="crossDomainFlag" name="crossDomainFlag"></s:hidden>    
</s:form>
</body>
<script type="text/javascript">
if(document.getElementById("crossDomainFlag").value=="logoff")
    alert("Java版HTML5测试系统成功退出");
</script>
</html>

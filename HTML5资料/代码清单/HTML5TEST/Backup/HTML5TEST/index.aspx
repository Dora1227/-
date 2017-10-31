<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="HTML5TEST.index" %>
<!DOCTYPE html>
<html>
<head runat="server">
<title>登录</title>
<style type="text/css">
input[type="text"],input[type="password"]{
    width: 90px;
    height: 20px;
    font-size:12px;
}
input[type="submit"],input[type="button"]{
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
    if (document.getElementById("userName").value.trim() == "")
    {
        alert("必须输入用户名。");
        return false;
    }
    else if (document.getElementById("userPass").value.trim() == "")
    {
        alert("必须输入密码。");
        return false;
    }
    return true;
}
function Cancel_Btn_Click() {
    window.close();
}
window.addEventListener("message", function (ev) {
    if (ev.origin != "http://localhost:1618" && ev.origin != "http://localhost:8443") {
        return;
    }
    var data = JSON.parse(ev.data);
    document.getElementById("userName").value = data.userName;
    document.getElementById("userPass").value = data.userPass;
    document.getElementById("crossDomainFlag").value = "true";
    document.getElementById("Login_Btn").click();
}, false);
moveTo((screen.width - 400) / 2, (screen.height - 300) / 2);
resizeTo(400, 340);
</SCRIPT>
</head>
<body background="images/backbar.JPG">
<form id="form1" runat="server" >
<center>
<table border="0">
    <tr>
      <td colspan="2">
        <div align="center"><img src="images/HTML5-TEST.jpg" 
      width="157" height="52"></div>
      </td>
    </tr>
    <tr>
      <td><font size="3"><b>用户名</b></font></td>
      <td><asp:TextBox id="userName" maxlength="16" name="userName" runat="server" ClientIDMode="Static"/></td>
    </tr>
    <tr>
      <td><font size="3"><b>密码</b></font></td>
      <td><asp:TextBox id="userPass" maxlength="16" name="userPass" runat="server" TextMode="Password" ClientIDMode="Static"/></td>
    </tr>
    <tr>
      <td colspan="2" align="center">
      <asp:Button name="Login_Btn" Text="登录" OnClientClick="return Login_Btn_Click();"  
              runat="server" ID="Login_Btn" onclick="Login_Btn_Click"/>
      <input type="button" value="取消" onClick="Cancel_Btn_Click()"/></td>
    </tr>    
</table>
</center>  
<asp:HiddenField ID="crossDomainFlag" ClientIDMode="Static" runat="server" />
</form>
</body>
</html>

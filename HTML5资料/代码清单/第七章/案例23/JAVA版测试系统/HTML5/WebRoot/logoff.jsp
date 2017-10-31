<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>   
<title>退出</title>
</head>
<script language="javascript">
window.addEventListener("message", function(ev) {
    if (ev.origin != "http://localhost:1618") {
       return;
    }
    var data=ev.data;
    if(data=="logoff")
    document.getElementById("form").submit();
}, false);
</SCRIPT>
<body>
<s:form id="form" action="logoff">
</s:form>
</body>
</html>
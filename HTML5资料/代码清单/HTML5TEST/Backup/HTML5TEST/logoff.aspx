<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="logoff.aspx.cs" Inherits="HTML5TEST.logoff" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>退出</title>
    <script language="javascript">
        window.addEventListener("message", function (ev) {

            if (ev.origin != "http://localhost:1618") {
                return;
            }
            if (ev.data == "logoff")
                document.getElementById("Logoff_Btn").click();
        }, false);

</script>
</head>
<body>
    <form id="form1" runat="server">
  <asp:Button id="Logoff_Btn" Text="退出" runat="server" onclick="Logoff_Btn_Click" ClientIDMode="Static"/>
    </form>
</body>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="案例18.aspx.cs" Inherits="HTML5TEST.案例18" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>
订单信息
</title>
<link rel="stylesheet" href="Styles/validationEngine.jquery.css" type="text/css" media="screen"/> 
<script src="Scripts/jquery-1.5.1.min.js" type="text/javascript"></script> 
<script src="Scripts/jquery.validationEngine-cn.js" type="text/javascript"></script> 
<script src="Scripts/jquery.validationEngine.js" type="text/javascript"></script> 
<style type ="text/css">
body {
	margin-left: 0px;
	margin-top: 0px;
}
ul{
	width:100%;
	display: -moz-box;
	display: -webkit-box;
	-moz-box-orient: vertical; 
    -webkit-box-orient:vertical;	
	margin:0px;
	padding:0px;
}
li{
	list-style:none;
}
ul li ul{
	display: -moz-box;
	display: -webkit-box;
	-moz-box-orient: horizontal; 
    -webkit-box-orient:horizontal;	
}
header{
	font-size: 14px;
	font-weight: bold;
	color:white;
	background-color:#7088AD;
	text-align:left;
	padding-left:10px;
    display:block;
    width:100%;
}
li[id^=title]{
	font-size: 12px;
	color: #333333;
	background-color:#E6E6E6;
	text-align:right;
	padding-right:5px;
	width:120px;

}
li[id^=content]{
    height:22;
    background-color:#FAFAFA;
    text-align:left;
    padding-left:2px;
	width:220px;
}
span{
    color: #ff0000;
}
input{
	width: 95%;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	border-top-color: #426C7C;
	border-right-color: #CCCCCC;
	border-bottom-color: #CCCCCC;
	border-left-color: #426C7C;
	border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border:1px solid #0066cc;
	height: 18px;
}
input:read-only{
    background-color:yellow;
}
input:-moz-read-only{
    background-color:yellow;
}
input#tbxNum{
    text-align:right;
}
input#tbxPrice{
    text-align:right;
}
input#tbxMoney{
    text-align:right;
}
div{
    text-align:right;
}
div#buttonDiv{
    width:100%;
}
input[type="submit"]{
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
div#infoTable{
    overflow:auto;
    width:100%;
    height:100%;
}
div#infoTable table{
    width:100%;
    background-color:white;
    cellpadding:1;
    cellspacing:1;
    font-size: 12px;
    text-align: center;
}
div#infoTable  table th{
    height:22;
    background-color:#7088AD;
    color: #FFFFFF;
    width:8%;
}
div#infoTable  table tr{
    height:30;
    
}

div#infoTable  table tr:nth-child(odd){
    background-color:#E6E6E6;
    color: #333333;    
}
div#infoTable  table tr:nth-child(even){
    background-color:#fafafa;
    color: black;
}
div#infoTable  table tr:nth-child(1){
    background-color:#7088AD;
    color: #FFFFFF;
}
div#infoTable  table th:nth-last-child(1){
    width: 15%;  
}
iframe{
    display:none;
}
</style>
<script type="text/javascript">
     $(function () {
        $("#form1").validationEngine();
        <%if(!isPostBack)
        {%>
            var obj=JSON.parse(localStorage.getItem("tempValue"));
            if(obj!=null)
            {
                $("#tbxCode").val(obj.Code);
                $("#tbxDate").val(obj.Date);
                $("#tbxGoodsCode").val(obj.GoodsCode);
                $("#tbxBrandName").val(obj.BrandName);
                $("#tbxNum").val(obj.Num);
                $("#tbxPrice").val(obj.Price);
                $("#tbxMoney").val(obj.Money);
                $("#tbxPersonName").val(obj.PersonName);
                $("#tbxEmail").val(obj.Email);
            }
        <%
        }
        else
        {%>
            $("#tbxCode").val("<%=Code%>");
            $("#tbxDate").val("<%=date%>");
            $("#tbxGoodsCode").val("<%=GoodsCode%>");
            $("#tbxBrandName").val("<%=brandName%>");
            $("#tbxNum").val("<%=num%>");
            $("#tbxPrice").val("<%=price%>");
            $("#tbxMoney").val("<%=money%>");
            $("#tbxPersonName").val("<%=PersonName%>");
            $("#tbxEmail").val("<%=Email%>");
            localStorage.removeItem("tempValue");
        <%
        }
        if(codeRead)
        {%>
            $("#tbxCode").attr("ReadOnly","ReadOnly");
        <% }
        else
        {
         %>       
           $("#tbxCode").removeAttr('ReadOnly');
        <% }%>  
        $("#tbxNum").blur(function () {
            var num= parseInt($("#tbxNum").val());
            var price= parseFloat($("#tbxPrice").val());
            if (isNaN(num*price))
                $("#tbxMoney").val("0");
            else
                $("#tbxMoney").val(Math.round(num * price * 100, 0) / 100);
        });
        $("#tbxPrice").blur(function () {
            var num= parseInt($("#tbxNum").val());
            var price= parseFloat($("#tbxPrice").val());
            if (isNaN(num*price))
                $("#tbxMoney").val("0");
            else
                $("#tbxMoney").val(Math.round(num * price * 100, 0) / 100);
        });
        $("#btnNew").click(function () {
            $('input[id^="tbx"]').removeClass();
        })
        $("#btnDelete").click(function () {
            $('input[id^="tbx"]').removeClass();
        });
        $("#btnSaveTemp").click(function () {
            var obj=new Object();
            obj.Code=$("#tbxCode").val();
            obj.Date=$("#tbxDate").val();
            obj.GoodsCode=$("#tbxGoodsCode").val();
            obj.BrandName=$("#tbxBrandName").val();
            obj.Num=$("#tbxNum").val();
            obj.Price=$("#tbxPrice").val();
            obj.Money=$("#tbxMoney").val();
            obj.PersonName=$("#tbxPersonName").val();
            obj.Email=$("#tbxEmail").val();
            localStorage.setItem("tempValue",JSON.stringify(obj));
            alert("临时数据保存成功！");
        });
    }); 

</script> 
</head>
<body>
<form id="form1"  method="post" runat=server>
<section>
<header id="div_head_title_big">
编辑订单信息
</header>
<ul>
    <li>
	    <ul>
    		<li id="title_1"><label for="tbxCode">订单编号</label></li>
			<li id="content_1"><input type="text" id="tbxCode" name="tbxCode" maxlength="8"  class="validate[required]" placeholder="必须输入一个不存在的订单编号" autofocus required/></li>
			<li id="title_2"><label for="tbxDate">订单日期</label></li>
			<li id="content_2"><input type="date" id="tbxDate" name="tbxDate" maxlength="10" class="validate[required,custom[date],future[NOW]]"  placeholder="必须输入一个有效的日期"  required/></li>
			<li id="title_3"><label for="tbxGoodsCode">商品编号</label></li>
			<li id="content_3"><input type="text"  id="tbxGoodsCode" name="tbxGoodsCode" maxlength="12"  class="validate[required]" placeholder="必须输入商品编号"  required/></li>
		</ul>
    </li>
	<li>
	    <ul>
		    <li id="title_4"><label for="tbxBrandName">商&nbsp;&nbsp;&nbsp;&nbsp;标</label></li>
			<li id="content_4">
            <input  type="text" id="tbxBrandName" name="tbxBrandName"  maxlength="50"  /></li>
			<li id="title_5"><label for="tbxNum">数&nbsp;&nbsp;&nbsp;&nbsp;量</label></li>
			<li id="content_5"><input type="number" id="tbxNum" name="tbxNum" maxlength="6" value="0" class="validate[required,custom[integer]]"  placeholder="必须输入一个整数值"   required/></li>
			<li id="title_6"><label for="tbxPrice">单&nbsp;&nbsp;&nbsp;&nbsp;价</label></li>
			<li id="content_6"><input type="text" id="tbxPrice" name="tbxPrice" maxlength="6" value="0" class="validate[required,custom[number]]" placeholder="必须输入一个有效的单价"   required/></li>
		</ul>
	</li>
	<li>
	    <ul>
		    <li id="title_7"><label for="tbxMoney">金&nbsp;&nbsp;&nbsp;&nbsp;额</label></li>
			<li id="content_7"><input  type="text" id="tbxMoney" name="tbxMoney" readonly="readonly"  value="0" /></li>
			<li id="title_8"><label for="tbxPersonName">负&nbsp;责&nbsp;人</label></li>
			<li id="content_8"><input type="text" id="tbxPersonName" name="tbxPersonName" maxlength="20"/></li>
			<li id="title_9"><label for="tbxEmail">负责人Email</label></li>
			<li id="content_9"><input type="email" id="tbxEmail" name="tbxEmail" maxlength="20" class="validate[optional,custom[email]]" placeholder="请输入一个有效的邮件地址"/></li>
		</ul>
	</li>
</ul>
<div id="buttonDiv">
    <asp:Button ID="btnNew"   runat="server" Text="新增" onclick="btnNew_Click"></asp:Button>
    <asp:Button ID="btnAdd"  runat="server" Text="追加" onclick="btnAdd_Click"></asp:Button>
    <asp:Button ID="btnUpdate"  runat="server" Text="修改" Enabled=false onclick="btnUpdate_Click"></asp:Button>
    <asp:Button ID="btnDelete"  runat="server" Text="删除" Enabled=false onclick="btnDelete_Click"></asp:Button>
    <asp:Button ID="btnClear"  runat="server" Text="清除"  Enabled=false onclick="btnClear_Click"></asp:Button>
    <input type="button" id="btnSaveTemp" value="临时保存" />
</div>
<section>
<section>
<header id="div_head_title_big">
订单信息一览表
</header>
<div id="infoTable">
<asp:datagrid id="datatable" 
          runat="server" 
          Width="100%"           
          BorderWidth="0px" 
          AutoGenerateColumns="false"
		  CellPadding="1" 
		  CellSpacing="1" 
		  AllowPaging="True" 
		  PageSize ="10"
		  EnableViewState="true"
		  OnPageIndexChanged="datatable_PageIndexChanged" 
          OnItemCommand="datatable_ItemCommand">
		  <Columns>
		  <asp:BoundColumn DataField="code" HeaderText="订单编号"/>
          <asp:BoundColumn DataField="orderDate" HeaderText="订单日期" />
          <asp:BoundColumn DataField="goodsCode" HeaderText="商品编号"/>
          <asp:BoundColumn DataField="brandName" HeaderText="商标"/>
          <asp:BoundColumn DataField="num" HeaderText="数量"/>
          <asp:BoundColumn DataField="price" HeaderText="单价"/>
          <asp:BoundColumn DataField="money" HeaderText="金额"/>
          <asp:BoundColumn DataField="personName" HeaderText="负责人"/>
          <asp:BoundColumn DataField="email" HeaderText="负责人Email"/>
          <asp:ButtonColumn CommandName ="select" HeaderText="編集" Text ="編集"/>
		  </Columns>
		  <PagerStyle HorizontalAlign="Right" Width="100%" Mode="NumericPages" Position="Bottom" Wrap="false"  ></PagerStyle>
		  <SelectedItemStyle BackColor="Blue" ForeColor="White" />
		  </asp:datagrid>
</div>
</section>
</form> 
</body>
</html> 

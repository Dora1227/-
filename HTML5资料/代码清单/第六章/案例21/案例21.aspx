<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="案例21.aspx.cs" Inherits="HTML5TEST.案例21" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>
订单信息
</title>
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
h1{
    font-size: 14px;
    font-weight: bold;
    color:white;
    background-color:#7088AD;
    text-align:left;
    padding-left:10px;
    display:block;
    width:100%;
    margin:0px;
}
li[id^=title]{
    font-size: 12px;
    color: #333333;
    background-color:#E6E6E6;
    text-align:right;
    padding-right:5px;
    width:110px;
}
li[id^=content]{
    height:22;
    background-color:#FAFAFA;
    text-align:left;
    padding-left:2px;
    width:210px;
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
input[type="button"],input[type="submit"]{
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
</style>
<script>
var data = new Object;
var datatable;
var db = openDatabase('MyData', '', 'My Database', 102400);
function window_onload() {
    datatable = document.getElementById("datatable");
    <%if(postFlag)
    {%>
        db.transaction(function (tx) {
            tx.executeSql('delete from orders', [],
            function (tx, rs) {
                alert("成功提交数据，本地数据库中数据被清空!");
              },
              function (tx, error) {
                  alert(error.source + "::" + error.message);
              });
        });
    <%}%>
    showAllData(true);
}  
function tbxNum_onblur()
{
    var num,price;
    num=parseInt(document.getElementById("tbxNum").value);
    price=parseFloat(document.getElementById("tbxPrice").value);
    if (isNaN(num*price))
    {
         document.getElementById("tbxPrice").value="0";
         document.getElementById("tbxMoney").value="0";
    }
    else
         document.getElementById("tbxMoney").value= num * price;
}
function tbxPrice_onblur()
{
    var num,price;
    num=parseInt(document.getElementById("tbxNum").value);
    price=parseFloat(document.getElementById("tbxPrice").value);
    
    if (isNaN(num*price))
    {
        document.getElementById("tbxPrice").value="0";
        document.getElementById("tbxMoney").value="0";
    }
    else
        document.getElementById("tbxMoney").value= num * price;
}
function btnAdd_onclick()
{
    data.Code=document.getElementById("tbxCode").value;
    data.Date=document.getElementById("tbxDate").value;
    data.GoodsCode=document.getElementById("tbxGoodsCode").value;
    data.BrandName=document.getElementById("tbxBrandName").value;
    data.Num=document.getElementById("tbxNum").value;
    data.Price=document.getElementById("tbxPrice").value;
    data.PersonName=document.getElementById("tbxPersonName").value;
    data.Email=document.getElementById("tbxEmail").value;
    db.transaction(function(tx) 
    {          
        tx.executeSql('CREATE TABLE IF NOT EXISTS orders(code TEXT, date TEXT,goodscode TEXT,brandName TEXT,num INTEGER,price FLOAT,personName TEXT,email TEXT)',[]);  

        tx.executeSql('SELECT * FROM orders where code=?', [data.Code], function(tx, rs) 
        {  
            if(rs.rows.length>0)         
            {
                alert("输入的订单编号在数据库中已存在!");
                return;
            }
            tx.executeSql('INSERT INTO orders VALUES(?,?,?,?,?,?,?,?)',
            [data.Code,data.Date,data.GoodsCode,data.BrandName,data.Num,data.Price,data.PersonName,data.Email],  
            function(tx, rs) 
            {  
                alert("成功保存数据!");
                showAllData(false); 
                btnNew_onclick(); 
            },  
            function(tx, error) 
            {  
                alert(error.source + "::" + error.message);  
            });  
        },
        function(tx, error) 
        {  
            alert(error.source + "::" + error.message);  
        });  
    });
    
}
function btnUpdate_onclick()
{
    data.Code=document.getElementById("tbxCode").value;
    data.Date=document.getElementById("tbxDate").value;
    data.GoodsCode=document.getElementById("tbxGoodsCode").value;
    data.BrandName=document.getElementById("tbxBrandName").value;
    data.Num=document.getElementById("tbxNum").value;
    data.Price=document.getElementById("tbxPrice").value;
    data.PersonName=document.getElementById("tbxPersonName").value;
    data.Email=document.getElementById("tbxEmail").value;
    db.transaction(function(tx) 
    {  
        tx.executeSql('update orders set date=?,goodscode=?,brandName=?,num=?,price=?,personName=?,email=? where code=?',[data.Date,data.GoodsCode,data.BrandName,data.Num,data.Price,data.PersonName,data.Email,data.Code],  
        function(tx, rs) 
        {  
            alert("成功修改数据!");
            showAllData(false);  
        },  
        function(tx, error) 
        {  
            alert(error.source + "::" + error.message);  
        });  
    });   
}
function btnDelete_onclick()
{
    data.Code=document.getElementById("tbxCode").value;
    db.transaction(function(tx) 
    {  
        tx.executeSql('delete from orders where code=?',[data.Code],  
        function(tx, rs) 
        {  
            alert("成功删除数据!");
            showAllData(false);  
            btnNew_onclick(); 
        },  
        function(tx, error) 
        {  
            alert(error.source + "::" + error.message);  
        });  
    });    
}
function btnNew_onclick()
{
    document.getElementById("form1").reset();
    document.getElementById("tbxCode").removeAttribute("readonly");
    document.getElementById("btnAdd").disabled="";
    document.getElementById("btnUpdate").disabled="disabled";
    document.getElementById("btnDelete").disabled="disabled";
}
function btnClear_onclick()
{
    document.getElementById("tbxDate").value="";
    document.getElementById("tbxGoodsCode").value="";      
    document.getElementById("tbxBrandName").value="";
    document.getElementById("tbxNum").value="0";
    document.getElementById("tbxPrice").value="0";
    document.getElementById("tbxMoney").value="0";
    document.getElementById("tbxPersonName").value="";
    document.getElementById("tbxEmail").value="";
}
function tr_onclick(tr,i)
{
    document.getElementById("tbxCode").value=tr.children.item(0).innerHTML;
    document.getElementById("tbxDate").value=tr.children.item(1).innerHTML;
    document.getElementById("tbxGoodsCode").value=tr.children.item(2).innerHTML;      
    document.getElementById("tbxBrandName").value=tr.children.item(3).innerHTML;
    document.getElementById("tbxNum").value=tr.children.item(4).innerHTML;
    document.getElementById("tbxPrice").value=tr.children.item(5).innerHTML;
    document.getElementById("tbxMoney").value=tr.children.item(6).innerHTML;
    document.getElementById("tbxPersonName").value=tr.children.item(7).innerHTML;
    document.getElementById("tbxEmail").value=tr.children.item(8).innerHTML;
    document.getElementById("tbxCode").setAttribute("readonly",true);
    document.getElementById("btnAdd").disabled="disabled";
    document.getElementById("btnUpdate").disabled="";
    document.getElementById("btnDelete").disabled="";
}
function showAllData(loadPage) 
{  

    db.transaction(function(tx) 
    {  
        tx.executeSql('SELECT * FROM orders ', [], function(tx, rs) 
        {  
            if(!loadPage)         
                removeAllData(); 
            for(var i = 0; i < rs.rows.length; i++) 
            {               
                showData(rs.rows.item(i),i);  
            }  
        },
        function(tx, error) 
        {  
            alert(error.source + "::" + error.message);  
        });  
    });   
}
function removeAllData()
{  
    for (var i =datatable.childNodes.length-1; i>1; i--) 
        datatable.removeChild(datatable.childNodes[i]);  
}  
function showData(row,i) 
{ 
    var tr = document.createElement('tr');
    tr.setAttribute("onclick","tr_onclick(this,"+i+")");
    var td1 = document.createElement('td');  
    td1.innerHTML = row.code;  
    var td2 = document.createElement('td');  
    td2.innerHTML = row.date;  
    var td3 = document.createElement('td');  
    td3.innerHTML = row.goodscode;   
    var td4 = document.createElement('td');  
    td4.innerHTML = row.brandName; 
    var td5 = document.createElement('td');  
    td5.innerHTML = row.num; 
    var td6 = document.createElement('td');  
    td6.innerHTML = row.price; 
    var td7 = document.createElement('td');  
    td7.innerHTML = parseInt(row.num)*parseFloat(row.price); 
    var td8 = document.createElement('td');  
    td8.innerHTML = row.personName; 
    var td9= document.createElement('td');  
    td9.innerHTML = row.email; 
    tr.appendChild(td1);  
    tr.appendChild(td2);  
    tr.appendChild(td3);  
    tr.appendChild(td4); 
    tr.appendChild(td5); 
    tr.appendChild(td6); 
    tr.appendChild(td7); 
    tr.appendChild(td8);
    tr.appendChild(td9);
    datatable.appendChild(tr);
}  
function btnSubmit_onclick() {
    datatable = document.getElementById("datatable");
    var tr;
    var dataArray = new Array();
    for (var i = 2; i < datatable.childNodes.length; i++) {
        data = new Object();
        tr = datatable.childNodes[i];
        data.Code = tr.childNodes[0].innerHTML;
        data.Date = tr.cells[1].innerHTML;
        data.GoodsCode = tr.cells[2].innerHTML;
        data.BrandName = tr.cells[3].innerHTML;
        data.Num = tr.cells[4].innerHTML;
        data.Price = tr.cells[5].innerHTML;
        data.PersonName = tr.cells[7].innerHTML;
        data.Email = tr.cells[8].innerHTML;
        dataArray.push(JSON.stringify(data));
    }
    document.getElementById("JSONText").value = JSON.stringify(dataArray);
    form1.submit();
}
</script>
</head>
<body onload="window_onload()">
<section>
<header id="div_head_title_big">
<h1>编辑订单信息</h1>
</header>
<form id="form1" method="post" runat=server>
<ul>
    <li>
        <ul>
    	    <li id="title_1"><span>*</span><label for="tbxCode">订单编号</label></li>
    	    <li id="content_1"><input type="text" id="tbxCode" name="tbxCode" maxlength="8"  placeholder="必须输入一个不存在的订单编号" autofocus required/></li>
    	    <li id="title_2"><span>*</span><label for="tbxDate">订单日期</label></li>
    	    <li id="content_2"><input type="date" id="tbxDate" name="tbxDate" maxlength="10"  required/></li>
    	    <li id="title_3"><span>*</span><label for="tbxGoodsCode">商品编号</label></li>
    	    <li id="content_3"><input type="text"  id="tbxGoodsCode" name="tbxGoodsCode" maxlength="12"  placeholder="必须输入商品编号"  required/></li>
	    </ul>
    </li>
    <li>
	    <ul>
	        <li id="title_4"><label for="tbxBrandName">商&nbsp;&nbsp;&nbsp;&nbsp;标</label></li>
	        <li id="content_4"><input  type="text" id="tbxBrandName" name="tbxBrandName"  maxlength="50"  /></li>
	        <li id="title_5"><label for="tbxNum">数&nbsp;&nbsp;&nbsp;&nbsp;量</label></li>
	        <li id="content_5"><input type="number" id="tbxNum" name="tbxNum" maxlength="6" value="0" placeholder="必须输入一个整数值"    required onblur="tbxNum_onblur()" /></li>
	        <li id="title_6"><label for="tbxPrice">单&nbsp;&nbsp;&nbsp;&nbsp;价</label></li>
	        <li id="content_6"><input type="text" id="tbxPrice" name="tbxPrice" maxlength="6" value="0" placeholder="必须输入一个有效的单价"  required  onblur="tbxPrice_onblur()"/></li>
	    </ul>
    </li>
    <li>
	    <ul>
	        <li id="title_7"><label for="tbxMoney">金&nbsp;&nbsp;&nbsp;&nbsp;额</label></li>
	        <li id="content_7"><input  type="text" id="tbxMoney" name="tbxMoney" readonly="readonly"  value="0" /></li>
	        <li id="title_8"><label for="tbxPersonName">负&nbsp;责&nbsp;人</label></li>
	        <li id="content_8"><input type="text" id="tbxPersonName" name="tbxPersonName" maxlength="20"/></li>
	        <li id="title_9"><label for="tbxEmail">负责人Email</label></li>
	        <li id="content_9"><input type="email" id="tbxEmail" name="tbxEmail" maxlength="20" placeholder="请输入一个有效的邮件地址"/></li>
	    </ul>
    </li>
</ul>
<div id="buttonDiv">
    <input type="button" name="btnNew" id="btnNew" value="新增"  onclick="btnNew_onclick();" />
    <input type="submit" name="btnAdd" id="btnAdd" value="追加"  formaction="javascript:btnAdd_onclick();"/>
    <input type="submit" name="btnUpdate" id="btnUpdate" value="修改" disabled  formaction="javascript:btnUpdate_onclick();"/>
    <input type="button" name="btnDelete" id="btnDelete" value="删除" disabled  onclick="btnDelete_onclick();" />
    <input type="button" name="btnClear" id="btnClear" value="清除"   onclick="btnClear_onclick();" />   
    <input type="button" name="btnSubmit" id="btnSubmit" value="提交"   onclick="btnSubmit_onclick();" />  
</div>
<input type="hidden" id="JSONText" name="JSONText"/>
</form> 
<section>
<section>
<header id="div_head_title_big">
<h1>订单信息一览表</h1>
</header>
<div id="infoTable">
<table id="datatable">
<tr>
    <th>订单编号</th>
    <th>订单日期</th>
    <th>商品编号</th>
    <th>商标</th>
    <th>数量</th>
    <th>单价</th>
    <th>金额</th>
    <th>负责人</th>
    <th>负责人Email</th>
</tr>
</table>
</div>
</section>
</body>
</html> 
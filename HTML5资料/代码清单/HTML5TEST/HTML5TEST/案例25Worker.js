onmessage = function (event) {
    if (event.data == "load") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "案例25BackCode.aspx?operateType=load");  
        xhr.onreadystatechange =
        function () {
            var result = xhr.responseText;
           if (xhr.readyState == 4) {
                if (result == "数据库连接失败" || result == "读取数据失败")
                    postMessage(result);
                else
                    postMessage(createHtml(result));
            }
        }
        xhr.send(null);
    }
    else {
        var tmpObj = JSON.parse(event.data);
        if (tmpObj.operateType == "add" || tmpObj.operateType == "update") {
            var data = new Object();
            data.Code = tmpObj.Code;
            data.Date = tmpObj.Date;
            data.GoodsCode = tmpObj.GoodsCode;
            data.BrandName = tmpObj.BrandName;
            data.Num = tmpObj.Num;
            data.Price = tmpObj.Price;
            data.PersonName = tmpObj.PersonName;
            data.Email = tmpObj.Email;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "案例25BackCode.aspx?operateType=" + tmpObj.operateType);
            xhr.onreadystatechange =
            function () {
                var result = xhr.responseText;
                if (xhr.readyState == 4) {
                    if (result == "数据库连接失败" || result == "读取数据失败" || result == "数据添加失败。" || result == "输入的订单编号在数据库中已存在。" || result == "数据修改失败。")
                        postMessage(result);
                    else
                        postMessage(createHtml(result));
                }
            }
            xhr.send(JSON.stringify(data));
        }
        else {
            var tmpObj = JSON.parse(event.data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "案例25BackCode.aspx?operateType=" + tmpObj.operateType + "&code=" + tmpObj.Code);
            xhr.onreadystatechange =
            function () {
                var result = xhr.responseText;
                if (xhr.readyState == 4) {
                    if (event.data == "数据库连接失败" || event.data == "读取数据失败" || event.data == "数据删除失败。")
                        postMessage(result);
                    else
                        postMessage(createHtml(result));
                }
            }
            xhr.send(null);
        }
    }
}

function createHtml(inputData) {
    var html, data;
    html = "<tr>";
    html += "<th>订单编号</th>";
    html += "<th>订单日期</th>";
    html += "<th>商品编号</th>";
    html += "<th>商标</th>";
    html += "<th>数量</th>";
    html += "<th>单价</th>";
    html += "<th>金额</th>";
    html += "<th>负责人</td>";
    html += "<th>负责人Email</th>";
    html += "</tr>";
    var dataArray = JSON.parse(unescape(inputData));
    for (var i = 0; i < dataArray.length; i++) {
        data = JSON.parse(unescape(dataArray[i]));
        html += "<tr onclick='tr_onclick(this," + i + ")'>";
        html += "<td>" + data.Code + "</td>";
        html += "<td>" + data.Date + "</td>";
        html += "<td>" + data.GoodsCode + "</td>";
        html += "<td>" + data.BrandName + "</td>";
        html += "<td>" + data.Num + "</td>";
        html += "<td>" + data.Price + "</td>";
        html += "<td>" + parseInt(data.Num) * parseFloat(data.Price) + "</td>";
        html += "<td>" + data.PersonName + "</td>";
        html += "<td>" + data.Email + "</td>";
        html += "</tr>";
    }
    return html;
}
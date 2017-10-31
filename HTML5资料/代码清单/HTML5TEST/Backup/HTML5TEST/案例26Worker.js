onmessage = function (event) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "案例26BackCode.aspx");
    xhr.onreadystatechange =
            function () {
                var result = xhr.responseText;
                if (xhr.readyState == 4) {
                    postMessage(result);
                }
            }
    xhr.send(event.data);
}
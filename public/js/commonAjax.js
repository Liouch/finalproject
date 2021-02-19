var objAjax = {
    url: "",
    data: {},
    functionName: "",
}

function AjaxGetAll(obj, json= "json"){
    var url = obj.url;

    $.ajax({
        method: "GET",
        url: url,
        dataType: json,
        data: obj.data
    })
    .done(function(result){
        obj.functionName(result);
    });
}

function AjaxPostApi(obj){
    var url = obj.url;
    $.ajax({
        method: "POST",
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(obj.data)
    })
    .done(function(result){
        obj.functionName(result);
    });
}
function AjaxPost(obj){
    var url = obj.url;
    $.ajax({
        method: "POST",
        url: url,
        dataType: "json",
        data: obj.data
    })
    .done(function(result){
        obj.functionName(result);
    });
}

function AjaxGetItem(obj, json = "json"){
    var url = obj.url + "/" + obj.data.id;
    $.ajax({
        method: "GET",
        url: url,
        dataType: json,
    })
    .done(function(result){
        obj.functionName(result);
    });
}

function AjaxDeleteItem(obj, json= "json"){
    var url = obj.url + "/" + obj.data.id;
    $.ajax({
        method: "DELETE",
        url: url,
        dataType: json,
    })
    .done(function(result){
        obj.functionName(result);
    });
}
function AjaxPutItemApi(id, obj, json = "json"){
    var url = obj.url + "/" + id;
    $.ajax({
        method: "PUT",
        url: url,
        contentType: "application/json",
        dataType: json,
        data: JSON.stringify(obj.data)
    })
    .done(function(result){
        obj.functionName(result);
    });
}
function AjaxPutItem(obj){
    var url = obj.url;
    $.ajax({
        method: "PUT",
        url: url,
        dataType: "json",
        data: obj.data
    })
    .done(function(result){
        obj.functionName(result);
    });
}
function AjaxFileUpload(obj, json = "json"){
    var url = obj.url;
    var fd = new FormData();
    fd.append('file', obj.file);
    fd.append('id', obj.id);
    $.ajax({
        method: "POST",
        url: url,
        contenType: false,
        processData: false,
        dataType: json,
        data: id,
        success: function(result){
            obj.functionName(result);
        }
    });
}
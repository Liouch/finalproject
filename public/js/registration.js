$(document).ready(function(){
    InitializeRegistration();
});

function InitializeRegistration(){
    //EventsRegistration();
    LoadLanguages();
}
var objLanguages;

function LoadLanguages(){
    var obj = { page: 1, active: 1}
    getLanguages(obj);
}

/* function getLanguages(objData){
    var obj = {
        url: "http://localhost:8000/api/languages",
        data: objData,
        functionName: CallbackLanguages
    }
    AjaxGetAll(obj)
} */
function CallbackLanguages(result){
    objLanguages = result;
    $("#languages").html("");
    var returnValue = "";
    $(objLanguages).each(function(index){
        returnValue = returnValue + `<option value="${this.id}">${this.language}</option>`
    })
    $("#languages").append(returnValue);
    setTimeout(LoadLanguages, 10000);
}
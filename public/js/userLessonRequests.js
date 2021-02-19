$(document).ready(function(){
    InitializeRegistration();
});

function InitializeRegistration(){
    EventsLessonRequest();
    LoadAllLanguages();
    
    checkNewMessages();
}

function EventsLessonRequest(){
    $("#btn-nuevo-lesson-request").on("click", function(){
        LoadActiveLanguages();
        ShowNewLessonRequest();
    })
    $("#lessonRequestList").on("click", "button[class*='btn-edit']", function(){
        LoadActiveLanguages();
        ShowEditLessonRequest(this);
    })
    $("#lessonRequestList").on("click", "button[class*='btn-delete']", function(){
        ShowDeleteLessonRequest(this);
    })
   
}
var objActiveLanguages;
var languageToEdit;
function LoadAllLanguages(){
    var obj = { 
        page: 1,
        active: [1, 0],
    }
   getLanguages(obj);
}
function LoadActiveLanguages(){
    var obj = { 
        page: 1,
        active: 1,
    }
   getActiveLanguages(obj);
}

function getActiveLanguages(objData){
    var obj = {
        url: "http://localhost:8000/api/languages",
        data: objData,
        functionName: CallbackActiveLanguages
    }
    AjaxGetAll(obj)
}
function CallbackActiveLanguages(result){
    objActiveLanguages = result;
    printActiveLanguages(languageToEdit);
    languageToEdit = null;
    
    
}
function CallbackLanguages(result){
    objLanguages = result;
    LoadLessonRequests();
    
}
function LoadLessonRequests(){
    GetLessonRequests()
}

function GetLessonRequests(){
    var url = "http://finalproject.test/lessonrequests/user";
    $.ajax({
        method: "GET",
        url: url,
        dataType: 'json',
        error: function(){
            console.log("something went wrong");
        }
    })
    .done(function(result){
        //console.log(result);
        CallbackLessonRequests(result);
    })
    
}
function CallbackLessonRequests(result){
    printLessonRequests(result);

}

function printLessonRequests(lessonRequestsObj){
    var lessonRequests = lessonRequestsObj;
    var lessonRequestList = $('#lessonRequestList');
    lessonRequestList.html('');
    if (lessonRequests.length == 0 ){
        var html = `<p class="text-center">You don't have any lesson requests yet. Publish a lesson request</p>`
        lessonRequestList.append(html);
    }else{
        $(lessonRequests).each(function(index){
            var nameLanguage = GetNameLanguage(this.idlanguage);
            var idLanguage = GetIdApi(this.idlanguage);
            var date = getDate(this.date);
            var html = `
            <div class="card mb-4" id="card-lesson">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 col-sm-4 text-left" id="title_${this.id}">${this.title}</div>
                        <div class="col-12 col-sm-4 text-left text-sm-center" id="language_${this.id}">${nameLanguage}</div>
                        <div class="col-12 col-sm-4 text-left text-sm-right" id="date_${this.id}">${date}</div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text" id="description_${this.id}">${this.description}</p>
                    <div class="text-right">
                        <button type="button" class="col-12 col-sm-3 col-md-2 col-xl-1 mt-2 mt-sm-0 btn btn-primary btn-edit" id="${this.id}" idLanguage="${idLanguage}">Edit</button> 
                        <button type="button" class="col-12 col-sm-3 col-md-2 col-xl-1 mt-2 mt-sm-0 btn btn-danger btn-delete" id="${this.id}">Delete</button>
                    </div>
                </div>
            </div>
            `;
        lessonRequestList.append(html);
        });
    }
    
}   

function ShowNewLessonRequest(){
    var idTitle = "txtLessonRequestTitle";
    var idDescription = "txtLessonRequestDescription";
    var idLanguage = "cbLanguage";
    
    var body = 
            `
            <label>Title</label>
            <input type="text" class="form-control mb-2" id="${idTitle}" required></input>
            <label>Description</label>
            <textarea class="form-control mb-2 row="3" maxlength="500" id="${idDescription}" required></textarea>
            <label>Language</label>
            <select class="form-control" id="${idLanguage}" required>
            </select>
           `;
           
    
    var click = `"NewLessonRequest('${idTitle}', '${idDescription}', '${idLanguage}')"`;
    var value = "Confirm";
    var header = "New lesson request";
    ModalWindow(header, body, click, value);
    
    
}
function ShowEditLessonRequest(obj){
    var button=$(obj);
    var id = button.attr('id');
    var idLang = button.attr('idLanguage');
    
    var title = $("#title_" + id).html();
    var description = $("#description_" + id).html();
    
    var idTitle = "txtLessonRequestTitle";
    var idDescription = "txtLessonRequestDescription";
    var idLanguage = "cbLanguage";
    /* var body = 
            `<label>Title</label>
            <input type="text" class="form-control mb-2" id="${idTitle}" value="${title}" required></input>
            <label>Description</label>
            <textarea class="form-control mb-2" id="${idDescription}" row="3" maxlength="500" required>${description}</textarea>
            <label>Language</label>
           ${CreateLanguageCombo(idLanguage, idLang)}
           `; */
    var body = 
            `<label>Title</label>
            <input type="text" class="form-control mb-2" id="${idTitle}" value="${title}" required></input>
            <label>Description</label>
            <textarea class="form-control mb-2" id="${idDescription}" row="3" maxlength="500" required>${description}</textarea>
            <label>Language</label>
            <select class="form-control" id="${idLanguage}" required>
            </select>
           `;
    var click = `"EditLessonRequest('${idTitle}', '${idDescription}', '${idLanguage}', '${id}')"`;

    var value = "Update";
    var header = "Edit lesson request";
    ModalWindow(header, body, click, value);
    languageToEdit = idLang;
    
}

function ShowDeleteLessonRequest(obj){
    var button = $(obj);
    var id = button.attr('id');

    var body = `<p>Are you sure you want to delete this lesson request?</p>`;
    var click = `"DeleteLessonRequest(${id})"`;
    
    var value ="Delete";
    var header = "Delete lesson request";
    ModalWindow(header, body,click,value);
}

function NewLessonRequest(idTitle, idDescription, idLanguage){
    var title = $("#"+idTitle).val();
    var description = $("#"+idDescription).val();
    var language = $("#"+idLanguage).val();

    var objItem = {
        title: title,
        description: description,
        idlanguage: language,
        
    }

    var obj = {
        url: "http://finalproject.test/lessonrequests/new",
        data: objItem,
        functionName: CallbackSaveLessonRequest
    }
    //console.log(objItem);
    AjaxPost(obj);

}
function CallbackSaveLessonRequest(result){
    //HideDivBlock();
    console.log(result);
    alert(result);
    LoadLessonRequests();
}

function EditLessonRequest(idTitle, idDescription, idLanguage, id){
    var title = $("#"+idTitle).val();
    var description = $("#"+idDescription).val();
    var language = $("#"+idLanguage).val();

    var objItem = {
        title: title,
        description: description,
        idlanguage: language,
        idlesson: id
    }
    var obj = {
        url: "http://finalproject.test/lessonrequests/edit",
        data: objItem,
        functionName: CallbackEditLessonRequest,
    }
    AjaxPutItem(obj);
}

function CallbackEditLessonRequest(result){
    alert("Lesson request edited");
    LoadLessonRequests();
    
}
function DeleteLessonRequest(id){
    //var html = "Deleting lesson request";
    //showDivblock(html);
     var obj = {
        url: "http://localhost:8000/api/lessonrequests",
        data: {active: 0},
        functionName: CallbackDeleteLessonRequest,
    }
    AjaxPutItemApi(id, obj);

}

function CallbackDeleteLessonRequest(result){
    var id = result.id;
    $("#"+id).closest("div[id*='card-lesson']").remove();
    console.log(result.id);
    
}

function printActiveLanguages(idLang=null){
    var idLanguage= "cbLanguage";
    select = $("#"+idLanguage);
    if (objActiveLanguages){
        select.html("");
        var returnValue = `<option style="display:none">Select a language</option>`;
        $(objActiveLanguages).each(function(index){
            var selected = "";
            if (this.id==idLang) selected ="selected";
            returnValue = returnValue + `<option value="${this.id}" ${selected}>${this.language}</option>`;
        });
        select.html(returnValue); 
        objActiveLanguages = "";
    }

}
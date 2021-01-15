$(document).ready(function(){
    InitializeRegistration();
});

function InitializeRegistration(){
    EventsLessonRequest();
    LoadLanguages();
}

function EventsLessonRequest(){
    $("#btn-nuevo-lesson-request").on("click", function(){
        ShowNewLessonRequest();
    })
    $("#lessonRequestList").on("click", "button[class*='btn-edit']", function(){
        ShowEditLessonRequest(this);
    })
    $("#lessonRequestList").on("click", "button[class*='btn-delete']", function(){
        ShowDeleteLessonRequest(this);
    })
   
}

var objLessonRequests;

function LoadLanguages(){
    var obj = { page: 1}
    getLanguages(obj);
}

function getLanguages(objData){
    var obj = {
        url: "http://localhost:8000/api/languages",
        data: objData,
        functionName: CallbackLanguages
    }
    AjaxGetAll(obj)
}
function CallbackLanguages(result){
    objLanguages = result;
    LoadLessonRequests()
    console.log(objLanguages);
}
function LoadLessonRequests(){
    GetLessonRequests()
}

function GetLessonRequests(){
    var url = "http://finalproject.test/lessonrequestsUser";
    $.ajax({
        method: "GET",
        url: url,
        dataType: 'json',
        error: function(){
            console.log("something went wrong");
        }
    })
    .done(function(result){
        console.log(result);
        CallbackLessonRequests(result);
    })
    
}
function CallbackLessonRequests(result){
    printLessonRequests(result);
    //HideDivBloc()
    console.log(result);
}

function printLessonRequests(lessonRequests){
    //var lessons = lessonRequests["hydra:member"];
    var lessonRequestList = $('#lessonRequestList');
    lessonRequestList.html('');
    $(lessonRequests).each(function(index){
        var nameLanguage = GetNameLanguage(this.idlanguage);
        var idLanguage = GetIdLanguageApi(this.idlanguage);
        var html = `<div class="row pb-2 pt-2">
        <div class="col-3" id="title_${this.id}">${this.title}</div>
        <div class="col-3" id="description_${this.id}">${this.description}</div>
        <div class="col-2" id="language_${this.id}">${nameLanguage}</div>
        <div class="col-2" id="date_${this.date}">${this.date}</div>
        <div class="col-1">
            <button type="button" class="btn btn-primary btn-edit" id="${this.id}" idLanguage="${idLanguage}">Edit</button> 
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-secondary btn-delete" id="${this.id}">Delete</button>
        </div>
        </div>`;
    lessonRequestList.append(html);
    });
    
    console.log(lessonRequests);

}   

function ShowNewLessonRequest(){
    var idTitle = "txtLessonRequestTitle";
    var idDescription = "txtLessonRequestDescription";
    var idLanguage = "cbLanguage";
    
    var body = 
            `<label>Title</label><br>
            <input type="text" id="${idTitle}" required></input><br>
            <label>Description</label><br>
            <input type="text" id="${idDescription}" required></input><br>
            <label>Language</label><br>
           ${CreateLanguageCombo(idLanguage)}<br>
           `;
           
    
    var click = `"NewLessonRequest('${idTitle}', '${idDescription}', '${idLanguage}')"`;
    var value = "Confirm";
    ModalWindow(body, click, value);
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
    var body = 
            `<label>Title</label><br>
            <input type="text" id="${idTitle}" value="${title}" required></input><br>
            <label>Description</label><br>
            <input type="text" id="${idDescription}" value="${description}" required></input><br>
            <label>Language</label><br>
           ${CreateLanguageCombo(idLanguage, idLang)}<br>
           `;
    var click = `"EditLessonRequest('${idTitle}', '${idDescription}', '${idLanguage}', '${id}')"`;

    var value = "Update";
    ModalWindow(body, click, value);
}

function ShowDeleteLessonRequest(obj){
    var button = $(obj);
    var id = button.attr('id');

    var body = `<p>Are you sure you want to delete this lesson request?</p>`;
    var click = `"DeleteLessonRequest(${id})"`;
    
    var value ="Delete";
    ModalWindow(body,click,value);
}

function ModalWindow(body, click, value){
    var id = 'btnDeactivateLessonRequest';
    
    $(`#${id}`).remove(); //Show alert to confirm and make call to ajax
    var html = `<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-hidden="true" style="z-index:9999">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">New lesson request</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ${body}                            
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" id="btnBorrar" onclick=${click} data-dismiss="modal"
                                >${value}</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>`
    $('body').append(html);
    $(`#${id}`).modal('show');
}

function NewLessonRequest(idTitle, idDescription, idLanguage){
    var title = $("#"+idTitle).val();
    var description = $("#"+idDescription).val();
    var language = $("#"+idLanguage).val();
    var User = $("#idUser").val();
    var date = CurrentDateISO();
    var html = "Creating lesson request";

    //ShowDivBlock(html)

    var objItem = {
        title: title,
        description: description,
        idlanguage: "/api/languages/"+language,
        iduser: "/api/users/" + User,
        date: ActualDateISO()
    }

    var obj = {
        url: "http://finalproject.test/api/lessonrequests",
        data: objItem,
        functionName: CallbackSaveLessonRequest
    }
    console.log(objItem);
    AjaxPost(obj);

}
function CallbackSaveLessonRequest(result){
    //HideDivBlock();
    alert("Lesson request sent");
    LoadLessonRequests();
}

function EditLessonRequest(idTitle, idDescription, idLanguage, id){
    var title = $("#"+idTitle).val();
    var description = $("#"+idDescription).val();
    var language = $("#"+idLanguage).val();

    var objItem = {
        title: title,
        description: description,
        idlanguage: "api/languages/"+language,
    }
    var obj = {
        url: "http://localhost:8000/api/lessonrequests",
        data: objItem,
        functionName: CallbackEditLessonRequest,
    }
    AjaxPutItem(id, obj);
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
    AjaxPutItem(id, obj);

}

function CallbackDeleteLessonRequest(result){
    var id = result.id;
    $("#"+id).closest("div[class*='row']").remove();
    console.log(result.id);
    
}
function GetNameLanguage(language){
    var returnValue = "";
    $(objLanguages).each(function(index){
        var id = this.id;
        var idApi = GetIdLanguageApi(language);
        if ( id == idApi){
            returnValue = this.language;
            return false;
        }
    });
    return returnValue;
}
function GetIdLanguageApi(value){
    return value.split("/")[3];
}
function CreateLanguageCombo(idLanguage, idLang=null){
    var returnValue = `<select id="${idLanguage}" required>`;
    returnValue = returnValue + `<option style="display:none">Select a language</option>`;
    $(objLanguages).each(function(index){
        var selected = "";
        if (this.id==idLang) selected ="selected";
        returnValue = returnValue + `<option value="${this.id}" ${selected}>${this.language}</option>`
    });
    returnValue = returnValue + "</select>";

    return returnValue;

}
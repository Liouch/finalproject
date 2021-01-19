$(document).ready(function(){
    InitializeRegistration();
});

function InitializeRegistration(){
    EventsLessonRequest();
    LoadLanguages();
}

function EventsLessonRequest(){
    $("#lessonRequestList").on("click", "button[class*='btn-send']", function(){
        ShowSendMessageModal(this);
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
}

function LoadLessonRequests(){
    var obj = {
        url: "http://localhost:8000/api/lessonrequests",
        data: { page: 1},
        functionName: CallbackGetAllLessons
    }
    AjaxGetAll(obj)
}

function CallbackGetAllLessons(result){
    objLessonRequests = result;
    console.log(objLessonRequests);
    printLessonRequests(objLessonRequests)
    
}

function printLessonRequests(lessonRequests){
    //var lessons = lessonRequests["hydra:member"];
    var lessonRequestList = $('#lessonRequestList');
    lessonRequestList.html('');
    $(lessonRequests).each(function(index){
        
        var nameLanguage = GetNameLanguage(this.idlanguage);
        var idLanguage = GetIdApi(this.idlanguage);
        var idUser = GetIdApi(this.iduser);
        
        var html = `
                <div class="card mt-2">
                    <div class="card-header" id="title_${this.id}">${this.title} - ${nameLanguage}</div>
                    <div class="card-body">
                        <p class="card-text">${this.description}</p>
                        <div class="text-right">
                            <button type="button" class="btn btn-primary btn-send" id="${this.id}" idUser="${idUser}">Send Message</button>
                        </div>
                    </div>
                </div>`
    lessonRequestList.append(html);
    });
    //CreatePaginator(lessonRequests)
}   

function ShowSendMessageModal(obj){
    var button=$(obj);
    var idLessonRequest = button.attr('id');
    var idUser = button.attr('idUser');
    var idTeacher = $("#idTeacher").val();
    console.log(button);
    console.log(idTeacher);
    console.log(idUser);
    var title = $("#title_" + idLessonRequest).text();
    
    var idTitle = "txtLessonRequestTitle";
    var message= "message";

    var body = 
            `<label>Title</label><br>
            <input class="form-control" type="text" id="${idTitle}" placeholder="${title}" readonly></input><br>
            
            <label for="${message}">Message</label>
            <textarea class="form-control" id="${message}" rows="3"></textarea>
           `;
    var click = `"SendMessage('${idUser}', '${idLessonRequest}', '${idTeacher}', '${message}' )"`;

    var value = "Send";
    ModalWindow(body, click, value);
}
function ModalWindow(body, click, value){
    var id = 'modal';
    
    $(`#${id}`).remove(); 
    var html = `<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-hidden="true" style="z-index:9999">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Send a message</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ${body}                            
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="btnSend" onclick=${click} data-dismiss="modal"
                                >${value}</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>`
    $('body').append(html);
    $(`#${id}`).modal('show');
}

function SendMessage(idUser, idLessonRequest, idTeacher, message){
    var idUser = idUser;
    var idLessonRequest = idLessonRequest;
    var idTeacher = idTeacher;
    var message = $("#"+message).val();
    var html = "Sending message";
    console.log(idTeacher);
    //ShowDivBlock(html)

    var objItem = {
        message: message,
        messagedate: ActualDateISO(),
        idteacher: "api/users/" + idTeacher,
        iduser: "api/users/" + idUser,
        
    }

    var obj = {
        url: "http://finalproject.test/api/messages",
        data: objItem,
        functionName: CallbackSaveLessonRequest
    }
    console.log(objItem);
    AjaxPost(obj);

}
function CallbackSaveLessonRequest(result){
    //HideDivBlock();
    alert("Message sent");
    LoadLessonRequests();
}


function GetNameLanguage(language){
    var returnValue = "";
    $(objLanguages).each(function(index){
        var id = this.id;
        var idApi = GetIdApi(language);
        if ( id == idApi){
            returnValue = this.language;
            return false;
        }
    });
    return returnValue;
}
function GetIdApi(value){
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
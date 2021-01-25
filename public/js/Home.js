$(document).ready(function(){
    InitializeHome();
});

function InitializeHome(){
    EventsLessonRequest();
    LoadTop5NewTeachers();
}

function EventsLessonRequest(){
    /* $("#lessonRequestList").on("click", "button[class*='btn-send']", function(){
        ShowSendMessageModal(this);
    }) */
}



function LoadTop5NewTeachers(){
    var obj = { 
        page: 1,
        'order%5Bsignupdate%5D': "desc",
        itemsPerPage: 5}
    getTop5NewTeachers(obj);
}

function getTop5NewTeachers(objData){
    var obj = {
        url: "http://finalproject.test/api/teachers?order%5Bsignupdate%5D=desc",
        data: objData,
        functionName: CallbackLanguages
    }
    AjaxGetAll(obj)
}
function CallbackLanguages(result){
   console.log(result);
    printLessonRequests(result)

}

function printLessonRequests(teachers){
    //var lessons = lessonRequests["hydra:member"];
    var top5NewTeachersList = $('#top5NewTeachersList');
    top5NewTeachersList.html('');
    var html = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner" id="carouselTeacherCards">
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>`;
    top5NewTeachersList.append(html);
    $(teachers).each(function(index){
        
        var title = this.title;
        var description = this.description;
        var profilePic = this.profilepic;
        var idTeacher = GetIdApi(this.iduser);
        var profilePicUrl = "/img/teacher/" + idTeacher + "/" + profilePic;
        var rating = this.rating;
        var active = "";
        if (index == 0){
            var active = "active";
        }
        var htmlCarousel = `
            <div class="carousel-item ${active}">
                <div class="card">
                    <div class="row">
                        <div class="col-auto">
                            <img src="${profilePicUrl}" class="img-fluid" alt="${profilePicUrl}" width="200" height="200">
                        </div>
                        <div class="col">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${description}</p>
                                <div class="text-right">
                                    <a href="#" class="btn btn-primary">Send message</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    $("#carouselTeacherCards").append(htmlCarousel);
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
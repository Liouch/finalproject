function ActualDateISO(){
    var d = new Date();
    var d = new Date(d.setHours(d.getHours()+1));
    return d.toISOString();
}

function ShowSendMessageModal(obj){
    var button=$(obj);
    var idUser = button.attr('idUser');
    var idTeacher = $("#idTeacher").val();
    if (!idTeacher){
        window.location.href = "http://finalproject.test/register/teacher";
    
    }else if(idTeacher == idUser) alert("You can't send messages to yourself");
    else{
        
        var idLessonRequest = button.attr('id');
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
}
function ModalWindow(header, body, click, value){
    var id = 'modal';
    
    $(`#${id}`).remove(); 
    var html = `<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-hidden="true" style="z-index:9999">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${header}</h5>
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

function createPaginator(view, id){
    var obj = {first: 0, last: 0, previous: 0, next: 0};
    $(id).html('');
    if (view){
        var page = {
            current: getPageNumber(view["@id"]),
            first: getPageNumber(view["hydra:first"]),
            last: getPageNumber(view["hydra:last"]),
            previous: getPageNumber(view["hydra:previous"]),
            next: getPageNumber(view["hydra:next"]),
        }
        var firstActive = "";
        if(page.current == page.first) firstActive = "disabled";

        var prevActive = "disabled";
        if (page.previous) {
            preActive = "";
            if ( page.previous < page.first){
                page.previous = page.first;
                prevActive = "disabled";
            }
        }
        var nextActive = "disabled";
        if(page.next){
            nextActive = "";
            if (page.next > page.last){
                page.next = page.last;
                nextActive = "disabled";
            }
        }
        var lastActive = "";
        if (page.actual == page.last) lastActive = "disabled";

        var pages="";
        for (i=1; i<=page.last; i++){
            var pageCurrent = "";
            var pageActive = "";
            if (i == page.current){
                pageCurrent = "disabled";
                pageActive = "active";
            }
            pages = pages + `<li class="page-item ${pageActive}"><button class="page-link btn" ${pageCurrent} page=${i}>${i}</button></li>`
        
        }
        var paginator = `
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                    <li class="page-item"><button class="btn page-link" ${firstActive} page=${page.first}>First</button></li>
                    <li class="page-item"><button class="btn page-link" ${prevActive} page=${page.previous}>Previous</button></li>
                
                    ${pages}
                
                    <li class="page-item"><button class="btn page-link" ${nextActive} page=${page.next}>Next</button></li>
                    <li class="page-item"><button class="btn page-link" ${lastActive} page=${page.last}>Last</button></li>
                    </ul>
                </nav>`;
        $(id).append(paginator);
    }

}

function getPageNumber(value){
    if(value) value = value.split("&page=")[1];
    return value;
}

function GetIdApi(value){
    return value.split("/")[3];
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
function getDateWithoutTime(value){
    return value.split("T")[0];
}
$(document).ready(function(){
    InitializeMessagesDirect();
});

function InitializeMessagesDirect(){
    LoadMessages();
    EventsMessagesDirect();
}

function EventsMessagesDirect(){
    $("#messagesList").on("click", "button[class*='btn-send']", function(){
        SendMessageDirect(this);
    })
}
function LoadMessages(){
    GetMessages();
}

function SendMessageDirect(obj){
    var button=$(obj);
    var idLoggedUser = button.attr('idloggeduser');
    var idTeacher = button.attr('iduser');
    var message = $("#message").val();
    var html = "Sending message";
    //ShowDivBlock(html)
    var objItem = {
        message: message,
        messagedate: ActualDateISO(),
        idteacher: "api/users/" + idTeacher,
        iduser: "api/users/" + idLoggedUser,
        
    }
    var obj = {
        url: "http://finalproject.test/api/messages",
        data: objItem,
        functionName: CallbackSaveMessage
    }
    console.log(objItem);
    AjaxPost(obj);

}
function CallbackSaveMessage(result){
    //HideDivBlock();
    //LoadLessonRequests();
    LoadMessages();
}


function GetMessages(){
    var id1 = $("#messagesList").attr("idloggeduser");
    var id2 = $("#messagesList").attr("iduser");
    var url = "http://finalproject.test/messages/get/" + id1 + "/" +id2;
    console.log(url);
    $.ajax({
        method: "GET",
        url: url,
        dataType: 'json',
        error: function(){
            console.log("something went wrong");
        }
    })
    .done(function(result){
        var messagesList = $('#messagesList');
        CallbackGetMessages(result, id1, id2, messagesList);
        setTimeout(GetMessages, 10000);
        printSendMessage(id1, id2, messagesList);
    })
    
}
function CallbackGetMessages(result, id1, messagesList){
    printMessages(result, id1, id2, messagesList);
    //HideDivBloc()
}

function printMessages(messages, id1, messagesList){
    console.log(messages);
    messagesList.html('');
    $(messages).each(function(index){
        if (this.idUser == id1){
            var align = "text-right";
        }else{
            var align = "text-left";
        }
        var html = `
        <div class="message ${align}">
            <p class="date">${this.MessageDate}</p>
            <p>${this.Message}</p>
        </div>`;
    messagesList.append(html);

    });
}
function printSendMessage(id1, id2, messagesList){
    var html = `
    <div class="row">
    <div class="col-10">
        <textarea class="form-control" id="message" row="1"></textarea>
    </div>
    <div class"=col-2">
        <button type="button" class="btn btn-primary btn-send" id="btn-send" idloggeduser="${id1}" iduser="${id2}">Send</button>
    </div></div>`;
    messagesList.append(html);
   
}
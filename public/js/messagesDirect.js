$(document).ready(function(){
    InitializeMessagesDirect();
});

function InitializeMessagesDirect(){
    LoadMessages();
    EventsMessagesDirect();
}

function EventsMessagesDirect(){
    /* $("#SendMessage").on("click", "button[class*='btn-send']", function(){
        SendMessageDirect(this);
    }) */
    // New way to do it, you send the form and recollect the value from the input/select/textarea
    $("#messageTextForm").on("submit", function(e){
        e.preventDefault();
        SendMessageDirect(e.target);
        
    })
}
function LoadMessages(){  
    GetMessages();
    printSendMessage();
}

function SendMessageDirect(obj){
    const idLoggedUser = $("#messagesList")[0].dataset.idloggeduser;
    const idTeacher = $("#messagesList")[0].dataset.iduser;

    var formData = new FormData(obj);
    var message = formData.get('message');
   
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
    GetMessages();
    $("#message").val(''); 
    
}


function GetMessages(){
    //var idLoggedUser = $("#messagesList").attr("idloggeduser");
    //var conversationIdUser = $("#messagesList").attr("iduser");
    const idLoggedUser = $("#messagesList")[0].dataset.idloggeduser;
    const idTeacher = $("#messagesList")[0].dataset.iduser;

    var url = "http://finalproject.test/messages/get/"+idTeacher;
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
        CallbackGetMessages(idLoggedUser, result);
        setTimeout(GetMessages, 10000);
    })
    
}
function CallbackGetMessages(idLoggedUser, result){
    printMessages(idLoggedUser, result);
    //HideDivBloc()
}

function printMessages(idLoggedUser, messages){
    var messagesList = $('#messagesList');
    messagesList.html('');
    $(messages).each(function(index){
        if (this.idUser == idLoggedUser){
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
function printSendMessage(){
    //var idLoggedUser = $("#messagesList").attr("data-idloggeduser");
    //var conversationIdUser = $("#messagesList").attr("data-iduser");
    var SendMessage = $("#SendMessage");
    var html = `
    <form id="messageTextForm">
    <div class="row">
    <div class="col-10">
        <textarea class="form-control" id="message" row="1" name="message" required></textarea>
    </div>
    <div class"=col-2">
        <button type="submit" class="btn btn-primary btn-send" id="btn-send"">Send</button>
    </div>
    </div>
    <form>`;
    SendMessage.append(html);
   
}
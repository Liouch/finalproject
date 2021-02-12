$(document).ready(function(){
    InitializeMessagesDirect();
    
});
var scrolled=false;
function InitializeMessagesDirect(){
    LoadMessages();
    EventsMessagesDirect();
    checkNewMessages();
    
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
    $("#messagesList").on("scroll", function(){
        scrolled=true;
    })
}
function LoadMessages(){  
    GetMessages();
    printSendMessage();
    
}

function SendMessageDirect(obj){
    //const idLoggedUser = $("#messagesList")[0].dataset.idloggeduser;
    //const idUserConversation = $("#messagesList")[0].dataset.iduser;
    const idLoggedUser = $("#messagesList").data("idloggeduser");
    const idUserConversation = $("#messagesList").data("iduser");    

    var formData = new FormData(obj);
    var message = formData.get('message');
   
    var html = "Sending message";
    //ShowDivBlock(html)
    var objItem = {
        message: message,
        messagedate: ActualDateISO(),
        idteacher: "api/users/" + idLoggedUser,
        iduser: "api/users/" + idUserConversation,
        
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
    $("#messageTextArea").val(''); 
    
}


function GetMessages(){
    //var idLoggedUser = $("#messagesList").attr("idloggeduser");
    //var conversationIdUser = $("#messagesList").attr("iduser");
    //const idLoggedUser = $("#messagesList")[0].dataset.idloggeduser;
    //const idUserConversation = $("#messagesList")[0].dataset.iduser;
    const idLoggedUser = $("#messagesList").data("idloggeduser")
    const idUserConversation = $("#messagesList").data("iduser");    

    var url = "http://finalproject.test/messages/get/"+idUserConversation;
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
    console.log(messages);
    $(messages).each(function(index){
        if (this.idTeacher == idLoggedUser){
            var align = "row justify-content-end";
            var messageContainer = "message-container-sender"
        }else{
            var align = "row justify-content-start";
            var messageContainer = "message-container-receiver"
        }
        var html = `
        
        <div class="${align} mb-2">
            <div class="message-container col-auto ${messageContainer}">
            <p class="message">${this.Message}</p>
            </div>
        </div>`;
    messagesList.append(html);
    
    });
    MessageListScroll();
    isMessagesRead();
}
function printSendMessage(){
    //var idLoggedUser = $("#messagesList").attr("data-idloggeduser");
    //var conversationIdUser = $("#messagesList").attr("data-iduser");
    var SendMessage = $("#SendMessage");
    var html = `
    <form id="messageTextForm">
    <div class="row">
   
        <div class="col-10 col-xl-11 pr-0">
            <textarea class="form-control pb-0" id="messageTextArea" row="1" name="message" required></textarea>
        </div>
        <div class="col-1 pl-0">
            <button type="submit" class="btn btn-primary btn-send" id="btn-send"">Send</button>
        </div>        
    
    </div>
    </form>`;
    SendMessage.append(html);
    
}

function MessageListScroll(){
    if (!scrolled){
        var MessageDiv = document.getElementById('messagesList');
        MessageDiv.scrollTop = MessageDiv.scrollHeight;
        //console.log(MessageDiv.scrollHeight);
    }
}

function isMessagesRead(){
    var url = "http://finalproject.test/messages/setReadMessages";
    const idUserConversation = $("#messagesList").data("iduser");    
    var objData = {
        idUserConversation: idUserConversation,

    };
    $.ajax({
        type: "PUT",
        url: url,
        dataType: 'json',
        data: objData,
        error: function(){
            console.log("Something went wrong");
        }
    })
    .done(function(result){
        CallbackCheckNewMessages(result);
        setTimeout(checkNewMessages, 10000);
    })
    function CallbackCheckNewMessages(result){
        console.log(result);
        console.log("yyuo");
    }
}

    
$(document).ready(function(){
    InitializeMessages();
});

function InitializeMessages(){
    EventsMessages();
    GetAllMessages();
    checkNewMessages();
}

function EventsMessages(){
    $("#messagesList").on("click", "div[class*='card-message']", function(){
        OpenConversation(this);
    })
}

function OpenConversation(obj){
    var idConversationUser = $(obj).attr('iduser');
    var url = "http://finalproject.test/messages/" + idConversationUser;
    window.location.href = url;
}

function GetAllMessages(){
    var url = "http://finalproject.test/messages/showall";
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        error: function(){
            console.log("Something went wrong");
        }
    })
    .done(function(result){
        CallbackGetAllMessages(result);
        setTimeout(GetAllMessages, 10000);
    })
    function CallbackGetAllMessages(result){
        printAllMessages(result);
    }
}
function printAllMessages(messages){
    var messagesList = $("#messagesList");
    var userId = $("#dropdownMenuButton").data("iduser");
    if (messages.length > 0 ){
        messagesList.html('');
        messages.forEach(function(message){
            var idUserVar = "";
            var messageNotRead = "";
            if (message.MessageRead == 0 && userId == parseInt(message.idUser)){
                var messageNotRead = "not-read new-message-badge";
            }
            if (userId == message.idUser){
                var idUserVar = message.idTeacher;
                var nameConversation = message.idTeacherName;
            }else{
                var idUserVar = message.idUser;
                var nameConversation = message.idUserName;
            }
            var html = `
                <div class="card mt-2 card-message" idLoggedUser="${userId}" idUser="${idUserVar}">
                    <div class="card-header">${nameConversation}</div>
                    <div class="card-body">
                        <p class="card-text cut-text ${messageNotRead}">${message.Message}</p>
                    </div>
                </div>
            `
            messagesList.append(html);

        })
    }   
}

$(document).ready(function(){
    InitializeMessages();
});

function InitializeMessages(){
    EventsMessages();
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
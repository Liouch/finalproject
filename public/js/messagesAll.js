$(document).ready(function(){
    InitializeMessages();
});

function InitializeMessages(){
    EventsMessages();
}

function EventsMessages(){
    $("#messagesList").on("click", "div[class*='card-message']", function(){
        OpenConversation(this);
    })
}

function OpenConversation(obj){
    var id1 = $(obj).attr('idloggeduser');
    var id2 = $(obj).attr('iduser');
    var url = "http://finalproject.test/messages/" + id1 + "/" + id2;
    window.location.href = url;
}
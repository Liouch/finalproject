$(document).ready(function(){
    InitializeAdmin();
});

function InitializeAdmin(){
    EventsAdmin();
    LoadTeachers();
    checkNewMessages();
}

function EventsAdmin(){
    $("#lessonRequestList").on("click", "button[class*='btn-deactivate']", function(){
        ShowDeactivateLessonRequest(this);
    })
    $("#lessonRequestList").on("click", "button[class*='btn-activate']", function(){
        ShowDeactivateLessonRequest(this, 1);
    })
}
function ShowDeactivateLessonRequest(obj, active=0){
    var button = $(obj);
    var id = button.attr("deactivateId");
    var body = `<p>Are you sure you want to deactivate this lesson request?</p>`;
    var click = `"DeactivateAccount(${id}, ${active})"`;
    var value = "Deactivate";
    if (active == 1){
        var body = `<p>Are you sure you want to activate this lesson request?</p>`;
        var value = "Activate";
    };
    var header = "Activate/Deactivate Lesson Request";
    ModalWindow(header, body, click, value);
};

function DeactivateAccount(id, value){
    var url = "http://finalproject.test/admin/lesson-requests/edit/";
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data: {id:id, active: value},
        error: function(){
            console.log("something went wrong");
        }
    })
    .done(function(result){
        CallbackDeactivateLanguage(result);
    })
}
function CallbackDeactivateLanguage(result){
    alert(result.msg);
    LoadTeachers();
}

function LoadTeachers(){
    var url = "http://finalproject.test/admin/lesson-requests/get/";
    $.ajax({
        method: "POST",
        url: url,
        dataType: 'json',
        error: function(){
            console.log("Something went wrong");
        }
    })
    .done(function(result){
        CallbackLoadTeachers(result);
    })
}
function CallbackLoadTeachers(result){
    printLessonRequests(result);
}
function printLessonRequests(lessonRequests){
    var lessonRequestList = $("#lessonRequestList");
    lessonRequestList.html('');
    $(lessonRequests).each(function(index){
        //var language = getLanguage(this.idLanguage);
        var textLeft = "text-left";
        var active = this.active;
        var buttonName = "Deactivate";
        var buttonClass = "btn-danger";
        var buttonActive = "btn-deactivate";
        var activeYesNo = "Yes";
        if (active == 0){
            var buttonClass = "btn-success";
            var buttonName = "Activate";
            var buttonActive = "btn-activate";
            var activeYesNo = "No";
        }
        var html = `
        <div class="col-2 mt-2">${this.name}</div>
        <div class="col-3 mt-2 ${textLeft}" id="lessonRequest_${this.id}">${this.title}</div>
        <div class="col-3 mt-2 ${textLeft}"><p>${this.description}</p></div>
        <div class="col-1 mt-2"><p>${this.language}</p></div>
        <div class="col-1 mt-2"><p>${this.date}</p></div>
        <div class="col-1 mt-2"><p>${activeYesNo}</p></div>
        <div class="col-1 mt-2"><button type="button" class="btn ${buttonClass} ${buttonActive} w-100" deactivateId="${this.id}">${buttonName}</button></div>
        `;
        lessonRequestList.append(html); 
    })

}
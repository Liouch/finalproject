$(document).ready(function(){
    InitializeAdmin();
});

function InitializeAdmin(){
    EventsAdmin();
    LoadTeachers();
}

function EventsAdmin(){
    $("#teachersList").on("click", "button[class*='btn-deactivate']", function(){
        ShowDeactivateAccount(this);
    })
    $("#teachersList").on("click", "button[class*='btn-activate']", function(){
        ShowDeactivateAccount(this, 1);
    })
}
function ShowDeactivateAccount(obj, active=0){
    var button = $(obj);
    var id = button.attr("deactivateId");
    var body = `<p>Are you sure you want to deactivate this account?</p>`;
    var click = `"DeactivateAccount(${id}, ${active})"`;
    var value = "Deactivate";
    if (active == 1){
        var body = `<p>Are you sure you want to activate this account?</p>`;
        var value = "Activate";
    };
    var header = "Activate/Deactivate account";
    ModalWindow(header, body, click, value);
};

function DeactivateAccount(id, value){
    var url = "http://finalproject.test/admin/teachers/edit/";
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
    var url = "http://finalproject.test/admin/teachers/get/";
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
    console.log(result);
    printTeachers(result);
}
function printTeachers(teachers){
    var teachersList = $("#teachersList");
    teachersList.html('');
    $(teachers).each(function(index){
        var ProfilePicUrl = "/img/teacher/" + this.idUser + "/" + this.profilePic;
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
        <div class="col-1 mt-2 mx-auto"><img src="${ProfilePicUrl}" alt="${this.profilePic}" class="img-thumbnail"/></div>
        <div class="col-1 mt-2">${this.name}</div>
        <div class="col-3 mt-2 ${textLeft}" id="teacher_${this.idUser}">${this.title}</div>
        <div class="col-3 mt-2 ${textLeft}"><p>${this.description}</p></div>
        <div class="col-1 mt-2"><p>${this.rating}</p></div>
        <div class="col-1 mt-2"><p>${this.signUpDate}</p></div>
        <div class="col-1 mt-2"><p>${activeYesNo}</p></div>
        <div class="col-1 mt-2"><button type="button" class="btn ${buttonClass} ${buttonActive} w-100" deactivateId="${this.id}">${buttonName}</button></div>
        `;
        teachersList.append(html); 
    })

}
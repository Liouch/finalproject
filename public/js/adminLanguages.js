$(document).ready(function(){
    InitializeAdmin();
});

function InitializeAdmin(){
    EventsAdmin();
    LoadLanguages();
}

function EventsAdmin(){
    $("#btn-new-language").on("click", function(){
        ShowNewLanguageModal();
    })
    $("#languagesList").on("click", "button[class*='btn-edit']", function(){
        ShowEditLessonRequest(this);
    })
    $("#languagesList").on("click", "button[class*='btn-deactivate']", function(){
        ShowDeleteLessonRequest(this);
    })
    $("#languagesList").on("click", "button[class*='btn-activate']", function(){
        ShowDeleteLessonRequest(this, 1);
    })
}
function ShowDeleteLessonRequest(obj, active=0){
    var button = $(obj);
    var id = button.attr("deactivateId");
    var body = `<p>Are you sure you want to deactivate this language?</p>`;
    var click = `"DeactivateLanguage(${id}, ${active})"`;
    var value = "Deactivate";
    if (active == 1){
        var body = `<p>Are you sure you want to activate this language?</p>`;
        var value = "Activate";
    };
    var header = "Activate/Deactivate language";
    ModalWindow(header, body, click, value);
};

function ShowEditLessonRequest(obj){
    var button = $(obj);
    var id = button.attr("editId");
    var language = $("#language_"+id).html();
    var idLanguage = "txtLanguage";
    var body = 
            `
            <label>Language</label>
            <input type="text" class="form-control mb-2" id="${idLanguage}" value="${language}"required></input>
           `;
    var click = `"EditLanguage('${idLanguage}', '${id}')"`;
    var value = "Update";
    var header = "Edit language";
    ModalWindow(header, body, click, value); 
}

function ShowNewLanguageModal(){
    var idLanguage = "txtLanguage";   
    var body = 
            `
            <label>Language</label>
            <input type="text" class="form-control mb-2" id="${idLanguage}" required></input>
           `;
           
    var click = `"NewLanguage('${idLanguage}')"`;
    var value = "Confirm";
    var header = "Add new language";
    ModalWindow(header, body, click, value);
}

function DeactivateLanguage(id, value){
    console.log("entra");
    var url = "http://finalproject.test/admin/languages/edit/";
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
    LoadLanguages();
}
function EditLanguage(idLanguage, id){
    var language = $("#"+idLanguage).val();
    
    var url = "http://finalproject.test/admin/languages/edit/";
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data: {language: language, id: id},
        error: function(){
            console.log("Something went wrong");
        }
    })
    .done(function(result){
        CallbackEditLanguage(result);
    })
}
function CallbackEditLanguage(result){
    alert(result.msg);
    LoadLanguages();
}
function NewLanguage(id){
    var language = $("#"+id).val();
    console.log(language);
    //ShowDivBlock(html)

    var url = "http://finalproject.test/admin/languages/new/";
    console.log(url);
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data: { language: language},
        error: function(){
            console.log("something went wrong");
        }
    })
    .done(function(result){
        CallbackNewLanguage(result); 
    })
}
function CallbackNewLanguage(result){
    alert(result.msg);
    LoadLanguages();
}
function LoadLanguages(){
    var url = "http://finalproject.test/admin/languages/get/";
    $.ajax({
        method: "POST",
        url: url,
        dataType: 'json',
        error: function(){
            console.log("Something went wrong");
        }
    })
    .done(function(result){
        CallbackLoadLanguages(result);
    })
}
function CallbackLoadLanguages(result){
    printLanguages(result);
}
function printLanguages(languages){
    var languagesList = $("#languagesList");
    languagesList.html('');
    $(languages).each(function(index){
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
        <div class="col-4 mt-2" id="language_${this.id}">${this.language}</div>
        <div class="col-4 mt-2"><p>${activeYesNo}</p></div>
        <div class="col-2 mt-2"><button type="button" class="btn btn-primary btn-edit" editId="${this.id}">Edit</button></div>
        <div class="col-2 mt-2"><button type="button" class="btn ${buttonClass} ${buttonActive} w-100" deactivateId="${this.id}">${buttonName}</button></div>
        `;
    languagesList.append(html); 
    })

}
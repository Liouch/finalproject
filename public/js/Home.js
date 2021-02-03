$(document).ready(function(){
    InitializeHome();
});

function InitializeHome(){
    EventsLessonRequest();
    LoadTop5NewTeachers();
    LoadTop5NewLessonRequests();
    LoadLanguages();
}

function EventsLessonRequest(){
    $("#top5NewLessonRequestList").on("click", "button[class*='btn-send']", function(){
        ShowSendMessageModal(this);
    })
}
var objLanguages;
function LoadLanguages(){
    var obj = { page: 1}
    getLanguages(obj);
}

function getLanguages(objData){
    var obj = {
        url: "http://localhost:8000/api/languages",
        data: objData,
        functionName: CallbackLanguages
    }
    AjaxGetAll(obj)
}
function CallbackLanguages(result){
    objLanguages = result;
    
}
function LoadTop5NewLessonRequests(){
    obj = {
        page: 1,
        itemsPerPage: 5
    }
    getTop5NewLessonRequets(obj);
}

function getTop5NewLessonRequets(objData){
    var obj = {
        url: "http://finalproject.test/api/lessonrequests?active=1&order%5Bdate%5D=desc&page=1",
        data: objData,
        functionName: CallbackGetTop5NewLessonRequests
    }
    AjaxGetAll(obj);
}

function CallbackGetTop5NewLessonRequests(result){
    //console.log(result);
    printLessonRequests(result);
}

function LoadTop5NewTeachers(){
    var obj = { 
        page: 1,
        itemsPerPage: 5}
    getTop5NewTeachers(obj);
}

function getTop5NewTeachers(objData){
    var obj = {
        url: "http://finalproject.test/api/teachers?active=1&order%5Bsignupdate%5D=desc",
        data: objData,
        functionName: CallbackGetTop5NewTEachers
    }
    AjaxGetAll(obj)
}
function CallbackGetTop5NewTEachers(result){
   //console.log(result);
    printTeachers(result)

}
function printLessonRequests(LessonRequests){
    var top5NewLessonRequestList = $('#top5NewLessonRequestList');
    top5NewLessonRequestList.html('');
    var html = carrouselHtml("carousel2","carouselLessonRequestCards");
    top5NewLessonRequestList.append(html);

    $(LessonRequests).each(function(index){
        var date = getDateWithoutTime(this.date);
        var nameLanguage = GetNameLanguage(this.idlanguage);
        var idUser = GetIdApi(this.iduser);
        var active = "";
        if (index == 0){
            var active = "active";
        }
        var html = `
            <div class="carousel-item ${active}">
                <div class="card mb-4">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-12 col-sm-4 text-left" id="title_${this.id}">${this.title}</div>
                            <div class="col-12 col-sm-4 text-left text-sm-center" id="language_${this.id}">${nameLanguage}</div>
                            <div class="col-12 col-sm-4 text-left text-sm-right" id="language_${this.id}">${date}</div>
                        </div>
                    </div>
                    <div class="card-body px-5">
                        <p class="card-text">${this.description}</p>
                        <div class="text-right">
                            <button type="button" class="btn btn-primary btn-send" id="${this.id}" idUser="${idUser}">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        $("#carouselLessonRequestCards").append(html);
    });

}
function printTeachers(teachers){
    //var lessons = lessonRequests["hydra:member"];
    var top5NewTeachersList = $('#top5NewTeachersList');
    top5NewTeachersList.html('');
    var html = carrouselHtml("carousel1","carouselTeacherCards");
    top5NewTeachersList.append(html);
    $(teachers).each(function(index){
        var title = this.title;
        var description = this.description;
        var profilePic = this.profilepic;
        var idTeacher = GetIdApi(this.iduser);
        var profilePicUrl = "/img/teacher/" + idTeacher + "/" + profilePic;
        var rating = this.rating;
        var active = "";
        if (index == 0){
            var active = "active";
        }
        var htmlCarousel = `
            <div class="carousel-item ${active}">
                <div class="card">
                    <div class="row align-items-center px-0 px-sm-3">
                        <div class="col-12 col-sm-4 col-md-3 p-2">
                            <div class="rounded-circle custom-circle-image-home mx-auto">
                                <img src="${profilePicUrl}" class="w-100 h-100" alt="${profilePicUrl}">
                            </div>
                        </div>
                        
                        <div class="col-12 col-sm-8 col-md-9">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${description}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    $("#carouselTeacherCards").append(htmlCarousel);
    });
}   

function carrouselHtml(idCarousel, id){
    var html = 
    `<div id="${idCarousel}" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner" id="${id}">
    </div>
    <a class="carousel-control-prev" href="#${idCarousel}" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#${idCarousel}" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>`
    return html;
}

function CallbackSaveLessonRequest(result){
    alert("Message sent");
}
    
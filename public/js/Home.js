$(document).ready(function(){
    InitializeHome();
});

function InitializeHome(){
    EventsLessonRequest();
    LoadTop5NewTeachers();
}

function EventsLessonRequest(){
    /* $("#lessonRequestList").on("click", "button[class*='btn-send']", function(){
        ShowSendMessageModal(this);
    }) */
}



function LoadTop5NewTeachers(){
    var obj = { 
        page: 1,
        'order%5Bsignupdate%5D': "desc",
        itemsPerPage: 5}
    getTop5NewTeachers(obj);
}

function getTop5NewTeachers(objData){
    var obj = {
        url: "http://finalproject.test/api/teachers?order%5Bsignupdate%5D=desc",
        data: objData,
        functionName: CallbackLanguages
    }
    AjaxGetAll(obj)
}
function CallbackLanguages(result){
   console.log(result);
    printLessonRequests(result)

}

function printLessonRequests(teachers){
    //var lessons = lessonRequests["hydra:member"];
    var top5NewTeachersList = $('#top5NewTeachersList');
    top5NewTeachersList.html('');
    var html = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner" id="carouselTeacherCards">
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>`;
    top5NewTeachersList.append(html);
    $(teachers).each(function(index){
        console.log(this);
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
                    <div class="row align-items-center">
                        <div class="col-12 col-sm-4 col-md-3">
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

function GetIdApi(value){
    return value.split("/")[3];
}

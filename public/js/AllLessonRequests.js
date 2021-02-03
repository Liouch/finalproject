$(document).ready(function(){
    InitializeLessonRequests();

});

function InitializeLessonRequests(){
    EventsLessonRequest();
    LoadLanguages();

}

function EventsLessonRequest(){
    $("#lessonRequestList").on("click", "button[class*='btn-send']", function(){
        ShowSendMessageModal(this);
    });
    $("#filtersForm").on("submit", function(e){
        e.preventDefault();
        //console.log(window.location.search)
        applyFilters(e.target);
        LoadLessonRequests(filter);
    });
    $(".btn-filter-clear").on("click", function(){
        clearFilters();
    });
    $("#lessonRequestpagination").on("click", "button:not(:disabled)", function(){
        ClickPaginator(this);
     });
    
}

var objLessonRequests;
var filter;

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
    languagesFilter();
    LoadLessonRequests();
}

function LoadLessonRequests(filter="", currentPage = 1){
    var obj = {
        url: "http://finalproject.test/api/lessonrequests?active=1"+filter,
        data: { 
            page: currentPage,
            itemsPerPage: 5,
            active: 1,
        },
        functionName: CallbackGetAllLessons
    }
    //console.log(obj.url);
    AjaxGetAll(obj, null)
}

function CallbackGetAllLessons(result){
    objLessonRequests = result;
    //console.log(objLessonRequests);
    
    printLessonRequests(objLessonRequests)
    
}

function printLessonRequests(lessonRequestsObj){
    var lessonRequests = lessonRequestsObj["hydra:member"];
    var lessonRequestList = $('#lessonRequestList');
    lessonRequestList.html('');
    if (lessonRequests.length == 0 ){
        var html = `<p class="text-center">There are no lesson requests right now</p>`
        lessonRequestList.append(html);
    }else{
        $(lessonRequests).each(function(index){
            var date = getDateWithoutTime(this.date);
            var nameLanguage = GetNameLanguage(this.idlanguage);
            var idUser = GetIdApi(this.iduser);
            var html = `
                    <div class="card mb-4">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-12 col-sm-4 text-left" id="title_${this.id}">${this.title}</div>
                                <div class="col-12 col-sm-4 text-left text-sm-center" id="language_${this.id}">${nameLanguage}</div>
                                <div class="col-12 col-sm-4 text-left text-sm-right" id="language_${this.id}">${date}</div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${this.description}</p>
                            <div class="text-right">
                                <button type="button" class="btn btn-primary btn-send" id="${this.id}" idUser="${idUser}">Send Message</button>
                            </div>
                        </div>
                    </div>
                    `;


        lessonRequestList.append(html);
        });
    }
    createPaginator(lessonRequestsObj["hydra:view"], "#lessonRequestpagination");
}   

function ClickPaginator(obj){
    var objPage = $(obj).attr("page");
    console.log(objPage);
    LoadLessonRequests(filter, objPage);

}

function CallbackSaveLessonRequest(result){
    //HideDivBlock();
    alert("Message sent");
    LoadLessonRequests();
}

function CreateLanguageCombo(idLanguage, idLang=null){
    var returnValue = `<select id="${idLanguage}" required>`;
    returnValue = returnValue + `<option style="display:none">Select a language</option>`;
    $(objLanguages).each(function(index){
        var selected = "";
        if (this.id==idLang) selected ="selected";
        returnValue = returnValue + `<option value="${this.id}" ${selected}>${this.language}</option>`
    });
    returnValue = returnValue + "</select>";

    return returnValue;

}
function languagesFilter(){
    var filterLanguageSelect = $("#filterLanguages");
    returnValue = `<option value="none" style="display:none">Languages</option>`;
    $(objLanguages).each(function(index){
        returnValue = returnValue + `<option value="${this.id}">${this.language}</option>`
    })
    filterLanguageSelect.append(returnValue)
}
function applyFilters(obj){
    var formData = new FormData(obj);
    var date = formData.get('date');
    var languages = formData.get('languages');
    const params = new URLSearchParams({
        date: date,
        idlanguage: languages,
      });
      params.toString();
    console.log(params.toString());
    var ApiParams = params.toString().replace("date", "[date]");
    filter = "&order";
    filter += ApiParams;
    console.log(filter);
    return filter;
    
    
}
function clearFilters(){
   $("#filterDate").val('none').change();
   $("#filterLanguages").val('none').change();
   LoadLessonRequests();
}
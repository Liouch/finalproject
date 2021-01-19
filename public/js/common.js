function ActualDateISO(){
    var d = new Date();
    var month = ConvertMonthDay(d.getMonth(),1);
    var date = ConvertMonthDay(d.getDate());
    return d.getFullYear().toString() + month + date;
       
}

function ConvertMonthDay(value, uno=0){
    if (value >= 0 && value <=8) {
        value = "0"+ (value+uno).toString()
    }else {
        value = (value+uno).toString()
    };
    return value;
}

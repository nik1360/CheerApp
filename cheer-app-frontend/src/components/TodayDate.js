const TodayDate =()=>{
    var today = new Date()
    var yyyy = today.getFullYear()
    var mm = today.getMonth()+1
    var dd = today.getDate()
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var todayDate= `${yyyy}-${mm}-${dd}`
    return todayDate
}

export default TodayDate
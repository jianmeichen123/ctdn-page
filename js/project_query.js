function _query(){
    var querydata = {}
    $("[data-query]").each(function(i,e){
        var o = $(e)
        var type = o.attr("data-query").split(":")[1]
        if(type=="normal"||type=="nor"){
            var name = o.attr("data-query").split(":")[0]
            querydata[name] = []
            o.find(".pick_on").each(function(j,f){
                if($(f).attr("data-id")){
                    querydata[name].push($(f).attr("data-id"))
                }
            })

        }else if(type=="district"){

            var name = o.attr("data-query").split(":")[0]
                if (!querydata[name]){
                    querydata[name] = []
                }
            o.find(".pick_on").each(function(j,f){
                if($(f).attr("data-id")){
                   querydata[name].push($(f).attr("data-id"))
                }
            })

        }

    })

    var beginDate=$("#begin").val();
    var endDate=$("#end").val();
    var sdate = [];
    var edate = [];
    var arys1= [];
    var arys2= [];
    var d1 = "";
    var d2 = "";
    if(beginDate != null && endDate != null) {
        arys1=beginDate.split(' ');
        d1 = arys1[0];
        sdate = d1.split('-');
        d1 = sdate[0]+sdate[1]+sdate[2];
        arys2=endDate.split(' ');
        d2=arys2[0];
        edate = d2.split('-');
        d2 = edate[0]+edate[1]+edate[2];
        if(parseInt(d1) > parseInt(d2)) {
            alert("日期开始时间大于结束时间");
        }  else {
            d1 = sdate[0]+'-'+sdate[1]+'-'+sdate[2];
            d2 = edate[0]+'-'+edate[1]+'-'+edate[2];
            querydata["beginDate"] = d1;
            querydata["endDate"] = d2;
        }
    }

    querydata["projTitle"] = $("#projTitle").val();
    console.log(querydata)
    /*sendPostRequestByJsonObj("http://10.9.130.143:8081/api/search/project", querydata, function(cData){console.log(data)})*/
}



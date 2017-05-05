function _query(){
    var querydata = {}
    $("[data-query]").each(function(i,e){
        var o = $(e)
        if(o.attr("data-query")){
            var name = o.attr("data-query").split(":")[0]
            querydata[name] = []
            o.find(".pick_on").each(function(j,f){
                if($(f).attr("data-id")){
                querydata[name].push($(f).attr("data-id"))
                }
            })
        }

    })

    console.log(querydata)
    /*sendPostRequestByJsonObj("http://10.9.130.143:8081/api/search/project", querydata, function(cData){console.log(data)})*/
}
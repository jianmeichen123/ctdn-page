//报告正文
var id = getHrefParamter("id");
sendGetRequest(detail.getReport+id,function(data){fillReportInfo(data.data,$("div[data-query='getReport']"))})

function fillReportInfo(data,divList){
    $(divList).each(function(){
        var div = $(this)
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
            var o = $(this);
            var k = o.attr("data-field");
            var v = data[k]
            if(v){
                o.html(v)
            }
        })
    })
}

//报告列表
sendGetRequest(detail.queryReports,function(data){
    $("#ul").html("")
    console.log(data)
    var target =$("#report_particulars")
    if(data.page && data.page.records){
        var arr = [];
        for(i in data.page.records){
            if(i < 10){
                if(data.page.records[i].id != id){
                    arr.push(data.page.records[i])
                }
            }
        }
        target.tmpl(arr).appendTo($("#ul"));
    }
})

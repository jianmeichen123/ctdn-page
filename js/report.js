//报告正文
var id = getHrefParamter("id");
if(!id){
    id=-1;
}
sendGetRequest(detail.getReport+id,function(data){fillReportInfo(data.data,$("div[data-query='getReport']"))})

function fillReportInfo(data,divList){
    if(data){
        if(isCollection("4",data["id"]+'')){
             $(".click_collect").toggleClass('dn_ico_list_collect_on');
         }
    }
    $(divList).each(function(){
        var div = $(this)
        var ls = div.find("*[data-field]")
        $("#reportId").attr("code",id)
        $(ls).each(function(){
            var o = $(this);
            var k = o.attr("data-field");
            var v = data[k]
            if(k=='authorName'){
                if(!v){
                    $(".report_detailed_head").hide();
                }
            }
            if(k=='authorAvatar'){
                $(".pic_one img").attr('src',v);
            }
            if(v){
                o.html(v)
            }
        })
    })
}

//报告列表
sendGetRequest(detail.queryReports,function(data){
    $("#ul").html("")
    var target =$("#report_particulars")
    if(data.page && data.page.records){
        var arr = [];
        for(i in data.page.records){
            if(arr.length< 10){
                if(data.page.records[i].id != id){
                    data.page.records[i].title = formatTitle(data.page.records[i].title)
                    arr.push(data.page.records[i])
                }
            }
        }
        target.tmpl(arr).appendTo($("#ul"));
    }
})

function formatTitle(title){
    if(title.length>24){
        title = title.substring(0,24);
    }
    return title;
}


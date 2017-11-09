
var divList = $(".container").find("div[data-block]");
$(divList).each(function(){
    var div =$(this);
    var url = detail[div.attr("data-block")];
    sendGetRequest(url,function(data){
       $(data.data).each(function(k,v){
            if(!v){
                v="-"
            }else{
                for(i in v){
                    if(i=="investDate"){
                        v[i] = formatDate(v[i],"yyyy-MM-dd")
                    }
                    if(i=="newsContent"){
                        if(v[i].length>88){
                            v[i]=v[i].substring(0,88)+'...'
                        }
                    }
                }
            }
       })
       var target = $("#"+div.attr("data-block"));
       target.tmpl(data).appendTo(target.parent())
    })
})

//新闻
function getNews(){
    var json={};
    json["newsTypeName"] = $("input[name='newsTypeName']").val();
    json["pageSize"]=6;
    json["pageNo"]=0;
     sendPostRequestByJsonObj(searchUrl["news"],json,function(data){
           $(data.records).each(function(k,v){
                if(!v){
                    v="-"
                }else{
                    for(i in v){
                        if(i=="newsContent"){
                            if(v[i].length>88){
                                v[i]=v[i].substring(0,88)+'...'
                            }
                        }
                    }
                }
           })
           $("#newsList").html("");
           $("#getAllnews").tmpl(data).appendTo($("#newsList"))
        })
}


$(function () {
    getNews();
})



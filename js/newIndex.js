
    var url = detail['getCTDNEventInfo'];
    sendPostRequestByJsonObj(url,{"pageSize":5},function(data){
       $(data.data).each(function(k,v){
            if(!v){
                v="-"
            }else{
                for(i in v){
                    if(i=='invstorgnames'&&!v[i]){
                        v[i]='--'
                    }
                }
            }
       })
       var target = $("#getCTDNEventInfo");
       target.tmpl(data).appendTo(target.parent())
    })
//新闻
function getNews(){
    var json={};
    json["typeId"] = $("input[name='typeId']").val();
    json["pageSize"]=6;
    json["pageNo"]=0;
     sendPostRequestByJsonObj(searchUrl["news"],json,function(data){
           $(data.data).each(function(k,v){
                if(!v){
                    v="-"
                }else{
                    for(i in v){
                        if(i=="records"){
                            for(j in v[i]){
                               if(v[i][j].overview.length>150){
                                   v[i][j].overview=v[i][j].overview.substring(0,150)+'...'
                               }
                                v[i][j].orderTime= formatNewsTime(v[i][j].orderTime)
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



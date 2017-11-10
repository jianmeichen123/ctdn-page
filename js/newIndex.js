
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
           $(data.data).each(function(k,v){
                if(!v){
                    v="-"
                }else{
                    for(i in v){
                        if(i=="records"){
                            for(j in v[i]){
                               if(v[i][j].newsContent.length>88){
                                   v[i][j].newsContent=v[i][j].newsContent.substring(0,88)+'...'
                               }
                                 var dateTimeStamp=Date.parse(v[i][j].newsReportDate.replace(/-/gi,"/"));
                                 var result = '';
                                 //JavaScript函数：
                                 var minute = 1000 * 60;
                                 var hour = minute * 60;
                                 var day = hour * 24;
                                 var halfamonth = day * 15;
                                 var month = day * 30;
                                 var now = new Date().getTime();
                                 var diffValue = now - dateTimeStamp;
                                 if(diffValue < 0){
                                  //若日期不符则弹出窗口告之
                                  //alert("结束日期不能小于开始日期！");
                                  }
                                 var monthC =diffValue/month;
                                 var weekC =diffValue/(7*day);
                                 var dayC =diffValue/day;
                                 var hourC =diffValue/hour;
                                 var minC =diffValue/minute;
                                 if(monthC>=1){
                                      result="发表于" + parseInt(monthC) + "个月前";
                                  }
                                  else if(weekC>=1){
                                     result="发表于" + parseInt(weekC) + "周前";
                                  }
                                  else if(dayC>=1){
                                     result="发表于"+ parseInt(dayC) +"天前";
                                  }
                                  else if(hourC>=1){
                                     result="发表于"+ parseInt(hourC) +"个小时前";
                                  }
                                  else if(minC>=1){
                                     result="发表于"+ parseInt(minC) +"分钟前";
                                  }else{
                                     result="刚刚发表";
                                  }
                                  v[i][j].newsReportDate=result
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



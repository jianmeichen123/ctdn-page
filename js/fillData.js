//var code = getHrefParamter("code");
function eventInfoListFormatter(data,div){
     var staticTemplate =  "<tr><td>${investDate}</td><td>${round}</td><td> ${amountStr}</td><td>${valuation}</td><td>${stock}</td><td>${investSideJson}</td><td>${eventId}</td></tr>";
     var temp = staticTemplate;
     var html = "<tbody>";
     //遍历数组
     $(data).each(function(i,row){
        $.each(row,function(k,v){
            while(temp.indexOf("${"+k+"}") > 1){
                if(v){
                    if(k =="investSideJson"){
                        var json = eval("(" + v + ")");
                        var ls = json["investSideJson"];
                        var firms = "";
                        $(ls).each(function(){
                           //待修改 没加领投
                           firms += "<a href = '#?id="+$(this)[0].code+"'>"+$(this)[0].title+"</a>";
                        })
                        v = firms
                    }
                    if(k == "eventId"){
                         //待修改 跳转事件详情
                         v = "<a href='#?id="+row.eventId+"'>详情</a>"
                    }
                    if(k =="investDate"){
                        v = formatDate(v, "yyyy-MM-dd")
                    }
                }else{
                    v= "-"
                }
                temp =temp.replace("${"+k+"}",v)
            }
        })
        html += temp;
        temp = staticTemplate
     })
     html+="</tbody>";
     div.append(html)
}
function projectTeamListFormatter(data,div){
     var staticTemplate = '<li> <img src="${logo}"/> <ul class="product_list_team_ul"> <li class="font_14">${name}<span >${job}</span></li> <li class="color_666 font_12" >${college}<span>${edu}</span></li> <li class="color_999 font_12">${introduction}</li> </ul> </li>'
     var temp = staticTemplate;
     var html =""
     $(data).each(function(i,row){
         $.each(row,function(k,v){
             while(temp.indexOf("${"+k+"}") > 1){
                 temp =temp.replace("${"+k+"}",v)
             }
         })
         html += temp;
         temp = staticTemplate
    })
    div.append(html)
}
function historyListFormatter(data,div){
     var staticTemplate = '<li> <div class="relative m_t5"><span class="circle_b"></span><span>${content}</span></div> <div class="color_999 relative">${date}</div> </li>'
     var temp = staticTemplate;
     var html =""
     $(data).each(function(i,row){
         $.each(row,function(k,v){
             while(temp.indexOf("${"+k+"}") > 1){
                 temp =temp.replace("${"+k+"}",v)
             }
         })
         html += temp;
         temp = staticTemplate
    })
    div.append(html)
}
function labelFormat(val,o){
   if(val){
       var str = "";
       $(val.split(","),function(i,e){
           str.append("<span class='project_lable'>");
           str.append(e);
           str.append("</span>");
       })
       o.append(str)
   }
}
sendGetRequest(detail.queryProject+"12345",function(data){fillOne(data.data,$("div[data-query='projectBase']"),fillList(data.data,$("*[data-query='list']")))})
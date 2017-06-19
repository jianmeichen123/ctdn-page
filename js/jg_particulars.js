
// 基本信息
function fillBaseInfo(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
           var o = $(this);
           var k = o.attr("data-field")
           var v = data[o.attr("data-field")]
           if(typeof(o.attr("data-formatter")) != "undefined"){
                var func = o.attr("data-formatter");
                if(func && func in window){
                    window[func](v,o)
                }
           }else{
                if(k=='logo'){
                   o.attr('src','http:///10.10.0.147/org/'+v)
                }
                if(k=="foundDate"){
                    v = formatDate(v,"yyyy-MM-dd")
                }
                if(v){
                    o.html(v)
                }else{
                    o.html("-")
                }
           }
        })
    })
}

//投资事件
function eventInfoListFormatter(data,div){
     var staticTemplate =  "<tr><td>${investSideJson}</td><td>${company}</td><td>${investDate}</td><td>${round}</td><td> ${amountStr}</td><td>${eventId}</td></tr>";
     var temp = staticTemplate;
     var html = "";
     //遍历数组
     $(data).each(function(i,row){
        $.each(row,function(k,v){
            while(temp.indexOf("${"+k+"}") > 1){
                if(v){
                    if(k =="investSideJson"){
                        var json = eval("(" + v + ")");
                        var ls = json["investSideJson"];
                        var firms = "";
                        for(i in ls){
                            var json = ls[i]
                            if(i<3){
                                firms += "<a href = '#?id="+json.id+"'>"+json.invstor+"</a><br>";
                            }
                        }
//                        $(ls).each(function(){
//                           //待修改 没加领投
//                           firms += "<a href = '#?id="+$(this)[0].id+"'>"+$(this)[0].invstor+"</a><br>";
//                        })
                        v = firms
                    }
                    if(k == "eventId"){
                         //待修改 跳转事件详情
                         v = "<a href='/tzsj_particulars.html?eventId="+v+"'>详情</a>"
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
     div.append(html)
}
//相关新闻
function orgMediaInfoListFormatter(data,div){
   var staticTemplate = '<tr> <td class="one">${title}</td> <td class="two">${content}</td> <td class="three">${eventDate}</td> </tr>'
   var temp = staticTemplate;
    var html =""
    $(data).each(function(i,row){
         $.each(row,function(k,v){
             while(temp.indexOf("${"+k+"}") > 1){
                if(k =="eventDate"){
                    v = formatDate(v, "yyyy-MM-dd")
                }
                if(!v){ v = "-"}
                temp = temp.replace("${"+k+"}",v)
             }
         })
         html += temp;
         temp = staticTemplate
    })
    div.append(html)
}
//机构成员
function orgMemberInfoListFormatter(data,div){
   var staticTemplate = '<tr> <td>${fund}</td> <td>${investOrg}</td> <td>${foundDate}</td><td>${fundType}</td> <td>${investDate}</td><td>${commitAmount}</td></tr>'
   var temp = staticTemplate;
    var html =""
    $(data).each(function(i,row){
         $.each(row,function(k,v){
             while(temp.indexOf("${"+k+"}") > 1){
                if(k =="investDate"){
                    v = formatDate(v, "yyyy-MM-dd")
                }
                if(k =="foundDate"){
                    v = formatDate(v, "yyyy-MM-dd")
                }
                if(!v){ v = "-"}
                temp = temp.replace("${"+k+"}",v)
             }
         })
         html += temp;
         temp = staticTemplate
    })
    div.append(html)
}
//联系方式
function projectContactListFormatter(data,div){
    var staticTemplate ='<tr> <td>${city}</td> <td>${addr}</td> <td>${zipCode}</td> <td>${tel}</td> <td>${mail}</td> <td>${fax}</td> </tr>'
    var temp = staticTemplate;
    var html = "";
    $(data).each(function(i,row){
     $.each(row,function(k,v){
         while(temp.indexOf("${"+k+"}") > 1){
             if(!v){
                 v= "-"
             }
             temp =temp.replace("${"+k+"}",v)
         }
     })
     html += temp;
     temp = staticTemplate
    })
    div.append(html)
}
var orgId = getHrefParamter("orgId")
sendGetRequest(detail.queryInvestOrgInfo+orgId,function(data){fillBaseInfo(data.data,$("div[data-query='baseOrgInfo']")); fillList(data.data,$("*[data-query='list']"))})
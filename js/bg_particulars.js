
function fillBgBaseInfo(data,divList){
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
                if(k=='mergeDate'){
                    v = formatDate(v,'yyyy-MM-dd')
                }
                if(k=='desc'&&!v){
                    v = '暂无描述'
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
//并购方
function mergeSideListFormatter(data,div){
   var staticTemplate = '<tr> <td>${partyName}</td> <td>${industry}</td> <td>${district}</td><td>${isVcFe}</td> <td>${isStock}</td><td>${isNation}</td><td>${lawFirms}</td><td>${accountFirms}</td><td>${financeConsult}</td></tr>'
   var temp = staticTemplate;
    var html =""
    if(!data.length>0){
                 html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
     }
    $(data).each(function(i,row){
         $.each(row,function(k,v){
             while(temp.indexOf("${"+k+"}") > 1){
                if(k=='partyName'){
                    var json = eval("("+v+")")
                    var ls = json["mergeSideJson"]
                    var mergeSideJson = ''
                    for(i in ls){
                        mergeSideJson = ls[i]
                        if(mergeSideJson.type=='com'){
                            v= "<span class='list_table_td'><a href = '/project_qy.html?code="+mergeSideJson.code+"'>"+mergeSideJson.title+"</a></span>";
                        }
                        if(mergeSideJson.type=='invse'){
                            v= "<span class='list_table_td'><a href = 'jg_particulars.html?orgId="+mergeSideJson.id+"'>"+mergeSideJson.title+"</a></span>";
                        }
                    }
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

//被并购方
function beenMergeSideListFormatter(data,div){
   var staticTemplate = '<tr> <td>${partyName}</td> <td>${industry}</td> <td>${district}</td><td>${isVcFe}</td> <td>${isStock}</td><td>${isNation}</td><td>${lawFirms}</td><td>${accountFirms}</td><td>${financeConsult}</td></tr>'
   var temp = staticTemplate;
    var html =""
    if(!data.length>0){
                 html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
     }
    $(data).each(function(i,row){
         $.each(row,function(k,v){
             while(temp.indexOf("${"+k+"}") > 1){
                if(k=='partyName'){
                    var json = eval("("+v+")")
                    var ls = json["mergeSideJson"]
                    var mergeSideJson = ''
                    for(i in ls){
                        mergeSideJson = ls[i]
                        if(mergeSideJson.type=='com'){
                            v= "<span class='list_table_td'><a href = '/project_qy.html?code="+mergeSideJson.code+"'>"+mergeSideJson.title+"</a></span>";
                        }
                        if(mergeSideJson.type=='invse'){
                            v= "<span class='list_table_td'><a href = 'jg_particulars.html?orgId="+mergeSideJson.id+"'>"+mergeSideJson.title+"</a></span>";
                        }
                    }
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
var eventId = getHrefParamter("eventId");
sendGetRequest(detail.queryMergeEventInfo+eventId,function(data){fillBgBaseInfo(data.data,$("div[data-query='mergeEventInfo']")); fillList(data.data,$("*[data-query='list']"))})
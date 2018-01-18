
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
                if(k=='amountStr'&&!v){
                    v='未透露'
                }
                if(k=='mergeDate'){
                    v = formatDate(v,'yyyy-MM-dd')
                }
                if(k=='equityRate'&&v){
                    v=v+'%'
                }
                if(k=='desc'&&!v){
                    v = '暂无描述'
                }
                if(k=='industrySubname'&&!v){
                    v=' '
                }
                if(k=='equityRate'&&!v){
                    v='未透露'
                }
                if(k=='valuation'&&!data.equityRate){
                    v='未透露'
                }
                if(v){
                    o.html(v)
                }else{
                    o.html(table.empty)
                }
           }
        })
    })
}
//并购方
function mergeSideListFormatter(data,div){
   var staticTemplate = '<tr> <td class="bgsh">${partyName}</td> <td>${industryName}</td> <td>${districtSubName}</td><td>${isVcFe}</td> <td>${isStock}</td><td>${isNation}</td><td>${lawFirms}</td><td>${accountFirms}</td><td>${financeConsult}</td></tr>'
   var temp = staticTemplate;
    var html =""
    if(data.length>0){
         $(data).each(function(i,row){
                 $.each(row,function(k,v){
                     while(temp.indexOf("${"+k+"}") > 1){
                        if(k=='partyName'){
                            var json = eval("("+v+")")
                            var ls = json["mergeSideJson"]
                            var mergeSideJson = ''
                            for(i in ls){
                                mergeSideJson = ls[i]
                                if(row.party=='B'){
                                    if(mergeSideJson.type=='null'){
                                        v=mergeSideJson.title
                                    }else{
                                        if(mergeSideJson.type=='invst'){
                                            if(mergeSideJson.id&&mergeSideJson.id!=0){
                                                v= "<span class='list_table_td'><a target='_blank' href = 'jg_particulars.html?orgCode="+mergeSideJson.code+"'>"+mergeSideJson.title+"</a></span>";
                                            }else{
                                                v=mergeSideJson.title
                                            }
                                        }else{
                                            if(mergeSideJson.type=='com'){
                                                if(mergeSideJson.code){
                                                    v= "<span class='list_table_td'><a target='_blank' href = 'project_qy.html?projCode="+mergeSideJson.code+"'>"+mergeSideJson.title+"</a></span>";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(k=="districtSubName"){
                           if(v){
                               if(v=='国外'){
                                    v=table.empty;
                               }else{
                                   v = '<span>'+v+'</span>'
                                   if(row.districtGrandsonName){
                                     v +='<span class="dot">·</span><span>'+row.districtGrandsonName+'</span>'
                                   }
                               }
                           }else{
                               if(row.districtGrandsonName){
                                   v ='<span>'+row.districtGrandsonName+'</span>'
                               }
                           }
                        }
                        if(k=='industryName'){
                            if(row.industrySubName){
                                v = v+'>'+row.industrySubName
                            }
                        }
                        if(!v){ v = table.empty}
                        temp = temp.replace("${"+k+"}",v)
                     }
                 })
                 html += temp;
                 temp = staticTemplate
            })
     }else{
        html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
     }
    div.append(html)
}
//被并购方
function beenMergeSideListFormatter(data,div){
   var staticTemplate = '<tr> <td class="bgsh">${partyName}</td> <td>${industryName}</td> <td>${districtSubName}</td><td>${isVcFe}</td> <td>${isStock}</td><td>${isNation}</td><td>${lawFirms}</td><td>${accountFirms}</td><td>${financeConsult}</td></tr>'
   var temp = staticTemplate;
    var html =""
    if(data.length>0){
        $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){
                    if(k=='partyName'){
                        if(v){
                            var json = eval("("+v+")")
                            var ls = json["mergeSideJson"]
                            var mergeSideJson = ''
                            for(i in ls){
                                mergeSideJson = ls[i]
                                console.log("mergeSideJson:",mergeSideJson)
                                if(row.party=="C"){
                                    if(mergeSideJson.code){
                                        v= "<span class='list_table_td'><a target='_blank' href = '/project_qy.html?projCode="+mergeSideJson.code+"'>"+mergeSideJson.title+"</a></span>";
                                    }else{
                                        v=mergeSideJson.title
                                    }
                                }
                            }
                        }
                    }
                    if(k=='industryName'&&v){
                        if(row.industrySubName){
                            v = v+'>'+row.industrySubName
                        }
                    }
                    if(k=="districtSubName"){
                       if(v){
                           if(v=='国外'){
                                v=table.empty;
                           }else{
                               v = '<span>'+v+'</span>'
                               if(row.districtGrandsonName&&row.districtGrandsonName!='0'){
                                   v +='<span class="dot">·</span><span>'+row.districtGrandsonName+'</span>'
                               }
                           }
                       }else{
                           if(row.districtGrandsonName&&row.districtGrandsonName!='0'){
                               v ='<span>'+row.districtGrandsonName+'</span>'
                           }
                       }
                    }
                    if(k=='industrySubname'&&!v){
                        v = ' '
                    }
                    if(!v){ v = table.empty}
                    temp = temp.replace("${"+k+"}",v)
                 }
             })
             html += temp;
             temp = staticTemplate
        })
    }else{
        html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
    }
    div.append(html)
}
var eventId = getHrefParamter("eventId");
sendGetRequest(detail.queryMergeEventInfo+eventId,function(data){fillBgBaseInfo(data.data,$("div[data-query='mergeEventInfo']")); fillList(data.data,$("*[data-query='list']"))})
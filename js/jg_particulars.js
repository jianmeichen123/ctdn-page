
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
                   if(!v){
                        v='0783e0de6ce367754ebbefb7ed3ae4bb.jpg'
                        o.attr('src','http:///10.10.0.147/org/'+v)
                   }else{
                        o.attr('src','http:///10.10.0.147/org/'+v)
                   }
                }
                if(k=='webUrl'){
                    v='<span class="list_table_td"><a target="_blank" href="'+v+'">'+v+'</a></span>'
                }
                if(k=="foundDate"){
                    v = formatDate(v,"yyyy-MM-dd")
                }
                if(k=='investAmountStr'&&v){
                    v=v+'&nbsp;(仅供参考)'
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
//发展历史
function orgHistoryInfoListFormatter(data,div){
     var staticTemplate = '<li> <div class="relative m_t5"><span class="circle_b"></span><span>${title}</span></div> <div class="color_999 relative">${eventDate}</div> </li>'
     var staticTemplateHide = '<li class="blue_l_b_three"> <div class="relative m_t5"><span class="circle_b"></span><span>${title}</span></div> <div class="color_999 relative">${eventDate}</div> </li>'
     var temp = staticTemplate;
     var html = "";
     if(data.length>0){
          $(data).each(function(i,row){
            $.each(row,function(k,v){
                while(temp.indexOf("${"+k+"}") > 1){
                    if(k =="eventDate"){
                        if(!v){
                            v= "日期未知"
                        }else{
                            v=formatDate(v,"yyyy-MM-dd")
                        }
                    }
                    temp =temp.replace("${"+k+"}",v)
                }
            })
            if(i>3){
                html += temp;
                temp = staticTemplateHide
            }else{
                html += temp;
                temp = staticTemplate
            }

         })
     }else{
       html="<li><span>　暂无数据</span></li>"
    }
    div.append(html)
    if(data.length>10){
        div.parent().append('<div class="block project_click_show color_666" >展开全部<span data-field="length">'+data.length+'</span>条<span class="brain_ico brain_ico_project_more"></span></div>')
    }
}
var orgId = getHrefParamter("orgId")
//投资事件
function eventInfoExtListFormatter(data,div){
     var staticTemplate =  "<tr><td>${investSideJson}</td><td>${company}</td><td>${investDate}</td><td>${round}</td><td> ${amountStr}</td><td>${eventId}</td></tr>";
     var temp = staticTemplate;
     var html = "";

     if(data.length>0){
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
                                    if(json.id==orgId){
                                        firms += json.invstor+"<br>";
                                    }else if(json.id!=orgId&&json.type=='invst'){
                                        firms +='<span class="list_table_td"><a target="_blank" href="jg_particulars.html?orgId='+json.id+'">'+json.invstor+'</a></span><br>'
                                    }else{
                                        firms += json.invstor+"<br>";
                                    }
                                }else{
                                    if(json.id==orgId){
                                        firms += json.invstor+"<br>";
                                    }
                                }
                            }

                            v = firms
                        }
                        if(k=="company"){
                            v='<span class="list_table_td"><a target="_blank" href="project_qy.html?code='+row.sourceCode+'">'+v+'</a></span>'
                        }
                        if(k == "eventId"){
                             // 跳转事件详情
                             v = "<center><span class='list_table_td'><a target='_blank' href='/tzsj_particulars.html?eventId="+v+"'>详情</a><span><center>"
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
     }else{
         html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
     }
     div.append(html)
}
//相关新闻
function orgMediaInfoListFormatter(data,div){
   var staticTemplate = '<tr> <td class="one">${title}</td> <td class="two">${content}</td> <td class="three">${eventDate}</td></tr>'
   var temp = staticTemplate;
    var html =""

    if(data.length>0){
        $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){
                    if(k =="eventDate"){
                        v = formatDate(v, "yyyy-MM-dd")
                    }

                    if(k=='title'){
                        if(row.link)
                        v='<span class="list_table_td"><a target="_blank" href="'+row.link+'">'+v+'</a></span>'
                    }

                    if(!v){ v = "-"}
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

//机构成员
function orgMemberListFormatter(data,div){
   var staticTemplate = '<tr> <td>${name}</td> <td>${positions}</td> <td>${status}</td><td>${phoneNum}</td> <td>${email}</td></tr>'
   var temp = staticTemplate;
    var html =""

    if(data.length>0){
        $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){
                    if(k=='status'){
                        if(v==0){
                            v='在职'
                        }else{
                            v='离职'
                        }
                    }
                    if(!v){ v = "-"}
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
//联系方式
function projectContactListFormatter(data,div){
    var staticTemplate ='<tr> <td>${city}</td> <td>${addr}</td> <td>${zipCode}</td> <td>${tel}</td> <td>${mail}</td> <td>${fax}</td> </tr>'
    var temp = staticTemplate;
    var html = "";

    if(data.length>0){
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
    }else{
        html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
    }
    div.append(html)
}

sendGetRequest(detail.queryInvestOrgInfo+orgId,function(data){fillBaseInfo(data.data,$("div[data-query='baseOrgInfo']")); fillList(data.data,$("*[data-query='list']"))})
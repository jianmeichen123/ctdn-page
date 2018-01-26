
var orgName = '';

// 基本信息
function fillBaseInfo(data,divList){
    orgName = data.investOrg;
    //判断是否收藏
     if(isCollection(1,data["orgCode"])){
         $(".click_collect").toggleClass('dn_ico_list_collect_on');
     }
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
                if(k=='orgCode'){
                    o.attr('src',Constants.logoPath+'org/'+data["orgCode"]+".png")
                    $(".click_collect").attr("code",data["orgCode"])
                }
                if(k=='webUrl'){
                    v='<span class="list_table_td"><a target="_blank" href="'+v+'">'+v+'</a></span>'
                }
//                if(k=="foundDate"){
//                    v = formatDate(v,"yyyy-MM-dd")
//                }
                if(k=='investAmountStr'&&v){
                    v=v+'&nbsp;(仅供参考)'
                }
                if(k=='backDate'){
                   v = formatDate(v,"yyyy-MM-dd")
                }
                if(v){
                    o.html(v)
                }else{
                    o.html(table.empty)
                }
           }
        })
    })
    var json = {}
    json["pageSize"] = 20;
    json["pageNo"] = 0;
    json["typeId"] = 1;
    json["keyword"] = orgName;
    sendPostRequestByJsonObj(searchUrl.news,json,function(data){
        orgNewsList(data);
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
        div.parent().append('<div class="dn_ico_more_all"><div class="dn_ico_more_al_divl">加载更多<span class="dn_ico dn_ico_more"></span></div></div>')
    }
}
var orgCode = getHrefParamter("orgCode")
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
                                    if(json.orgCode==orgCode){
                                        firms += json.invstor+"<br>";
                                    }else if(json.orgCode!=orgCode&&json.type=='invst'){
                                        firms +='<span class="list_table_bbad"><a target="_blank" href="jg_particulars.html?orgCode='+json.code+'">'+json.invstor+'</a></span><br>'
                                    }else{
                                        firms += json.invstor+"<br>";
                                    }
                                }else{
                                    if(json.orgCode==orgCode){
                                        firms += json.invstor+"<br>";
                                    }
                                }
                            }

                            v = firms
                        }
                        if(k=="company"){
                            v='<span class="list_table_td"><a target="_blank" href="project_qy.html?projCode='+row.sourceCode+'">'+v+'</a></span>'
                        }
                        if(k == "eventId"){
                             // 跳转事件详情
                             v = "<span class='list_table_td'><a target='_blank' href='/tzsj_particulars.html?eventId="+v+"'>详情</a><span>"
                        }
                        if(k =="investDate"){
                            v = formatDate(v, "yyyy-MM-dd")
                        }
                    }else{
                        v= table.empty
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
function orgNewsList(data){
   var div = $("tbody[data-query='lists']");
   var staticTemplate = '<tr> <td class="one">${title}</td> <td class="two">${auther}</td> <td class="three">${ctime}</td></tr>'
   var temp = staticTemplate;
    var html =""
    var data = data.page.records;
    if(data.length>0){
        $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){
                    if(k =="ctime"){
                        v = v*1000
                        v = formatDate(v, "yyyy-MM-dd")
                    }

                    if(k=='title'){
                        if(row.href){
                            if(row.overview.length>28){
                                v=v.substring(0,28)+"..."
                                v='<span class="list_table_td"><a target="_blank" href="'+row.href+'">'+v+'</a></span>'
                            }
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

//机构成员
function orgMemberListFormatter(data,div){
   var staticTemplate = '<tr> <td><a target="_blank" href="${personCode}">${name}</a></td> <td>${positions}</td> <td>${status}</td><td>${phoneNum}</td> <td style="width:30%">${email}</td></tr>'
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
                    }else if(k=='email'){  //邮箱“；”替换成换行符
//                    	if(v.indexOf(";")>-1){
//                    		v=v.replace(";","<br>")
//                    	}else{
//                    		v=v
//                    	}
                    }else if(k=='personCode'){
                        if(v){
                            v='/investor_xq.html?code='+v
                        }else{
                            v="javascript:void(0)"
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
                     v= table.empty;
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

sendGetRequest(detail.queryInvestOrgInfo+orgCode,function(data){fillBaseInfo(data.data,$("div[data-query='baseOrgInfo']")); fillList(data.data,$("*[data-query='list']"))})
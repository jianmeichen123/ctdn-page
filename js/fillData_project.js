//企业信息、工商信息  导航浮动
$(window).scroll(function(){
	var scrollTop=$(window).scrollTop();
	if(scrollTop>305){
		$('.project_nav').addClass('project_nav_top');
		$('.project_nav_top_none').show();
	}else{
		$(".project_nav").removeClass("project_nav_top");
		$('.project_nav_top_none').hide();
	}
});

//var code = getHrefParamter("code");
//企业基本信息

//投资事件
function eventInfoListFormatter(data,div){
    if(data.length>0){
         var strArr = new Array();
         $(data).each(function(i,row){
            strArr.push("<tr><td>")
            $.each(row,function(k,v){
                if(!v){
                    row[k] = table.empty;
                }
            })
            if(row.investDate != table.empty){
                row.investDate = formatDate(row.investDate)
            }
            strArr.push(row.investDate);
            strArr.push("</td><td>");
            strArr.push(row.round);
            strArr.push("</td><td>");
            strArr.push(row.amountStr);
            strArr.push("</td><td>");
            strArr.push(row.valuation);
            strArr.push("</td><td>");
            strArr.push(row.stock);
            strArr.push("</td><td>");
            if(row.investSideJson && row.investSideJson != table.empty) {
                var json = eval("(" +  row.investSideJson + ")");
                var ls = json["investSideJson"];
                var firms = new Array();
                $(ls).each(function(i){
                   if(i<3){
                        json = ls[i]
                        if(json.isClick==1){
                           if(json.isLeader==1){
                                if(json.type=="invst"){
                                    firms.push('<div class="ling_t"><span class="list_table_td"><a target="_blank" href="/jg_particulars.html?orgId=')
                                    firms.push(json.id)
                                    firms.push('" class=\'invstorName\' title="')
                                    firms.push(json.invstor)
                                    firms.push('">')
                                    firms.push(json.invstor)
                                    firms.push('</a><label class="lticon">领投</label></span></div>');
                                }else{
                                    firms.push('<div class="ling_t"><span class="list_table_td"><a target="_blank" href="/project_qy.html?code=');
                                    firms.push(json.code)
                                    firms.push('" class=\'invstorName\' title="')
                                    firms.push(json.invstor)
                                    firms.push('">')
                                    firms.push(json.invstor)
                                    firms.push('</a><label class="lticon">领投</label></span></div>');
                                }
                           }else{
                                if(json.type=="invst"){
                                    firms.push('<div class="ling_t"><a target="_blank" href="/jg_particulars.html?orgId=')
                                    firms.push(json.id)
                                    firms.push('" class=\'invstorName\' title="')
                                    firms.push(json.invstor)
                                    firms.push('">')
                                    firms.push(json.invstor)
                                    firms.push('</a></div>');
                                }else{
                                    firms.push('<div class="ling_t"><a target="_blank" href="/project_qy.html?code=')
                                    firms.push(json.code)
                                    firms.push('" class=\'invstorName\' title="')
                                    firms.push(json.invstor)
                                    firms.push('">')
                                    firms.push(json.invstor)
                                    firms.push('</a></div>');
                                }
                           }
                        }else{
                            firms.push("<div class='invstorName' title='")
                            firms.push($(this)[0].invstor)
                            firms.push("'>");
                            firms.push($(this)[0].invstor)
                            firms.push("</div>");
                        }
                   }
                })
               row.investSideJson =firms.join("");
            }else{
               row.investSideJson = table.empty;
            }
            strArr.push(row.investSideJson)
            strArr.push("</td><td>");
            strArr.push("<a href='tzsj_particulars.html?eventId="+row.eventId+"'>详情</a>")
            strArr.push("</td></tr>")
         })
         div.append(strArr.join(""))
    }else{
       div.append("<tr> <td colspan='7'><span>暂无数据</span></th></tr>")
    }
}
//团队成员
function projectTeamListFormatter(data,div){
     var staticTemplate = '<li> <div class="product_list_team_img_bj"><img src="img/default3.gif"/></div> <ul class="product_list_team_ul"> <li class="team_color_font_3">${name}<span class="zw">${job}</span></li> <li class="team_color_font" >${college}<span>${edu}</span></li> <li class="team_color_font_2" title="${introduction}">${introduction}</li> </ul> </li>'
     var temp = staticTemplate;
     var html = "";
     //遍历数组
     if(data.length>0){
          $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){
                     if(!v){
                        v =""
                     }
                     temp =temp.replace("${"+k+"}",v)
                 }
             })
             html += temp;
             temp = staticTemplate
          })
     }else{
         html="<span class='product_eeu'>暂无数据</span>"
     }
     div.append(html)
}
//发展历史
function historyListFormatter(data,div){
     var staticTemplate = '<li> <div class="relative m_t5"><span class="circle_b"></span><span>${content}</span></div> <div class="color_999 relative">${date}</div> </li>'
     var staticTemplateHide = '<li class="blue_l_b_three"> <div class="relative m_t5"><span class="circle_b"></span><span>${content}</span></div> <div class="color_999 relative">${date}</div> </li>'
     var temp = staticTemplate;
     var html = "";
     if(data.length>0){
          $(data).each(function(i,row){
            $.each(row,function(k,v){
                while(temp.indexOf("${"+k+"}") > 1){
                    if(k =="date"){
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
    if(data.length>5){
        div.parent().parent().append('<div class="block project_click_show color_666" >展开全部<span data-field="length">'+data.length+'</span>条<span class="brain_ico brain_ico_project_more"></span></div>')
    }
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
         html="<tr> <td colspan='7'><span>暂无数据</span></th></tr>"
    }
    div.append(html)
}
//上市挂牌
function eventListedInfoListFormatter(data,div){
   var staticTemplate = '<tr> <td style="width:30%"> <div class="list_table_td"><span>${logo}</span> <ul class="col_999"> <li><a href="#">${projTitle}</a></li> <li><span class="districtSubName">${districtSubName}</span><span class="industryName">${industryName}</span></li> </ul> </div> </td> <td>${type}</td> <td>${stockExchange}</td> <td>${stockCode}</td> <td>${listedDate}</td> <td>${eventId}</td> </tr>'
   var temp = staticTemplate;
   var html = "";
    //遍历数组
    if(data.length>0){
           $(data).each(function(i,row){
               $.each(row,function(k,v){
                   while(temp.indexOf("${"+k+"}") > 1){
                       if(k =="logo"){
                           if(!v){
                               v= '<img height="37" width="37" src="img/default.gif">'
                           }else{
                               v ='<img height="37" width="37" src="'+Constants.logoPath+v+'">'
                           }
                       }else if(k=="industryName"){
                            var str = "";
                            if(v){
                                str += v;
                                if(row["industrySubName"]){
                                    str += ">" + row["industrySubName"]
                                }
                            }else{
                                str ="行业未知"
                            }
                            v =  str;
                       }else if(k=="districtSubName"){
                           if(!v){
                                v="地区未知"
                           }else{
                                v ='<span>'+v+'</span>'
                           }
                       }else if(k =="listedDate"){
                           if(v){
                                v = formatDate(v, "yyyy-MM-dd")
                           }
                       }else if(k == "eventId"){
                            v = "<a href='ss_particulars.html?eventId="+row.eventId+"'>详情</a>"
                       }
                       if(!v){
                            v = "-"
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
//并购事件
function eventMergerInfoListFormatter(data,div){
   var staticTemplate='<tr> <td style="width:30%"> <div class="list_table_td"> <span><img height="37" width="37" src="${logo}"></span> <ul class="col_999"> <li><a href="#">${projTitle}</a></li> <li><label class="name">${districtSubName}</label><label class="name">${industryName}</label></li> </ul> </div> </td><td>${equityRate}</td> <td>${amountStr}</td> <td>${mergeSideJson}</td> <td>${mergeDate}</td> <td>${eventId}</td> </tr>'
   var temp = staticTemplate;
   var html = "";
   //遍历数组
   if(data.length>0){
       $(data).each(function(i,row){
          $.each(row,function(k,v){
              while(temp.indexOf("${"+k+"}") > 1){
                  if(k=="logo"){
                    if(!v){
                        v = "img/default.gif"
                    }else{
                        v= Constants.logoPath+v
                    }
                  }
                  if(k =="mergeSideJson"){
                      if(v){
                          var json = eval("(" + v + ")");
                          var ls = json["mergeSideJson"];
                          var mergeSideTitle = "";
                          $(ls).each(function(i){
                          var data =$(this)[0]
                             //待修改 没加领投
                             if(data.title &&i<3){
                                   if(data.id>0){
                                       if(data.type=='invse'){
                                           mergeSideTitle+='<center><span class="list_table_td"><a href="/jg_particulars.html?orgId='+data.id+'">'+data.title+'</a></span></center>';
                                       }
                                       if(data.type=='com'){
                                           mergeSideTitle+='<center><span class="list_table_td"><a href="/project_qy.html?code='+data.code+'">'+data.title+'</a></span></center>';

                                       }
                                   }else{
                                       mergeSideTitle+='<center><span class="list_table_td">'+data.title+'</span></center>';
                                   }
                               }
                          })
                          v = mergeSideTitle
                      }else{
                          v="-"
                      }
                  }else if(k =="mergeDate"){
                       if(v){
                          v = formatDate(v, "yyyy-MM-dd")
                       }
                  }else if(k=="equityRate"){
                       if(v){v += "%"}else{v="未透露"}
                 }else if(k=="industryName"){
                       var str = "";
                       if(v){
                           str += v;
                           if(row["industrySubname"]){
                               str += ">" + row["industrySubname"]
                           }
                       }else{
                           str ="行业未知"
                       }
                       v =  str;
                  }else if(k=="districtSubName"){
                      if(!v){
                           v="地区未知"
                      }
                  }else if(k == "eventId"){
                      //待修改 跳转事件详情
                      v = "<a href='bg_particulars.html?eventId="+row.eventId+"'>详情</a>"
                  }
                  if(!v){
                        v ="-"
                  }
                  temp =temp.replace("${"+k+"}",v)
              }
          })
          html += temp;
          temp = staticTemplate
       })
    }else{
           html="<tr> <td colspan='7'><span>暂无数据</span></th></tr>"
       }
   div.append(html)
}
//相关新闻
function newsListFormatter(data,div){
    var staticTemplate = '<li> <span>${link}</span> <span class="two">${source}</span> <span class="three">${date}</span> </li>';
    var temp = staticTemplate;
    var html = "";
    if(data.length>0){
         $(data).each(function(i,row){
           $.each(row,function(k,v){
               while(temp.indexOf("${"+k+"}") > 1){
                   if(k=="link"){
                        v ='<a href="'+v+'" target="_blank"><span class="one">'+row.content+'</span></a>';
                   }
                   temp =temp.replace("${"+k+"}",v)
               }
           })
           html += temp;
           temp = staticTemplate

        })
    }else{
      html="<li><span>　暂无数据</span></li>"
    }
    div.append(html)
}

 //产品弹出
$("#product-ul").on("click","li[op-data-type]",function(){
    var $self = $(this);
    var _url = "opdatahtml/"+$self.attr("op-data-type")+".html";
    var _name= $self.attr("data-name");
    var id = $self.attr("id").split(":")[0];
    var id_type = $self.attr("id").split(":")[1];
    return false;
});

var callBack = {
        productData:function(data){
                   if(data.success){
                        var p_html = {
                            "domain":'<li id="{code}:str" op-data-type="pvuv" data-name="趋势分析图"><div class="a a1">网站</div> <div class="wrapper"> <ul class="product_list_ul"> <li>{appname}</li> <li>alexa排名：{index2}</li> </ul> </div> </li>',
                            "android":'<li id="{appid}:long" op-data-type="android" data-name="趋势分析图"><div class="a a3">Android</div>  <div class="wrapper"> <ul class="product_list_ul"> <li>下载总量：<span>{index1}</span></li> <li>每日下载量：<span>{index2}</span></li> <li>更新时间：<span>{updateDate}</span></li> <li>评分：<span>{avgScore}</span></li> </ul> </div> </li>',
                            "ios":'<li id="{appid}:long" op-data-type="ios" data-name="趋势分析图"><div class="a a2">iOS</div> <div class="wrapper"> <ul class="product_list_ul"> <li>下载总量：<span>{index1}</span></li> <li>每日下载量：<span>{index2}</span></li> <li>更新时间：<span>{updateDate}</span></li> <li>评分：<span>{avgScore}</span></li> </ul> </div> </li>',
                            "weibo":'<li id="{appid}:str" op-data-type="weibo" data-name="趋势分析图"> <div class="a a4">微博</div> <div class="wrapper"> <ul class="product_list_ul"> <li>微博数：<span>{index1}</span></li> <li> 粉丝数：<span>{index2}</span></li> </ul> </div> </li>',
                            "weixin":'<li id="{appid}:str" op-data-type="weixin" data-name="趋势分析图"><div class="a a5">微信</div><div class="wrapper"> <ul class="product_list_ul"> <li>平均阅读量：<span>{index1}</span></li> <li> 点赞量：<span>{index2}</span></li> </ul> </div> </li>',
                        }
                        if(data.data.length>0){
                              $(data.data).each(function(i,e){
                                                        var html = p_html[e.type]
                                                        $.each(e,function(k,v){
                                                            if (k=="avgScore"){v = v.toString();v = v.charAt(0)+"."+v.charAt(1)}
                                                             html = html.replace(new RegExp("{"+k+"}","gm"),v)
                                                        })
                                                        $("#product-ul").append(html)
                                                    })
                        }else{

                             $("#product-ul").append("<span class='product_eeu'>暂无数据</span>")
                        }
                        $("#pro_num").html("共 "+data.data.length+" 个产品")
                   }
        }
}


var name;
sendPostRequest(dataUrl.products+getHrefParamter("projCode"),callBack.productData);
sendGetRequest(detail.queryRelativeListByCode+"/"+getHrefParamter("projCode"),function(data){fillList(data.data,$("div[data-query='list']")) })
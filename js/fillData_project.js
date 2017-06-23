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
     var staticTemplate =  "<tr><td>${investDate}</td><td>${round}</td><td> ${amountStr}</td><td>${valuation}</td><td>${stock}</td><td>${investSideJson}</td><td>${eventId}</td></tr>";
     var temp = staticTemplate;
     var html = "";
     //遍历数组
     if(data.length>0){
         $(data).each(function(i,row){
                $.each(row,function(k,v){
                    while(temp.indexOf("${"+k+"}") > 1){
                        if(v){
                            if(k =="investSideJson"){
                                var json = eval("(" + v + ")");
                                var ls = json["investSideJson"];
                                var firms = "";
                                $(ls).each(function(i){
                                   //待修改 没加领投
                                   if(i<3){
                                        if($(this)[0].isClick=="1"){
                                            firms += "<div><a href = 'jg_particulars.html?orgId="+$(this)[0].id+"'>"+$(this)[0].invstor+"</a><div>";
                                        }else{
                                            firms += "<div>"+$(this)[0].invstor+"</div>";
                                        }
                                   }
                                })
                                v = firms
                            }
                            if(k == "eventId"){
                                 //待修改 跳转事件详情
                                 v = "<a href='tzsj_particulars.html?eventId="+row.eventId+"'>详情</a>"
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
        html="<tr> <td colspan='7'><span>暂无数据</span></th></tr>"
     }
      div.append(html)

}
//团队成员
function projectTeamListFormatter(data,div){
     var staticTemplate = '<li> <img src="img/default3.gif"/> <ul class="product_list_team_ul"> <li class="font_14">${name}<span >${job}</span></li> <li class="color_666 font_12" >${college}<span>${edu}</span></li> <li class="color_999 font_12">${introduction}</li> </ul> </li>'
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
         html="<span>暂无数据</span>"
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
    if(data.length>3){
        div.parent().append('<div class="block project_click_show color_666" >展开全部<span data-field="length">'+data.length+'</span>条<span class="brain_ico brain_ico_project_more"></span></div>')
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
   var staticTemplate = '<tr> <td style=""> <div class="list_table_td"> <img height="37" width="37" src="${logo}"> <ul class="col_999"> <li><a href="#">${projTitle}</a></li> <li><span>${districtSubName}</span><span>${industryName}</span></li> </ul> </div> </td> <td>${type}</td> <td>${stockExchange}</td> <td>${stockCode}</td> <td>${listedDate}</td> <td>${eventId}</td> </tr>'
   var temp = staticTemplate;
   var html = "";
    //遍历数组
    if(data.length>0){
           $(data).each(function(i,row){
               $.each(row,function(k,v){
                   while(temp.indexOf("${"+k+"}") > 1){
                       if(k =="logo"){
                           if(!v){
                               v= "img/default.gif"
                           }else{
                               v = Constants.logoPath+v
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
                                v = v+'<span>'+row.districtGrandsonName+'</span>'
                           }
                       }else if(k =="listedDate"){
                           if(v){
                                v = formatDate(v, "yyyy-MM-dd")
                           }
                       }else if(k == "eventId"){
                            v = "<a href='#?id="+row.eventId+"'>详情</a>"
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
   var staticTemplate='<tr> <td style=""> <div class="list_table_td"> <img height="37" width="37" src="${logo}"> <ul class="col_999"> <li><a href="#">${projTitle}</a></li> <li><span>${districtSubName}</span><span>${industryName}</span></li> </ul> </div> </td><td>${equityRate}</td> <td>${amountStr}</td> <td>${mergeSideJson}</td> <td>${mergeState}</td> <td>${mergeDate}</td> <td>${eventId}</td> </tr>'
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
                          var json =$(this)[0]
                             //待修改 没加领投
                             if(this.title &&i<3){
                                   if(this.id){
                                       if($(this).type=='invse'){
                                           mergeSideTitle+='<center><span class="list_table_td"><a href="/jg_particulars.html?orgId='+json.id+'">'+json.title+'</a></span></center>';
                                       }
                                       if(json.type=='com'){
                                           mergeSideTitle+='<center><span class="list_table_td"><a href="/project_qy.html?code='+json.code+'">'+json.title+'</a></span></center>';

                                       }
                                   }else{
                                       mergeSideTitle+='<center><span class="list_table_td">'+json.title+'</span></center>';
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
                      }
                  }else if(k == "eventId"){
                      //待修改 跳转事件详情
                      v = "<a href='bg_particulars.html?eventId="+row.eventId+"'>详情</a>"
                  }else if(k=="equityRate"){
                     if(!v){
                        v= "未透露"
                     }
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
                        v ='<a href="'+v+'"><span class="one">'+row.content+'</span></a>';
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
    //自定页
//	layer.open({
//        type: 2,
//        title: _name,
//        shadeClose: true,
//        maxmin: true, //开启最大化最小化按钮
//        area: ['900px', '435px'],
//        content: _url,
//        success: function(layero, index){
//            $("#popup_name").html(_name);
//            sendPostRequest(dataUrl[$self.attr("op-data-type")]+id,$(layero).find("iframe")[0].contentWindow.opCallBack[$self.attr("op-data-type")]);
//        }
//    });
    return false;
});

var callBack = {
        productData:function(data){
                   if(data.success){
                        var p_html = {
                            "domain":'<li id="{code}:str" op-data-type="pvuv" data-name="趋势分析图"> <img src="img/a1.jpg"> <div class="wrapper"> <ul class="product_list_ul"> <li>{appname}</li> <li>alexa排名：{index2}</li> </ul> </div> </li>',
                            "android":'<li id="{appid}:long" op-data-type="android" data-name="趋势分析图"> <img src="img/a2.jpg"> <div class="wrapper"> <ul class="product_list_ul"> <li>下载总量：<span>{index1}</span></li> <li>每日下载量：<span>{index2}</span></li> <li>更新时间：<span>{updateDate}</span></li> <li>评分：<span>{avgScore}</span></li> </ul> </div> </li>',
                            "ios":'<li id="{appid}:long" op-data-type="ios" data-name="趋势分析图"> <img src="img/a3.jpg"> <div class="wrapper"> <ul class="product_list_ul"> <li>下载总量：<span>{index1}</span></li> <li>每日下载量：<span>{index2}</span></li> <li>更新时间：<span>{updateDate}</span></li> <li>评分：<span>{avgScore}</span></li> </ul> </div> </li>',
                            "weibo":'<li id="{appid}:str" op-data-type="weibo" data-name="趋势分析图"> <img src="img/a4.jpg"> <div class="wrapper"> <ul class="product_list_ul"> <li>微博数：<span>{index1}</span></li> <li> 粉丝数：<span>{index2}</span></li> </ul> </div> </li>',
                            "weixin":'<li id="{appid}:str" op-data-type="weixin" data-name="趋势分析图"> <img src="img/a5.jpg"> <div class="wrapper"> <ul class="product_list_ul"> <li>平均阅读量：<span>{index1}</span></li> <li> 点赞量：<span>{index2}</span></li> </ul> </div> </li>',
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

//企业基本信息formatter
 function formatProjectInfo(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
           var o = $(this);
           var k = o.attr("data-field");
           var v =data[k];
           if(k == "latestFinanceRound" || k=="runState" || k=="needFinance"){
               if(!v) o.removeClass(o.attr("class"));
           }else if(k == "logoSmall"){
                if (row.logoSmall&&row.logoSmall.indexOf("/")!=-1){
                    img = row.logoSmall.split("/")[1]
                }else if (row.logoSmall&&row.logoSmall!=""){
                    img = row.logoSmall
                }
                if(img.indexOf(".") == -1){
                    img = ""
                }
                v= Constants.logoPath+img
           }else if(k=="projTitle"){
                if(!v){
                    v = "名称未知"
                }
           }else if(k=="districtSubName"){
                if(!v){
                    v ="地区未知"
                }
           }else if(k=="industryName"){
                var str = "";
                if(v){
                    str += v;
                    if(data["industrySubName"]){
                        str += ">" + data["industrySubName"]
                    }
                }else{
                    str ="行业未知"
                }
                v =  str;
           }else if(k=="labels"){
                if(v){
                    var str = "";
                    $(v.split(","),function(i,e){
                       str.append("<span class='project_lable'>");
                       str.append(e);
                       str.append("</span>");
                    })
                    v = str
                }
           } else if(k=="bp"|| k =="hqEmail" || k== "hqTel"){
                if(!v){
                    v= "-"
                }
           }else if(k=="weibo"){
                if(v){
                    v='<a href ="'+v+'"><span class="brain_ico brain_ico_project_1_on"></span></a>'
                }else{
                    v='<span class="brain_ico brain_ico_project_1"></span>'
                }
           }else if(k=="weixin"){
               if(v){
                v='<span class="brain_ico brain_ico_project_2_on"  title="'+v+'" ></span>'
               }else{
                v='<span class="brain_ico brain_ico_project_2"  title="" ></span>'
               }
           }else if(k=="webUrl"){
                if(v){
                    v ='<a href ="'+v+'"><span class="brain_ico brain_ico_project_3_on"></span></a>'
                }else{
                    v = '<span class="brain_ico brain_ico_project_3"></span>'
                }
           }else if(k=="firmDesc"){
                if(!v){
                    v ="<span>暂无数据</span>"
                	 o.css('height','auto')
                	 o.parent().children('.project_more').hide()
                }else{
                	if(v.length <250){
	            		 o.css('height','auto')
	                	 o.parent().children('.project_more').hide()
                	}else {
						
					}
                }
           }
           o.html(v)
        })
    })
}
var name;
var code = getHrefParamter("code");
sendPostRequest(dataUrl.products+code,callBack.productData);
sendGetRequest(detail.queryProject+"/"+code,function(data){name =  data.data.projTitle;formatProjectInfo(data.data,$("div[data-query='projectBase']"));fillList(data.data,$("div[data-query='list']")) })
sendGetRequest(detail.queryProject+"/"+code,function(data){fillList(data.data,$("div[data-query='list']")) })
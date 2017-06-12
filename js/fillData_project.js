//var code = getHrefParamter("code");
//投资事件
function eventInfoListFormatter(data,div){
     var staticTemplate =  "<tr><td>${investDate}</td><td>${round}</td><td> ${amountStr}</td><td>${valuation}</td><td>${stock}</td><td>${investSideJson}</td><td>${eventId}</td></tr>";
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
                        $(ls).each(function(){
                           //待修改 没加领投
                           firms += "<a href = '#?id="+$(this)[0].id+"'>"+$(this)[0].invstor+"</a>";
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
     div.append(html)
}
//团队成员
function projectTeamListFormatter(data,div){
     var staticTemplate = '<li> <img src="${logo}"/> <ul class="product_list_team_ul"> <li class="font_14">${name}<span >${job}</span></li> <li class="color_666 font_12" >${college}<span>${edu}</span></li> <li class="color_999 font_12">${introduction}</li> </ul> </li>'
     commonFormatter(staticTemplate,data,div)
}
//发展历史
function historyListFormatter(data,div){
     var staticTemplate = '<li> <div class="relative m_t5"><span class="circle_b"></span><span>${content}</span></div> <div class="color_999 relative">${date}</div> </li>'
     commonFormatter(staticTemplate,data,div)
}
//联系方式
function projectContactListFormatter(data,div){
     var staticTemplate ='<tr> <td>${city}</td> <td>${addr}</td> <td>${zipCode}</td> <td>${tel}</td> <td>${mail}</td> <td>${fax}</td> </tr>'
     commonFormatter(staticTemplate,data,div)
}
//上市挂牌
function eventListedInfoListFormatter(data,div){
   var staticTemplate = '<tr> <td style=""> <div class="list_table_td"> <img height="37" width="37" src="${logo}"> <ul class="col_999"> <li><a href="#">${projTitle}</a></li> <li><span>${district}</span><span>${industryName}</span>${industrySubName}</li> </ul> </div> </td> <td>${type}</td> <td>${stockExchange}</td> <td>${stockCode}</td> <td>${listedDate}</td> <td>${eventId}</td> </tr>'
   commonFormatter(staticTemplate,data,div)
}
//并购事件
function eventMergerInfoListFormatter(data,div){
   var staticTemplate='<tr> <td style=""> <div class="list_table_td"> <img height="37" width="37" src="${logo}"> <ul class="col_999"> <li><a href="#">${projTitle}</a></li> <li><span>${districtSubName}</span><span>${industryName}</span></li> </ul> </div> </td><td>${equityRate}</td> <td>${amountStr}</td> <td>${mergeSideJson}</td> <td>${mergeState}</td> <td>${mergeDate}</td> <td>${eventId}</td> </tr>'
   var temp = staticTemplate;
   var html = "";
   //遍历数组
   $(data).each(function(i,row){
      $.each(row,function(k,v){
          while(temp.indexOf("${"+k+"}") > 1){
              if(v){
                  if(k =="mergeSideJson"){
                      var json = eval("(" + v + ")");
                      var ls = json["mergeSideJson"];
                      var firms = "";
                      $(ls).each(function(){
                         //待修改 没加领投
                         firms += "<a href = '#?id="+$(this)[0].id+"'>"+$(this)[0].invstor+"</a>";
                      })
                      v = firms
                  }
                  if(k == "eventId"){
                       //待修改 跳转事件详情
                       v = "<a href='#?id="+row.eventId+"'>详情</a>"
                  }
                  if(k =="mergeDate"){
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
function newsListFormatter(data,div){
   var staticTemplate = '<li> <span class="one">${content}</span> <span class="two">${source}</span> <span class="three">${date}</span> </li>'
   commonFormatter(staticTemplate,data,div)
}
//标签
function labelFormatFormatter(val,o){
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
 //产品弹出
$("#product-ul").on("click","li[op-data-type]",function(){
    var $self = $(this);
    var _url = "opdatahtml/"+$self.attr("op-data-type")+".html";
    var _name= $self.attr("data-name");
    var id = $self.attr("id").split(":")[0];
    var id_type = $self.attr("id").split(":")[1];
    //自定页
	layer.open({
        type: 2,
        title: _name,
        shadeClose: true,
        maxmin: true, //开启最大化最小化按钮
        area: ['900px', '435px'],
        content: _url,
        success: function(layero, index){
            $("#popup_name").html(_name);
            sendPostRequest(dataUrl[$self.attr("op-data-type")]+id,$(layero).find("iframe")[0].contentWindow.opCallBack[$self.attr("op-data-type")]);
        }
    });
//    $.getHtml({
//        url:_url,//模版请求地址
//        data:"",//传递参数
//        okback:function(){
//            $("#popup_name").html(_name);
//
//
//        }//模版反回成功执行
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
                            "weibo":'<li id="{appid}:str" op-data-type="weibo" data-name="趋势分析图"> <img src="img/a4.jpg"> <div class="wrapper"> <ul class="product_list_ul"> <li>平均阅读量：<span>{index1}</span></li> <li> 粉丝数：<span>{index2}</span></li> </ul> </div> </li>',
                            "weixin":'<li id="{appid}:str" op-data-type="weixin" data-name="趋势分析图"> <img src="img/a5.jpg"> <div class="wrapper"> <ul class="product_list_ul"> <li>平均阅读量：<span>{index1}</span></li> <li> 粉丝数：<span>{index2}</span></li> </ul> </div> </li>',
                        }
                        $(data.data).each(function(i,e){
                            var html = p_html[e.type]
                            $.each(e,function(k,v){
                                if (k=="avgScore"){v = v.toString();v = v.charAt(0)+"."+v.charAt(1)}
                                 html = html.replace(new RegExp("{"+k+"}","gm"),v)
                            })
                            $("#product-ul").append(html)
                        })

                        $("#pro_num").html("共 "+data.data.length+" 个产品")
                   }
        }
}
sendPostRequest(dataUrl.products+"bshf7r",callBack.productData);
sendGetRequest(detail.queryProject+"12345",function(data){fillOne(data.data,$("div[data-query='projectBase']")); fillList(data.data,$("*[data-query='list']"))})
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

var code = getHrefParamter("code");
//给tab页a赋参数
$(function(){
    $(".project_nav a").each(function(){
        $(this).attr("href",$(this).attr("href")+"?code="+getHrefParamter("code"))
    })
    nav_locaton('ctsj','qyxm','','gsxx')
})



function fillBaseBusinessInfo(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
            var o = $(this);
            var k = o.attr("data-field")
            var v = data[o.attr("data-field")]
            if(v){
                o.html(v)
            }else{
                o.html("-")
            }
        })
    })
}

//股东信息
function projectShareholderInfoListFormatter(data,div){
   var staticTemplate = '<tr> <td>${shareholderType}</td> <td>${shareholder}</td> <td>${prePayDate}</td><td>${prePayAmountStr}</td> <td>${paidDate}</td><td>${paidPayAmountStr}</td><td>${payType}</td><td>${equityRate}</td></tr>'
   var temp = staticTemplate;
    var html =""
    if(data.length>0){
        $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){

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

//工商变更
function projectBusinessChangeListFormatter(data,div){
   var staticTemplate = '<tr> <td>${changeItems}</td> <td>${beforeContent}</td> <td>${afterContent}</td><td>${changeDate}</td> </tr>'
   var temp = staticTemplate;
    var html =""
    if(data.length>0){
        $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){

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

//对外投资
function projectInvestOthersFormatter(data,div){
    var staticTemplate ='<tr> <td>${investDate}</td> <td>${company}</td> <td>${round}</td> <td>${amountStr}</td> <td>${invstorgnames}</td> </tr>'
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

//企业项目
var url = detail["queryByProjTitle"]+name;
sendGetRequest(url,function(data){
   $(data.data).each(function(k,v){
        if(!v){
            v="-"
        }
   })
   var target = $("#queryByProjTitle");
   target.tmpl(data).appendTo(target.parent())
})

//任职人员
var url = detail["getAllCompMember"]+getHrefParamter("code");
sendGetRequest(url,function(data){
   $(data.data).each(function(k,v){
        if(!v){
            v="-"
        }
   })
   var target = $("#getAllCompMember");
   target.tmpl(data).appendTo(target.parent())
})


//对外投资
function fillInvestOthers(data,div){
    var dl = $("tbody[data-query='lists']")
    if(data){
        var matter = div.attr("data-formatter")
        var formatter= div.attr("data-formatter")+"Formatter";
        if(formatter && formatter in window){
            window[formatter](data,div)
        }
    }else{
        div.append("<tr> <td colspan='7'><span>暂无数据</span></th></tr>")
    }

}



//加载更多
  $(function(){
         $(".background_boeder").each(function(){
         	var obj = $(this);
         	//带点击更多
         	if(obj.find(".dn_ico_more_all").length>0){
         		var more = obj.find(".dn_ico_more_all");
         		loadMore(more,obj)
            }else{
                //不带分页
                loadNoPage(obj);
            }
         })
    })
     //点击更多
    $(".dn_ico_more_all").click(function(){
    	var more = $(this)
    	var obj = more.closest(".background_boeder");
    	loadMore(more,obj)
    })

    function loadMore(more,obj){
        var url = obj.attr("data-url");
        var dataId = obj.attr("data-id");
        url = getUrl(dataId,url);
		var json = getJson(obj);
    	var pageNo = $("input[name='pageNo']").val();
    	var pageSize = $("input[name='pageSize']").val();
    	var html="";
    	sendPostRequestByJsonObj(url,json,function(data){
    		var records = data.data.records;
    		if(records.length>0){
    		    var target = $("#"+dataId)
    		    target.tmpl(data).appendTo(target.parent())
				if(pageNo && pageSize){
				    if(data.data.total<=(pageNo*1+1)*pageSize){
                        more.hide();
                        return;
                    }
                    pageNo = pageNo*1+1
                    obj.find("input[name='pageNo']").val(pageNo)
				}
    		}else if(records.length ==0 && pageNo=="1"){
    		    obj.hide();
    		}
    	})
   }
   //没有分页的请求
   function loadNoPage(obj){
        var url = obj.attr("data-url");
        var dataId = obj.attr("data-id")
        //data-id是渲染数据的模板id,如果没有该属性,说明该模块不需要渲染数据
        if(!dataId){
            return;
        }
        url = getUrl(dataId,url);
        var json = getJson(obj);
        sendPostRequestByJsonObj(url,json,function(data){
            if(data.data.length>0){
                var target = $("#"+dataId)
                target.tmpl(data).appendTo(target.parent())
            }else{

                if(dataId=="product"){
                    if(!$("#prodSrv").val()&& !$("#userMarket").val()){
                         obj.hide();
                    }
                }else if(dataId="team"){
                    if(!$("#teamTags").val()&& !$("#teamSuper").val()){
                         obj.hide();
                    }
                }
            }
        })
   }

   //获取请求地址
   function getUrl(dataId,url){
       if(dataId=="product"){
           url = dataUrl[url];
       }else if(dataId=="news"){
           url = searchUrl[url]
       }else if(dataId=="getAllCompSubs"){
           url = detail[url];
       }else{
           url = detail[url]
       }
       return url;
   }
    //获取参数
   function getJson(obj){
        var ls = obj.find("input[name]");
        var json={};
        $.each(ls,function(i,e){
             if($(this).attr("name")=='compCode'){
                json[$(this).attr("name")]=proj.data.compCode
             }else{
                json[$(this).attr("name")] =$(this).val();
             }
        })
        return json;
   }
sendGetRequest(detail.queryPorjectBusniessInfo+proj.data.compCode,function(data){fillBaseBusinessInfo(data.data,$("div[data-query='businessInfo']")); fillList(data.data,$("*[data-query='list']"))})
sendGetRequest(detail.getListByCompany+name,function(data){fillInvestOthers(data.data,$("tbody[data-query='lists']"))})

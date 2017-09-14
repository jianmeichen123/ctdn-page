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

sendGetRequest(detail.queryPorjectBusniessInfo+getHrefParamter("code"),function(data){fillBaseBusinessInfo(data.data,$("div[data-query='businessInfo']")); fillList(data.data,$("*[data-query='list']"))})

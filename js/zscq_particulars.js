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
    nav_locaton('ctsj','qyxm','','zscq')
})

//商标信息
function projectMarkInfoListFormatter(data,div){

   var staticTemplate = '<li><img><ul class="project_zs_ul_c"> <li class="font_16">${trademark}</li> <li class="color_666"> 分类：<span>${markType}<span></li> <li class="color_666">状态：${state}</li><li class="color_666">期限：${term}</li> </ul></li>'
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

//专利信息
function projectPatentInfoListFormatter(data,div){
   var staticTemplate = '<li><ul class="project_zs_ul_c"> <li class="font_16"  onclick="pop_credential("22")">${patent}</li> <li class="color_666">专利类型：${patentType}</li> <li class="color_666">公布时间：${applyPubDate}</li> </ul></li>'
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

//著作权信息
function projectCopyrightInfoListFormatter(data,div){
   var staticTemplate = '<li><ul class="project_zs_ul_c"> <li class="font_16" >${copyright}</li> <li class="color_666">登记号：${registNum}</li> <li class="color_666">登记日期：${registDate}</li><li  class="color_666">登记类别：${registType}</li> </ul></li>'
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

//软件著作权信息
function softwareCopyrightInfoListFormatter(data,div){
   var staticTemplate = '<li><ul class="project_zs_ul_c"> <li class="font_16">${software}</li> <li class="color_666">分类号：${classificationNum}</li> <li class="color_666">登记号：${registNum}</li><li class="color_666">登记批准日期：${approvalDate}</li> </ul></li>'
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

//网站信息
function projectWebInfoListFormatter(data,div){
   var staticTemplate = '<tr> <td>${company}</td> <td>${web}</td> <td>${domain}</td><td>${licenseKey}</td><td>${examineDate}</td> </tr>'
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

//证书信息
function certificateInfoListFormatter(data,div){
   var staticTemplate = '<li><ul class="project_zs_ul_c"> <li class="font_16"  onclick="pop_credential("22")">${prodName}</li> <li class="color_666">发证日期：${date}</li> <li class="color_666">截止日期：${endDate}</li> </ul></li>'
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
sendGetRequest(detail.queryZSCQInfo+getHrefParamter("code"),function(data){fillList(data.data,$("div[data-query='list']")) })
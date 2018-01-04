var popIndustryHtml;  //弹出层行业html
var allIndustryIds;
var allIndustryNames;
var focusIndustryIds;
$(function(){
    initVar();
    initIndex();
})
function initVar(){
     popIndustryHtml=""  //弹出层行业html
     allIndustryIds = [];
     allIndustryNames = [];
     focusIndustryIds = [];
}
function initIndex(){
    initFocusIndustry();
    initAllIndustry();
}
//所有行业初始化
function initAllIndustry(){
    sendGetRequest(platformUrl.industry,function(data){
        var ls = data.data;
        $(ls).each(function(){
            var id =$(this)[0].id;
            var name = $(this)[0].name;
            allIndustryIds.push(id)
            allIndustryNames.push(name)
            if($.inArray(id, focusIndustryIds)>-1){
                popIndustryHtml += "<li value= "+id+" class='concern-clicked' >"+name+"</li>"
            }else{
                popIndustryHtml += "<li value= "+id+">"+name+"</li>"
            }
        })
        $(".industry-span-content ul").html(popIndustryHtml)
        $('.industry-span-content ul li').click(function(){
        	$(this).toggleClass('concern-clicked')
        })
    })
}

//function reset(){
//    $(ls).each(function(){
//        var id =$(this)[0].id;
//        var name = $(this)[0].name;
//        allIndustryIds.push(id)
//        allIndustryNames.push(name)
//        if($.inArray(id, focusIndustryIds)>-1){
//            popIndustryHtml += "<li value= "+id+" class='concern-clicked' >"+name+"</li>"
//        }else{
//            popIndustryHtml += "<li value= "+id+">"+name+"</li>"
//        }
//    })
//    $(".industry-span-content ul").html(popIndustryHtml)
//    $('.industry-span-content ul li').click(function(){
//        $(this).toggleClass('concern-clicked')
//    })
//}

//查询用户关注行业
function initFocusIndustry(){
     sendGetRequest(platformUrl.userIndustry+userCode,function(data){
        var entity = data.data;
        if(entity){
            focusIndustryIds = entity
        }
    })
}
function saveIndustry(){
		initVar();
		var clicked = $("ul li.concern-clicked");
		$(clicked).each(function(){
			focusIndustryIds.push($(this).attr("value"))
		})
		var userIndustry ={};
		//userCode 在common.js赋值s
		userIndustry.userCode =userCode;
		userIndustry.industryIdList = focusIndustryIds;
		sendPostRequestByJsonObj(platformUrl.updateUserIndustry,userIndustry,function(data){
		    layer.open({
                  type: 2,
                  title: '提示信息',
                  shadeClose: true,
                  btn:["确定"],
                  shade: 0.6,
                  area: ['400px', '280px'],
                  content: 'html/tips_success.html'
            });
		})
}

function reset(){
    sendGetRequest(platformUrl.resetUserIndustry+userCode,function(data){
           var entity = data.data;
           if(entity){
               focusIndustryIds = entity
               $("ul li").removeClass("concern-clicked")
               $(focusIndustryIds).each(function(i,e){
                    $("ul li[value='"+e+"']").addClass('concern-clicked')
               })
           }
       })
}
//select options初始化
//function initSelectOptions(){
//    var options = "";
//    var tmp = "";
//    if($(".gz_ul_on").attr("data-field")=="all"){
//        options = "<option value='0'>所有行业</option>"
//        for(var i=0;i<allIndustryIds.length;i++){
//            tmp = "<option value="+allIndustryIds[i]+">"+allIndustryNames[i]+"</option>"
//            options += tmp;
//        }
//    }else{
//        options = "<option value='-1'>所有关注行业</option>"
//        for(var i=0;i<focusIndustryIds.length;i++){
//            tmp = "<option value="+focusIndustryIds[i]+">"+focusIndustryNames[i]+"</option>"
//            options += tmp;
//        }
//    }
//    $("#industryOptions").html(options)
//}
//
////关注行业弹出层
//function pop_attention(id) {
//    //自定页
//	layer.open({
//        type: 2,
//        title: '请选择您关注的行业',
//        shadeClose: true,
//        maxmin: true, //开启最大化最小化按钮
//        area: ['750px', '350px'],
//        content: 'html/pop_attention.html',
//        success : function(layero, index) {
//			var iframeWin = top.window[layero.find('iframe')[0]['name']];
//			iframeWin.popIndustry(popIndustryHtml);
//		}
//    });
//}
//var popIndustryHtml;  //弹出层行业html
//var allIndustryIds;
//var allIndustryNames;
//var focusIndustryIds;
//var focusIndustryNames;
//var userId;
//
//$(function(){
//    initVar();
//    initIndex();
//})
//function initVar(){
//     popIndustryHtml=""  //弹出层行业html
//     allIndustryIds = [];
//     allIndustryNames = [];
//     focusIndustryIds = [];
//     focusIndustryNames = [];
//     userId ="1"
//}
//function initIndex(){
//    initFocusIndustry();
//    initAllIndustry();
//    initSelectOptions();
//}
////所有行业初始化
//function initAllIndustry(){
//    sendPostRequest(platformUrl.industry,function(data){
//        var ls = data.data;
//        $(ls).each(function(){
//            var id =$(this)[0].id;
//            var name = $(this)[0].name;
//            allIndustryIds.push(id)
//            allIndustryNames.push(name)
//            if($.inArray(id, focusIndustryIds)>-1){
//                popIndustryHtml += "<li value= "+id+" class='on' >"+name+"</li>"
//            }else{
//                popIndustryHtml += "<li value= "+id+">"+name+"</li>"
//            }
//        })
//    })
//}
////查询用户关注行业
//function initFocusIndustry(){
//     sendPostRequest(platformUrl.userIndustry+userId,function(data){
//        var entity = data.data;
//        if(entity){
//            focusIndustryIds = entity.industryIdList
//            focusIndustryNames = entity.industryNameList
//        }
//    })
//}
////select options初始化
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
//头部统计数字
sendPostRequest(platformUrl.queryIndexHeaderStat,function(data){
    $(".total-project").text(data.data.projectNum)
    $(".total-org").text(data.data.orgNum)
    $(".total-investevent").text(data.data.eventNum)
})
//发现项目 最新投资事件 最新资讯
var divList = $(".container").find("div[data-block]");
$(divList).each(function(){
    var div =$(this);
    var url = detail[div.attr("data-block")];
    if(div.attr("data-block")=="news"){
        url = dataUrl[div.attr("data-block")]
        var data = {
            "records":[
                {
                    "abs":"Area 404 研发的产品，从卫星、无人机、Terragraph 再到 VR/AR 和，与 Facebook 公司的 10 年规划配合的非常紧密 ",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201709/28005240/oqo3qijmo2ezb3cr!feature",
                    "publicTime":"2017-09-28",
                    "title":"独家探访Area 404 实验室，Facebook下一个十年的秘密都在这里",
                    "url":"http://36kr.com/p/5095478.html"
                },
                {
                    "abs":"又是一家名字前面有一个“the”的创业公司",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201709/27081633/0djsfb1gu9jkz0ik!feature",
                    "publicTime":"2017-09-28",
                    "title":"我们和硅谷最棒的付费科技媒体「The Information」聊了聊，这里是一些小料",
                    "url":"http://36kr.com/p/5095361.html"
                },
                {
                    "abs":"想要发展，得找到一个好的天使投资人。",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201709/25123301/ks8uy7foh6hro0c0!feature",
                    "publicTime":"2017-09-28",
                    "title":"纽约大学用人工智能引擎，对 AI 领域的天使投资人进行了打分",
                    "url":"http://36kr.com/p/5095008.html"
                },
                {
                    "abs":"这是两年多以来，托福Easy姐第一次出现在36氪上。",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201709/27042140/ywcmf8ey090ik76f!feature",
                    "publicTime":"2017-09-28",
                    "title":"低调的「托福Easy姐」收购「娃与娃」：为数不多的在线教育公司收购线下公司的案例",
                    "url":"http://36kr.com/p/5095322.html"
                },
                {
                    "abs":"技术的进步及廉价化，则有可能激发被压抑的翻译需求",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201709/29040239/3ue4uqa5than3bhr!feature",
                    "publicTime":"2017-09-28",
                    "title":"落地机器翻译服务，「Atman」推出TransGod翻译工具",
                    "url":"http://36kr.com/p/5091513.html"
                }
			]
		}
		var target = $("#"+div.attr("data-block"));
		target.tmpl(data).appendTo(target.parent())
    }else{
        sendGetRequest(url,function(data){
           $(data.data).each(function(k,v){
                if(!v)v="-"
           })
           var target = $("#"+div.attr("data-block"));
           target.tmpl(data).appendTo(target.parent())
        })
    }

})

function formatOrg(orgs){
if(orgs && orgs != table.empty) {
                var json = eval("(" +  orgs + ")");
                var ls = json["investSideJson"];
                var firms = new Array();
                $(ls).each(function(i){
                   if(i<3){
                        json = ls[i]
                        if(json.isClick==1){
                           if(json.isLeader==1){
                                if(json.type=="invst"){
                                    firms.push('<li class="ling_t"><span class="list_table_td"><a target="_blank" href="/jg_particulars.html?orgId=')
                                    firms.push(json.id)
                                    firms.push('" class=\'invstorName\' title="')
                                    firms.push(json.invstor)
                                    firms.push('">')
                                    firms.push(json.invstor)
                                    firms.push('</a><label class="lticon">领投</label></span></li>');
                                }else{
                                    firms.push('<li class="ling_t"><span class="list_table_td"><a target="_blank" href="/project_qy.html?code=');
                                    firms.push(json.code)
                                    firms.push('" class=\'invstorName\' title="')
                                    firms.push(json.invstor)
                                    firms.push('">')
                                    firms.push(json.invstor)
                                    firms.push('</a><label class="lticon">领投</label></span></li>');
                                }
                           }else{
                                if(json.type=="invst"){
                                    firms.push('<li class="ling_t"><span class="list_table_td"><a target="_blank" href="/jg_particulars.html?orgId=')
                                    firms.push(json.id)
                                    firms.push('" class=\'invstorName\' title="')
                                    firms.push(json.invstor)
                                    firms.push('">')
                                    firms.push(json.invstor)
                                    firms.push('</a></li>');
                                }else{
                                    firms.push('<li class="ling_t"><span class="list_table_td"><a target="_blank" href="/project_qy.html?code=')
                                    firms.push(json.code)
                                    firms.push('" class=\'invstorName\' title="')
                                    firms.push(json.invstor)
                                    firms.push('">')
                                    firms.push(json.invstor)
                                    firms.push('</a></span></li>');
                                }
                           }
                        }else{
                            firms.push("<li class='invstorName' title='")
                            firms.push($(this)[0].invstor)
                            firms.push("'><span class='list_table_td'>");
                            firms.push($(this)[0].invstor)
                            firms.push("</span></li>");
                        }
                   }
                })
               org =firms.join("");
            }else{
               org = table.empty;
            }
            return org;
}

function formatLabels(labels){
       var str = "";
       if(labels){
            $(labels.split(",")).each(function(i,e){
                if(i<3){
                    str+= "<span class='project_lable'>"+e+"</span>";
                }

            })
            labels = str
       }
       return labels;
}
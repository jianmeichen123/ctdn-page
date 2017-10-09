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
                    "abs":"9月30日至10月8日，全国用户骑行摩拜单车约消耗了460万碗米饭的热量。",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201710/09041826/tfwbht3s3alhn4i4!feature",
                    "publicTime":"2017-10-09",
                    "title":"摩拜单车发布“十一骑行出游报告”：上海用户异地出行比例更高，热衷海外游",
                    "url":"http://36kr.com/p/5096359.html"
                },
                {
                    "abs":"此后，摄像头扫描的数据会与已经包含你面部数据的其他数据库进行交叉引用，你的脸最终成为重新定向的中心。",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201710/09052342/i6mptqazfff1yacc!feature",
                    "publicTime":"2017-10-09",
                    "title":"识别你的脸给你播定制广告，未来这种事或将成真",
                    "url":"http://36kr.com/p/5096370.html"
                },
                {
                    "abs":"数据很可能会成为将来AI角逐的关键甚至是决定性因素。",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201710/09055714/gmbc62zmvdcr9ehi!feature",
                    "publicTime":"2017-10-09",
                    "title":"AI公司如何撬动数据？吴恩达、李飞飞等6位大咖这样说……",
                    "url":"http://36kr.com/p/5096379.html"
                },
                {
                    "abs":"沉寂中的公司纷纷探索无人机的下一个风口。",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201710/09035405/qakwqwqzxgrrcxzo!feature",
                    "publicTime":"2017-10-09",
                    "title":"无人机早已不是航拍娱乐的专属，下一个受追捧的是工业级领域应用",
                    "url":"http://36kr.com/p/5096352.html"
                },
                {
                    "abs":"计算得出2018年寺库净利润约为0.8-1.2亿元，鉴于寺库处于发展时期，给予20-25倍PE，估值为21-24亿元，略低于当前股价。",
                    "author":"36氪",
                    "imgUrl":"https://pic.36krcnd.com/avatar/201710/09034545/91otd8ols7fvovbm!feature",
                    "publicTime":"2017-10-09",
                    "title":"寺库估值不到4亿美元，这就是奢侈品电商的终局？",
                    "url":"http://36kr.com/p/5096347.html"
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
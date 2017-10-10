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
                    "abs":"5倍的用户增长，10倍的收入增长，接近2亿元的营收，盘点2017，掌上糖医已交出了一个漂亮的成绩单。",
                    "author":"创业邦",
                    "imgUrl":"http://img1.cyzone.cn/uploadfile/2017/1010/thumb_200_120_20171010123750756.jpg",
                    "publicTime":"2017-10-10",
                    "title":"掌上糖医完成B1轮过亿融资，医院SaaS平台构建AI智能诊疗",
                    "url":"http://www.cyzone.cn/a/20171010/316281.html"
                },
                {
                    "abs":"10月9日，微软操作系统事业部全球副总裁Joe Belfiore发表Twitter称，微软还将继续为Windows移动平台提供BUG修复、安全更新等技术支持，不过开发新的操作系统功能及硬件将不再是未来工作的重点。",
                    "author":"创业邦",
                    "imgUrl":"http://img1.cyzone.cn/uploadfile/2017/1009/thumb_200_120_20171009072203628.jpg",
                    "publicTime":"2017-10-10",
                    "title":"微软高管首次公开表示放弃Windows Phone",
                    "url":"http://www.cyzone.cn/a/20171009/316269.html"
                },
                {
                    "abs":" Flipboard 想用更高级的内容与展示方式取代“标题党”与软色情，去满足那些逃离今日头条的人，这到底是不是真需求？",
                    "author":"钛媒体",
                    "imgUrl":"http://images.tmtpost.com/uploads/images/2017/09/3062258-inline-i-1-flipboard-newsreader-app-flipboards-quest-to-save-online-publishing-and-itself.jpg",
                    "publicTime":"2017-10-10",
                    "title":"红板报 Flipboard 想满足“逃离”今日头条的那些人，颜值为王是否代表下一个方向？",
                    "url":"http://www.tmtpost.com/2826794.html"
                },
                {
                    "abs":"各路玩家加入这场旷世盛宴中，去抢夺这块肥腴多金之地。",
                    "author":"钛媒体",
                    "imgUrl":"http://images.tmtpost.com/uploads/images/2017/10/u3167236725,1400755695fm173sB78CF905D8195ACC2A24A1C60300A0B3w580h330img.JPEG",
                    "publicTime":"2017-10-10",
                    "title":"资本大鳄、流量巨头蜂拥，上万平台陷现金贷争食混战 ",
                    "url":"http://www.tmtpost.com/2843351.html"
                },
                {
                    "abs":" “准，快，好，省”，这四字诀的每一单点的突破都意味着机会，都意味着或许能抓到一块阿里京东炮火之外的根据地。为此，我们想好好数一下，在当前这个时点，这四个字到底对应着哪些零售业态或模式。",
                    "author":"钛媒体",
                    "imgUrl":"http://images.tmtpost.com/uploads/images/2017/10/150736533218545600_a580x330.jpg",
                    "publicTime":"2017-10-10",
                    "title":"关于新零售创业，这里有一份“4字秘诀”",
                    "url":"http://www.tmtpost.com/2843428.html"
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
var industryNames = ''
sendGetRequest(detail.userIndustry+'1',function(data){
	if(data.success){
		industryNames = data.data.industryNames
	}
})
    var url = detail['getCTDNEventInfo'];
    sendPostRequestByJsonObj(url,{"pageSize":5},function(data){
       $(data.data).each(function(k,v){
            if(!v){
                v="-"
            }else{
                for(i in v){
                    if(i=='invstorgnames'&&!v[i]){
                        v[i]='--'
                    }
                    if(i=="desc"){
                        v[i]=v[i].substring(0,34)+"...";
                    }
                    if(i=="investSideJson"){
                          var investSideJson = v[i]
                          if(!investSideJson){
                             return table.empty
                          }else{
                          var jsonObjArr = eval('(' + investSideJson + ')');
                          for(k in jsonObjArr){
                             var k = jsonObjArr[k]
                             var investTitle = ''
                             for(j in k){
                                 var json = k[j]
                                 if(json.invstor!=null&&j<3){
                                    var con=json.invstor;
                                    /*if(json.invstor.length>10){  //投资方截断显示
                                        con=json.invstor.substring(0,10)+"..."
                                    }else{
                                        con=json.invstor
                                    }*/
                                     if(json.id){
                                         if(json.type=='invst'&&json.isClick==1){
                                             investTitle+='<center><span class="list_table_bbad"><a target="_blank" href="/jg_particulars.html?orgCode='+json.code+'" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'" class="invstorName">'+con+'</a></span></center>';
                                         }
                                         if(json.type=='invst'&&json.isClick==0){
                                             investTitle+='<center><span class="list_table_td invstorName" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'">'+con+'</span></center>';
                                         }
                                         if(json.type=='com'){
                                             investTitle+='<center><span class="list_table_bbad"><a target="_blank" href="/project_qy.html?projCode='+json.code+'"  title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'" class="invstorName">'+con+'</a></span></center>';
                                         }
                                         if(json.type!='invst'&&json.type!='com'){
                                             investTitle+='<center><span class="list_table_td invstorName" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'">'+con+'</span></center>';
                                         }
                                     }else{
                                         investTitle+='<center><span class="list_table_td invstorName" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'">'+con+'</span></center>';
                                     }
                                 }
                             }
                             if(investTitle!=''&&investTitle){
                                 v[i] = investTitle
                             }else{
                                 v[i]='未透露'

                             }
                          }
                      }
                    }
                }
            }
       })
       var target = $("#getCTDNEventInfo");
       target.tmpl(data).appendTo(target.parent())
    })
//新闻
function getNews(){
    var json={};
    json["typeId"] = $("input[name='typeId']").val();
    json["pageSize"]=6;
    json["pageNo"]=0;
    if(type == '2' || type == '6' || type == '7' || type==''){
    	json["industryNames"] = industryNames
    }
     sendPostRequestByJsonObj(searchUrl["news"],json,function(data){
           $(data.page.records).each(function(k,v){
                if(!v){
                    v="-"
                }else{
                    for(i in v){
                        if(i=="records"){
                            for(j in v[i]){
                               if(v[i][j].overview.length>150){
                                   v[i][j].overview=v[i][j].overview.substring(0,150)+'...'
                               }
                                v[i][j].orderTime= formatNewsTime(v[i][j].orderTime)
                           }
                        }
                    }
                }
           })
           $("#newsList").html("");
           $("#getAllnews").tmpl(data.page).appendTo($("#newsList"))
        })
}


$(function () {
	$("#trade_pop").hide();
	getPorjects(1);
    var href = GetUrlRelativePath()
    if(href == 'index'){
    	getGG_news()
    }else{
    	getNews();
    }
    getOrgs();
    getParentIndustrys();
})
$("#lastestPro").delegate("li","click",function(){
	var tab = $(this).attr("value");
	$("#lastestPro li").removeClass('financing_on')
	$(this).addClass('financing_on')
	getPorjects(tab);
}); 
function getPorjects(tab){
	var url = ''
	if(tab == 0){
		url = detail.queryLastestLoadProject
	}
	if(tab == 1){
		url = detail.queryLastestFinanceProject
	}
	sendPostRequestByJsonStr(url,null,function(data){
		if(data.success){
			var data_list = data.data
			var html = ''
			for(var i=0;i<data_list.length;i++){
				var entity = data_list[i]
				var amount = '金额未透露'
				var round = '轮次未知'
				if(entity.latestFinanceAmountNum){
					amount = entity.latestFinanceAmountNum
				}
				if(entity.latestFinanceRound){
					round = entity.latestFinanceRound
				}
				var invst =  entity.investSideJson 
				
				var orgs = ''
				if(invst){
					invst = JSON.parse(entity.investSideJson)
					var org_jarr = invst.investSideJson
					for(var j=0;j<org_jarr.length;j++){
						var org_json = org_jarr[j]
						orgs +=org_json['title']
						if(j!=org_jarr.length-1){
							orgs+=','
						}
					}
				}else{
					orgs = '名称未知'
				}
			    var date =formatDate(entity.latestFinanceDT,'yyyy-MM-dd')
			    var logo = Constants.logoPath+'project/'+entity.projCode+".png"
				html +='<li>'
					+'<div class="index_project_cen">'
					+'<ul>'
					+'<li>'
					+'<div class="index_project_img"><a href="/project_qy.html?projCode='+entity.projCode+'" target="_blank"><img src="'+logo+'"></a></div>'
					+'<div class="index_project_img_r">'
					+'<div class="index_project_img_r_1"><a href="/project_qy.html?projCode='+entity.projCode+'" target="_blank">'+entity.projTitle+'</a></div>'
					+'<div class="index_project_img_r_2">'+round+'/'+amount+'</div>'
					+'<div class="index_project_img_r_3">'
					+'<span>'+entity.industryName+'</span>'
					+'</div>'
					+'</div>'
					+'</li>'
					+'<li class="index_project_img_r_c">'
					+'	<div class="index_project_img_r_c_l">获投时间：</div>'
					+'<div class="index_project_img_r_c_r">'+date+'</div>'
					+'</li>'
					+'<li>'
					+'<div class="index_project_img_r_c_l">投资机构：</div>'
					+'<div class="index_project_img_r_c_r">'+orgs+'</div>'
					+'</li>'
					+'</ul>'
					+'</div>'
					+'</li>'
			}
			$('.index_project').html(html)
		}
	})
}
function getOrgs(){
	sendPostRequestByJsonStr(detail.queryLastestOrg,null,function(data){
		if(data.success){
			var data_list = data.data
			var html = ''
			for(var i=0;i<data_list.length;i++){
				var entity = data_list[i]
				var logo = ''
			    logo = Constants.logoPath+'org/'+entity.orgCode+".png"
				var investOrg = '名称未知'
				if(entity.investOrg){
					investOrg = entity.investOrg
				}
				html += '<li>'
					+'<div class="index_institution_img"><a href="/jg_particulars.html?orgCode='+entity.orgCode+'" target="_blank"><img src="'+logo+'"></a></div>'
					+'<div class="index_institution_name"><a href="/jg_particulars.html?orgCode='+entity.orgCode+'" target="_blank">'+investOrg+'</a></div>'
					+'<div class="index_institution_num"><span>'+entity.investTotal+'</span>笔</div>'
					+'</li>'
			}
			$('.index_institution ul').html(html)
		}
	});
}



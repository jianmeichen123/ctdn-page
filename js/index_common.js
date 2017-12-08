
var industryNames = null
var industryIdList = null
sendPostRequestByJsonObj(detail.userIndustry+"1",null,function(data){
	if(data.success){
		industryNames = data.data.industryNames
		industryIdList=data.data.industryIdList
	}
});
getNews()
function getNews(){
    var json={};
    var type = $("input[name='typeId']").val()
    json["typeId"] =type;
    json["pageSize"]=6;
    json["pageNo"]=0;
    if(type == '2' || type == '6' || type == '7' || type==''){
    	json["industryNames"] = industryNames
    }
    console.log(json)
    sendPostRequestByJsonObj(searchUrl["news"],json,function(data){
           $(data.data).each(function(k,v){
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
           $("#getAllnews").tmpl(data).appendTo($("#newsList"))
        })
}
var url = detail['getCTDNEventInfo'];
sendPostRequestByJsonObj(url,{"pageSize":5,"industryIdList":industryIdList},function(data){
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
getOrgs()
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
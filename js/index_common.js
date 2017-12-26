

function getNews(){
    var json={};
    var type = $("input[name='typeId']").val()
    json["typeId"] =type;
    json["pageSize"]=10;
    json["pageNo"]=0;
    if(type == '2' || type == '6' || type == '7' || type==''){
    	json["industryNames"] = industryNames
    }
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
function getCTDNEventInfo(){
	var url = detail['getCTDNEventInfo'];
	sendPostRequestByJsonObj(url,{"pageSize":5,"industryIdList":industryIdList,"userCode":userCode},function(data){
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
}

function getActiveOrgs(){
	sendPostRequestByJsonStr(detail.queryLastestOrg,null,function(data){
		if(data.success){
			var data_list = data.data
			var html = ''
			if(data_list == null || data_list.length ==0){
				html = '<span>暂无数据</span>'
			}
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
					+'<div class="index_institution_num"><span>'+entity.lastMonthInvestNum+'</span>笔</div>'
					+'</li>'
			}
			$('.index_institution ul').html(html)
		}
	});
}

function save_user_industry(){
	var ids = new Array()
	var names= new Array()
	$('#concern_industry li').each(function(){
		if($(this).hasClass('trade_pop_c_ul_on')){
			var id = $(this).attr('lang')
			var name = $(this).text()
			ids.push(id)
			names.push(name)
		}
	})
	var sss = {
		       "industryIdList":ids,
		       "userCode":userCode}
	sendPostRequestByJsonObj(platformUrl.updateUserIndustry,sss,function(data){
		if(data.success){
//			cancle_user_industry()
			location.reload()
		}
	})
}
var default_user_industry = ''
	function getParentIndustrys(){
		sendPostRequestByJsonObj(detail.getParentIndustrys,{"userCode":userCode},function(data){
			if(data.success){
				var data_list = data.data
				default_user_industry = data.data
				show_user_industry(data_list)
			}
		})
	}
function reset_user_industry(){
	sendPostRequestByJsonStr(platformUrl.resetUserIndustry +"/" + userCode,null,function(data){
		if(data.success){
			var  defaultId = data.data
			var html = ''
		    for(var i=0;i<default_user_industry.length;i++){
				var entity = default_user_industry[i]
				var flag = 0;
				if($.inArray(entity.id, defaultId)==-1){
					flag = 0
				}else{
					flag = 1
				}
				var css = ''
				if(flag == '1'){ //选中
					css = 'trade_pop_c_ul_on'
				}
				html +='<li class="'+ css +'" lang="'+entity.id+'">' +entity.name+'</li>'
			}
			$('#concern_industry').html(html)
			$("#concern_industry li").click(function(){
				$(this).toggleClass('trade_pop_c_ul_on')
			})
		}else{
			layer.msg('系统繁忙，请稍候重试')
		}
	});
}

//从cookie取值判断是否已经登录
function isLogin(){
	var cookie=document.cookie
	if(cookie == null){
		return false
	}
	var _uid_ = null
	var s_ = null
	var cookie_arr = document.cookie.split("; ")
	for(var i=0;i<cookie_arr.length;i++){
		var temp = cookie_arr[i].split("=");
		if(temp[0] == '_uid_') {
			_uid_ = temp[1]
			continue
		}
		if(temp[0] == 's_') {
			s_ = temp[1]
			continue
		}
	}
	if(_uid_ && s_){
		return true
	}
	return false
}
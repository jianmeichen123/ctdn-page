var tableFormate ={
    industryStr:function(value, row, index){
        if (!row.industryName)return "行业未知"
        if (row.industryName&&!row.industrySubName)return row.industryName
        return row.industryName +">" +row.industrySubName
    },
    //企业项目
    projectName:function(value, row, index){
        var projectName = row.projTitle
        var img = ""
        if(projectName==null){
            projectName='名称未知'
        }
        if (row.logoSmall&&row.logoSmall.indexOf("/")!=-1){
            img = row.logoSmall.split("/")[1]
        }else if (row.logoSmall&&row.logoSmall!=""){
            img = row.logoSmall
        }
        if(img.indexOf(".") == -1){
            img = ""
        }
        return '<div class="list_table_td"> <img width="37" src="'+Constants.logoPath+img+'"> <span class="col_999"><a target="_blank" href="/project_qy.html?code='+row.code+'">'+projectName+'</a></span> </div>'
    },
    //上市列表
    listedProjectName:function(value, row, index){
            var projectName = row.projTitle
            var img = ""
            var industrict = ""
            if(projectName==null){
                projectName='名称未知'
            }
            if (row.logoSmall&&row.logoSmall.indexOf("/")!=-1){
                img = row.logoSmall.split("/")[1]
            }else if (row.logoSmall&&row.logoSmall!=""){
                img = row.logoSmall
            }
            if(img.indexOf(".") == -1){
                img = ""
            }
            if (row.districtSubName){
                industrict+=row.districtSubName
            }else{
                industrict+='地区未知 '
            }
            if(!row.industryName){
                industrict+=' 行业未知'
            }
            if (row.industryName&&!row.industrySubName){
                industrict+=' '+row.industryName
            }
            if (row.industryName&&row.industrySubName){
                industrict+=' '+row.industryName +">" +row.industrySubName
            }
            if(row.sourceCode){
                return '<div class="list_table_td"> <a target="_blank" href="/project_qy.html?code='+row.sourceCode+'"><img  width="37" src="'+Constants.logoPath+img+'"></a> <ul><li class="clearfix"><span class="col_999"><a target="_blank" href="/project_qy.html?code='+row.sourceCode+'">'+projectName+'</a></span></li><li>'+industrict+'</li></ul> </div>'
            }else{
                return '<div class="list_table_td"> <img  width="37" src="'+Constants.logoPath+img+'"> <ul><li><a class="defalut">'+projectName+'</a></li><li>'+industrict+'</li></ul> </div>'
            }
        },
        //投资方
    investSide:function(value, row, index){
         var investSideJson = row.investSideJson
         if(investSideJson==null){
            return '未透露'
         }else{
             var jsonObjArr = eval('(' + investSideJson + ')');
             for(i in jsonObjArr){
                var i = jsonObjArr[i]
                var investTitle = ''
                for(j in i){
                    var json = i[j]
                    if(json.invstor!=null&&j<3){
                    	var con=json.invstor;
                    	/*if(json.invstor.length>10){  //投资方截断显示
                    		con=json.invstor.substring(0,10)+"..."
                    	}else{
                    		con=json.invstor
                    	}*/
                        if(json.id){
                            if(json.type=='invst'&&json.isClick==1){
                                investTitle+='<center><span class="list_table_bbad"><a target="_blank" href="/jg_particulars.html?orgId='+json.id+'" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'" class="invstorName">'+con+'</a></span></center>';
                            }
                            if(json.type=='invst'&&json.isClick==0){
                                investTitle+='<center><span class="list_table_td invstorName" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'">'+con+'</span></center>';
                            }
                            if(json.type=='com'){
                                investTitle+='<center><span class="list_table_bbad"><a target="_blank" href="/project_qy.html?code='+json.code+'"  title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'" class="invstorName">'+con+'</a></span></center>';
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
                    return investTitle
                }else{
                    investTitle='未透露'
                    return investTitle
                }
             }
         }
    },
    //融资公司/投资列表
    financeCompany:function(value,row,index){
        var company = row.company
        var industrict = ""
        var img = ""
        if (row.logo&&row.logo!=""){
            var imgArr = row.logo.split("/")
            if(imgArr[1]!=null){
                img = imgArr[1]
            }else{
                img = imgArr[0]
            }
        }
        if(!company){
            company='名称未知'
            industrict='地区未知'+ ' '+'行业未知'
        }
        if (row.districtSubName){
            if(row.districtSubName!='国外'){
                industrict+=row.districtSubName
            }else{
                industrict+='地区未知'
            }
        }else{
            industrict+='地区未知'
        }
        if(!row.industryName){
            industrict+=' 行业未知'
        }
        if (row.industryName&&!row.industrySubName){
            industrict+=' '+row.industryName
        }
        if (row.industryName&&row.industrySubName){
            industrict+=' '+row.industryName +">" +row.industrySubName
        }
        if(img.indexOf(".") == -1){
            img = ""
        }
        if(row.sourceCode){
            return '<div class="list_table_td"> <a target="_blank" href="/project_qy.html?code='+row.sourceCode+'"><img  width="37" src="'+Constants.logoPath+img+'"> </a><ul class="col_999"> <li><a target="_blank" href="/project_qy.html?code='+row.sourceCode+'">'+company+'</a></li> <li>'+industrict+'</li> </ul> </div>'
        }else{
            return '<div class="list_table_td"> <img  width="37" src="'+Constants.logoPath+img+'"> <ul class="col_999"> <li><a class="defalut">'+company+'</a></li> <li>'+industrict+'</li> </ul> </div>'
        }
    },
    //被并购方-并购列表
    beenMergered:function(value,row,index){
        var mergered = row.projTitle
        var industrict = ""
        if(!mergered){
            mergered='名称未知'
            industrict='地区未知'+ ' '+'行业未知'
        }
        var img = ""
        if (row.logo&&row.logo!=""){
            var imgArr = row.logo.split("/")
            if(imgArr[1]!=null){
                img = imgArr[1]
            }else{
                img = imgArr[0]
            }
        }
        if(row.districtSubName&&row.districtSubName!='国外') industrict+=row.districtSubName
        if(row.districtSubName=='国外') industrict+="地区未知"
        if(!row.districtSubName&&!row.districtGrandsonName) industrict+= "地区未知"
        if(!row.districtSubName&&row.districtGrandsonName) industrict+=row.districtGrandsonName
        if (!row.industryName&&!row.industrySubName) industrict+=' '+" 行业未知"
        if (row.industryName&&!row.industrySubName) industrict+=' '+row.industryName
        if (row.industryName&&row.industrySubName) industrict+=' '+row.industryName +">" +row.industrySubName

        if(img.indexOf(".") == -1){
            img = ""
        }
        if(row.sourceCode){
            return '<div class="list_table_td"> <a target="_blank" href="/project_qy.html?code='+row.sourceCode+'"><img  width="37" src="'+Constants.logoPath+img+'"></a> <ul class="col_999"> <li><a target="_blank" href="/project_qy.html?code='+row.sourceCode+'">'+mergered+'</a></li> <li>'+industrict+'</li> </ul> </div>'
        }else{
            return '<div class="list_table_td"> <img  width="37" src="'+Constants.logoPath+img+'"> <ul class="col_999"> <li><a class="defalut">'+mergered+'</a></li> <li>'+industrict+'</li> </ul> </div>'
        }
    },
    amountStr:function(value,row,index){
        var amountStr = row.amountStr
        if(amountStr==null){
            amountStr = '未透露'
        }
        return amountStr
    },
    //并购方-并购列表（未用）
    mergerSide:function(value,row,index){
        var mergerSideJson = row.mergeSideJson
        var mergerSideArr = eval('('+mergerSideJson+')')
        for(i in mergerSideArr){
            var mergerSides = mergerSideArr[i]
            var mergerSideTitle = ''
            for(j in mergerSides){
                var json = mergerSides[j]
                if(json.title != ''){
//                    mergerSideTitle+='<div class="w_200_spot">'+json.title+'</div>';
                    mergerSideTitle+='<div class="list_table_td"><center><span class="col_999"><a target="_blank" href="/jg_particulars.html?orgId='+json.id+'">'+json.title+'</a></span></center></div>';
                }
            }
            if(mergerSideTitle!=''){
                return mergerSideTitle
            }else{
                mergerSideTitle = '未透露'
                return mergerSideTitle
            }
        }
    },
    //投资机构-投资机构列表
    org:function(value,row,index){
        var investOrg = row.investOrg
        var orgArr = []
        if(investOrg){
            orgArr = investOrg.split("|")
            if($("#projTitle").val()){
                for(i in orgArr){
                    var investOrgStr = orgArr[i]
                    if(investOrgStr.indexOf($("#projTitle").val())>=0){
                        if(investOrgStr.indexOf(';')>=0){
                            var arr = investOrgStr.split(";")
                            for(j in arr){
                                if(arr[j].indexOf($("#projTitle").val())>=0){
                                    investOrg = arr[j]
                                    break
                                }
                            }
                        }else{
                            investOrg = investOrgStr
                        }
                        break;
                    }
                }
            }else{
                investOrg = orgArr[0]
            }
         }else{
            investOrg = '名称未知'
         }

        var img = ""
        if (row.logoSmall&&row.logoSmall!=""){
            var imgArr = row.logoSmall.split("/")
            if(imgArr[1]!=null){
                img = imgArr[1]
            }else{
                img = imgArr[0]
            }
        }
        if(img.indexOf(".") == -1){
            img = ""
        }
        return '<div class="list_table_td"> <img  width="37" src="'+Constants.logoPath+'/org/'+img+'"> <ul class="col_999"> <li><a target="_blank" href="/jg_particulars.html?orgId='+row.orgId+'">'+investOrg+'</a></li> </ul> </div>'
    },
    //投资项目-投资机构列表
    investProject:function(value, row, index){
         var orgProjJson = row.orgProjJson
         var jsonObjArr = eval('(' + orgProjJson + ')');
         for(i in jsonObjArr){
            var i = jsonObjArr[i]
            var investProj = ''
            for(j in i){

                var json = i[j]
                if(json.invstor!=null&&j<3){
                    investProj+='<span class="list_table_td"><a target="_blank" href="/project_qy.html?code='+json.code+'">'+json.invstor+"</a></span><br>"
                }
            }
            if(investProj!=''){
                return investProj
            }
         }
    },
    equityRate:function(value, row, index){
        if (row.equityRate==null) return '未透露'
        return row.equityRate+"%"
    },
    //并购方-并购列表
    mergeSideJson:function(value, row, index){
        var mergeSideJson = row.mergeSideJson
        var mergeSideTitle = ''
        if(mergeSideJson==null){
             mergeSideTitle='未透露'
            return mergeSideTitle
        }
        var jsonObjArr =  JSON.parse(mergeSideJson);
        for(i in jsonObjArr){
            var i = jsonObjArr[i]
            for(j in i){
                var json = i[j]
                if(json.title!=''&&j<3){
                    if(json.id!=0){
                        if(json.type=='invse'){
                            mergeSideTitle+='<center><span class="list_table_td"><a target="_blank" href="/jg_particulars.html?orgId='+json.id+'">'+json.title+'</a></span></center>';
                        }
                        if(json.type=='com'){
                            mergeSideTitle+='<center><span class="list_table_td"><a target="_blank" href="/project_qy.html?code='+json.code+'">'+json.title+'</a></span></center>';

                        }
                    }else{
                        mergeSideTitle+='<center><span class="list_table_td">'+json.title+'</span></center>';
                    }
                }
            }
            return mergeSideTitle
        }
    },
    //并购详情
    paticulars:function(value, row, index){
        var projTitle = row.projTitle
        var eventId = row.eventId
        return '<center><span class="list_table_td"><a target="_blank" href="/bg_particulars.html?eventId='+row.eventId+'">'+"详情"+'</a></span></center>'
    },
    //投资事件详情
    eventInfoPaticulars:function(value, row, index){
        var projTitle = row.projTitle
        var eventId = row.eventId
        return '<center><span class="list_table_td"><a target="_blank" href="/tzsj_particulars.html?eventId='+eventId+'">'+"详情"+'</a></span></center>'
    },
    totalRatio:function(value,row,index){
            var totalRatio = row.totalRatio
            var totalRatioStr = ''
            if(totalRatio){
                 if(totalRatio>0){
                            totalRatioStr='<div align="center" class="list_table_td"><center><span class="brain_ico brain_ico_up_arrows"></span>'+totalRatio/100+'%'+'</center></div>'
                }else if(totalRatio<0){
                    totalRatioStr='<div align="center" class="list_table_td"><center><span class="brain_ico brain_ico_down_arrows"></span>'+totalRatio/100+'%'+'</center></div>'
                }else{
                    totalRatioStr='<div align="center" class="list_table_td"><center>0%</center></div>'
                }
            }else{
                totalRatioStr='-'
            }
            return totalRatioStr
        },
        amountRatio:function(value,row,index){
                var amountRatio = row.amountRatio
                var amountRatioStr = ''
                if(amountRatio){
                     if(amountRatio>0){
                        amountRatioStr='<div align="center" class="list_table_td"><center><span class="brain_ico brain_ico_up_arrows"></span>'+amountRatio/100+'%'+'</center></div>'
                     }else if(amountRatio<0){
                        amountRatioStr='<div align="center" class="list_table_td"><center><span class="brain_ico brain_ico_down_arrows"></span>'+amountRatio/100+'%'+'</center></div>'
                     }else{
                         amountRatioStr='<div align="center" class="list_table_td"><center>0%</center></div>'
                     }
                }else{
                    amountRatioStr='-'
                }
                return amountRatioStr
            },
        //上市事件详情
        launchDetail:function(value,row,index){
                return "<center><span class='list_table_td'><a target='_blank' href ='/ss_particulars.html?eventId="+row.eventId+"'"+value+">详情</a></span></center>"

        }
}
//替换占位符
function injectValues(html,row){
       $.each(row,function(k,v){
            while(html.indexOf("${"+k+"}") > 1){
                html = html.replace("${"+k+"}",v)
            }
       })
       return html;
}

//资讯formatter
function newsFormatter(value,row){
    if (row.newsListpics){
         row.newsListpics = "<a href='${newsAddress}'> <img src=''> </a>";
    }else {
         row.newsListpics = ""
    }
//    if(row.newsSource){
//       row.newsSource = "来自：<i>${newsSource}</i>"
//    }else{
//        row.newsSource =''
//    }
   var html = "<dl class='info-list-item'>"+
    			"<dt>"+
    			"${newsListpics}"+
    			"<h3><a href='${newsAddress}' style='blr:expression(this.onFocus=this.blur()); /* IE Opera */ outline:none; /* FF Opera */ '> ${newsTitle}</a></h3>"+
    			"</dt>"+
    			"<dd>"+
    				"<p>${newsOverview}</p>"+
    				"<p class='info-tips'>"+
    				"<i>${newsReportDate}<i> ${newsSource}</p>"+
    			"</dd>"+
    		"</dl>"
    return injectValues(html,row);
}
//项目formatter <span>F轮-上市前/55亿美元</span>
function projectFormatter(value,row){
    var projectName = row.projTitle
    var img = ""
    if(projectName==null){
        projectName='名称未知'
    }
    if (row.logoSmall&&row.logoSmall.indexOf("/")!=-1){
        img = row.logoSmall.split("/")[1]
    }else if (row.logoSmall&&row.logoSmall!=""){
        img = row.logoSmall
    }
    if(img.indexOf(".") == -1){
        img = ""
    }
    if(!row.introduce) row.introduce="暂无"

    if(row.latestFinanceRound){
        row.latestFinanceRound = "<span>"+row.latestFinanceRound+"</span>"
    }else{
        row.latestFinanceRound ="";
    }

    if (!row.districtSubName){
       row.districtSubName ="地址未知"
    }

    if(!row.industryName){
        industryName+=' 行业未知'
    }
    if (row.industryName&&row.industrySubName){
        row.industryName=row.industryName +"-" +row.industrySubName
    }

	var html = "<div class='list-item'>"+
			"<div class='list-item-inner'>"+
				"<div class='list-item-left'>"+
					"<img src='"+Constants.logoPath+img+"'>"+
				"</div>"+
				"<div class='list-item-right'>"+
					"<p class='list-item-title'><a target='_blank' href='/project_qy.html?code="+row.code+"'>"+projectName+"</a>${latestFinanceRound}</p>"+
					"<p class='list-item-content'>简介:${introduce}</p>"+
					"<p class='list-item-tips'><i class='list-item-address'></i>${districtSubName}<i class='list-item-finace'></i>${industryName}</p>"+
				"</div>"+
			"</div>"+
		"</div>"

   return injectValues(html,row);
}
//投资机构
function investfirmFormatter(value,row){
 var investOrg = row.investOrg
        var orgArr = []
        if(investOrg){
            orgArr = investOrg.split("|")
            if($("#projTitle").val()){
                for(i in orgArr){
                    var investOrgStr = orgArr[i]
                    if(investOrgStr.indexOf($("#projTitle").val())>=0){
                        if(investOrgStr.indexOf(';')>=0){
                            var arr = investOrgStr.split(";")
                            for(j in arr){
                                if(arr[j].indexOf($("#projTitle").val())>=0){
                                    investOrg = arr[j]
                                    break
                                }
                            }
                        }else{
                            investOrg = investOrgStr
                        }
                        break;
                    }
                }
            }else{
                investOrg = orgArr[0]
            }
         }else{
            investOrg = '名称未知'
         }

        var img = ""
        if (row.logoSmall&&row.logoSmall!=""){
            var imgArr = row.logoSmall.split("/")
            if(imgArr[1]!=null){
                img = imgArr[1]
            }else{
                img = imgArr[0]
            }
        }
        if(img.indexOf(".") == -1){
            img = ""
        }
        if(row.orgType){
            row.orgType= "<span>"+row.orgType+"</span>";
        }else{
            row.orgType= "";
        }
        if(!row.orgDesc){
            row.orgDesc = "暂无"
        }
        if(!row.investTotal){
            row.investTotal = 0
        }
    	var html = "<div class='list-item'>"+
   			"<div class='list-item-inner'>"+
   				"<div class='list-item-left'>"+
   					"<img src='"+Constants.logoPath+img+"'>"+
   				"</div>"+
   				"<div class='list-item-right'>"+
   					"<p class='list-item-title institute-title'><a target='_blank' href='/jg_particulars.html?orgId="+row.orgId+"'>"+investOrg+"</a>${orgType}</p>"+
   					"<p class='list-item-case'>投资事件:<span>${investTotal}</span></p>"+
   					"<p class='list-item-content list-institute-content'>简介:${orgDesc}</p>"
   				"</div>"+
   			"</div>"+
   		"</div>"

    return injectValues(html,row);
}



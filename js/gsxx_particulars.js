//企业信息、工商信息  导航浮动
/*$(window).scroll(function(){
	var scrollTop=$(window).scrollTop();
	if(scrollTop>305){
		$('.project_nav').addClass('project_nav_top');
		$('.project_nav_top_none').show();
	}else{
		$(".project_nav").removeClass("project_nav_top");
		$('.project_nav_top_none').hide();
	}
});*/

//var projCode = getHrefParamter("projCode");
////给tab页a赋参数
//$(function(){
//    $(".project_nav a").each(function(){
//        $(this).attr("href",$(this).attr("href")+"?projCode="+getHrefParamter("projCode"))
//    })
//    nav_locaton('ctsj','qyxm','','gsxx')
//})
//图谱
var projectShareholderInfoList ;
var dwList={} ;
var subJson={};
var projJson={};
var perJson;
var array=[];
var linkArr=[]
var dataArr=[]
var compJson={}
var compJson1={}
var compJson2={}
var compJson3={}
var compJson4={}
var compJson5={}
var compLink1={}
var compLink2={}
var compLink3={}
var compLink4={}
var compLink5={}
var projName = proj.data.projTitle;
var regName = proj.data.regName;
if(regName){
    dataArr.push(regName)
}else{
    regName=projName
    dataArr.push(regName)
}

compJson["name"]=regName;
compJson["symbolSize"]=30;
compJson["draggable"]="true";
compJson["value"]='';
array.push(compJson);

function fillBaseBusinessInfo(data,divList){
    console.log(data)
    if(data){
        $(divList).each(function(){
            var div = $(this);
            var ls = div.find("*[data-field]")
            $(ls).each(function(){
                var o = $(this);
                var k = o.attr("data-field")
                var v = data[o.attr("data-field")]
                if(v&&v!='-'){
                    o.html(v)
                }else if(v=='-'){
                    o.html(table.empty)
                }else{
                    o.html(table.empty)
                }
            })
        })
    }else{
        $("#gsxx").hide()
                var location_l = $("#gsxx .project_t").attr('location_l')
                $('.project_all_r li[location_r="'+location_l+'"]').hide();
                $('.project_all_r li[location_r="'+location_l+'"]').removeClass('storey_list')
                $("#gsxx").children().removeClass('storey_list');
    }
}

//股东信息
function projectShareholderInfoListFormatter(data,div){
   var staticTemplate = '<tr> <td>${shareholderType}</td> <td>${shareholder}</td> <td>${prePayDate}</td><td>${prePayAmountStr}</td> <td>${paidDate}</td><td>${paidPayAmountStr}</td><td>${payType}</td><td>${equityRate}</td></tr>'
   var temp = staticTemplate;
    var html =""
    if(data){
        if(data.length==0){
            data=null;
        }
    }
    if(data){
        dataArr.push("股东")
        compJson2["name"]="股东";
        compJson2["symbolSize"]=15;
        compJson2["category"]="股东";
        compJson2["draggable"]="true";
        compJson2["value"]=data.length;
        array.push(compJson2);

        compLink4["source"]=regName;
        compLink4["target"]="股东";
        linkArr.push(compLink4);

        $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){

                    if(!v){
                        v = table.empty
                    }else{
                        if(v=='-'){
                            v=table.empty;
                        }
                    }

                    temp = temp.replace("${"+k+"}",v)
                 }
             })
             html += temp;
             temp = staticTemplate
        })
    }else{
        $("#shareholder").hide();
         var location_l = $("#shareholder .project_t").attr('location_l')
                        $('.project_all_r li[location_r="'+location_l+'"]').hide();
                        $('.project_all_r li[location_r="'+location_l+'"]').removeClass('storey_list')
                        $("#shareholder").children().removeClass('storey_list');
//        html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
    }
    div.append(html)
}

//工商变更
function projectBusinessChangeListFormatter(data,div){
   var staticTemplate = '<tr> <td>${changeItems}</td> <td>${beforeContent}</td> <td>${afterContent}</td><td class="wid_time">${changeDate}</td> </tr>'
   var temp = staticTemplate;
    var html =""
    if(data){
        if(data.length==0){
            data=null;
        }
    }
    if(data){
        $(data).each(function(i,row){
             $.each(row,function(k,v){
                 while(temp.indexOf("${"+k+"}") > 1){
                    if(!v){
                            v = table.empty;
                        }else{
                            v='<div align="left">'+v+'</div>'
                        }
                    temp = temp.replace("${"+k+"}",v)
                 }
             })
             html += temp;
             temp = staticTemplate
        })
    }else{
        $('#changes').hide();
          var location_l = $("#changes .project_t").attr('location_l')
            $('.project_all_r li[location_r="'+location_l+'"]').hide();
            $('.project_all_r li[location_r="'+location_l+'"]').removeClass('storey_list')
            $("#changes").children().removeClass('storey_list');
//        html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
    }
    div.append(html)
}

//对外投资
function formatCompany(company,sourceCode,districtSubName,industryName,industrySubName){
        var industrict = ""
        var img = Constants.logoPath+"project/"+sourceCode+".png"
        if(!company){
            company='名称未知'
            industrict='地区未知'+ ' '+'行业未知'
        }
        if (districtSubName){
            if(districtSubName!='国外'){
                industrict+=districtSubName
            }else{
                industrict+='地区未知'
            }
        }else{
            industrict+='地区未知'
        }
        if(!industryName){
            industrict+=' 行业未知'
        }
        if (industryName&&!industrySubName){
            industrict+=' '+industryName
        }
        if (industryName&&industrySubName){
            industrict+=' '+industryName +">" +industrySubName
        }
        if(sourceCode){
            v= '<div class="list_table_td"> <a target="_blank" href="/project_qy.html?projCode='+sourceCode+'"><img  width="37" src="'+img+'"> </a><ul class="col_999"> <li><a target="_blank" href="/project_qy.html?projCode='+sourceCode+'">'+company+'</a></li> <li>'+industrict+'</li> </ul> </div>'
        }else{
            v= '<div class="list_table_td"> <img  width="37" src="'+img+'"> <ul class="col_999"> <li><a class="defalut">'+company+'</a></li> <li>'+industrict+'</li> </ul> </div>'
        }
        return v;
}

function formateFinanceAmount(latestFinanceAmountStr,latestFinanceRound){
    if(latestFinanceRound =="尚未获投" && (!latestFinanceAmountStr || latestFinanceAmountStr=="未透露")){
        return "";
    }
    if(latestFinanceRound =="尚未获投"){
        latestFinanceRound = "轮次未知"
    }
    if(!latestFinanceAmountStr || !latestFinanceAmountStr.indexOf("未透露")>0){
        latestFinanceAmountStr = "金额未知"
    }
    return "<span>"+latestFinanceRound+"/"+latestFinanceAmountStr+"</span>"
}

/*简介只显示两行*/
function formateIntroduce(introduce){
    var len=introduce.length
    if(len>134){
        introduce=introduce.substr(0,130)+"..."
    }
    return introduce
}

function formatInvestSide(investSideJson){
     var investTitle ="";
     if(!investSideJson){
        return table.empty
     }else{
         var jsonObjArr = eval('(' + investSideJson + ')');
         for(m in jsonObjArr){
            var m = jsonObjArr[m]
            var investTitle = ''
            for(j in m){
                var json = m[j]
                if(json.invstor!=null&&j<3){
                   var con=json.invstor;
                    if(json.id){
                        if(json.type=='invst'&&json.isClick==1){
                            investTitle+='<span class="list_table_bbad"><a target="_blank" href="/jg_particulars.html?orgCode='+json.code+'" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'" class="invstorName">'+con+'</a></span>';
                        }
                        if(json.type=='invst'&&json.isClick==0){
                            investTitle+='<span class="list_table_td invstorName" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'">'+con+'</span>';
                        }
                        if(json.type=='com'){
                            investTitle+='<span class="list_table_bbad"><a target="_blank" href="/project_qy.html?projCode='+json.code+'"  title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'" class="invstorName">'+con+'</a></span>';
                        }
                        if(json.type!='invst'&&json.type!='com'){
                            investTitle+='<span class="list_table_td invstorName" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'">'+con+'</span>';
                        }
                    }else{
                        investTitle+='<span class="list_table_td invstorName" title="'+json.invstor.replace("<firm>","").replace("</firm>","")+'">'+con+'</span>';
                    }
                }
            }
         }
    }
    return investTitle;
}



//联系方式
function projectContactListFormatter(data,div){
    var staticTemplate ='<tr> <td>${city}</td> <td>${addr}</td> <td>${zipCode}</td> <td>${tel}</td> <td>${mail}</td> <td>${fax}</td> </tr>'
    var temp = staticTemplate;
    var html = "";
    if(data.length>0){
        $(data).each(function(i,row){
         $.each(row,function(k,v){
             while(temp.indexOf("${"+k+"}") > 1){
                 if(!v){
                     v= table.empty;
                 }
                 temp =temp.replace("${"+k+"}",v)
             }
         })
         html += temp;
         temp = staticTemplate
        })
    }else{
        $("#contacts").hide()
        var location_l = $("#contacts .project_t").attr('location_l')
        $('.project_all_r li[location_r="'+location_l+'"]').hide();
        $('.project_all_r li[location_r="'+location_l+'"]').removeClass('storey_list')
        $("#contacts").children().removeClass('storey_list');
//         html="<tr> <td colspan='7'><span>暂无数据</span></th></tr>"
    }
    div.append(html)
}


//任职人员
if(proj.data.compCode){
    var url = detail["getAllCompMember"]+proj.data.compCode;
    sendGetRequest(url,function(data){
        perJson=data.data;
        if(perJson.length>0){
            if(perJson[0].memberName){
                dataArr.push("任职人员")
                compJson5["name"]="任职人员";
                compJson5["symbolSize"]=15;
                compJson5["category"]="任职人员";
                compJson5["draggable"]="true";
                compJson5["value"]=perJson.length;
                array.push(compJson5);

                compLink3["source"]=regName;
                compLink3["target"]="任职人员";
                linkArr.push(compLink3);

                $(perJson).each(function(i){
                    if(i<5){
                        var json ={}
                        var linkJson={}
                        if($(this)[0].memberName!=''){
                            if($(this)[0].compJob){
                                json["name"]=$(this)[0].memberName+"/"+$(this)[0].compJob;
                            }else{
                                json["name"]=$(this)[0].memberName;
                            }
                            json["symbolSize"]=10;
                            json["category"]="任职人员";
                            json["draggable"]="true";
                            json["value"]=1;
                            linkJson["source"]="任职人员";
                            if($(this)[0].compJob){
                                linkJson["target"]=$(this)[0].memberName+"/"+$(this)[0].compJob;
                            }else{
                                linkJson["target"]=$(this)[0].memberName;
                            }
                            array.push(json);
                            linkArr.push(linkJson);
                        }
                    }
                })
            }
        }
        if(data.data.length==0||!data.data[0].memberName){
            $('#members').hide();
            var location_l = $("#members .project_t").attr('location_l')
            $('.project_all_r li[location_r="'+location_l+'"]').hide();
            $('.project_all_r li[location_r="'+location_l+'"]').removeClass('storey_list')
            $("#members").children().removeClass('storey_list')
        }
       $(data.data).each(function(k,v){
            if(!v){
                v=table.empty;
            }
       })
       var target = $("#getAllCompMember");
       target.tmpl(data).appendTo(target.parent())
    })
}else{
    $('#members').hide();
    var location_l = $("#members .project_t").attr('location_l')
    $('.project_all_r li[location_r="'+location_l+'"]').hide();
    $('.project_all_r li[location_r="'+location_l+'"]').removeClass('storey_list')
    $("#members").children().removeClass('storey_list')
}



//加载更多(子公司和项目)
  $(function(){
         $(".background_boeder").each(function(){
         	var obj = $(this);
         	//带点击更多
         	if(obj.find(".dn_ico_more_all").length>0){
         		var more = obj.find(".dn_ico_more_all");
         		loadMore(more,obj)
         		myChart.setOption(option);

            }else{
                //不带分页
                loadNoPage(obj);
            }
         })
    })
     //点击更多
    $(".dn_ico_more_all").click(function(){
    	var more = $(this)
    	var obj = more.closest(".background_boeder");
    	loadMore(more,obj)
    })

    function loadMore(more,obj){
        var url = obj.attr("data-url");
        var dataId = obj.attr("data-id");
        url = getUrl(dataId,url);
		var json = getJson(obj);
    	var pageNo = obj.find("input[name='pageNo']").val();
        var pageSize = obj.find("input[name='pageSize']").val();
    	var html="";
    	sendPostRequestByJsonObj(url,json,function(data){
    	    if(dataId=='queryByProjTitle'){
                projJson=data.data.records
    	        if(projJson.length>0){
    	            compJson1["name"]="项目";
                    compJson1["symbolSize"]=15;
                    compJson1["category"]="项目";
                    compJson1["draggable"]="true";
                    compJson1["value"]=projJson.length;
                    array.push(compJson1);

                    compLink1["source"]=regName;
                    compLink1["target"]="项目";
                    linkArr.push(compLink1);

    	            dataArr.push("项目")

                    $(projJson).each(function(i){
                        if(i<5){
                            var json ={}
                            var linkJson={}
                            json["name"]=i+1+'.'+$(this)[0].projTitle;
                            json["symbolSize"]=10;
                            json["category"]="项目";
                            json["draggable"]="true";
                            json["value"]=1;
                            linkJson["source"]="项目";
                            linkJson["target"]=i+1+'.'+$(this)[0].projTitle;
                            array.push(json)
                            linkArr.push(linkJson)
                        }
                    })
    	        }
            }
    	    if(dataId=='getAllCompSubs'){
    	        subJson=data.data.records;
    	        if(subJson.length>0){
    	            dataArr.push("子公司")
    	            compJson3["name"]="子公司";
                    compJson3["symbolSize"]=15;
                    compJson3["category"]="子公司";
                    compJson3["draggable"]="true";
                    compJson3["value"]=subJson.length;
                    array.push(compJson3);

                    compLink2["source"]=regName;
                    compLink2["target"]="子公司";
                    linkArr.push(compLink2);
                    $(subJson).each(function(i){
                        if(i<5){
                            var json ={}
                            var linkJson={}
                            json["name"]=$(this)[0].compSubFulltitle;
                            json["symbolSize"]=10;
                            json["category"]="子公司";
                            json["draggable"]="true";
                            json["value"]=1;
                            linkJson["source"]="子公司";
                            linkJson["target"]=$(this)[0].compSubFulltitle;
                            array.push(json)
                            linkArr.push(linkJson)
                        }
                    })
    	        }
    	    }
    	    if(dataId=='dwtz'){
                dwList=data.data.records;
                if(dwList.length>0){
                    dataArr.push("对外投资")
                    compJson4["name"]="对外投资";
                    compJson4["symbolSize"]=15;
                    compJson4["category"]="对外投资";
                    compJson4["draggable"]="true";
                    compJson4["value"]=data.data.total;
                    array.push(compJson4);

                    compLink5["source"]=regName;
                    compLink5["target"]="对外投资";
                    linkArr.push(compLink5);

                    $(dwList).each(function(i){
                        if(i<5){
                            var json ={}
                            var linkJson={}
                            json["name"]=$(this)[0].company;
                            json["symbolSize"]=15;
                            json["category"]="对外投资";
                            json["draggable"]="true";
                            json["value"]=1;
                            linkJson["source"]="对外投资";
                            linkJson["target"]=$(this)[0].company;
                            array.push(json)
                            linkArr.push(linkJson)
                        }
                    })
                }
            }

    		var records = data.data.records;
    		if(records.length>0){
    		    var target = $("#"+dataId)
    		    for(j in records){
    		        for(k in records[j]){
    		            if(k=="logoSmall"){
    		                records[j][k]=Constants.logoPath+"project/"+records[j].projCode+".png";
    		            }
    		            if(k=='districtSubName'){
    		                if(!records[j][k]){
    		                    records[j][k]='地区未知'
    		                }
    		            }
    		            if(k=='introduce'){
    		                if(!records[j][k]){
    		                    records[j][k]='暂无简介'
    		                }
    		            }
    		        }
    		    }
    		    target.tmpl(records).appendTo(target.parent())
				if(pageNo && pageSize){
				    if(data.data.total<=(pageNo*1)*pageSize){
                        more.hide();
                        return;
                    }
                    pageNo = pageNo*1+1
                    obj.find("input[name='pageNo']").val(pageNo)
				}
    		}else if(records.length ==0 && pageNo=="1"){
    		    obj.hide();
    		     var location_l = obj.children('.project_t').attr('location_l')
                 $('.project_all_r li[location_r="'+location_l+'"]').hide();
                 $('.project_all_r li[location_r="'+location_l+'"]').removeClass('storey_list')
                 obj.children().removeClass('storey_list');
    		}
    	})
   }

   //没有分页的请求
   function loadNoPage(obj){
        var url = obj.attr("data-url");
        var dataId = obj.attr("data-id")
        //data-id是渲染数据的模板id,如果没有该属性,说明该模块不需要渲染数据
        if(!dataId){
            return;
        }
        url = getUrl(dataId,url);
        var json = getJson(obj);
        sendPostRequestByJsonObj(url,json,function(data){
            if(data.data.length>0){
                var target = $("#"+dataId)
                target.tmpl(data).appendTo(target.parent())
            }else{

                if(dataId=="product"){
                    if(!$("#prodSrv").val()&& !$("#userMarket").val()){
                         obj.hide();
                    }
                }else if(dataId="team"){
                    if(!$("#teamTags").val()&& !$("#teamSuper").val()){
                         obj.hide();
                    }
                }
            }
        })
   }

   //获取请求地址
   function getUrl(dataId,url){
       if(dataId=="product"){
           url = dataUrl[url];
       }else if(dataId=="news"){
           url = searchUrl[url]
       }else if(dataId=="queryByProjTitle"){
           url = detail[url];
       }else{
           url = detail[url]
       }
       return url;
   }
    //获取参数
   function getJson(obj){
        var ls = obj.find("input[name]");
        var json={};
        $.each(ls,function(i,e){
             if($(this).attr("name")=='compCode'){
                json[$(this).attr("name")]=proj.data.compCode
             }else if($(this).attr("name")=='projTitle'){
                json[$(this).attr("name")]=name
             }else{
                json[$(this).attr("name")] =$(this).val();
             }
        })
        return json;
   }

    if(proj.data.compCode){
        sendGetRequest(detail.queryPorjectBusniessInfo+proj.data.compCode,function(data){
            if(data.data){
                projectShareholderInfoList = data.data["projectShareholderInfoList"];
                for(i in projectShareholderInfoList){
                    if(i<5){
                        var json ={}
                        var linkJson={}
                        if(!projectShareholderInfoList[i].equityRate.indexOf('-')==0){
                            json["name"]=projectShareholderInfoList[i].shareholder+"/"+projectShareholderInfoList[i].equityRate;
                        }else{
                            json["name"]=projectShareholderInfoList[i].shareholder
                        }
                        json["value"]=1;
                        json["symbolSize"]=10;
                        json["category"]="股东";
                        json["draggable"]="true";
                        linkJson["source"]="股东";
                        if(!projectShareholderInfoList[i].equityRate.indexOf('-')==0){
                            linkJson["target"]=projectShareholderInfoList[i].shareholder+"/"+projectShareholderInfoList[i].equityRate;
                        }else{
                            linkJson["target"]=projectShareholderInfoList[i].shareholder
                        }
                        array.push(json)
                        linkArr.push(linkJson)
                    }
                }
            }
            fillBaseBusinessInfo(data.data,$("div[data-query='businessInfo']"));
            fillList(data.data,$("*[data-query='list']"))
        })
    }else{
         $('#shareholder').hide();
         $('#changes').hide();
         $('#gsxx').hide();
         var location_l = $("#shareholder .project_t").attr('location_l')
         $('.project_all_r li[location_r="'+location_l+'"]').hide();
         $('.project_all_r li[location_r="'+location_l+'"]').removeClass('storey_list')
         var location_l1 = $("#changes .project_t").attr('location_l')
         $('.project_all_r li[location_r="'+location_l1+'"]').hide();
         $('.project_all_r li[location_r="'+location_l1+'"]').removeClass('storey_list')
         var location_l2 = $("#gsxx .project_t").attr('location_l')
         $('.project_all_r li[location_r="'+location_l2+'"]').hide();
         $('.project_all_r li[location_r="'+location_l2+'"]').removeClass('storey_list')
         $("#shareholder").children().removeClass('storey_list')
         $("#changes").children().removeClass('storey_list')
         $("#gsxx").children().removeClass('storey_list')
     }

    sendGetRequest(detail.getListByProjCode+proj.data.projCode,function(data){
        projectContactListFormatter(data.data,$("*[data-query='listes']"))
        })

   //企业图谱
var option = {
    /* backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#f7f8fa'
    }, {
        offset: 1,
        color: '#cdd0d5'
    }]), */
       title:{
    },
      tooltip: {},
      color:['#3e50b4','#2095f2','#8bc24a','#fdk107','#f44236','#da8267'],
      legend: [{
          formatter: function (name) {
        return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
    },
    tooltip: {
        show: true
    },
          selectedMode: 'false',
          bottom: 20,
          data: dataArr
      }],
      toolbox: {
        show : false,
        feature : {
            dataView : {show: true, readOnly: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
      animationDuration: 1000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
          name: regName,
          type: 'graph',
          layout: 'force',

          force: {
              repulsion: 500
          },
          data: array,
          links: linkArr,
          categories: [{
              'name': regName
          },{
              'name': '项目'
          }, {
              'name': '股东'
          }, {
              'name': '子公司'
          }, {
              'name': '对外投资'
          }, {
              'name': '任职人员'
          }],
          focusNodeAdjacency: true,
          roam: true,
          label: {
              normal: {

                  show: true,
                  position: 'top',

              }
          },
          lineStyle: {
              normal: {
                  color: 'source',
                  curveness: 0,
                  type: "solid"
              }
          }
      }]
  };
var myChart = echarts.init(document.getElementById('eacharts_in'));







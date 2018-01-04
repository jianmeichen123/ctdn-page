$(function () {
    if(getCookie("_uid_")){
       initTable();
       firstShow()
    }else{
        location.href=platformUrl.toLogin
    }
})

function loadTable(tab){
    $("table[data-type='"+tab+"']").bootstrapTable("refreshOptions",{
        url: user.getColList,         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        queryParamsType: 'size|page', // undefined
        striped: true,                      //是否显示行间隔色
        cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "desc",                   //排序方式
        tableDataName:'page',
        queryParams: function queryParams(params) {   //设置查询参数
           var param = {
                    "pageSize":params.pageSize,   //页面大小
                    "pageNo":params.pageNumber -1,  //页码
                    "userCode":userCode,
                    "type":tab
           };
           return param;
        },   //参数
        undefinedText:table.empty,
        tableDataListName:'records',
        tableDataTotalName:'total',
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 8,                       //每页的记录行数（*）
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        },
        formatNoMatches: function () {  //没有匹配的结果
             var noresult = "<div class='info-error'>"+
                            "<img src='../img/error_03.png'/>"+
                            "</div>"
             return noresult;
        },
        onLoadSuccess: function (data) {
        }
    });

    function queryParams(params) {  //配置参数
        var data = {};
          data["pageSize"]=params.pageSize,   //页面大小
          data["pageNo"]=params.pageNumber -1,  //页码
          data["userCode"]=userCode;
          data["type"]=tab;
        return data;
    }
}

/*
*tab页上的数字
*/
function queryTotal(){
    var trigger_tab = 0
    var userCode = getCookie("_usercode_")
    sendGetRequest(user.countNum+userCode,function(data){
        $('.info-nav-content li').each(function(){
            var tab = $(this).attr('data-type');
            $(this).children().next().html(data.data[tab])
        })
        var map = data.data;
        for(key in map){
            if(map[key]>0){
                trigger_tab = key;
                break;
            }
        }
    })
    return trigger_tab;
}

function refreshTotal(){
     var userCode = getCookie("_usercode_")
     sendGetRequest(user.countNum+userCode,function(data){
        $('.info-nav-content li').each(function(){
             var tab = $(this).attr('data-type');
             if(!data.data[tab]){
                $(this).children().next().html(0)
             }else{
                $(this).children().next().html(data.data[tab])
             }
        })
    })
}

$(".info-nav-content").delegate("li","click",function(){
    var tab = $(this).attr("data-type");
    $('.info-nav-content li').removeClass('search_on')
    $(this).addClass('search_on');
    showContent(tab);
});

function showContent(tab){
      queryTotal();
      triggerTable(tab)
}

function initTable() {
  	var oTable = new TableInit();
  	oTable.Init();
  }
  var TableInit = function () {
  	var oTableInit = new Object();
  	//初始化Table
  	oTableInit.Init = function () {
  	        $('table[data-type]').bootstrapTable({
               		pageSize:8,
               		showRefresh : false ,
               		sidePagination: 'server',
               		method : 'post',
               		pagination: true,
             });

  	};
  	return oTableInit;
  };

   $(".search-btn").on("click",function(){
        if($("input[name='keyword']").val()){
          firstShow();
        }
   });

  $("input[name='keyword']").bind('keypress',function(event){
		  keyword = $("input[data-search='search']").val();
		  if(event.keyCode == '13'){
              if($("input[name='keyword']").val()){
                firstShow();
              }
          }
  });

  function firstShow(){

     var tab = queryTotal();
     $(".info-nav-content .search_on").removeClass("search_on");
     $(".info-nav-content li[data-type="+tab+"]").addClass("search_on")
     triggerTable(tab);
  }

  function triggerTable(tab){
      loadTable(tab);
      $('.bootstrap-table').hide();
      $("table[data-type='"+tab+"']").show();
      $("table[data-type='"+tab+"']").parent().parent().parent().show();
      var content =$('.info-nav-content').find("li[data-type='"+tab+"']").children(":first").html();
      var total =  $('.info-nav-content').find("li[data-type='"+tab+"']").children().next().html();
  }

  //收藏夹-项目
  function proColFormatter(value,row){
      var img = Constants.logoPath +"project/"+row.projCode+".png"
      var tag ="" ;
      if(row.latestFinanceRound =="尚未获投" && (!row.latestFinanceAmountStr || row.latestFinanceAmountStr=="未透露")){
          tag="";
      }else{
       if(row.latestFinanceRound =="尚未获投"){
        row.latestFinanceRound = "轮次未知"
        }
        if(!row.latestFinanceAmountStr || !row.latestFinanceAmountStr.indexOf("未透露")>0){
            row.latestFinanceAmountStr = "金额未知"
        }
        tag= "<span class='person-mark-item-title'>"+row.latestFinanceRound+"/"+row.latestFinanceAmountStr+"</span>"
      }
      var districtSubName = row.districtSubName
      if (!districtSubName){
        districtSubName ="地址未知"
      }
     var industryName=""
     if(row.industryName){
         industryName ="<i class='list-item-finace'></i>"+row.industryName
         if(row.industrySubName){
             industryName+="-" +row.industrySubName
         }
     }
     var firmDesc = row.firmDesc;
     if(firmDesc){
          if(firmDesc.length>80){
            firmDesc = firmDesc.substring(0,80)+"...";
          }
     }else{
          firmDesc ="暂无"
     }
      var html ="<div class='person-project-item clearfix'>"+
      "<span class='person-book-close' onclick=cancel(0,'"+row.projCode+"')></span>"+
          "<div class='person-project-left picSquare fl'>"+
          "<a target='_blank' href='/project_qy.html?projCode="+row.projCode+"'><img src='"+img+"'/></a></div>"+
          "<div class='person-project-right fr'>"+
              "<p><a target='_blank' href='/project_qy.html?projCode="+row.projCode+"'><span class='person-book-red'>"+row.projTitle+"</span></a>"+tag+"</p>"+
              "<p class='person-book-shortdescription'>简介:"+firmDesc+"</p>"+
              "<p>"+
                  "<span class='person-book-city'>"+districtSubName+"</span>"+industryName+
              "</p>"+
          "</div>"+
      "</div>"
      return html
  }

  //收藏夹-机构
  function orgColFormatter(value,row){
    var img = Constants.logoPath +"org/"+row.orgCode+".png"
    var orgType = "类型未知"
    if(row.orgType){
        orgType = row.orgType;
    }
    var orgDesc = "暂无";
    if(row.orgDesc){
       if(row.orgDesc.length>80){
           orgDesc = row.orgDesc.substring(0,80)+"...";
       }else{
           orgDesc=  row.orgDesc
       }
     }
    if(!row.investTotal){
        row.investTotal = 0
    }
    var html ="<div class='person-project-item clearfix'>"+
              "<span class='person-book-close' onclick=cancel(1,'"+row.orgCode+"') ></span>"+
                  "<div class='person-project-left picSquare fl'><a target='_blank' href='/jg_particulars.html?orgCode="+row.orgCode+"'><img src='"+img+"'/></a></div>"+
                  "<div class='person-project-right fr'>"+
                      "<p><span class='person-book-red'><a target='_blank' href='/jg_particulars.html?orgCode="+row.orgCode+"'>"+row.investOrg+"</a></span><span class='person-mark-item-title'>"+orgType+"</span></p>"+
                      "<p class='person-institute-incident'>投资事件:<span class='person-incident-num'>"+row.investTotal+"</span></p>"+
                      "<p class='person-book-shortdescription'>简介:"+orgDesc+"</p>"+
                  "</div>"+
              "</div>"
      return html
  }
  function invColFormatter(value,row){
       return  personFormatter(value,row,3)
  }
  function staColFormatter(value,row){
       return  personFormatter(value,row,2)
  }
  //收藏夹-创业者
  function personFormatter(value,row,type){
      var logo = Constants.logoPath +"person/"+row.url+".png"
      var id=0
      var html =
          "<div class='person-project-item clearfix'>"+
                  "<span class='person-book-close'  onclick=cancel('"+type+"','"+row.code+"')></span>"
                    if(type == 2){
                         html += "<div class='person-project-left person-start-img fl'><a target='_blank' href='/startup_xq.html?code="+row.code+"'><img src='"+logo+"'/></a></div><div class='person-project-right fr'><div><a target='_blank' href='/startup_xq.html?code="+row.code+"'><p>"+row.zhName+"</p></a>"
                    }else{
                         html += "<div class='person-project-left person-start-img fl'><a target='_blank' href='/investor_xq.html?code="+row.code+"'><img src='"+logo+"'/></a></div><div class='person-project-right fr'><div><a target='_blank' href='/investor_xq.html?code="+row.code+"'><p>"+row.zhName+"</p></a>"
                    }
//                    html+="<div class='person-project-right fr'>"+
//                          "<div><p>"+row.zhName+"</p>";
                              if(row.enName){
                                html+= "<p class='none'>"+row.enName+"</p>";
                              }
                              html+="</div><p>"
                               if(row.gender){
                                   html+="<span class='company'><span class='search_list_people_list_r seach_float_none' id"+ ++id +">"+row.gender+"</span"+id+"></span>";
                               }
                               if(row.age){
                                   html+="<span class='company'><span class='search_list_people_list_r seach_float_none' id"+ ++id +">"+row.age+"</span"+id+"></span>";
                               }
                               if(row.workLife){
                                   html+="<span class='company'><span class='search_list_people_list_r seach_float_none' id"+ ++id +">"+row.workLife+"</span"+id+"></span>"
                               }
                               if(row.projTitle){
                                   html+="<span class='company'><span class='search_list_people_list_r seach_float_none' id"+ ++id +">"+row.projTitle+"</span"+id+"></span>"
                               }
                               if(row.job){
                                   html+="<span class='company'><span class='search_list_people_list_r seach_float_none' id"+ ++id +">"+row.job+"</span"+id+"></span>"
                               }
                               if(row.colleage){
                                  html+="<span class='company'><span class='search_list_people_list_r seach_float_none' id"+ ++id +">"+row.colleage+"</span"+id+"></span>";
                              }
                              if(row.degree){
                                  html+="<span class='company'><span class='search_list_people_list_r seach_float_none' id"+ ++id +">"+row.degree+"</span"+id+"></span>";
                              }
                               if(row.districtSubName){
                                   html+="<span class='company'><span><li class='list-item-address'></li>"+row.districtSubName+"</span></span>"
                               }
                              html +="</p></div></div>";
                              html=html.replace("<span class='search_list_people_list_r seach_float_none' id1>","")
                                .replace("</span1>","")
                                .replace("/id[0-9]/g","")
                                .replace("</spanid[0-9]>","")
        return html;
  }
function reColFormatter(value,row){
    if(!row.reportBody){
        row.reportBody=''
    }else{
        var temp = row.reportBody.replace(/<[^>]+>/g,"")
        if(row.reportBody.length>80){
             row.reportBody =temp.substring(0,80)+"..."
        }else{
            row.reportBody = temp
        }
    }
    if(row.authorName){
        row.authorName = "<span class='person-report-author'>作者："+row.authorName+"</span>"
    }
    if(row.source){
        row.source = "<span class='person-report-origin'>来源："+row.source+"</span>"
    }
    var html= "<div class='person-project-item clearfix'>"+
      						"<span class='person-book-close'  onclick=cancel(4,'"+row.id+"')></span>"+
      						"<div class='person-project-left fl person-report-img'><a href='report_detailed.html?id="+row.id+"' target='_blank'><img src='"+row.listPic+"'></a></div>"+
      						"<div class='person-project-right person-report-right fr'>"+
      							"<h3><a href='report_detailed.html?id="+row.id+"' target='_blank'>"+row.title+"</a></h3>"+
      							"<p class='person-report-smalltitle'><span>"+row.publishDate+"</span>"+row.authorName+row.source+"</p>"+
      							"<p class='person-book-shortdescription person-report-description'>"+row.reportBody+"</p>"+
      						"</div>"
     return html;
}

function cancel(type,code){
    cancelOneCol(type,code);
    refreshTotal()
    triggerTable(type)
}

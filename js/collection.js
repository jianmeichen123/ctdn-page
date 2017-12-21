$(function () {
   initTable();
   firstShow()
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
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [15,20,30],        //可供选择的每页的行数（*）
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
    sendPostRequest(user.countNum+userCode,function(data){
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
               		pageSize:15,
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
     var introduce = row.introduce;
     if(introduce && introduce.length>200){
          introduce = introduce.substring(0,200);
     }else{
          introduce ="暂无"
     }
      var html ="<div class='person-project-item clearfix'>"+
      "<span class='person-book-close' onclick=cancelOneCol(0,'"+row.projCode+"')></span>"+
          "<div class='person-project-left fl'>"+
          "<img src='"+img+"'/></div>"+
          "<div class='person-project-right fr'>"+
              "<p><span class='person-book-red'>"+row.projTitle+"</span>"+tag+"</p>"+
              "<p class='person-book-shortdescription'>简介:"+introduce+"</p>"+
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
           orgDesc = row.orgDesc.substring(0,240)+"...";
       }else{
           orgDesc=  row.orgDesc
       }
     }
    if(!row.investTotal){
        row.investTotal = 0
    }
    var html ="<div class='person-project-item clearfix'>"+
              "<span class='person-book-close' onclick=cancelOneCol(1,'"+row.orgCode+"') ></span>"+
                  "<div class='person-project-left fl'><a target='_blank' href='/jg_particulars.html?orgCode="+row.orgCode+"'><img src='"+img+"'/></a></div>"+
                  "<div class='person-project-right fr'>"+
                      "<p><span class='person-book-red'>"+row.investOrg+"</span><span class='person-mark-item-title'>"+orgType+"</span></p>"+
                      "<p class='person-institute-incident'>投资事件:<span class='person-incident-num'>"+row.investTotal+"</span></p>"+
                      "<p class='person-book-shortdescription'>简介:"+orgDesc+"</p>"+
                  "</div>"+
              "</div>"
      return html
  }

  //收藏夹-创业者
  function startupFormatter(value,row){
      var logo = Constants.logoPath+"person/"+row.code+".png"
      var html =
          "<div class='person-project-item clearfix'>"+
                  "<span class='person-book-close'  onclick=cancelOneCol(2,'"+row.code+"')></span>"+
                      "<div class='person-project-left person-start-img fl'><img src='"+logo+"'/></div>"+
                      "<div class='person-project-right fr'>"+
                          "<div><p>"+row.zhName+"</p>";
                              if(row.enName){
                                html+= "<p class='none'>"+row.enName+"</p>";
                              }
                              html+="</div><p>"
                              if(row.workLife){
                                html+="<span >"+row.workLife+"</span>";
                              }
                              if(row.job){
                                html+="<span>"+row.job+"</span>";
                              }
                              if(row.colleage || row.degree){
                                html+="<span >"+row.colleage+"<em>"+row.degree+"</em></span>";
                              }
                              if(row.districtSubName){
                                html+="<span class='person-start-address'>"+row.districtSubName+"</span>";
                              }
                              html +="</p></div></div>";
        return html;
  }
  //收藏夹-投资人
  function invColFormatter(value,row){
      var html =
          "<div class='person-project-item clearfix'>"+
                  "<span class='person-book-close'  onclick=cancelOneCol(3,'"+row.code+"')></span>"+
                      "<div class='person-project-left person-start-img fl'><img src='../img/person_center/person-start_03.jpg'/></div>"+
                      "<div class='person-project-right fr'>"+
                          "<div>"+
                              "<p>"+row.zhName+"</p>"+
                              "<p>"+row.enName+"</p>"+
                          "</div>"+
                          "<p>"+
                              "<span class='person-start-line none'>"+row.workLife+"</span>"+
                              "<span class='person-dutity none'>"+row.job+"</span>"+
                              "<span class='person-start-univercity none'>"+row.colleage+"<em>"+row.degree+"</em></span>"+
                              "<span class='person-start-address none'>"+row.districtSubName+"</span>"+
                          "</p>"+
                      "</div>"+
                  "</div>"
        return html;
  }
function reColFormatter(value,row){
     var html= "<div class='person-project-item clearfix'>"+
      						"<span class='person-book-close'></span>"+
      						"<div class='person-project-left fl person-report-img'><img src='"+row.listPic+"'></div>"+
      						"<div class='person-project-right person-report-right fr'>"+
      							"<h3><a href='report_detailed_1.html?id="+row.id+" target='_blank'>"+row.title+"</a></h3>"+
      							"<p class='person-report-smalltitle'><span>"+row.publishDate+"</span><span class='person-report-author'>作者："+row.authorName+"</span><span class='person-report-origin'>来源："+row.source+"</span></p>"+
      							"<p class='person-book-shortdescription person-report-description'>简介:"+row.reportDesc+"</p>"+
      						"</div>"
     return html;
}

function cancel(type,code){
    cancelOneCol(type,code);
}

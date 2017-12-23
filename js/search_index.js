$(function () {
   var keyword = getHrefParamter("keyword");
   initTable();
   $("input[name='keyword']").val(keyword);
   if($("input[name='keyword']").val()){
        firstShow();
   }
})

function loadTable(tab){
    $("table[data-item='"+tab+"']").bootstrapTable("refreshOptions",{
        url: searchUrl[tab],         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        queryParamsType: 'size|page', // undefined
        striped: true,                      //是否显示行间隔色
        cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "desc",                   //排序方式
        tableDataName:'page',
        queryParams: queryParams, //参数
        undefinedText:"--",
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
          data["orderBy"]=params.sortName,  //排序列名
          data["keyword"]=$("input[name='keyword']").val();
          data["order"]=params.sortOrder//排位命令（desc，asc）
        return data;
    }
}

/*
*tab页上的数字
*/
var globalSearchStatData;
function queryTotal(){
    var trigger_tab ="";
    sendPostRequestByJsonObj(searchUrl.total,{"keyword":$("input[name='keyword']").val()},function(data){
        $('.info-nav-content li').each(function(){
            var tab = $(this).attr('data-tab');
            $(this).children().next().html(data.resultMap[tab])
        })
        globalSearchStatData=data
        trigger_tab=data.resultMap["all:active"]
    })
    return trigger_tab;
}
$(".info-nav-content").delegate("li","click",function(){
    var tab = $(this).attr("data-tab");
    $('.info-nav-content li').removeClass('search_on');
    $(this).addClass('search_on');
    var subtab=tab
    //sub tab
        if(typeof($('#'+tab).find('ul li:first').attr('data-li'))!="undefined"){
            subtab=$('#'+tab).find('ul li:first').attr('data-li')
            $('#'+tab).find('ul li').removeClass('search_list_on');
            $('#'+tab).find("ul li[data-li='"+subtab+"']").addClass('search_list_on');
            //绑定前先取消绑定 否则会造成重复绑定
            $('#'+tab).find('ul li').unbind("click");
            $('#'+tab).find('ul li').bind("click",function(){
                       $('#'+tab).find('ul li').removeClass('search_list_on');
                       $(this).addClass('search_list_on');
                       var subtab=$(this).attr('data-li');
                       var target=tab+":"+subtab;
                       showContent(target);
                       return
            })
        }
    var target=tab+":"+subtab;
    showContent(target);
});

 $(".search").delegate("li","click",function(){
	 $(".info-search .hot_speech").hide();
  	   var value = $(this).text();
  	   $("input[name='keyword']").val(value)
  	   firstShow();
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
  	        $('table[data-item]').bootstrapTable({
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
     var tabs= tab.split(':');

     $(".info-nav-content .search_on").removeClass("search_on");
     $(".info-nav-content li[data-tab='"+tabs[0]+"']").addClass("search_on")
     triggerTable(tab);
  }

  function triggerTable(target){
          var tabs=target.split(':');
          ptab=tabs[0];
          stab=tabs[1];
          $('.search_list_bj').hide();
          if(ptab!=stab){
            $('#'+ptab).show();
            $('#'+ptab).find('ul li').removeClass('search_list_on');
            $('#'+ptab).find("ul li[data-li='"+stab+"']").addClass('search_list_on');
           $('#'+ptab).find('ul li').each(function(){
               var tab = $(this).attr('data-li');
              $(this).children().next().html(globalSearchStatData.resultMap[tab])
           })
          }
          loadTable(stab);
          $('.bootstrap-table').hide();
          $("table[data-item='"+stab+"']").show();
          $("table[data-item='"+stab+"']").parent().parent().parent().show();
          var content =$('.info-nav-content').find("li[data-tab='"+ptab+"']").children(":first").html();
          var total =  $('.info-nav-content').find("li[data-tab='"+ptab+"']").children().next().html();
          var keyword = $("input[name='keyword']").val();
          $("#tip").html("共搜索到<span class='highlight'>"+total+"</span>条内容中含有<span class='highlight'>"+keyword+"</span>的"+content)

  }


$(function () {
   //var keyword = getHrefParamter("keyword");
   initTable();
   var keyword = "阿里";
   $("input[name='keyword']").val(keyword);
   if($("input[name='keyword']").val()){
        showContent("news");
   }
})

function loadTable(tab){
    $("table[data-url='"+tab+"']").bootstrapTable("refreshOptions",{
        url: searchUrl[tab],         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        queryParamsType: 'size|page', // undefined
        striped: true,                      //是否显示行间隔色
        cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "desc",                   //排序方式
        tableDataName:'data',
        queryParams: queryParams, //参数
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
            return '抱歉，没有相关的结果';
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
function queryTotal(){
    sendPostRequestByJsonObj(searchUrl.total,{"keyword":$("input[name='keyword']").val()},function(data){
        $('.info-nav-content li').each(function(){
            var tab = $(this).attr('data-tab');
            $(this).children().next().html("("+data.numMap[tab]+")")
        })
    })
}
$(".info-nav-content").delegate("li","click",function(){
    var tab = $(this).attr("data-tab");
    showContent(tab);
});

function showContent(tab){
      queryTotal();
      loadTable(tab);
      $('.bootstrap-table').hide();
      $("table[data-url='"+tab+"']").show();
      $("table[data-url='"+tab+"']").parent().parent().parent().show();
      var content =$('.info-nav-content').find("li[data-tab='"+tab+"']").children(":first").html();
      var total =  $('.info-nav-content').find("li[data-tab='"+tab+"']").children().next().html();
      var keyword = $("input[name='keyword']").val();
      $("#tip").html("共搜索到"+total+"条内容中含有<em>"+keyword+"</em>的"+content)
}

function initTable() {
  	var oTable = new TableInit();
  	oTable.Init();
  }
  var TableInit = function () {
  	var oTableInit = new Object();
  	//初始化Table
  	oTableInit.Init = function () {
  	        $('table[data-url]').bootstrapTable({
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
      showContent("news");
    }
});

  $("input[name='keyword']").bind('keypress',function(event){

		  keyword = $("input[data-search='search']").val();
		  if(event.keyCode == '13'){
              if($("input[name='keyword']").val()){
                showContent("news");
              }
          }
	});
$('table[data-url]').bootstrapTable({
    url: detail[$('table').attr("data-url")],         //请求后台的URL（*）
    method: 'post',                      //请求方式（*）
    queryParamsType: 'size|page', // undefined
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    pagination: true,                   //是否显示分页（*）
    sortable: true,                     //是否启用排序
    sortOrder: "desc",                   //排序方式
    tableDataName:'data',
    queryParams: queryParams, //参数
    tableDataListName:'records',
    tableDataTotalName:'total',
    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: 1,                       //初始化加载第一页，默认第一页
    pageSize: 15,                       //每页的记录行数（*）
    formatLoadingMessage: function () {
        return "请稍等，正在加载中...";
    },
    formatNoMatches: function () {  //没有匹配的结果
        return '抱歉，没有相关的结果';
    },
    onLoadSuccess: function (data) {
        $(".project_t .excuted span").text(data.data.total)
    }
});

function rowNumformatter(value,row,index){
    return index+1;
}
function queryParams(params) {  //配置参数
    var data = {};
      data["pageSize"]=params.pageSize,   //页面大小
      data["pageIndex"]=params.pageNumber,  //页码
      data["sourceCode"]=getHrefParamter("code")
    return data;
 }

var divList = $(".particulars_all").find("div[data-block]");
$(divList).each(function(){
    var div =$(this);
    var url = detail[div.attr("data-block")]+getHrefParamter("code");
    sendGetRequest(url,function(data){
       $(data.data).each(function(k,v){
            if(!v)v="-"
       })
       var target = $("#"+div.attr("data-block"));
       target.tmpl(data).appendTo(target.parent())
       div.find(".fr span").text(data.data.length)
    })

})
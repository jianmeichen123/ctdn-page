function _query(){

    var data = query_data()
    $('table[data-url]').bootstrapTable('refresh', {
        'pageNumber':1,
        query:data
     });
}
function _cleanTitle(){
    $("#projTitle").val("");
}
function query_data (){
    var querydata = {}
    $("[data-query]").each(function(i,e){
        var o = $(e)
        var type = o.attr("data-query").split(":")[1]
        if(type=="normal"){
            var name = o.attr("data-query").split(":")[0]
            if(!name.endWith("s")){
                name = name +"s"
            }
            querydata[name] = []
            o.find(".pick_on").each(function(j,f){
                if($(f).attr("data-id")){
                    querydata[name].push($(f).text())
                }
            })

        }else if(type=="nor"){
            var name = o.attr("data-query").split(":")[0]
            if(!name.endWith("s")){
                name = name +"s"
            }
            querydata[name] = []
            o.find(".pick_on").each(function(j,f){
                if($(f).attr("data-id")){
                    querydata[name].push($(f).attr("data-id"))
                }
            })

        } else if(type=="district"){

            var name = o.attr("data-query").split(":")[0]
                if (!querydata[name]){
                    querydata[name] = []
                }
            o.find(".pick_on").each(function(j,f){
                if($(f).attr("data-id")){
                   querydata[name].push($(f).attr("data-id"))
                }else if($(f).attr("global-id")!=null&&$(f).attr("global-id")!="null"){
                    var g_id = $(f).attr("global-id")
                    querydata["districtIds"].push(g_id)
                }

            })

        }

    })

    var startDate=$("#begin").val();
    var endDate=$("#end").val();
    var sdate = [];
    var edate = [];
    var d1 = "";
    var d2 = "";
    if(startDate != '' && endDate != '') {
        sdate = startDate.split('-');
        d1 = sdate[0]+sdate[1]+sdate[2];
        edate = endDate.split('-');
        d2 = edate[0]+edate[1]+edate[2];
        if(parseInt(d1) > parseInt(d2)) {
            alert("日期开始时间大于结束时间");
            return false;
        }else{
            d1 = sdate[0]+'-'+sdate[1]+'-'+sdate[2];
            d2 = edate[0]+'-'+edate[1]+'-'+edate[2];
            querydata["startDate"] = d1;
            querydata["endDate"] = d2;
        }
    }else{
        querydata["startDate"] = startDate;
        querydata["endDate"] = endDate;
    }
    querydata[$("#projTitle").attr("data-field")] = $("#projTitle").val();
    querydata["keyword"] = $("#projTitle").val();
    return querydata
}
function queryParams(params) {  //配置参数
    var data = query_data()
      data["pageSize"]=params.pageSize,   //页面大小
      data["pageNo"]=params.pageNumber -1,  //页码
      data["orderBy"]=params.sortName,  //排序列名
      data["order"]=params.sortOrder//排位命令（desc，asc）
    return data;
  }
$('table[data-url]').bootstrapTable({
    url: searchUrl[$('table').attr("data-url")],         //请求后台的URL（*）
    method: 'post',                      //请求方式（*）
    queryParamsType: 'size|page', // undefined
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
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
    pageSize: 15,                       //每页的记录行数（*）
    pageList: [15,20,30],        //可供选择的每页的行数（*）
    formatLoadingMessage: function () {
        return "请稍等，正在加载中...";
    },
    formatNoMatches: function () {  //没有匹配的结果
        return '抱歉，没有相关的结果';
    },
    onLoadSuccess: function (data) {
        $(".page_all .col_999 span").text(data.totalhit)
    }
});
 function entersearch(){
    var event = window.event || arguments.callee.caller.arguments[0];
    if (event.keyCode == 13)
    {
        _query();
    }
 }
//初始化table
var oTable = new TableInit();
oTable.Init();
var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
            $('table[data-url]').bootstrapTable({
                  method: 'post',                      //请求方式（*）
                  queryParamsType: 'size|page', // undefined
                  striped: true,                      //是否显示行间隔色
                  cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                  pagination: true,                   //是否显示分页（*）
                  sortable: true,                     //是否启用排序
                  sortOrder: "desc",                   //排序方式
                  tableDataName:'page',
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
                  },
                  onLoadSuccess: function (data) {
                  }
             });

    };
    return oTableInit;
};

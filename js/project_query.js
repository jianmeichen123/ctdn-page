function _query(){
    var data = query_data()

    $('table[data-url]').bootstrapTable('refresh', {
        "pageNumber" :1,
        query:data
     });
}
function queryParams(params) {
    console.log(params)
    return {
        pageSize: params.limit,
        pageNumber: params.pageNumber,
        UserName: 4
    };

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

    querydata["projTitle"] = $("#projTitle").val();
    if (querydata["districtIds"]&&querydata["districtIds"].length >=2){
        querydata["districtIds"] = []
    }
    return querydata
}
function queryParams(params) {  //配置参数
    console.log(params)
    var data = query_data()
      data["pageSize"]=params.pageSize,   //页面大小
      data["pageNo"]=params.pageNumber,  //页码
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
    sortOrder: "asc",                   //排序方式
    tableDataName:'data',
    queryParams: queryParams, //参数
    tableDataListName:'records',
    tableDataTotalName:'total',
    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: 1,                       //初始化加载第一页，默认第一页
    pageSize: 15,                       //每页的记录行数（*）
    pageList: [15, 25, 30],        //可供选择的每页的行数（*）
    formatLoadingMessage: function () {
        return "请稍等，正在加载中...";
    },
    formatNoMatches: function () {  //没有匹配的结果
        return '无符合条件的记录';
    },
    onLoadSuccess: function (data) {
        $(".page_all .col_999 span").text(data.data.totalhit)
    }
});
var tableFormate ={
    industryStr:function(value, row, index){
        if (!row.industryName)return table.empty
        if (row.industryName&&!row.industrySubName)return row.industryName
        return row.industryName +">" +row.industrySubName
    },
    projectName:function(value, row, index){
        var img = ""
        if (row.logoSmall&&row.indexOf("/")!=-1){
            img = row.logoSmall.split("/")[1]
        }
        if (row.logoSmall&&row.logoSmall!=""){
            img = row.logoSmall
        }
        return "<img src='http:///10.10.0.147/"+img+"'  height='37' width='37' >"+row.projTitle
    },
    investSide:function(value, row, index){
         var investSideJson = row.investSideJson
         var jsonObjArr = eval('(' + investSideJson + ')');
         for(i in jsonObjArr){
            var i = jsonObjArr[i]
            var investTitle = ''
            for(j in i){
                var json = i[j]
                if(json.title!=null){
                    investTitle+=json.title+"<br>"
                }
            }
            if(investTitle!=''){
                return investTitle
            }
         }
    },
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
        if (row.districtSubName) industrict+=row.districtSubName
        if (!row.industryName) industrict+=' '+table.empty
        if (row.industryName&&!row.industrySubName) industrict+=' '+row.industryName
        if (row.industryName&&row.industrySubName) industrict+=' '+row.industryName +">" +row.industrySubName
        company+='<br>'+industrict
        return "<img src='http:///10.10.0.147/"+img+"'  height='37' width='37' >"+company
    },
    beenMergered:function(value,row,index){
        var mergered = row.mergered
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
        if(row.district) industrict+=row.district
        if (!row.industryName) industrict+=' '+table.empty
        if (row.industryName&&!row.industrySubName) industrict+=' '+row.industryName
        if (row.industryName&&row.industrySubName) industrict+=' '+row.industryName +">" +row.industrySubName
        mergered+='<br>'+industrict
        return "<img src='http:///10.10.0.147/"+img+"'  height='37' width='37' >"+mergered
    },
    org:function(value,row,index){
        var investOrg = row.investOrg
        var img = ""
        if (row.logo&&row.logo!=""){
            var imgArr = row.logo.split("/")
            if(imgArr[1]!=null){
                img = imgArr[1]
            }else{
                img = imgArr[0]
            }
        }
        return "<img src='http:///10.10.0.147/"+img+"'  height='37' width='37' >"+investOrg
    },
    investProject:function(value, row, index){
         var investProJson = row.investProjJson
         var jsonObjArr = eval('(' + investProJson + ')');
         for(i in jsonObjArr){
            var i = jsonObjArr[i]
            var investProj = ''
            for(j in i){
                var json = i[j]
                if(json.title!=null){
                    investProj+=json.title+"<br>"
                }
            }
            if(investProj!=''){
                return investProj
            }
         }
    }
}

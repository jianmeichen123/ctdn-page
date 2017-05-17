function _query(){
    var data = query_data()

    $('table[data-url]').bootstrapTable('refresh', {
        "pageNo" :0,
        query:data
     });
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
        if (row.logoSmall&&row.logoSmall.indexOf("/")!=-1){
            img = row.logoSmall.split("/")[1]
        }else if (row.logoSmall&&row.logoSmall!=""){
            img = row.logoSmall
        }
        return '<div class="list_table_td"> <img height="37" width="37" src="http:///10.10.0.147/'+img+'"> <span class="col_999"><a href="#">'+row.projTitle+'</a></span> </div>'
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
            }else{
                investTitle='未透露'
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
        return '<div class="list_table_td"> <img height="37" width="37" src="http:///10.10.0.147/'+img+'"> <ul class="col_999"> <li><a href="#">'+company+'</a></li> <li>'+industrict+'</li> </ul> </div>'
    },
    beenMergered:function(value,row,index){
        var mergered = row.projTitle
        var industrict = ""
        if(!mergered){
            mergered='名称未知'
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
        if(row.districtSubName) industrict+=row.districtSubName
        if (!row.industryName) industrict+=' '+table.empty
        if (row.industryName&&!row.industrySubName) industrict+=' '+row.industryName
        if (row.industryName&&row.industrySubName) industrict+=' '+row.industryName +">" +row.industrySubName
        return '<div class="list_table_td"> <img height="37" width="37" src="http:///10.10.0.147/'+img+'"> <ul class="col_999"> <li><a href="#">'+mergered+'</a></li> <li>'+industrict+'</li> </ul> </div>'
    },
    mergerSide:function(value,row,index){
        var mergerSideJson = row.mergeSideJson
        var mergerSideArr = eval('('+mergerSideJson+')')
        for(i in mergerSideArr){
            var mergerSides = mergerSideArr[i]
            var mergerSideTitle = ''
            for(j in mergerSides){
                var json = mergerSides[j]
                if(json.title != null){
                    mergerSideTitle+='<br>'+json.title
                }
            }
            if(mergerSideTitle!=''){
                return mergerSideTitle
            }
        }
    },
    org:function(value,row,index){
        var investOrg = row.orgName
        var orgArr = []
        if(investOrg){
            orgArr = investOrg.split("|")
            investOrg = orgArr[0]
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
        return '<div class="list_table_td"> <img height="37" width="37" src="http:///10.10.0.147/org/'+img+'"> <ul class="col_999"> <li><a href="#">'+investOrg+'</a></li> </ul> </div>'
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
    },
    equityRate:function(value, row, index){
        if (row.equityRate==null) return table.empty
        return row.equityRate+"%"
    },
    mergeSideJson:function(value, row, index){
         var mergeSideJson = row.mergeSideJson
         var mergeSideTitle = ''
         if (!mergeSideJson||mergeSideJson==null){
            mergeSideTitle = '未透露'
            return mergeSideTitle
         }
         var jsonObjArr =  JSON.parse(mergeSideJson);
         for(i in jsonObjArr){
            var i = jsonObjArr[i]
            for(j in i){
                var json = i[j]
                if(json.title!=null){
                    mergeSideTitle+=json.title+"<br>"
                }
            }
            return mergeSideTitle
         }
    },
    totalRatio:function(value,row,index){
        var totalRatio = row.totalRatio
        var totalRatioStr = ''
        if(totalRatio>0){
            totalRatioStr+='+'+totalRatio
            totalRatioStr='<div class="list_table_td"><span class="brain_ico brain_ico_up_arrows"></span>'+totalRatioStr+'%'+'</div>'
        }else if(totalRatio<0){
            totalRatioStr+=totalRatio
            totalRatioStr='<div class="list_table_td"><span class="brain_ico brain_ico_down_arrows"></span>'+totalRatioStr+'%'+'</div>'
        }else{
            totalRatioStr+=totalRatio
            totalRatioStr='<div class="list_table_td">'+'　　'+totalRatioStr+'</div>'
        }
        return totalRatioStr
    },
    amountRatio:function(value,row,index){
            var amountRatio = row.amountRatio
            var amountRatioStr = ''
            if(amountRatio>0){
                amountRatioStr+='+'+amountRatio
                amountRatioStr='<div class="list_table_td"><span class="brain_ico brain_ico_up_arrows"></span>'+amountRatioStr+'%'+'</div>'
            }else if(amountRatio<0){
                amountRatioStr+=amountRatio
                amountRatioStr='<div class="list_table_td"><span class="brain_ico brain_ico_down_arrows"></span>'+amountRatioStr+'%'+'</div>'
            }else{
                amountRatioStr+=amountRatio
                amountRatioStr='<div class="list_table_td">'+'　　'+amountRatioStr+'</div>'
            }
            return amountRatioStr
        }
}
 function entersearch(){
    var event = window.event || arguments.callee.caller.arguments[0];
    if (event.keyCode == 13)
    {
        _query();
    }
 }
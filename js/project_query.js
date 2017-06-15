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
    tableDataName:'data',
    queryParams: queryParams, //参数
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
        $(".page_all .col_999 span").text(data.data.totalhit)
    }
});

var tableFormate ={
    industryStr:function(value, row, index){
        if (!row.industryName)return "行业未知"
        if (row.industryName&&!row.industrySubName)return row.industryName
        return row.industryName +">" +row.industrySubName
    },
    projectName:function(value, row, index){
        var projectName = row.projTitle
        var img = ""
        if(projectName==null){
            projectName='名称未知'
        }
        if (row.logoSmall&&row.logoSmall.indexOf("/")!=-1){
            img = row.logoSmall.split("/")[1]
        }else if (row.logoSmall&&row.logoSmall!=""){
            img = row.logoSmall
        }
        if(img.indexOf(".") == -1){
            img = ""
        }
        return '<div class="list_table_td"> <img height="37" width="37" src="'+Constants.logoPath+img+'"> <span class="col_999"><a href="/project_qy.html?code='+row.code+'">'+projectName+'</a></span> </div>'
    },
    investSide:function(value, row, index){
         var investSideJson = row.investSideJson
         var jsonObjArr = eval('(' + investSideJson + ')');
         for(i in jsonObjArr){
            var i = jsonObjArr[i]
            var investTitle = ''
            for(j in i){
                var json = i[j]
                if(json.title!=null&&j<3){
                	investTitle+='<div class="w_200_spot">'+json.title+'</div>';
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
        if(!company){
            company='名称未知'
            industrict='地区未知'+ ' '+'行业未知'
        }
        if (row.districtSubName){
            industrict+=row.districtSubName
        }else{
            industrict+='地区未知'
        }
        if(!row.industryName){
            industrict+='行业未知'
        }
        if (row.industryName&&!row.industrySubName){
            industrict+=' '+row.industryName
        }
        if (row.industryName&&row.industrySubName){
            industrict+=' '+row.industryName +">" +row.industrySubName
        }
        if(img.indexOf(".") == -1){
            img = ""
        }
        return '<div class="list_table_td"> <img height="37" width="37" src="'+Constants.logoPath+img+'"> <ul class="col_999"> <li><a href="/project_qy.html?code=">'+company+'</a></li> <li>'+industrict+'</li> </ul> </div>'
    },
    beenMergered:function(value,row,index){
        var mergered = row.projTitle
        var industrict = ""
        if(!mergered){
            mergered='名称未知'
            industrict='地区未知'+ ' '+'行业未知'
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
        if(!row.districtSubName) industrict+= "地区未知"
        if (!row.industryName) industrict+=' '+"行业未知"
        if (row.industryName&&!row.industrySubName) industrict+=' '+row.industryName
        if (row.industryName&&row.industrySubName) industrict+=' '+row.industryName +">" +row.industrySubName
        
        if(img.indexOf(".") == -1){
            img = ""
        }
        return '<div class="list_table_td"> <img height="37" width="37" src="'+Constants.logoPath+img+'"> <ul class="col_999"> <li><a href="/project_qy.html?">'+mergered+'</a></li> <li>'+industrict+'</li> </ul> </div>'
    },
    amountStr:function(value,row,index){
        var amountStr = row.amountStr
        if(amountStr==null){
            amountStr = '未透露'
        }
        return amountStr
    },
    mergerSide:function(value,row,index){
        var mergerSideJson = row.mergeSideJson
        var mergerSideArr = eval('('+mergerSideJson+')')
        for(i in mergerSideArr){
            var mergerSides = mergerSideArr[i]
            var mergerSideTitle = ''
            for(j in mergerSides){
                var json = mergerSides[j]
                if(json.title != ''){
                    mergerSideTitle+='<div class="w_200_spot">'+json.title+'</div>';
                }
            }
            if(mergerSideTitle!=''){
                return mergerSideTitle
            }else{
                mergerSideTitle = '未透露'
                return mergerSideTitle
            }
        }
    },
    org:function(value,row,index){
        var investOrg = row.investOrg
        var orgArr = []
        if(investOrg){
            orgArr = investOrg.split("|")
            if($("#projTitle").val()){
                for(i in orgArr){
                    var investOrgStr = orgArr[i]
                    if(investOrgStr.indexOf($("#projTitle").val())>=0){
                        if(investOrgStr.indexOf(';')>=0){
                            var arr = investOrgStr.split(";")
                            for(j in arr){
                                if(arr[j].indexOf($("#projTitle").val())>=0){
                                    investOrg = arr[j]
                                    break
                                }
                            }
                        }else{
                            investOrg = investOrgStr
                        }
                        break;
                    }
                }
            }else{
                investOrg = orgArr[0]
            }
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
        if(img.indexOf(".") == -1){
            img = ""
        }
        return '<div class="list_table_td"> <img height="37" width="37" src="'+Constants.logoPath+'/org/'+img+'"> <ul class="col_999"> <li><a href="/jg_particulars.html?eventId">'+investOrg+'</a></li> </ul> </div>'
    },
    investProject:function(value, row, index){
         var investProJson = row.investProjJson
         var jsonObjArr = eval('(' + investProJson + ')');
         for(i in jsonObjArr){
            var i = jsonObjArr[i]
            var investProj = ''
            for(j in i){

                var json = i[j]
                if(json.title!=null&&j<3){
                    investProj+=json.title+"<br>"
                }
            }
            if(investProj!=''){
                return investProj
            }
         }
    },
    equityRate:function(value, row, index){
        if (row.equityRate==null) return '未透露'
        return row.equityRate+"%"
    },
    mergeSideJson:function(value, row, index){
        var mergeSideJson = row.mergeSideJson
        var mergeSideTitle = ''
        if(mergeSideJson==null){
             mergeSideTitle='未透露'
            return mergeSideTitle
        }
        var jsonObjArr =  JSON.parse(mergeSideJson);
        for(i in jsonObjArr){
            var i = jsonObjArr[i]
            for(j in i){
                var json = i[j]
                if(json.title!=''&&j<3){
                    mergeSideTitle+='<div class="w_200_spot">'+json.title+'</div>'
                   /* mergeSideTitle+=json.title+"<br>"*/
                }
            }
            return mergeSideTitle
        }
    },
    paticulars:function(value, row, index){
        var projTitle = row.projTitle
        return '<div align="center" class="list_table_td"> <center><span class="col_999"><a href="/bg_particulars.html?eventId=">'+"详情"+'</a></span></center> </div>'
    },
    eventInfoPaticulars:function(value, row, index){
        var projTitle = row.projTitle
        return '<div align="center" class="list_table_td"> <center><span class="col_999"><a href="/tzsj_particulars.html">'+"详情"+'</a></span></center> </div>'
    },
    totalRatio:function(value,row,index){
        var totalRatio = row.totalRatio
        var totalRatioStr = ''
        if(totalRatio>0){
            totalRatioStr+='+'+totalRatio
            totalRatioStr='<div align="center" class="list_table_td"><center><span class="brain_ico brain_ico_up_arrows"></span>'+totalRatioStr+'%'+'</center></div>'
        }else if(totalRatio<0){
            totalRatioStr+=totalRatio
            totalRatioStr='<div align="center" class="list_table_td"><center><span class="brain_ico brain_ico_down_arrows"></span>'+totalRatioStr+'%'+'</center></div>'
        }else{
            totalRatioStr+=totalRatio
            totalRatioStr='<div align="center" class="list_table_td"><center>'+totalRatioStr+'%'+'</center></div>'
        }
        return totalRatioStr
    },
    amountRatio:function(value,row,index){
            var amountRatio = row.amountRatio
            var amountRatioStr = ''
            if(amountRatio>0){
                amountRatioStr+='+'+amountRatio
                amountRatioStr='<div align="center" class="list_table_td"><center><span class="brain_ico brain_ico_up_arrows"></span>'+amountRatioStr+'%'+'</center></div>'
            }else if(amountRatio<0){
                amountRatioStr+=amountRatio
                amountRatioStr='<div align="center" class="list_table_td"><center><span class="brain_ico brain_ico_down_arrows"></span>'+amountRatioStr+'%'+'</center></div>'
            }else{
                amountRatioStr+=amountRatio
                amountRatioStr='<div align="center" class="list_table_td"><center>'+amountRatioStr+'%'+'</center></div>'
            }
            return amountRatioStr
        },
        launchDetail:function(value,row,index){
                return "<a href ='#?eventId='"+value+">详情</a>"

        }
}
 function entersearch(){
    var event = window.event || arguments.callee.caller.arguments[0];
    if (event.keyCode == 13)
    {
        _query();
    }
 }
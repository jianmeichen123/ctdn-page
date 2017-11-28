
$(function () {
   initTable();
   getNews();

})

   var url = detail['getCTDNEventInfo'];
     sendPostRequestByJsonObj(url,{"pageSize":7},function(data){
       $(data.data).each(function(k,v){
            if(!v){
                v="-"
            }else{
                for(i in v){
                    if(i=="investDate"){
                        v[i] = formatDate(v[i],"yyyy-MM-dd")
                    }
                    if(i=="newsContent"){
                        if(v[i].length>150){
                            v[i]=v[i].substring(0,150)+'...'
                        }
                    }
                }
            }
       })
       var target = $("#getCTDNEventInfo");
       target.tmpl(data).appendTo(target.parent())
    })



function  getNews(){
    $("table[data-item]").bootstrapTable("refreshOptions",{
        url: searchUrl["news"],         //请求后台的URL（*）
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
            return '<div class="info-error"><img src="../img/error_03.png"></div>';
        },
        onLoadSuccess: function (data) {

        }
    });

    function queryParams(params) {  //配置参数
        var data = {};
          data["pageSize"]=params.pageSize;  //页面大小
          data["pageNo"]=params.pageNumber -1;  //页码
          data["orderBy"]=params.sortName;  //排序列名
          var keyword = $("input[name='keyword']").val();
          if(keyword){
            data["keyword"]=keyword;
          }
          if(!keyword){
              var typeId = $("input[name='typeId']").val();
              if(typeId){
                data["typeId"]= typeId;
              }
          }
        return data;
    }
}


$(".lable_all").delegate("li","click",function(){
   $("input[name='keyword']").val($(this).text());
   $("input[name='newsTypeName']").val("");
   $(".news_click_on").html($(this).text())
   $("#hotTag").show();
   $(".news_li").hide();
   $(".dnsy_hide").hide();
   getNews();
});

function initTable() {
  	var oTable = new TableInit();
  	oTable.Init();
  }
  var TableInit = function () {
  	var oTableInit = new Object();
  	//初始化Table
  	oTableInit.Init = function () {
  	        $('table[data-item]').bootstrapTable({
               		pageSize:10,
               		showRefresh : false ,
               		sidePagination: 'server',
               		method : 'post',
               		pagination: true,
             });

  	};
  	return oTableInit;
  };


//替换占位符
function injectValues(html,row){
       $.each(row,function(k,v){
                    while(html.indexOf("${"+k+"}") > 1){
                    html = html.replace("${"+k+"}",v)
                    }
       })
       return html;
}

//资讯formatter
function newsFormatter(value,row){
   if(row.overview.length>80){
        row.overview = row.overview.substring(0,80)+"...";
   }
   var html = "<li>";
   if (row.imgmd5){
        html +=  '<div class="dn_info_list_show">'
        row.imgmd5 = "<div class='dn_info_list_show_l'><a href='"+row.href+"' target='_blank'> <img src='"+Constants.logoPath +"news/"+row.imgmd5+".PNG'> </a></div>";
   }else {
        html +=  '<div class="dn_info_list_show no_img">'
        row.imgmd5 = ""
   }
   row.orderTime =  formatNewsTime(row.orderTime);
   html += '<div class="dn_info_list_tit"><a href="${href}" target="_blank">${title}</a></div>'+
        '${imgmd5}'+
        '<div class="dn_info_list_show_r">'+
            "<ul>"+
                '<li class="dn_info_list_cen">${overview}</li>'+
                '<li class="dn_info_list_ic"><span>${orderTime}</span><span>来源:</span><span>${auther}</span></li>'+
            "</ul>"+
        "</div>"+
        "</div>"+
        '<div class="dn_sy_line"></div>'+
    "</li>"

    return injectValues(html,row);
}



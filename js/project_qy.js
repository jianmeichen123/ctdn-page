   $(function(){
         $(".background_boeder").each(function(){
         	var obj = $(this);
         	//带点击更多
         	if(obj.find(".dn_ico_more_all").length>0){
         		var more = obj.find(".dn_ico_more_all");
         		loadMore(more,obj)
            }else{
                //不带分页
                loadNoPage(obj);
            }
         })
    })
     //点击更多
    $(".dn_ico_more_all").click(function(){
    	var more = $(this)
    	var obj = more.closest(".background_boeder");
    	loadMore(more,obj)
    })

    function loadMore(more,obj){
        var url = obj.attr("data-url");
        var dataId = obj.attr("data-id");
        url = getUrl(dataId,url);
		var json = getJson(obj);
		if(dataId=="news"){
		    json["pageNo"] = json["pageNo"]-1
		}
    	var pageNo = obj.find("input[name='pageNo']").val();
    	var pageSize = obj.find("input[name='pageSize']").val();
    	var html="";
    	sendPostRequestByJsonObj(url,json,function(data){
    		var records = data.data.records;
    		if(records.length>0 ){
    		     obj.show();
    		     var right_show =obj.children('.project_t').attr('location_l');
                 $('.project_all_r li[location_r='+right_show+']').show();
                 $('.project_all_r li[location_r='+right_show+']').addClass('storey_list')
                 obj.children('.project_t').addClass('storey_list');
    		    var target = $("#"+dataId)
    		    target.tmpl(data).appendTo(target.parent())
				if(pageNo && pageSize){
				    if(data.data.total<=(pageNo*1)*pageSize){
                        more.hide();
                        return;
                    }
                    pageNo = pageNo*1+1
                    obj.find("input[name='pageNo']").val(pageNo)
				}
    		}
    	})
   }
   //没有分页的请求
   function loadNoPage(obj){
        var url = obj.attr("data-url");
        var dataId = obj.attr("data-id")
        //data-id是渲染数据的模板id,如果没有该属性,说明该模块不需要渲染数据
        if(!dataId){
            return;
        }
        url = getUrl(dataId,url);
        var json = getJson(obj);
        sendPostRequestByJsonObj(url,json,function(data){
            if(data.data.length>0){
                var target = $("#"+dataId)
                target.tmpl(data).appendTo(target.parent())
                obj.show();
                var right_show =obj.children('.project_t').attr('location_l');
                $('.project_all_r li[location_r='+right_show+']').show();
                $('.project_all_r li[location_r='+right_show+']').addClass('storey_list')
                obj.children('.project_t').addClass('storey_list');
            }else{
                if(dataId=="product"){
                    if($("#prodSrv").val() || $("#userMarket").val()){
                         $(".prodSrv")
                         obj.show();
                    }
                }else if(dataId="team"){
                    if($("#teamTags").val()|| $("#teamSuper").val()){
                         obj.show();
                    }
                }
            }
        })
   }

   //获取请求地址
   function getUrl(dataId,url){
       if(dataId=="product"){
           url = dataUrl[url];
       }else if(dataId=="news"){
           url = searchUrl[url]
       }else{
           url = detail[url];
       }
       return url;
   }
    //获取参数
   function getJson(obj){
        var ls = obj.find("input[name]");
        var json={};
        $.each(ls,function(i,e){
            json[$(this).attr("name")] =$(this).val();
        })
        return json;
   }

   function formatInvestSideJson(v){
        var json = eval("(" +  v.investSideJson + ")");
        var ls = json["investSideJson"];
        var firms ="";
        $(ls).each(function(i){
         json = ls[i];
          if(json.isClick==1){
                 if(json.isLeader==1){
                      if(json.type=="invst"){
                           firms+= '<span class="dn_ico_bj_lc_b_r"><a target="_blank" title="'+json.invstor+'" href="/jg_particulars.html?orgCode='+json.code+'">'+json.invstor+'</a><label class="lticon">领投</label></span>'
                      }else{
                           firms+= '<span class="dn_ico_bj_lc_b_r"><a target="_blank" title="'+json.invstor+'"  href="/project_qy.html?projCode='+json.code+'">'+json.invstor+'</a><label class="lticon">领投</label></span>'
                      }
                 }else{
                  if(json.type=="invst"){
                       firms+= '<span class="dn_ico_bj_lc_b_r"><a target="_blank" title="'+json.invstor+'" href="/jg_particulars.html?orgCode='+json.code+'">'+json.invstor+'</a></span>'
                  }else{
                       firms+= '<span class="dn_ico_bj_lc_b_r"><a target="_blank" title="'+json.invstor+'"  href="/project_qy.html?projCode='+json.code+'">'+json.invstor+'</a></span>'
                  }
                 }
          }else{
                firms+= '<span class="dn_ico_bj_lc_b_r">'+json.invstor+'</span>'
          }
        })

        return firms
   }

   function formatMergeSideJson(v){
     if(!v){
        return table.empty;
     }
     var json = eval("(" + v.mergeSideJson + ")");
     var ls = json["mergeSideJson"];
     var mergeSideTitle = "";
     $(ls).each(function(i){
     var data =$(this)[0]
        //待修改 没加领投
        if(data.title &&i<3){
              if(data.code){
                  if(data.type=='invse'){
                      mergeSideTitle+='<center><span class="list_table_td"><a href="/jg_particulars.html?orgCode='+data.code+'">'+data.title+'</a></span></center>';
                  }
                  if(data.type=='com'){
                      mergeSideTitle+='<center><span class="list_table_td"><a href="/project_qy.html?projCode='+data.code+'">'+data.title+'</a></span></center>';
                  }
              }else{
                  mergeSideTitle+='<center><span class="list_table_td">'+data.title+'</span></center>';
              }
          }
     })
     v = mergeSideTitle
     return mergeSideTitle;
   }


function formatProduct(data){
    var str = "";
    var p_html = {
        "domain":'<li id="{code}:str" op-data-type="pvuv" data-name="趋势分析图"><div class="a a1">网站</div> <div class="wrapper"> <ul class="product_list_ul"> <li>{appname}</li> <li>alexa排名：{index2}</li> </ul> </div> </li>',
        "android":'<li id="{appid}:long" op-data-type="android" data-name="趋势分析图"><div class="a a3">Android</div>  <div class="wrapper"> <ul class="product_list_ul"> <li>下载总量：<span>{index1}</span></li> <li>每日下载量：<span>{index2}</span></li> <li>更新时间：<span>{updateDate}</span></li> <li>评分：<span>{avgScore}</span></li> </ul> </div> </li>',
        "ios":'<li id="{appid}:long" op-data-type="ios" data-name="趋势分析图"><div class="a a2">iOS</div> <div class="wrapper"> <ul class="product_list_ul"> <li>下载总量：<span>{index1}</span></li> <li>每日下载量：<span>{index2}</span></li> <li>更新时间：<span>{updateDate}</span></li> <li>评分：<span>{avgScore}</span></li> </ul> </div> </li>',
        "weibo":'<li id="{appid}:str" op-data-type="weibo" data-name="趋势分析图"> <div class="a a4">微博</div> <div class="wrapper"> <ul class="product_list_ul"> <li>微博数：<span>{index1}</span></li> <li> 粉丝数：<span>{index2}</span></li> </ul> </div> </li>',
        "weixin":'<li id="{appid}:str" op-data-type="weixin" data-name="趋势分析图"><div class="a a5">微信</div><div class="wrapper"> <ul class="product_list_ul"> <li>平均阅读量：<span>{index1}</span></li> <li> 点赞量：<span>{index2}</span></li> </ul> </div> </li>',
    }
    $(data).each(function(i,e){
        var html = p_html[e.type]
        $.each(e,function(k,v){
            if (k=="avgScore"){v = v.toString();v = v.charAt(0)+"."+v.charAt(1)}
             html = html.replace(new RegExp("{"+k+"}","gm"),v)
        })
       str += html
    })
    return str
}
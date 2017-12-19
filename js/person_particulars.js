    $(function(){
             $(".background_boeder").each(function(){
                var obj = $(this);
                //带点击更多
                if(obj.find(".dn_ico_more_all").length>0){
                    var more = obj.find(".dn_ico_more_all");
                    loadMore(more,obj)
                }else{
                    //不带分页
                     if(obj.attr("data-id") !="none"){
                        loadNoPage(obj);
                    }
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
        var type = obj.attr("type");
        url = getUrl(dataId,url);
		var json = getJson(obj);
    	var pageNo = obj.find("input[name='pageNo']").val();
    	var pageSize = obj.find("input[name='pageSize']").val();

    	var html="";
    	sendPostRequestByJsonObj(url,json,function(data){
    		var records = data.page.records;
    		if(records.length>0 ){
    		    obj.show();
    		    var target = $("#"+dataId)
    		    target.tmpl(records).appendTo(target.parent())
				if(pageNo && pageSize){
				    if(data.page.total<=(pageNo*1)*pageSize){
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
            if(data.data !='' && data.data!=null){
                var target = $("#"+dataId)
               if(data.data instanceof Array){
                    target.tmpl(data).appendTo(target.parent())
                }else{
                    target.tmpl(data.data).appendTo(target.parent())
                }
                obj.show();
                obj.addClass('storey_list');
                var scroll_on = obj.attr('scroll_on');
                $('.project_nav [scroll_on="'+scroll_on+'"]').addClass('scroll_on');
                $('.project_nav [scroll_on="'+scroll_on+'"]').show();
                $('.project_nav').show();
            }
            if(data.data instanceof Array && data.data.length==0){
                obj.hide();
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
        json['code']=getHrefParamter("code")
        return json;
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
                      mergeSideTitle+='<span class="list_table_td"><a href="/jg_particulars.html?orgCode='+data.code+'">'+data.title+'</a></span>';
                  }
                  if(data.type=='com'){
                      mergeSideTitle+='<span class="list_table_td"><a href="/project_qy.html?projCode='+data.code+'">'+data.title+'</a></span>';
                  }
              }else{
                  mergeSideTitle+='<span class="list_table_td">'+data.title+'</span>';
              }
          }
     })
     v = mergeSideTitle
     return mergeSideTitle;
   }


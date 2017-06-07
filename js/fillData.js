//alert(getHrefParamter("code"))
function fillOne(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
            $(ls).each(function(){
               var o = $(this);
               console.log(o.attr("data-field"))
               if(typeof(o.attr("data-formatter")) != "undefined"){
                    var func = o.attr("data-formatter");
                    if(func && func in window){
                        window[func](data[o.attr("data-field")],o)
                    }
               }else{
                    if(data[o.attr("data-field")]){
                        o.html(data[o.attr("data-field")])
                    }else{
                        o.html("未知")
                    }
               }
            })
    })
  }

function fillList(dataList,div){

}
function labelFormat(val,o){
   if(val){
       var str = "";
       $(val.split(","),function(i,e){
           str.append("<span class='project_lable'>");
           str.append(e);
           str.append("</span>");
       })
       o.append(str)
   }
}
sendGetRequest(detail.queryProject+"12345",function(data){fillOne(data.data,$("div[data-query='projectBase']"))})
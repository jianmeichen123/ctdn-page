function fillOne(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
           var o = $(this);
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
function fillOne2(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
           var o = $(this);
           var v = data[o.attr("data-field")]
           var formatter = o.attr("data-formatter");
           if(formatter){
               //v有值,formatter为格式化函数
               if(formatter in window){
                   v = window[formatter](v,o,data)
               }else if(!v && !(formatter in window)) {
                   //v无值,formatter为替代值
                   v = formatter;
               }
           }
           o.html(v)
        })
    })

    var entityList = data;
    var str = $("tbody").html();
    var $h2 =$(str);
    if(entityList){
        $(entityList).each(function(i,row){
            var ls = $h2.find("[data-field]");
            $(ls).each(function(i,e){
                var v = row[$(e).attr("data-field")]
                var formatter = $(e).attr("data-formatter");
                if(formatter){
                    //v有值,formatter为格式化函数
                    if(v && formatter in window){
                        v = window[formatter](v)
                    }else if(!v ){
                        //v无值,formatter为替代值
                        v =formatter;
                    }
                }
                //没有formatter就取v
                $(e).html(v);
            })
            $h2.removeAttr("style");
            $("tbody").append($h2)
            $h2 = $(str)
     })
    }else{
        $("tbody").append("暂无数据")
    }
}

function fillList(dataList,divList){
    var dl = $("*[data-query='list']")
    $(dl).each(function(){
        var div = $(this);
        if(dataList){
            var entityList = dataList[div.attr("data-formatter")];
                    var formatter= div.attr("data-formatter")+"Formatter";
                    if(formatter && formatter in window){
                        window[formatter](entityList,div)
                    }
        }else{
            div.append("暂无数据")
        }

    })
}

function commonFormatter(staticTemplate,data,div){
     var temp = staticTemplate;
     var html =""
     if(data.length>0){
        $(data).each(function(i,row){
                  $.each(row,function(k,v){
                      while(temp.indexOf("${"+k+"}") > 1){
                          if(!v){ v = "-"}
                          temp = temp.replace("${"+k+"}",v)
                      }
                  })
                  html += temp;
                  temp = staticTemplate
             })
     }else{
        html="<span>暂无数据</span>"
     }

     div.append(html)
}


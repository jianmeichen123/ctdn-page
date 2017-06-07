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

function fillList(dataList,divList){
    var dl = $("*[date-query='list']")
    $(dl).each(function(){
        var div = $(this);
        var entityList = dataList[div.attr("data-formatter")];
        var formatter= div.attr("data-formatter")+"Formatter";
        if(formatter && formatter in window){
            window[formatter](entityList,div)
        }
    })
}
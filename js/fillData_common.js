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


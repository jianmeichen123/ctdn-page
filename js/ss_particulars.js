
function fillSsBaseInfo(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
           var o = $(this);
           var k = o.attr("data-field")
           var v = data[o.attr("data-field")]
           if(typeof(o.attr("data-formatter")) != "undefined"){
                var func = o.attr("data-formatter");
                if(func && func in window){
                    window[func](v,o)
                }
           }else{
                if(k=='desc'&&!v){
                    v = '暂无描述'
                }
                if(v){
                    o.html(v)
                }else{
                    o.html("-")
                }
           }
        })
    })
}

sendGetRequest(detail.queryListedInfo+"49301",function(data){fillSsBaseInfo(data.data,$("div[data-query='eventListedInfo']")); fillList(data.data,$("*[data-query='list']"))})
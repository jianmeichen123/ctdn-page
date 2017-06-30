
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
                if(k=='projTitle'&&v){
                    v="<span class='list_table_td'><a href='project_qy.html?code="+data.sourceCode+"'>"+v+"</a></span>"
                }
                if(k=='desc'&&!v){
                    v = '暂无描述'
                }
                if(k=='listedDate'){
                    v = formatDate(v,'yyyy-MM-dd')
                }
                if(k=='listedEvent'&&!v){
                    v='暂未披露'
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
var eventId = getHrefParamter("eventId");
sendGetRequest(detail.queryListedInfo+eventId,function(data){fillSsBaseInfo(data.data,$("div[data-query='eventListedInfo']")); fillList(data.data,$("*[data-query='list']"))})
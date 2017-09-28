var divList = $(".index_l").find("div[data-block]");
$(divList).each(function(){
    var div =$(this);
    var url = detail[div.attr("data-block")];

    sendGetRequest(url,function(data){
       $(data.data).each(function(k,v){
            if(!v)v="-"
       })
       var target = $("#"+div.attr("data-block"));

       target.tmpl(data).appendTo(target.parent())
    })
})


function fillBaseEventInfo(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
            var o = $(this);
            var k = o.attr("data-field")
            var v = data[o.attr("data-field")]
            if(k=='investDate'){
                v = formatDate(v, "yyyy-MM-dd")
            }
            if(k=='desc'&&!v){
                v = '暂无描述'
            }
            if(k=='industrySubName'&&v){
                v = '>'+v
            }
            if(k=='investevent'&&!v){
                v = '未透露'
            }else{
                var investevent = v

            }
            if(k=='investSideJson'){
                var json = eval("(" + v + ")");
                var ls = json["investSideJson"];
                var firms = "";
                for(i in ls){
                    var json = ls[i]
                    if(i<3){
                        firms += "<a href = '#?id="+json.id+"'>"+json.invstor+"</a><br>";
                    }
                }
                v = firms
            }
            if(v){
                o.html(v)
            }else{
                o.html("-")
            }
        })
    })
}
//投资方信息
function eventDetailListFormatter(data,div){
   var staticTemplate = '<tr> <td>${org}</td> <td>${fund}</td> <td>${investor}</td><td>${role}</td> <td>${amount}</td><td>${stock}</td><td>${stock}</td><td>${orgType}</td><td>${quitTime}</td><td>${quitType}</td><td>${returnAmount}</td><td>${returnMulti}</td></tr>'
   var temp = staticTemplate;
    var html =""
    $(data).each(function(i,row){
         $.each(row,function(k,v){
             while(temp.indexOf("${"+k+"}") > 1){
                if(k =="quitTime"){
                    v = formatDate(v, "yyyy-MM-dd")
                }
                if(!v){ v = "-"}
                temp = temp.replace("${"+k+"}",v)
             }
         })
         html += temp;
         temp = staticTemplate
    })
    div.append(html)
}

var eventId = getHrefParamter("eventId");
sendGetRequest(detail.queryEventInfo+eventId,function(data){fillBaseEventInfo(data.data,$("div[data-query='eventInfo']")); fillList(data.data,$("*[data-query='list']"))})

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
            }
            if(k=='amountStr'&&!v){
                v='未透露'
            }
            if(k=='stock'&&!v){
                v='未透露'
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
   var staticTemplate = '<tr> <td>${investor}</td> <td>${fund}</td> <td>${org}</td><td>${role}</td> <td>${amount}</td><td>${stock}</td><td>${orgType}</td><td>${quitTime}</td><td>${quitType}</td><td>${returnAmount}</td><td>${returnMulti}</td></tr>'
   var temp = staticTemplate;
    var html =""
    if(!data.length>0){
                 html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
     }
    $(data).each(function(i,row){
        var eventId = 0;

         $.each(row,function(k,v){
            if(k=="eventId"){
                 eventId = v
             }
             while(temp.indexOf("${"+k+"}") > 1){
                if(k=="quitTime"){
                    v = formatDate(v, "yyyy-MM-dd")
                }
                if(k=="role"&&!v){
                    v="未透露"
                }
                if(k=="stock"&&!v){
                    v="未透露"
                }

                if(k=="investor"&&v){
                    var json = eval("(" + v + ")");
                    if(json.type=='invst'){
                        v= "<span class='list_table_td'><a href = 'jg_particulars.html?orgId="+json.id+"'>"+json.invstor+"</a></span>";
                    }
                    if(json.type=='com'){
                        v= "<span class='list_table_td'><a href = '/project_qy.html?code="+json.code+"'>"+json.invstor+"</a></span>";
                    }
                    if(json.type=='person'){
                        v = json.invstor
                    }
                    if(json.type=='unknown'){
                        v = '<div class="list_table_td"><span class="black">'+json.invstor+'</span></div>'
                    }
//                    v='<div class="list_table_td"><center><span class="col_999"><a href="/jg_particulars.html?orgId='+eventId+'">'+v+'</a></span></center></div>'
//                    v='<a href="#">'+v+'</a>'
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
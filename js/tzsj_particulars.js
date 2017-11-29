
function fillBaseEventInfo(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")

        $(ls).each(function(){
            var o = $(this);
            var k = o.attr("data-field")
            var v = data[o.attr("data-field")]
            if(k=='stock'){
                v=v+'%'
            }
            if(k=='company'){
                v="<span class='list_table_td'><a href='project_qy.html?projCode="+data.sourceCode+"'>"+v+"</a></span>"
            }
            if(k=='investDate'){
                v = formatDate(v, "yyyy-MM-dd")
            }
            if(k=='desc'&&!v){
                v = '暂无描述'
            }
            if(k=="industryName"){
               var str = "";
               if(v){
                   str += v;
                   if(data["industrySubName"]){
                       str += ">" + data["industrySubName"]
                   }
               }
               v =  str;
            }
            if(k=='districtSubName'){
                if(v){
                    if(v=='国外'){
                        v='地区未知'
                    }else{
                        v='<span>'+v+'</span>'
                        if(data.districtGrandsonName&&data.districtGrandsonName!='0'){
                            v +='<span class="dot">·</span>'+data.districtGrandsonName
                        }
                    }
                }else{
                    if(data.districtGrandsonName&&data.districtGrandsonName!='0'){
                        v =data.districtGrandsonName
                    }
                }
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
                        firms += "<a target='_blank' href = '#?id="+json.id+"'>"+json.invstor+"</a><br>";
                    }
                }
                v = firms
            }
            if(v){
                o.html(v)
            }else{
                o.html(table.empty)
            }
        })
    })
}
//投资方信息
function eventDetailListFormatter(data,div){
   var staticTemplate = '<tr> <td>${investor}</td> <td>${fund}</td> <td>${org}</td><td>${role}</td> <td>${amount}</td><td>${stock}</td><td>${orgType}</td><td>${quitTime}</td><td>${quitType}</td><td>${returnAmount}</td><td>${returnMulti}</td></tr>'
   var temp = staticTemplate;
    var html =""

    if(data.length>0){
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
                    if(k=="role"&&v!='领投'){
                        v=table.empty;
                    }
                    if(k=="stock"&&!v){
                        v="未透露"
                    }
                    if(k=='amount'&&!v){
                        v="未透露"
                    }
                    if(k=="investor"&&v){
                        var json = eval("(" + v + ")");
                        if(json.type=='invst'&&json.isClick==1){
                            v= "<span class='list_table_td'><a target='_blank' href = 'jg_particulars.html?orgCode="+json.code+"'>"+json.invstor+"</a></span>";
                        }
                        if(json.type=='invst'&&json.isClick==0){
                            v= "<span class='list_table_td'>"+json.invstor+"</span>";
                        }
                        if(json.type=='com'){
                            v= "<span class='list_table_td'><a target='_blank' href = '/project_qy.html?projCode="+json.code+"'>"+json.invstor+"</a></span>";
                        }
                        if(json.type=='person'){
                            v = "<center>"+json.invstor+"</center>"
                        }
                        if(json.type=='unknown'){
                            v = '<span><span class="black">'+json.invstor+'</span></span>'
                        }
    //                    v='<div class="list_table_td"><center><span class="col_999"><a href="/jg_particulars.html?orgId='+eventId+'">'+v+'</a></span></center></div>'
    //                    v='<a href="#">'+v+'</a>'
                    }
                    if(!v){ v = table.empty}
                    temp = temp.replace("${"+k+"}",v)
                 }
             })
             html += temp;
             temp = staticTemplate
        })
    }else{
         html="<tr> <td colspan='6'><span>暂无数据</span></th></tr>"
    }
    div.append(html)
}

var eventId = getHrefParamter("eventId");
sendGetRequest(detail.queryEventInfo+eventId,function(data){fillBaseEventInfo(data.data,$("div[data-query='eventInfo']")); fillList(data.data,$("*[data-query='list']"))})

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
            if(k=='investevent'){
                v = '未透露'
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
var baseEventInfoFormate ={
    eventInfoIndustry:function(value,row,index){
        var industry = ''
        if(!row.districtName){
            industry+='-'
        }
        if(row.districtName&&!row.districtSubName){
            industry+=row.districtName
        }
        if(row.districtName&&row.districtSubName){
            industry+=row.districtName+'>'+row.districtSubName
        }
    }
}

sendGetRequest(detail.queryEventInfo+"2",function(data){fillBaseEventInfo(data.data,$("div[data-query='eventInfo']")); fillList(data.data,$("*[data-query='list']"))})
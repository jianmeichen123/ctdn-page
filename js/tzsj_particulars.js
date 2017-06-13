
function fillBaseEventInfo(data,divList){
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
            var o = $(this);
            if(data[o.attr("data-field")]){
                o.html(data[o.attr("data-field")])
            }else{
                o.html("未知")
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
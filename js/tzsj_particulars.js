
var tableFormate ={

}


sendGetRequest(detail.queryEventInfo+"2",function(data){fillOne(data.data,$("div[data-query='eventInfo']")); fillList(data.data,$("*[data-query='list']"))})
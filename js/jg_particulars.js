
sendGetRequest(detail.queryInvestOrgInfo+"1",function(data){fillOne(data.data,$("div[data-query='eventInfo']")); fillList(data.data,$("*[data-query='list']"))})
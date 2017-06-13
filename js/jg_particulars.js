
sendGetRequest(detail.queryInvestOrgInfo+"1",function(data){fillOne(data.data[0],$("div[data-query='baseOrgInfo']")); fillList(data.data,$("*[data-query='list']"))})
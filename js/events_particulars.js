function mergeEventInfoFormatter(data,div){

    $(data).each(function(i,row){
            $.each(row,function(k,v){
                while(temp.indexOf("${"+k+"}") > 1){
                    if(v){
                        if(k == "party"){
                            var party = row.party
                            if(party == "B"){
                                mergeSideListFormatter(data,div)
                            }
                            if(party == "C"){
                                beenMergeSideListFormatter(data,div)
                            }
                        }

                    }
                }
            })
         })
}

//并购方
function mergeSideListFormatter(data,div){
   var staticTemplate='<tr> <td>${partyName}</td> <td>${industry}</td> <td>${district}</td> <td>${isVcFe}</td> <td>${isStock}</td> <td>${isNation}</td> <td>${lawFirms}</td><td>${accountFirms}</td><td>${financeConsult}</td></tr>'
   var temp = staticTemplate;
   var html = "";
   //遍历数组
   $(data).each(function(i,row){
      $.each(row,function(k,v){
          while(temp.indexOf("${"+k+"}") > 1){
              if(v){
                  if(k == "partyName"){
                       v = row.partyName
                  }
                  if(k =="industry"){
                       v = row.industry
                  }
                  if(k =="district"){
                       v = row.district
                  }
              }else{
                  v= "-"
              }
              temp =temp.replace("${"+k+"}",v)
          }
      })
      html += temp;
      temp = staticTemplate
   })
   div.append(html)
}

//被并购方
function beenMergeSideListFormatter(data,div){
   var staticTemplate='<tr> <td>${partyName}</td> <td>${industry}</td> <td>${district}</td> <td>${isVcFe}</td> <td>${isStock}</td> <td>${isNation}</td> <td>${lawFirms}</td><td>${accountFirms}</td><td>${financeConsult}</td></tr>'
   var temp = staticTemplate;
   var html = "";
   //遍历数组
   $(data).each(function(i,row){
      $.each(row,function(k,v){
          while(temp.indexOf("${"+k+"}") > 1){
              if(v){
                  if(k == "partyName"){
                       v = row.partyName
                  }
                  if(k =="industry"){
                       v = row.industry
                  }
                  if(k =="district"){
                       v = row.district
                  }
              }else{
                  v= "-"
              }
              temp =temp.replace("${"+k+"}",v)
          }
      })
      html += temp;
      temp = staticTemplate
   })
   div.append(html)
}

sendGetRequest(detail.queryMergeEventInfo+"2",function(data){fillOne(data.data[0],$("div[data-query='mergeEventInfo']")); fillList(data.data,$("*[data-query='list']"))})
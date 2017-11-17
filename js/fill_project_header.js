//项目基本信息formatter
function formatProjectInfo(data,divList){
//    $("input[name='projectCode']").val(data["projectCode"])
//    $("input[name='sourceCode']").val(data["projectCode"])
//    $("input[name='code']").val(data["projectCode"])
    $(divList).each(function(){
        var div = $(this);
        var ls = div.find("*[data-field]")
        $(ls).each(function(){
           var o = $(this);
           var k = o.attr("data-field");
           var v =data[k];
           if(k == "latestFinanceRound" || k=="runState" || k=="needFinance"){
               if(!v) o.removeClass(o.attr("class"));
           }else if(k == "logoSmall"){
               	if (v && v.indexOf("/")!=-1){
                    img = v.split("/")[1]
                    v= '<img src="'+Constants.logoPath+img+'">'
                }else if (v && v!=""){
                    img = v
                    v= '<img src="'+Constants.logoPath+img+'">'
                }else{
                    v= '<img src="img/default.gif">'
                }
           }else if(k=="projTitle"){
                if(!v){
                    v = "名称未知"
                }
           }else if(k=="districtSubName"){
               if(!v){
                   v="地区未知"
               }else{
                   if(v=='国外'){
                       v='地区未知'
                   }else{
                       v = '<span>'+v+'</span>'
                       if(data.districtGrandsonName){
                         v +='<span class="dot">·</span><span>'+data.districtGrandsonName+'</span>'
                       }
                   }
               }
           }else if(k=="industryName"){
                var str = "";
                if(v){
                    str += v;
                    if(data["industrySubName"]){
                        str += ">" + data["industrySubName"]
                    }
                }else{
                    str ="行业未知"
                }
                v =  str;
           }else if(k=="labels"){
                if(v){
                    var str = "";
                    $(v.split(",")).each(function(i,e){
                         str+= "<span class='project_lable'>"+e+"</span>";
                    })
                    v = str
                }
           } else if(k=="bp"|| k =="hqEmail" || k== "hqTel"){
                if(!v){
                    v= "-"
                }
           }else if(k=="weibo"){
                if(v){
                    v='<a href ="'+v+'" target="_blank"><span class="brain_ico brain_ico_project_1_on"></span></a>'
                }else{
                    v='<span class="brain_ico brain_ico_project_1"></span>'
                }
           }else if(k=="weixin"){
               if(v){
                    o.parent().append('<ul class="weixin_ewm"><li class="wx_img"><img src="https://open.weixin.qq.com/qr/code/?username='+v+'"><span>'+v+'</span>	</li> </ul>')
                    v='<span class="brain_ico brain_ico_project_2_on"  ></span>'
               }else{
                    v='<span class="brain_ico brain_ico_project_2"  title="" ></span>'
               }
           }else if(k=="webUrl"){
                if(v){
                    v ='<a href ="'+v+'" target="_blank"><span class="brain_ico brain_ico_project_3_on"></span></a>'
                }else{
                    v = '<span class="brain_ico brain_ico_project_3"></span>'
                }
           }else if(k=="introduce"){
              if(!v){
               $("p[data-field='introduce']").closest(".background_boeder").hide()
              }
           }
           else if(k=="teamTags"){
                 if(!v){
                      var tags = v.split(",");
                      var temp = "";
                      $.each(function(i,e){
                        temp += "<li>"+e+"</li>"
                      })
                      $("#teamTags").html(temp)
                 }else{
                      $(".teamTags").hide()
                 }
           }else if(k=="teamSuper"){
                if(!v){
                     var tags = v.split(",");
                     var temp = "";
                     $.each(function(i,e){
                       temp += "<li>"+e+"</li>"
                     })
                     $("#teamSuper").html(temp)
                }else{
                     $(".teamSuper").hide()
                }
            }else if(k=="userMarket"){
               if(!v){
                    $("#userMarket").html(v)
               }else{
                    $(".userMarket").hide()
               }
            } else if(k=="prodSrv"){
               if(!v){
                    $("#prodSrv").html(v)
               }else{
                    $(".prodSrv").hide()
               }
            }
           o.html(v)
        })
    })
}
sendGetRequest(detail.queryProject+"/"+getHrefParamter("code"),function(data){proj=data;name = data.data.projTitle;formatProjectInfo(data.data,$("div[data-query='projectBase']"))})

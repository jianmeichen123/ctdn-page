//项目基本信息formatter
function formatProjectInfo(data,divList){
     projCode = data["projCode"]
     $(".oo a").each(function(){
     	var href= $(this).attr("data-href")
        $(this).attr("href",href+projCode)
     })
     $("input[name='projCode']").val(data["projCode"])
     $("input[name='projectCode']").val(data["projCode"])
     $("input[name='sourceCode']").val(data["projCode"])
     $("input[name='code']").val(data["projCode"])
     $("input[name='keyword']").val(data["projTitle"])
        if(data["teamTags"]){
              $(".teamTags").show()
              var tags = data["teamTags"].split("^$^");
              var temp = "";
              $.each(tags,function(i,e){
                temp += "<li>"+e+"</li>"
              })
             $("#teamTags").html(temp)
        }

        if(data["teamSuper"]){
             $(".teamSuper").show()
             $("#teamSuper").html(data["teamSuper"])
        }

        if(data["userMarket"]){
            $(".userMarket").show()
            $(".userMarket").closest(".background_boeder").show()
            $("#userMarket").html(data["userMarket"])
        }

        if(data["prodSrv"]){
             $(".prodSrv").show()
             $(".prodSrv").closest(".background_boeder").show()
             $("#prodSrv").html(data["prodSrv"])
       }
       if(data["introduce"]){
           $("#introduce").closest(".background_boeder").show()
            var right_show =$('#introduce').parent().parent().parent().parent().children('.project_t').attr('location_l');
			 $('.project_all_r li[location_r='+right_show+']').show();
			 $('.project_all_r li[location_r='+right_show+']').addClass('storey_list')
			 $('.project_all_l [location_l='+right_show+']').addClass('storey_list')
           if(data["introduce"].length>60){
                $(".project_more").show();
           }
           $("#introduce").html(data["introduce"])
       }
       if(data["photos"]){
            $(".photos").closest(".background_boeder").show()
            var str = "<div class='slider6'>";
            $(data["photos"].split("^$^")).each(function(i,e){
                 str+= "<div class='slide'><img src='"+Constants.logoPath+"product/other/"+e+".png'></div>";
            })
            str += "</div>"
            $(".photos").html(str)

       }
       if(data["firmDesc"]){
          $("#firmDesc").closest(".background_boeder").show()
           var right_show =$('#firmDesc').parent().parent().parent().parent().children('.project_t').attr('location_l');
         $('.project_all_r li[location_r='+right_show+']').show();
         $('.project_all_r li[location_r='+right_show+']').addClass('storey_list')
         $('.project_all_l [location_l='+right_show+']').addClass('storey_list')
          if(data["firmDesc"].length>216){
               $(".project_more").show();
          }
          $("#firmDesc").html(data["firmDesc"])
      }

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
                var img = Constants.logoPath+"project/"+data["projCode"]+".png"
                v= '<img  width="37" src="'+img+'">'
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
           }
           else if(k=="bp"|| k =="hqEmail" || k== "hqTel"){
                if(!v){
                    v= table.empty;
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
           }
           o.html(v)
        })
    })
}
sendGetRequest(detail.queryProject+"/"+getHrefParamter("projCode"),function(data){proj=data;name = data.data.projTitle;formatProjectInfo(data.data,$("div[data-query='projectBase']"))})

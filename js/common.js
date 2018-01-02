window.console = window.console || (function(){ 
	var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile 
	= c.clear = c.exception = c.trace = c.assert = function(){}; 
	return c; 
})();
/**
 * 发送post请求
 * 
 * @param reqUrl
 *            请求地址
 * @param jsonObj
 *            请求json对象
 * @param sessionId
 *            请求头中需携带的sessionid
 * @param callbackFun
 *            处理成功后的回调方法
 */
function sendPostRequestByJsonObj(reqUrl, jsonObj, callbackFun) {
	$.ajax({
		url : reqUrl,
		type : "POST",
	    data : JSON.stringify(jsonObj),
		dataType : "json",
		cache : false,
		contentType : "application/json; charset=UTF-8",
		async : false,
		error : function(request) {
		},
		success : function(data) {
			if(data){
				if(!data.success && data.status == 10003){
					location.href =platformUrl.toLogin
					return
				}
			}
			if (callbackFun) {
				callbackFun(data);
			}
		}
	});
}

/**
 * 发送post请求
 * 
 * @param reqUrl
 *            请求地址
 * @param jsonStr
 *            请求json字符串
 * @param sessionId
 *            请求头中需携带的sessionid
 * @param callbackFun
 *            处理成功后的回调方法
 */
function sendPostRequestByJsonStr(reqUrl, jsonStr, callbackFun) {
	sendPostRequestByJsonObj(reqUrl, JSON.parse(jsonStr), callbackFun);
}

/**
 * 发送get请求
 * 
 * @param reqUrl
 *            请求地址
 * @param jsonObj
 *            请求json对象
 * @param sessionId
 *            请求头中需携带的sessionid
 * @param callbackFun
 *            处理成功后的回调方法
 */
function sendGetRequest (reqUrl, jsonObj, callbackFun) {
	$.ajax({
		url : reqUrl,
		type : "GET",
		data : jsonObj,
		dataType : "json",
		cache : false,
		contentType : "application/json; charset=UTF-8",
		async : false,
		error : function(request) {
		},
		success : function(data) {
			if(data){
				if(!data.success && data.status == 10003){
					location.href =platformUrl.toLogin
					return
				}
			}
			if (callbackFun) {
				callbackFun(data);
			}
		}
	});
}
/**
 * 发送post请求
 *
 * @param reqUrl
 *            请求地址
 * @param sessionId
 *            请求头中需携带的sessionid
 * @param callbackFun
 *            处理成功后的回调方法
 */
function sendGetRequest(reqUrl, callbackFun) {
	$.ajax({
		url : reqUrl,
		type : "GET",
		cache : false,
		contentType : "application/json; charset=UTF-8",
		async : false,
		error : function(request) {
		},
		success : function(data) {
			if(data){
				if(!data.success && data.status == 10003){
					location.href =platformUrl.toLogin
					return
				}
			}
			if (callbackFun) {
				callbackFun(data);
			}
		}
	});
}
/**
 * 发送post请求
 * 
 * @param reqUrl
 *            请求地址
 * @param sessionId
 *            请求头中需携带的sessionid
 * @param callbackFun
 *            处理成功后的回调方法
 */
function sendPostRequest(reqUrl, callbackFun) {
	var myDate = (new Date()).getTime()
	$.ajax({
		url : reqUrl,
		type : "POST",
		cache : false,
		contentType : "application/json; charset=UTF-8",
		async : false,
		beforeSend : function(xhr) {
			/**清楚浏览器缓存**/
			xhr.setRequestHeader("If-Modified-Since","0");
			xhr.setRequestHeader("Cache-Control","no-cache");

		},
		error : function(request) {
		},
		success : function(data) {
			if(data){
				if(!data.success && data.status == 10003){
					location.href =platformUrl.toLogin
					return
				}
			}
			if (callbackFun) {
				callbackFun(data);
			}
		}
	});
}

/**
 * url:统一跳转url  
 * 
 */
function forwardWithHeader(url){
	window.location.href = url;
	
}
function array_remove_repeat(a) { // 去重
    var r = [];
    for(var i = 0; i < a.length; i ++) {
        var flag = true;
        var temp = a[i];
        for(var j = 0; j < r.length; j ++) {
            if(temp === r[j]) {
                flag = false;
                break;
            }
        }
        if(flag) {
            r.push(temp);
        }
    }
    return r;
}

function array_intersection(a, b) { // 交集
    var result = [];
    for(var i = 0; i < b.length; i ++) {
        var temp = b[i];
        for(var j = 0; j < a.length; j ++) {
            if(temp === a[j]) {
                result.push(temp);
                break;
            }
        }
    }
    return array_remove_repeat(result);
}

function array_union(a, b) { // 并集
    return array_remove_repeat(a.concat(b));
}

function array_difference(a, b) { // 差集 a - b
    //clone = a
    var clone = a.slice(0);
    for(var i = 0; i < b.length; i ++) {
        var temp = b[i];
        for(var j = 0; j < clone.length; j ++) {
            if(temp === clone[j]) {
                //remove clone[j]
                clone.splice(j,1);
            }
        }
    }
    return array_remove_repeat(clone);
}
String.prototype.endWith=function(str){
if(str==null||str==""||this.length==0||str.length>this.length)
  return false;
if(this.substring(this.length-str.length)==str)
  return true;
else
  return false;
return true;
}

String.prototype.startWith=function(str){
if(str==null||str==""||this.length==0||str.length>this.length)
  return false;
if(this.substr(0,str.length)==str)
  return true;
else
  return false;
return true;
}

function formatDate(date, format) {   
    if (!date) {
        return table.empty
    }
    if (!format) format = "yyyy-MM-dd";   
    switch(typeof date) {   
        case "string":   
            date = new Date(date.replace(/-/, "/"));   
            break;   
        case "number":   
            date = new Date(date);   
            break;   
    }    
    if (!date instanceof Date) return;   
    var dict = {   
        "yyyy": date.getFullYear(),   
        "M": date.getMonth() + 1,   
        "d": date.getDate(),   
        "H": date.getHours(),   
        "m": date.getMinutes(),   
        "s": date.getSeconds(),   
        "MM": ("" + (date.getMonth() + 101)).substr(1),   
        "dd": ("" + (date.getDate() + 100)).substr(1),   
        "HH": ("" + (date.getHours() + 100)).substr(1),   
        "mm": ("" + (date.getMinutes() + 100)).substr(1),   
        "ss": ("" + (date.getSeconds() + 100)).substr(1)   
    };       
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {   
        return dict[arguments[0]];   
    });                   
} 
function changDistrictName(name){
        if (name.indexOf("广西") != -1){
            return "广西"
        }else if(name.indexOf("西藏") != -1){
            return "西藏"
        }else if(name.indexOf("新疆") != -1){
            return "新疆"
        }else if(name.indexOf("宁夏") != -1){
            return "宁夏"
        }else if(name.indexOf("青海") != -1){
            return "青海"
        }else if(name.indexOf("台湾") != -1){
            return "台湾"
        }else if(name.indexOf("香港") != -1){
            return "香港"
        }else{
            return name.toString().replace("省","").replace("市","").replace("自治区","")
        }
    }

/**
 * html之间传递参数
 * @param name
 * @returns
 */
function getHrefParamter(name){
      var url=decodeURI(location.search);
      var q = url.substr(1);
      var qs = q.split("&");
      if (qs) {
          for (var i = 0; i < qs.length; i++) {
              if (qs[i].substring(0, qs[i].indexOf("=")) == name) {
                  var ss = qs[i].substring(qs[i].indexOf("=") + 1)
                  return ss;
              }
          }
      }
}
　function GetUrlRelativePath(){
　　      var strUrl=window.location.href;
        var arrUrl=strUrl.split("/");
        var strPage=arrUrl[arrUrl.length-1].split(".")[0];　　
    return strPage;
　　}
function fmoney(s, n){
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + '').replace(/[^\d\.-]/g, '')) + '';
      var l = s.split('.') [0].split('').reverse(),
      r = s.split('.') [1];
      var t = '';
      for (var i = 0; i < l.length; i++)
      {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
      }
      if (!r) {
        r = '0';
      }
      if (r.length < n) {
        for (var i = r.length; i < n; i++) {
          r += '0';
        }
      }else{
         r=r.substr(0,n);
      }
      return " "+t.split('').reverse().join('') + '.' + r;
    }

function fmoney2(s, n){
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')) + '';
    var l = s.split('.') [0].split('').reverse(),
    r = s.split('.') [1];
    var t = '';
    for (var i = 0; i < l.length; i++)
    {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    if (!r) {
      r = '0';
    }
    if (r.length < n) {
      for (var i = r.length; i < n; i++) {
        r += '0';
      }
    }else{
       r=r.substr(0,n);
    }
    return t.split('').reverse().join('') + '.' + r;
  }

function fmoney3(s){
    var n = 0
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')) + '';
    var l = s.split('.') [0].split('').reverse(),
    r = s.split('.') [1];
    var t = '';
    for (var i = 0; i < l.length; i++)
    {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    return t.split('').reverse().join('') ;
  }
var index_href = home.index + '/index_normal.html'
$(function(){
	function setName(data){
	    if(!data&&data.length < 100){
	        $('#login_model').css('display','block')
	    	$('#logined_model').css('display','none')
//	         location.href = platformUrl.toLogin
	    }else{
	    	var obj = JSON.parse(data)
	        if(obj['roleCode'] ==30000 && getCookie("s_")=="external"){
	        	var mobile = obj['mobile']
	        	$("span[name='id_name']").html(mobile.substring(0,5)+'******')
	        	 setCookie("realName",mobile)
	        	 setCookie("roleCode", obj['roleCode'])
	        	 $('.head_login_all .dn_ico_loginimg').addClass('dn_ico_loginimg_on');
	        }else{
	        	var name = obj['realName']
	        	$("span[name='id_name']").html(name)
	        	setCookie("realName",name)
	        	setCookie("roleCode", obj['roleCode'])
	        	$('.head_login_all .dn_ico_loginimg').addClass('dn_ico_loginimg_on');
	        }
	    	setIndexHref(obj)
            $('#login_model').css('display','none')
	    	$('#logined_model').css('display','block')
	    	$("#seek").show()
	    }
	}
	function setIndexHref(obj){
		var roleCode = obj['roleCode']
		if(roleCode == 30000){
			index_href =  home.index + '/index_external.html'
			return
		}
		if(roleCode == 10000 ){
			index_href = home.index + '/index_manager.html'
			return
		}
		if(roleCode == 20000){
			index_href = home.index + '/index_senior.html'
			return
		}
	}
	
    function me(){
//    	alert(GetUrlRelativePath())
    	$.ajax({
            url : platformUrl.me,
            type : "GET",
            cache : false,
            contentType : "application/json; charset=UTF-8",
            async : false,
            error : function(request) {
                $('#login_model').css('display','block')
    	    	$('#logined_model').css('display','none')
//                location.href = platformUrl.toLogin
            },
            success : function(data) {
            	setName(decodeURIComponent(data))
            }
        });
    }

    if(getCookie("_uid_")){
        me()
    }

    /* $("ul[tab='header']").on("click","li",function(){
    	 
    	 var o = $(this)
    	 if(o.attr("tab")!=""){
    		 if(o.attr("tab")=="hyfx"){
    			 location.href =  "zhyjbg.html" 
    		 }else{
    			 //location.href = o.attr("tab") +".html"
    		 }
    		 
    	 }
    	 
    	 
     });*/
    /*var u = $("body[data-page-parent]").attr("data-page-parent");
    if(u){
    	$('ul[tab="header"] li[tab="'+u+'"]').addClass("nav_on")
    }*/

})
//根据登录状态设置首页
function index_page(){
	location.href = index_href
}
function logout(){
	location.href = platformUrl.logout
}
//通用截取方法，区分中英文
//使用：$.fixedWidth(str,20)
$.extend($,{  
	fixedWidth:function(str,length,char){  
		str=str.toString();  
		if(!char) char="...";  
		var num=length-lengthB(str);  
		if(num<0){  
			str=substringB(str,length-lengthB(char))+char;  
		}
		return str;  
		function substringB(str,length){  
			var num=0,len=str.length,tenp="";  
			if(len){  
				for(var i=0;i<len;i++){  
					if(num>length) break;  
					if(str.charCodeAt(i)>255){  
						num+=2;  
						tenp+=str.charAt(i);  
					}else{  
						num++;  
						tenp+=str.charAt(i);  
					}  
				}  
				return tenp;  
			}else{
				return null;  
	        }  
		}
		function lengthB(str){  
			var num=0,len=str.length;  
	        if(len){  
	          for(var i=0;i<len;i++){  
	        	  if(str.charCodeAt(i)>255){  
	        		  num+=2;
	        	  }else{  
	        		  num++;  
	        	  }  
	          }  
	          return num;
	        }else{  
	          return 0;  
	        }  
		}  
	}  
});

 $("span[action='html:save']").bind('on',function(event){
    var e = $(this)
    var target = $(e.attr("data-target"))
    console.log(target)
 });


 function encodeUTF8(str){
 var temp = "",rs = "";
 for( var i=0 , len = str.length; i < len; i++ ){
     temp = str.charCodeAt(i).toString(16);
     rs  += "\\u"+ new Array(5-temp.length).join("0") + temp;
 }
 return rs;
 }
 function decodeUTF8(str){
 return str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0,$1,$2){
     return String.fromCharCode(parseInt($2,16));
 });
 }
//导航位置定位
 function nav_locaton(first_level,second_level,three_level,four_level){
	 $('.nav_all [page_tab='+first_level+']').addClass("nav_on");
	 if(second_level !=''){
		 $('.nav_two [page_tab='+second_level+']').addClass("nav_on");
		 $('.nav_list_data [page_tab='+second_level+']').addClass("nav_on");		 
	 }
	 if(three_level !=''){
		 $('.column_ul [page_tab='+three_level+']').addClass("nav_on");
	 }
	 if(four_level !=''){
		 $('.project_nav [page_tab='+four_level+']').addClass("nav_on");
	 }
 }
//创投数据库
 $('body').delegate('.nav_list_data_all','mouseenter mouseleave', function(event){
 	event.stopPropagation();
 	if(event.type == "mouseenter"){
 		$('.nav_list_data_all .nav_list_data').addClass("nav_list_data_on");
 	}else if(event.type == "mouseleave" ){
 		$('.nav_list_data_all .nav_list_data').removeClass("nav_list_data_on");
 	}
 })
//名字事件
 $('body').delegate('.nav_all_name','mouseenter mouseleave', function(event){
 	event.stopPropagation();
 	if(event.type == "mouseenter"){
 		$('.nav_all_name .brain_ico_name').addClass("brain_ico_name_on");
 		$('.list_click_ul').show();		
 	}else if(event.type == "mouseleave" ){
 		$('.nav_all_name .brain_ico_name').removeClass("brain_ico_name_on");
 		$('.list_click_ul').hide();
 	}
 })
 
 //导航搜索相关
$('body').delegate('.dn_ico_search','click', function(event){
 	event.stopPropagation();
 	$(".info-search .hot_speech").hide(); 
 	$('.nav_all_seek').hide();
 	$('.nav_all_input').show();
 	$('#nav_all_input').focus();
 	$("#executive_pop").hide();
 	$("#trade_pop").hide();
})

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
	}
	return ""
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function removeCookie(c_name){
  setCookie(c_name, 1, -1);
}

function cancelCompare(code,title){
    var jsonArray = "";
    if(getCookie("ctdn-compare")){
        jsonArray = eval('(' + getCookie("ctdn-compare") + ')');
    }
    if(jsonArray || jsonArray.length > 0){
        for(var i= 0;i<jsonArray.length ;i++){
            if(jsonArray[i].code == code){
                jsonArray.splice(i,1)
            }
        }
        setCookie("ctdn-compare",JSON.stringify(jsonArray))
        if(jsonArray.length==0){
           $(".Floating_box").hide();
        }else{
           refreshCompare();
           $(".Floating_box_a .inside").text(jsonArray.length);
        }
    }
    $("#"+code).toggleClass('dn_ico_list_contrast_on');
}
function isCompare(code){
     var flag = false;
     var jsonArray =  getCookie("ctdn-compare")
     if(jsonArray){
             jsonArray = eval('(' + getCookie("ctdn-compare") + ')');
             for(var i = 0; i<jsonArray.length;i++){
                if(code == jsonArray[i].code){
                    flag = true;
                }
             }
      }
      return flag;
}

function compare(code,title){
        var json={};
        var flag = false;
        json["code"]=code;
        json["title"]=title;
        var jsonArray =  getCookie("ctdn-compare")
        if(!jsonArray){
            jsonArray = [];
        }else{
            jsonArray = eval('(' + getCookie("ctdn-compare") + ')');
        }
        if(jsonArray.length < 4){
            jsonArray.push(json);
            setCookie("ctdn-compare", JSON.stringify(jsonArray));
            refreshCompare();
            flag = true;
        }
        var num=jsonArray.length;
        $(".Floating_box_a .inside").text(num);
        return flag;
}


 //比较浮框
$('body').delegate('.Floating_box_a','click', function(event){
 	event.stopPropagation();
 	$('.Floating_box_a .dn_ico_box').toggleClass('dn_ico_box_show');
 	if($('.Floating_box_a .dn_ico_box').hasClass('dn_ico_box_show')){
 	    var jsonArray = eval('(' + getCookie("ctdn-compare") + ')');
 	    if(jsonArray){
 	        var html = refreshCompare();
           	$('.Floating_box  .Floating_box_b').show()
 	    }
 	}else{
 		$('.Floating_box  .Floating_box_b').hide()
 	}
})
//绑定对比
$('body').delegate('.click_contrast','click', function(event){
	event.stopPropagation();
	var title = $(this).attr("title");
    var code = $(this).attr("code");
    if($(this).hasClass("dn_ico_list_contrast_on")){
       cancelCompare(code,title)
    }else{
       var flag = compare(code,title)
       if(!flag){
            layer.tips('最多可以对比4个项目', $(this), {
              tips: [1, '#3595CC'],
              time: 1000
            });
       }else{
         $("#"+code).toggleClass('dn_ico_list_contrast_on');
         $(".Floating_box").show();
       }
    }
})

//绑定收藏
$('body').delegate('.click_collect','click', function(event){
	event.stopPropagation();
	if(!getCookie("_uid_")){
        	layer.open({
        		  type: 2,
        		  title: '提示信息',
        		  shadeClose: true,
        		  shade: 0.6,
        		  area: ['400px', '280px'],
        		  content: 'html/tips_login.html'
        	});
	}else{
	    	$(this).toggleClass('dn_ico_list_collect_on');
        	var type = $(this).attr("type");
        	var code = $(this).attr("code");
        	if($(this).hasClass("dn_ico_list_collect_on")){
        	   collectOne(type,code)
        	}else{
        	   cancelOneCol(type,code)
        	}
	}
})
function refreshCompare(){
        var html =""
        if(getCookie("ctdn-compare") ){
            var jsonArray = eval('(' + getCookie("ctdn-compare") + ')');
            if(jsonArray){
                for(var i = 0; i<jsonArray.length;i++){
                    var code = jsonArray[i].code
                    var title = jsonArray[i].title
                    html +=  "<li>"+
                                "<img src='"+Constants.logoPath+"project/"+code+".png'>"+
                                "<div class='Floating_box_b_name'>"+title+"</div>"+
                                "<div class='dn_ico dn_ico_contrast' onclick=cancelCompare('"+code+"')></div>"+
                            "</li>"
                }
            }
            $('.Floating_box  .Floating_box_b ul').html(html);
        }
}
//获取userCode
var userCode= getCookie("_usercode_")
function collectOne(type,code){
    sendPostRequestByJsonObj(user.collectOne,{"userCode":userCode,"type":type,"code":code},null)
}

function cancelOneCol(type,code){
    sendPostRequestByJsonObj(user.cancelOneCol,{"userCode":userCode,"type":type,"code":code},null)
}
 //全部行业

 //关注行业
$('body').delegate('#trade_click','click', function(event){
 	event.stopPropagation();
 	$("#trade_pop").show();
    $('.nav_all_seek').show();
	$('.nav_all_input').hide();
})
$('#trade_click').click(function(){
 	event.stopPropagation();
 	$("#trade_pop").show();
    $('.nav_all_seek').show();
	$('.nav_all_input').hide();
})
$(document).bind('click', function(e) {  
	var e = e || window.event; //浏览器兼容性   
    var elem = e.target || e.srcElement;  
    while (elem) { //循环判断至跟节点，防止点击的是div子元素   
        if (elem.id && elem.id == 'nav_all_input_all') { 
         	$(".info-search .hot_speech").hide(); 
            return;  
        }else if(elem.id && elem.id == 'info-search_span'){
        	$('.nav_all_seek').show();
        	$('.nav_all_input').hide();
        	return;  
        }else if(elem.id && elem.id == 'trade_pop'){
        	$('.nav_all_seek').hide();
        	return;  
        } 
        else if(elem.id && elem.id == 'executive_pop'){
        	$('.nav_all_seek').hide();
        	return;  
        }
        elem = elem.parentNode;  
    }  
    $('.nav_all_seek').show();
 	$('.nav_all_input').hide();
 	$('#executive_pop').hide();
 	$(".info-search .hot_speech").hide();
 	$("#trade_pop").hide();
       
});
/*$('body').delegate('#nav_all_input','focusout', function(event){
 	event.stopPropagation();
 	$('.nav_all_seek').show();
 	$('.nav_all_input').hide();
})*/
function formatNewsTime(time){
//     var dateTimeStamp=Date.parse(time.replace(/-/gi,"/"));
     var result = '';
     //JavaScript函数：
     var minute = 1000 * 60;
     var hour = minute * 60;
     var day = hour * 24;
     var halfamonth = day * 15;
     var month = day * 30;
     var now = new Date().getTime();
     var diffValue = now - time*1000;
     if(diffValue < 0){
      //若日期不符则弹出窗口告之
      //alert("结束日期不能小于开始日期！");
      }
     var monthC =diffValue/month;
     var weekC =diffValue/(7*day);
     var dayC =diffValue/day;
     var hourC =diffValue/hour;
     var minC =diffValue/minute;
     if(dayC>=1){
         result=formatDate(time*1000,'yyyy-MM-dd');
      }
      else if(hourC>=1){
         result=parseInt(hourC) +"个小时前";
      }
      else if(minC>=1){
         result= parseInt(minC) +"分钟前";
      }else if(minC<1){
         result="1分钟前";
      }
      return result;
}
/**
 * 
 */

function show_user_industry(data_list){
	var html = ''
	for(var i=0;i<data_list.length;i++){
		var entity = data_list[i]
		var flag = entity.flag
		var css = ''
		if(flag == '1'){ //选中
			css = 'trade_pop_c_ul_on'
		}
		html +='<li class="'+ css +'" lang="'+entity.id+'" style="cursor: pointer;">' +entity.name+'</li>'
   }
	$('#concern_industry').html(html)
	$("#concern_industry li").click(function(){
		$(this).toggleClass('trade_pop_c_ul_on')
	})
}
function save_user_industry(){
	var ids = new Array()
	var names= new Array()
	$('#concern_industry li').each(function(){
		if($(this).hasClass('trade_pop_c_ul_on')){
			var id = $(this).attr('lang')
			var name = $(this).text()
			ids.push(id)
			names.push(name)
		}
	})
	var sss = {"industryNames":names.join(','),
		       "industryIds":ids.join(','),
		       "userId":1}
	sendPostRequestByJsonObj(detail.saveOrUpdateUerIndustry,sss,function(data){
		if(data.success){
			cancle_user_industry()
		}
	})
	
}
function reset_user_industry(){
	show_user_industry(default_user_industry)
}
function cancle_user_industry(){
	$("#trade_pop").hide();
}
function select_all(){
	$("#concern_industry li").addClass('trade_pop_c_ul_on')
}
function unselect_all(){
	$("#concern_industry li").removeClass('trade_pop_c_ul_on')
}
//获得用户的收藏codeList
var codeList;
function getCodeList (type){
    var codeList;
    if(userCode){
        sendGetRequest(user.getCodeList+"/"+userCode+"/"+type,function(data){
            codeList = data.data;
        })
      return codeList;
    }
}

//判断是否包含收藏
function isCollection(type,code){
    var codeList = getCodeList(type);
    if(codeList && codeList.indexOf(code+"")>=0){
        return true;
    }else{
        return false;
    }
}
/**
 * 
 */
var default_user_industry = ''
function getParentIndustrys(){
	sendPostRequestByJsonStr(detail.getParentIndustrys,null,function(data){
		if(data.success){
			var data_list = data.data
			default_user_industry = data.data
			show_user_industry(data_list)
		}
	})
}
function show_user_industry(data_list){
	var html = ''
	for(var i=0;i<data_list.length;i++){
		var entity = data_list[i]
		var flag = entity.flag
		var css = ''
		if(flag == '1'){ //选中
			css = 'trade_pop_c_ul_on'
		}
		html +='<li class="'+ css +'" lang="'+entity.id+'" style="cursor: pointer;">' +entity.name+'</li>'
   }
	$('#concern_industry').html(html)
	$("#concern_industry li").click(function(){
		$(this).toggleClass('trade_pop_c_ul_on')
	})
}

function reset_user_industry(){
	show_user_industry(default_user_industry)
}
function cancle_user_industry(){
	$("#trade_pop").hide();
}
function select_all(){
	$("#concern_industry li").addClass('trade_pop_c_ul_on')
}
function unselect_all(){
	$("#concern_industry li").removeClass('trade_pop_c_ul_on')
}
//头部统计数字
sendPostRequest(platformUrl.queryIndexHeaderStat,function(data){
    $(".total-project").text(data.data.projectNum)
    $(".total-org").text(data.data.orgNum)
    $(".total-investevent").text(data.data.eventNum)
    $(".total-startup").text(data.data.startUpNum)
    $(".total-investor").text(data.data.investorNum)
})
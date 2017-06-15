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
        return "-"
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
                  return qs[i].substring(qs[i].indexOf("=") + 1);
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

$(function(){
	function setName(data){
	    if(!data&&data.length < 100){
	         location.href = home.index
	    }else{
	        var obj = JSON.parse(data)
            var name = obj['realName']
            $("#id_name").html("你好，"+name)
	    }

	}

    function me(){
        $.ajax({
            url : platformUrl.me,
            type : "GET",
            cache : false,
            contentType : "application/json; charset=UTF-8",
            async : false,
            error : function(request) {
                location.href = home.index
            },
            success : function(data) {
                setName(decodeURIComponent(data))
            }
        });
    }
     me()
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

 $("#globalsearch_index").on("click",function(){
           var value = $("input[data-search='globalsearch_index']").val()
           if(value.trim() != ""){
              sendPostRequestByJsonObj(searchUrl.globalSearch,
                                       {"keyword":value},
                                       function(data){
                                           if(data.data.totalhit == 0){
                                               location.href = "noresult.html";
                                           }else{
                                                 location.href = "search_index.html?keyword="+value
                                           }
                                       })
           }

 })

 $("input[data-search='globalsearch_index']").bind('keypress',function(event){
          var value =  $("input[data-search='globalsearch_index']").val()
               if(value.trim() != "") {
                 if(event.keyCode == '13'){
                     sendPostRequestByJsonObj(searchUrl.globalSearch,
                                              {"keyword":value},
                                              function(data){
                                                   if(data.data.totalhit == 0){
                                                       location.href = "noresult.html";
                                                   }else{
                                                         location.href = "search_index.html?keyword="+value
                                                   }
                                              })
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
	 $('.nav_two [page_tab='+second_level+']').addClass("nav_on");	 
	 if(three_level !=''){
		 $('.column_ul [page_tab='+three_level+']').addClass("nav_on");
	 }
	 if(four_level !=''){
		 $('.project_nav [page_tab='+four_level+']').addClass("nav_on");
	 }
 }
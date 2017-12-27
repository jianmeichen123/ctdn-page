//快速下拉菜单
var html = '<li><a href="person_center_myproject.html">我的项目</a></li>';
if(getCookie("roleCode") && getCookie("roleCode") !="20000"){
   html+=('<li><a href="concern_industry.html">关注行业</a></li>')
}
html+= '<li><a href="person_center_fonder.html">收藏夹</a></li>';
if(getCookie("s_") && getCookie("s_") =="external"){
	html+= '<li><a href="person_resetpassword.html">修改密码</a></li>';
}
$("#personmenu").html(html)
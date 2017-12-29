//左侧菜单
var personmenu = '<a href="person_center_myproject.html"><li><span class="first"></span>我的项目</li></a>';
if(getCookie("roleCode") && getCookie("roleCode") !="20000"){
   personmenu+=('<a href="concern_industry.html"><li><span class="second"></span>关注行业</li></a>')
}
personmenu+= '<a href="person_center_fonder.html"><li><span class="third"></span>收藏夹</li></a>';
if(getCookie("s_") && getCookie("s_") =="external"){
	personmenu+= '<a href="person_resetpassword.html"><li><span class="fourth"></span>修改密码</li></a>';
}
$("#personmenu").html(personmenu)
/**
 * 
 */
function func_blur(obj){
	var _this = $(obj);
	var val= $(obj).val()
	if(_this.hasClass('valid')){
		_this.removeClass('inputDanger');
		_this.removeClass('invalid');
	}
	if(val == null || val.trim().length==0){
		_this.addClass('inputDanger');
		_this.addClass('invalid');
	}
}
function func_focus(obj){
	var _this = $(obj);
	var id = _this.attr('id');
	$("#"+id + "_tip").css('display','none')
	_this.removeClass('inputDanger');
	_this.removeClass('invalid');
}
var exists_flag = false

//$('#mobile').blur(function(){
//	var _this = $(this);
//	var val= $(this).val()
//	if(_this.hasClass('valid')){
//		_this.removeClass('inputDanger');
//		_this.removeClass('invalid');
//	}
//	if(val == null || val.trim().length==0){
//		_this.addClass('inputDanger');
//		_this.addClass('invalid');
//	}
//});
//$('#mobile').focus(function(){
//	var _this = $(this);
//	$("#mobile_tip").attr('style','none')
//	_this.removeClass('inputDanger');
//	_this.removeClass('invalid');
//});
//
//
//$('#code').blur(function(){
//	var _this = $(this);
//	var val= $(this).val()
//	if(_this.hasClass('valid')){
//		_this.removeClass('inputDanger');
//		_this.removeClass('invalid');
//	}
//	if(val == null || val.trim().length==0){
//		_this.addClass('inputDanger');
//		_this.addClass('invalid');
//	}
//});
//$('#code').focus(function(){
//	var _this = $(this);
//	$("#code_tip").attr('style','none')
//	_this.removeClass('inputDanger');
//	_this.removeClass('invalid');
//});


//
//$("input[name='mobile']").change(function(){
//		var val = $(this).val();
//		if(val == "")
//		{
//			$('#password_tip').css('display','block').html("请输入登录手机号");
//			return;
//		}
//		if(!/^1[0-9]{10}$/.test(val))
//		{
//			$('#password_tip').css('display','inline').html("您输入的手机号格式不正确~");
//			return;
//		}
//		var url = detail.checkUserExists;
//		var data = {mobile:val};
//		var callback = function(data){
//			if(data.success=='OK')
//			{
//				if(data.data.exists == true)
//				{
//					exists = true
//					console.log('<span class="xh_y m_l_10 error">该手机号码已被注册</span>');
//				}
//			}
//		};
//		sendPostRequestByJsonObj(url,data,callback);
//	});
////发送验证码
//$("#send-code-btn").click(function(){
//	if($(this).hasClass('disabled'))
//	{
//		return;
//	}
//	
//	var phoneNum = $("input[name='mobile']");
//	$('#mobile_tip').css('display','none');
//	if(phoneNum.val() == null || phoneNum.val().length!=11)
//	{
//		$('#password_tip').css('display','inline').html("您输入的手机号格式不正确~");
//		return;
//	}
//	if(!codeMatch())
//	{
//		return;
//	}
//	createCode();
//	
//	clearInterval(timer);
//	count=60;
//	$btn = $(this);
//	$(this).addClass('disabled')
//	var url = orderUrl.smsCode2Phone;
//	var data = {phoneNumber:phoneNum.val()};
//	var success = function(data){
//		if(data.result.status=='OK')
//		{
//			if(data.userData.smscode)
//			{
//				alert(data.userData.smscode);
//			}
//			timer = setInterval("countDown()",1000);
//		}
//		else
//		{
//			if(data.result.status="ERROR")
//			{
//				layer.msg(data.result.message);
//			}
//			else
//			{
//				layer.msg("获取验证码失败。");
//			}
//		}
//	};
//	$.ajaxGet(url,data,success);
//	
//});
function register(){
	$('.login-tips').css('display','none')
	$('input').removeClass('inputDanger');
	$('input').removeClass('invalid');
	var mobile = $("#mobile").val();
	if(mobile== null || mobile.trim().length==0)
	{
		$("#mobile").addClass('inputDanger');
		$("#mobile").addClass('invalid');
		$('#mobile_tip').css('display','block').html('请输入登录手机号');
		return;
	}
	if(!/^1[0-9]{10}$/.test(mobile)){
		$("#mobile").addClass('inputDanger');
		$("#mobile").addClass('invalid');
		$('#mobile_tip').css('display','block').html('您输入的手机号格式不正确~');
		layer.msg('您输入的手机号格式不正确~')
		return
	}
    sendPostRequestByJsonObj(platformUrl.checkUserExists,{"mobile":mobile},function(data){
    	if(data.result.status == 'OK'){
    		exists_flag= data.entity.exists
    	}else{
    		layer.msg(data.result.message)
    	}
    });
    if(exists_flag){
    	$("#mobile").addClass('inputDanger');
    	$("#mobile").addClass('invalid');
    	layer.msg('您输入的手机号已被注册~')
    	return
    }
	var code = $('#code').val()
	if(!code){
		$("#code").addClass('inputDanger');
		$("#code").addClass('invalid');
		$('#code_tip').css('display','block').html('请输入验证码');
		return
	}
    sendPostRequestByJsonObj(platformUrl.checkCode,{"mobile":mobile,"code":code,"type":"3"},function(data){
    	if(data.result.status == 'OK'){
    		exists_flag= true
    	}else{
    		exists_flag = false
    		layer.msg(data.result.message)
    	}
    });
    if(!exists_flag){
    	$("#code").addClass('inputDanger');
		$("#code").addClass('invalid');
		layer.msg('验证码错误~')
		return
    }
	var password = $('#password').val()
	var confirmPassword = $('#confirmPassword').val()
	if(password==null || password.trim().length==0){
		$("#password").addClass('inputDanger');
		$("#password").addClass('invalid');
		$('#password_tip').css('display','block').html('请输入登录密码');
		return
	}
	if(!/^[0-9a-zA-Z]{6,14}$/.test(password)){
		$("#password").addClass('inputDanger');
		$("#password").addClass('invalid');
		$('#password_tip').css('display','block').html('请输入6-14位的数字或字母作为密码~');
		layer.msg('请输入6-14位的数字或字母作为密码~')
		return 
	}
	if(confirmPassword==null || confirmPassword.trim().length==0){
		$("#confirmPassword").addClass('inputDanger');
		$("#confirmPassword").addClass('invalid');
		$('#confirmPassword_tip').css('display','block');
		return
	}
	if(password != confirmPassword){
		$("#confirmPassword").addClass('inputDanger');
		$("#confirmPassword").addClass('invalid');
		$("#password").addClass('inputDanger');
		$("#password").addClass('invalid');
		layer.msg('两次密码输入不一致~')
		return
	}
	var callback = function(data){
		if(data.result.status == 'OK'){
			layer.msg('注册成功',{time:2000})
			window.location.href= platformUrl.toLogin
		}else{
			var code = data.result.errorCode
			if(code !=null && code.trim().length!=0){
				if(code == '1'){
					$("#mobile").addClass('inputDanger');
					$("#mobile").addClass('invalid');
				}
				if(code == '2'){
					$("#code").addClass('inputDanger');
					$("#code").addClass('invalid');
				}
			}
		    layer.msg(data.result.message)
		}
	}
	var data = {
			mobile:mobile,
			password:password,
			confirmPassword:confirmPassword,
			code:code
	}
	sendPostRequestByJsonObj(platformUrl.register,data,callback);
}

var timer;
var count;
var $btn;
function send_code(e,type){
	$("input").removeClass('inputDanger');
	$("input").removeClass('invalid');
	$('.login-tips').css('display','none')
	var val = $('#mobile').val()
	if(val == null || val.trim().length == 0)
	{
		$("#mobile").addClass('inputDanger');
		$("#mobile").addClass('invalid');
		$("#mobile_tip").css('display','block');
		return;
	}
	if(!/^1[0-9]{10}$/.test(val))
	{
		$("#mobile").addClass('inputDanger');
		$("#mobile").addClass('invalid');
		layer.msg('您输入的手机号格式不正确~')
		return;
	}
	if(count<=0)
	{	
		$(e).attr('onclick','send_code(this,3)')
		$(e).text("重新获取");
        clearInterval(timer);
	}else{
		clearInterval(timer);
		$btn = $(e);
		var jsonData = {"mobile" : val,"type":type}
		var success=function(data){
			if(data.result.status=="OK"){
				$('#code').removeClass('inputDanger');
				$('#code').removeClass('invalid');
				count=60
				e.removeAttribute('onclick','')
				timer = setInterval("countDown()",1000);
			}else{
				var code =data.result.errorCode
				if(code !=null && code.trim().length!=0 && code == '1'){
					$("#mobile").addClass('inputDanger');
					$("#mobile").addClass('invalid');
				}
				layer.msg(data.result.message)
			}
		}
		sendPostRequestByJsonObj(platformUrl.sendCode,jsonData,success);
	}
}
function countDown()
{
	count--;
	$btn.html("验证码已发送"+"<p>"+count+'s'+"</p>");
	$btn.addClass('send-code');
//	$btn.addClass('disabled_btn')
	if(count<=0)
	{
		count=60
		$btn.removeClass('send-code');
		$btn.attr('onclick','send_code(this,3)')
		$btn.text("发送验证码");
        clearInterval(timer);
	}
}
function login_page(){
	location.href = platformUrl.toLogin
}
function register_page(){
	location.href= platformUrl.toRegister
}
function find_password_page(){
	location.href=platformUrl.forgetPassword
}
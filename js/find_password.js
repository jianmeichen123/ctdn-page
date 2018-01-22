/**
 * 
 */
var timer;
var count;
var $btn;

function countDown()
{
	count--;
	$btn.html("验证码已发送"+"<p>"+count+'s'+"</p>");
	$btn.addClass('send-code');
//	$btn.addClass('disabled_btn')
	if(count<=0)
	{
		$btn.attr('onclick','send_code(this,2)')
		$btn.text("发送验证码");
		$btn.removeClass('send-code');
        clearInterval(timer);
        count = 60
	}
}

function send_code(e,type){
	$('.login-tips').css('display','none')
	$('input').removeClass('inputDanger');
	$('input').removeClass('invalid');
	
	var val = $('#mobile').val()
	if(val == null || val.trim().length == 0)
	{
		$("#mobile").addClass('inputDanger');
		$("#mobile").addClass('invalid');
		$('#mobile_tip').css('display','block').html('请输入登录手机号');
		return;
	}
	if(!/^1[0-9]{10}$/.test(val))
	{
		$("#mobile").addClass('inputDanger');
		$("#mobile").addClass('invalid');
		$("#mobile_tip").css('display','block').html('请输入有效手机号码');
		return;
	}
	if(count<=0)
	{	
		$(e).attr('onclick','send_code(this,2)')
		$(e).text("发送验证码");
        clearInterval(timer);
	}else{
		clearInterval(timer);
		$btn = $(e);
		var jsonData = {"mobile" : val,"type":type}
		var success=function(data){
			if(data.result.status=="OK"){
				count=60
				e.removeAttribute('onclick','')
				timer = setInterval("countDown()",1000);
			}else{
				layer.msg(data.result.message)
				$("#mobile").addClass('inputDanger');
				$("#mobile").addClass('invalid');
			}
		}
		sendPostRequestByJsonObj(platformUrl.sendCode,jsonData,success);
	}
}

$("#mobile").change(function(){
	var $this = $(this);
	var val = $(this).val();
	if(val == null || val.trim().length == 0)
	{
		$("#mobile_tip").css('display','inline').html('请输入登录手机号1');
		return;
	}
	if(/^[0-9a-zA-Z]{6-14}$/.test(val))
	{
		$("#mobile_tip").css('display','inline').html('请输入有效手机号码');
		return;
	}
	$("#mobile_tip").css('display','none')
//	var url = orderUrl.checkUserExists;
//	var data = {phoneNumber:val};
//	var callback = function(data){
//		if(data.result.status=='OK')
//		{
//			if(data.userData.exists == true)
//			{
//				$this.parent().append('<span class="xh_y m_l_10 error">该手机号码已被注册</span>');
//			}
//		}
//	};
//	$.ajaxPost(url,JSON.stringify(data),callback);
});
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
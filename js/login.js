var exists_flag = false
function checkform(){
	  var nickName =$("#nickName").val();
	  var password =$("#password").val();
	    if(nickName==""){
	    	$("#nickName").addClass('inputDanger');
	    	$("#nickName").addClass('invalid');
			if($("#nickName").hasClass('valid')){
				$("#nickname").removeClass('inputDanger');
				$("#nickname").removeClass('invalid');
			}
			$("#nickName_tip").css('display','block').html("请输入登录用户名/手机号")
	        return false;
	    }
	  
	    if(password==""){
	    	$("#password").addClass('inputDanger');
	    	$("#password").addClass('invalid');
			if($("#password").hasClass('valid')){
				$("#password").removeClass('inputDanger');
				$("#password").removeClass('invalid');
			}
			$("#password_tip").css('display','block').html("请输入登录密码")
	        return false;
	    }
	    return true;
 }

 function login(){
	$("input").removeClass('inputDanger');
	$("input").removeClass('invalid');
	$('.login-tips').css('display','none')
	var nickName =$("#nickName").val();
	var password =$("#password").val();
	    
    if(nickName==""){
    	$("#nickName").addClass('inputDanger');
    	$("#nickName").addClass('invalid');
		if($("#nickName").hasClass('valid')){
			$("#nickname").removeClass('inputDanger');
			$("#nickname").removeClass('invalid');
		}
		$("#nickName_tip").css('display','block').html("请输入登录用户名/手机号")
        return false;
    }
    if(/^1[0-9]{10}$/.test(nickName)){
    	  sendPostRequestByJsonObj(platformUrl.checkUserExists,{"mobile":nickName},function(data){
  	    	if(data.result.status == 'OK'){
  	    		exists_flag= data.entity.exists
  	    	}else{
  	    		layer.msg(data.result.message)
  	    	}
  	    });
  	    if(!exists_flag){
  	    	$("#nickName").addClass('inputDanger');
  	    	$("#nickName").addClass('invalid');
  	    	layer.msg('您输入的账号不存在~')
  	    	return
  	    }
    	login_password();
    	return
    }else{
        var b = new Base64();
  	  	sendPostRequestByJsonObj(platformUrl.checkInternalUserExists,{"nickName":b.encode($("#nickName").val())},function(data){
	    	if(data.result.status == 'OK'){
	    		var exists = data.entity.status
	    		if(exists == 0){
	    			exists_flag= false //不存在
	    		}else{
	    			exists_flag = true
	    		}
	    	}else{
	    		layer.msg(data.result.message)
	    	}
	    });
  	  	if(!exists_flag){
	    	$("#nickName").addClass('inputDanger');
	    	$("#nickName").addClass('invalid');
	    	layer.msg('您输入的账号不存在~')
	    	return
	    }
    }
    if(password==""){
    	$("#password").addClass('inputDanger');
    	$("#password").addClass('invalid');
		if($("#password").hasClass('valid')){
			$("#password").removeClass('inputDanger');
			$("#password").removeClass('invalid');
		}
		$("#password_tip").css('display','block').html("请输入登录密码")
        return false;
    }
    var b = new Base64();
    var nickName = b.encode($("#nickName").val());
    var password = b.encode($("#password").val());
    var jsonData={"nickName":nickName,"password":password};
    if (!$("#autoLogin").prop('checked')){
        sendPostRequestByJsonObj(platformUrl.login+"?notAuto=true",jsonData,logincallback);
        return
    }
    sendPostRequestByJsonObj(platformUrl.login,jsonData,logincallback);
		 
		 
  }
 
 
 function logincallback(data){
	 if(data.result.status=="OK"){
		 var entity = data.entity
		 if(entity.roleCode == 10000){ //投机经理
			 location.href = htmlPlatformUrl.index_manager
			 return
		 }
		 if(entity.roleCode == 20000){ //高管
			 location.href = htmlPlatformUrl.index_senior
			 return
		 }
		 if(entity.roleCode == 30000){ //高管
			 location.href = htmlPlatformUrl.index_external
			 return
		 }
		 
	 }else{
		 var errorcode = data.result.errorCode
		 if(errorcode ==1){
			 $("#nickName").addClass('inputDanger');
			 $("#nickName").addClass('invalid');
			 $("#password").addClass('inputDanger');
			 $("#password").addClass('invalid');
		 }
		 if(errorcode == 2){
			 $("#nickName").addClass('inputDanger');
			 $("#nickName").addClass('invalid');
		 }
	     layer.msg(data.result.message)
	 }
 }
 function keylogin(){
	 if (event.keyCode == 13)
	  {
	    login();
	  }
 }
 //外部用户密码登录u
function login_password(){
	$("input").removeClass('inputDanger');
	$("input").removeClass('invalid');
	$('.login-tips').css('display','none')
    var nickName = $("#nickName").val();
    var password = $("#password").val();
    if(password == null || $.trim(password).length == 0){
    	$("#password").addClass('inputDanger');
    	$("#password").addClass('invalid');
		if($("#password").hasClass('valid')){
			$("#password").removeClass('inputDanger');
			$("#password").removeClass('invalid');
		}
		$("#password_tip").css('display','block').html("请输入登录密码")
    	return
    }
    var jsonData={"mobile":nickName,"password":password};
    var login_password_callback=function(data){
    	 if(data.result.status=="OK"){
    			 location.href = htmlPlatformUrl.index_external
    	 }else{
    		 var error_code = data.result.errorCode
    		 var errorcode = data.result.errorCode
    		 if(errorcode ==1){
    			 $("#nickName").addClass('inputDanger');
    			 $("#nickName").addClass('invalid');
    			 $("#password").addClass('inputDanger');
    			 $("#password").addClass('invalid');
    		 }
    		 if(errorcode == 2){
    			 $("#nickName").addClass('inputDanger');
    			 $("#nickName").addClass('invalid');
    		 }
    	     layer.msg(data.result.message)
    	 }
    }
    if (!$("#autoLogin").prop('checked')){
        sendPostRequestByJsonObj(platformUrl.loginByPassword+"?notAuto=true",jsonData,login_password_callback);
        return
    }	
    sendPostRequestByJsonObj(platformUrl.loginByPassword,jsonData,login_password_callback);
}
 $('#login_eye').click(function(){
	 $(this).toggleClass('login-eye-abled')
	 if($(this).hasClass('login-eye-abled')){
		 $('#password').attr('type','text')
	 }else{
		 $('#password').attr('type','password')
	 }
 })

//单独进行验证，高亮
//	$('#nickName').blur(function(){
//		var _this = $(this);
//		var val= $(this).val()
//		if(val == null || val.trim().length==0){
//			_this.addClass('inputDanger');
//			_this.addClass('invalid');
//		}
//		if(_this.hasClass('valid')){
//			_this.removeClass('inputDanger');
//			_this.removeClass('invalid');
//		}
//	});
//	$('#nickName').focus(function(){
//		var _this = $(this);
//		$("#nickname_tip").attr('style','none')
//		_this.removeClass('inputDanger');
//		_this.removeClass('invalid');
//	});
//	$('#password').blur(function(){
//		var _this = $(this);
//		var val= $(this).val()
//		if(val == null || val.trim().length==0){
//			_this.addClass('inputDanger');
//			_this.addClass('invalid');
//		}
//		if(_this.hasClass('valid')){
//			_this.removeClass('inputDanger');
//			_this.removeClass('invalid');
//		}
//	});
//	$('#password').focus(function(){
//		var _this = $(this);
//		$("#password_tip").attr('style','none')
//		_this.removeClass('inputDanger');
//		_this.removeClass('invalid');
//	});
//	var timer;
//	var count;
//	var $btn;
//	function countDown()
//	{
//		count--;
//		console.log(count);
//		$btn.text(count+"s");
//		if(count<=0)
//		{
//			$btn.removeClass("disabled");
//			$btn.text("重新获取");
//	        clearInterval(timer);
//		}
//	}
//	$("#login_code").click(function(){
//		clearInterval(timer);
//		$btn = $(this);
//		count=60
//		$(this).addClass('disabled')
//		timer = setInterval("countDown()",1000);
//	})
	function login_bycode(){
		$("input").removeClass('inputDanger');
		$("input").removeClass('invalid');
		$('.login-tips').css('display','none')
		var mobile =$('#mobile').val()
		if(mobile == null  || $.trim(mobile).length==0){
			$('#mobile').addClass('inputDanger');
			$('#mobile').addClass('invalid');
			if($('#mobile').hasClass('valid')){
				$('#mobile').removeClass('inputDanger');
				$('#mobile').removeClass('invalid');
			}
			$("#mobile_tip").css('display','block').html("请输入登录手机号")
			return;
		}
		if(!/^1[0-9]{10}$/.test(mobile)){
			$("#mobile").addClass('inputDanger');
			$("#mobile").addClass('invalid');
			$('#mobile_tip').css('display','block').html('您输入的手机号格式不正确~');
			layer.msg('您输入的手机号格式不正确~')
			return
		}
		var code = $('#code').val()
		if(code == null || $.trim(code).length == 0){
			$("#code").addClass('inputDanger');
			$("#code").addClass('invalid');
			$('#code_tip').css('display','block').html('请输入验证码');
			return
		}
		var jsonData = {"mobile" : mobile,"code":code}
		sendPostRequestByJsonObj(platformUrl.loginByCode,jsonData,loginByCodecallback);
	}
	function loginByCodecallback(data){
		if(data.result.status=="OK"){
				location.href = htmlPlatformUrl.index_external
		 }else{
			 var errorCode = data.result.errorCode
			 if(errorCode == '1'){
				 $("#code").addClass('inputDanger');
				 $("#code").addClass('invalid');
				 $('#code_tip').css('display','block').html('验证码错误');
			 }
		     layer.msg(data.result.message)
		 }
	}
	var timer;
	var count=60;
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
			$("#mobile_tip").css('display','block').html('请输入登录手机号');
			return;
		}
		if(!/^1[0-9]{10}$/.test(val)){
			$("#mobile").addClass('inputDanger');
			$("#mobile").addClass('invalid');
			$('#mobile_tip').css('display','block').html('您输入的手机号格式不正确~');
			layer.msg('您输入的手机号格式不正确~')
			return
		}
		if(count<=0)
		{	
			$(e).attr('onclick','send_code(this,1)')
			$(e).text("发送验证码");
	        clearInterval(timer);
		}else{
			clearInterval(timer);
			$btn = $(e);
			var jsonData = {"mobile" : val,"type":type}
			var success=function(data){
				if(data.result.status=="OK"){
					count=60
					e.removeAttribute('onclick','');
					
					timer = setInterval("countDown()",1000);
				}else{
					layer.msg(data.result.message)
				}
			}
			sendPostRequestByJsonObj(platformUrl.sendCode,jsonData,success);
		}
	}
	function countDown()
	{
		count--;
		console.log(count);
		var html = "验证码已发送"+"<p>"+count+'s'+"</p>"
        $btn.html(html);
		$btn.addClass('send-code');
		if(count<=0)
		{
			$btn.removeClass('send-code');
			count=60
			$btn.attr('onclick','send_code(this,1)')
			$btn.text("发送验证码");
	        clearInterval(timer);
		}
	}
	
	$("#mobile").change(function(){
		var $this = $(this);
		var val = $(this).val();
		if(val == null || val.trim().length == 0)
		{
			$("#mobile_tip").css('display','inline').html('请输入登录手机号');
			return;
		}
		if(!/^1[0-9]{10}$/.test(val))
		{
			$("#mobile_tip").css('display','block').html('请输入有效手机号码');
			return;
		}
		$("#mobile_tip").css('display','none')
	})
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

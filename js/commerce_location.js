commerce_location()
$(window).scroll(function(){
	commerce_location()
});
function commerce_location(){
	var trade_top = $('.trade_tit_bg').offset().top;
	var scrollTop=$(window).scrollTop();
	if(scrollTop>trade_top){
		$('.trade_tit_bg').addClass('trade_tit_bg_fixed');
		$('.trade_tit_bg_show').show();
	}else{
		$(".trade_tit_bg").removeClass("trade_tit_bg_fixed");
		$('.trade_tit_bg_show').hide();
	}
	var location_array = new Array()
	for(var i=0; i<$('.trade_tit_bg .trade_tit_click').length; i++){
		var list_all = $('.trade_tit_bg .trade_tit_click').eq(i).attr('location_t');
		location_array.push(list_all);
	}
	var  myArray=new Array();
	for(var i=0; i<location_array.length; i++){
		var obj = {};
		var name = location_array[i];
		obj.name = name;
		obj.value= parseInt($('[location_o="'+location_array[i]+'"]').offset().top -130);
		myArray.push(obj);
	}
	if(scrollTop>=myArray[0].value){
		$('.trade_tit_bg').addClass('trade_tit_bg_fixed');
		 location_on(myArray,scrollTop)
	}else{
		$('.trade_tit_bg').removeClass('trade_tit_bg_fixed');
	}
}
function location_on(obj,scrollTop){
	for(var i=0; i<obj.length; i++){
		var j =i+1;
		if(j==obj.length){
			if(scrollTop >=obj[i].value){
				$('.trade_tit_bg .trade_tit_click').removeClass('trade_title_on');
				$('[location_t="'+obj[i].name+'"]').addClass('trade_title_on');
			}
		}else{
			if(scrollTop >=obj[i].value && scrollTop<obj[j].value){
				$('.trade_tit_bg .trade_tit_click').removeClass('trade_title_on');
				$('[location_t="'+obj[i].name+'"]').addClass('trade_title_on');
			}
		}

	}
}
$('body').delegate('.trade_tit_bg .trade_tit_click','click',function(event){
	var _this=$(this);
	event.stopPropagation();
	var location_r = $(this).attr('location_t');
	var location_value = parseInt($('[location_o="'+location_r+'"]').offset().top-50);
	$("html,body").animate({scrollTop:location_value},300);
	/*setTimeout(function(){
		_this.addClass("trade_title_on").siblings().removeClass("trade_title_on")
	},300)*/
})
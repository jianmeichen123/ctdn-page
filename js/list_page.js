var data={

}
/**
根据数据循环出说有的分类 分别放入到3个ul里面 隐藏二级 三级行业

*/

sendGetRequest("http://10.9.130.143/common/comQuery.json",function(cData){
    data = cData
})
console.log(data)
var d_list = data.data.industry;
var one_li = ''
var two_ul = ''
var three_ul = ''
for(var i=0; i<d_list.length; i++){
	one_li +='<li data-val="'+d_list[i].id +' " class="one_'+i+' industry_'+i+'" industry="1" data_name="name_'+i+'" data_i="'+i+'" >'+d_list[i].name+'</li>';
	var child_two = d_list[i].children;
	
	//所有的二级行业
	for(var j=0; j<child_two.length; j++){
		two_ul +='<li data-val="'+child_two[j].id +' " class="two_'+i+' name_'+i+' none industry_'+i+j+'" data_name="name_'+i+j+'" industry="2" data_i="'+i+'" data_j="'+j+'">'+child_two[j].name+'</li>';
/*		var child_three = child_two[j].child;

		//所有的三级行业
		for(var k=0; k<child_three.length; k++){
			three_ul +='<li class="three_'+i+' self_'+i+j+k+' name_'+i+j+' none industry_'+i+j+'" data_name="name_'+i+j+'" industry="3" data_i="'+i+'" data_j="'+j+'" data_k="'+k+'">'+child_three[k].title+'</li>';
		}*/
	}

}
$('#one_industry').html(one_li);
$('#two_industry').html(two_ul);
$('#three_industry').html(three_ul);
//给一级行业绑定鼠标移入事件
$('body').delegate('#one_industry li','mouseover',function(){
	var data_name = $(this).attr('data_name');
	//console.log(class_a)
	$('#two_industry li').hide();
	$('#three_industry li').hide();
	$('#two_industry .'+data_name+'').show();
});
//给二级行业绑定鼠标移入事件
$('body').delegate('#two_industry li','mouseover',function(){
	var data_name = $(this).attr('data_name');
	//console.log(class_a)
	//$('#two_industry li').hide();
	$('#three_industry li').hide();
	$('#three_industry .'+data_name+'').show();
});
//给行业绑点击事件显示选中的行业
$('body').delegate('.industry_list ul li','click',function(){
	var data_name = $(this).attr('data_name');
	var i = $(this).attr('data_i');
	var j = $(this).attr('data_j');
	var k = $(this).attr('data_k')
	var click_name = $(this).text();
	
	/***
		判断选择的是第几行业   根据行业取消和选中   
		*/
	var industry = $(this).attr('industry');
	if(industry == 1){
		$('#click_list .one_'+i+'').remove()
		$('#click_list .two_'+i+'').remove()
		$('#click_list .three_'+i+'').remove()
		if($(this).hasClass('click_class')){			
			$(this).removeClass('click_class');
		}else{
			$('.two_'+i+'').removeClass('click_class');
			$('.three_'+i+'').removeClass('click_class');
			$(this).addClass('click_class');
			$('#click_list').append('<li class="pick_on one_'+i+'" industry="1" clock_name = "one_'+i+'">'+click_name+'<span class="brain_ico brain_ico_close"></span></li>');
		}
		
	}else if(industry == 2){
		$('#click_list .one_'+i+'').remove()
		$('#click_list .industry_'+i+j+'').remove()
		if($(this).hasClass('click_class')){
			$(this).removeClass('click_class');
		}else{
			$('#one_industry .industry_'+i+'').removeClass('click_class');
			$('#three_industry .industry_'+i+j+'').removeClass('click_class');
			$(this).addClass('click_class');
			$('#click_list').append('<li class="pick_on industry_'+i+j+' two_'+i+'" industry="2" clock_name = "industry_'+i+j+'">'+click_name+'<span class="brain_ico brain_ico_close"></span></li>');
		}
	}else{
		$('#click_list .one_'+i+'').remove()
		$('#click_list .two_'+i+'').remove()
		if($(this).hasClass('click_class')){
			$(this).removeClass('click_class');
			$('#click_list .self_'+i+j+k+'').remove()
		}else{
			$('#one_industry .industry_'+i+'').removeClass('click_class');
			$('#two_industry .industry_'+i+j+'').removeClass('click_class');
			$(this).addClass('click_class');
			$('#click_list').append('<li class="pick_on industry_'+i+j+' self_'+i+j+k+' three_'+i+'" industry="3" clock_name = "self_'+i+j+k+'">'+click_name+'<span class="brain_ico brain_ico_close"></span></li>');
		}
	}
		
	
});

//选择行业删除
$('body').delegate('#click_list li .brain_ico_close','click',function(){
	var industry = $(this).parent().attr('industry');
	var clock_name = $(this).parent().attr('clock_name');
	$(this).parent().remove();
	if(industry == 1){
		$('#one_industry .'+clock_name+'').removeClass('click_class');
	}else if(industry == 2){
		$('#two_industry .'+clock_name+'').removeClass('click_class');
	
	}else{
		$('.'+clock_name+'').removeClass('click_class');
	}
})
//点击选择行业
/*$('.click_industry_show').delegate('.click_industry_show','mouseenter',function(){
	$('.industry_list').show();
}).mouseleave(function(){
    $('.industry_list').hide();
});
$('.industry_list').delegate('.industry_list','mouseenter',function(){
	$('.industry_list').show();
}).mouseleave(function(){
    $('.industry_list').hide();
});*/
$(".click_industry_show").mouseenter(function(){
	$('.industry_list').show();
});
$(".click_industry_show").mouseleave(function(){
	$('.industry_list').hide();
});

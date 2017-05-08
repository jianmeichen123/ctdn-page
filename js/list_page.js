var data={

}
/**
根据数据循环出说有的分类 分别放入到3个ul里面 隐藏二级 三级行业

*/

sendGetRequest("http://10.9.130.143:8081/api/common/allQuery",function(cData){
    data = cData
})
var d_list = data.data.industry;
var one_li = ''
var two_ul = ''
var three_ul = ''
for(var i=0; i<d_list.length; i++){
	one_li +='<li data-val="'+d_list[i].id +' " class="one_'+i+' industry_'+i+'" industry="1" data_name="name_'+i+'" data_i="'+i+'" >'+d_list[i].name+'</li>';
	var child_two = d_list[i].children;
	
    if(child_two){
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
	var k = $(this).attr('data_k');
	var id =$(this).attr('data-val');
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
			$('#click_list').append('<li class="pick_on one_'+i+'" data-id="'+id+'" industry="1" clock_name = "one_'+i+'">'+click_name+'<span class="brain_ico brain_ico_close"></span></li>');
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
			$('#click_list').append('<li class="pick_on industry_'+i+j+' two_'+i+'" data-id="'+id+'" industry="2" clock_name = "industry_'+i+j+'">'+click_name+'<span class="brain_ico brain_ico_close"></span></li>');
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
			$('#click_list').append('<li class="pick_on industry_'+i+j+' data-id="'+id+'" self_'+i+j+k+' three_'+i+'" industry="3" clock_name = "self_'+i+j+k+'">'+click_name+'<span class="brain_ico brain_ico_close"></span></li>');
		}
	}
	$('#industry_one').removeClass('pick_on');
	_query();
	
});

//选择行业删除
$('body').delegate('#click_list li .brain_ico_close','click',function(){
	var industry = $(this).parent().attr('industry');
	var clock_name = $(this).parent().attr('clock_name');
	var pick_on_length = $('#click_list li').length;
	$(this).parent().remove();
	if(pick_on_length == 1){
		if(industry == 1){
			$('#one_industry .'+clock_name+'').removeClass('click_class');
		}else if(industry == 2){
			$('#two_industry .'+clock_name+'').removeClass('click_class');
		
		}else{
			$('.'+clock_name+'').removeClass('click_class');
		}
		$('#industry_one').addClass('pick_on');
	}else{
		if(industry == 1){
			$('#one_industry .'+clock_name+'').removeClass('click_class');
		}else if(industry == 2){
			$('#two_industry .'+clock_name+'').removeClass('click_class');
		
		}else{
			$('.'+clock_name+'').removeClass('click_class');
		}
	}
	_query();
	
})
//所属行业  选择全部
$('body').delegate('#industry_one','click', function(event){
	event.stopPropagation();
	$('#click_list').html('');
	$(this).addClass('pick_on');
	$('#one_industry li').removeClass('click_class');
	$('#two_industry li').removeClass('click_class');
	$('#three_industry li').removeClass('click_class');
	_query();
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
//普通展示
$("ul[data-query]").each(function(i,e){
    var o  = $(e)
    var arr = o.attr("data-query")
    var name = arr.split(":")[0]
    var type = arr.split(":")[1]
    if (type == "normal"){
        $(data["data"][name]).each(function(i,e){
            o.append('<li  data-id="'+e.id+'">'+e.name+'<span class="brain_ico brain_ico_bj"></span></li>')

        })
    }
});


//公用选择事件、不包含所属行业
$('body').delegate('.block .condition_all_ul li','click', function(event){
	event.stopPropagation();	
	var click_this =$(this).index();
	if(click_this == 0){
		$(this).parent().children('li').removeClass('pick_on');
		$(this).parent().children('li').first().addClass('pick_on');
	}else{
		$(this).parent().children('li').first().removeClass('pick_on');
		$(this).addClass('pick_on');
		_query();
	}	
})
//公用点击删除
$('body').delegate('.block .condition_all_ul li .brain_ico_bj','click', function(event){	
	event.stopPropagation(); 
	$(this).parent().removeClass('pick_on');
	var pick_on_length = $(this).parent().parent().children('.pick_on').length;
	if(pick_on_length == 0){
		$(this).parent().parent().children('li').first().addClass('pick_on');
	}
	_query();
})

//地区选择
var global_all = '<li class="pick_on">全部</li>';
var global_list = '';
if($("#global_all").attr('data-query') =="listingTypeIds:nor"){
	
	var list = data.data.listingType;
	for(var i = 0; i< list.length; i++){
	    global_all +='<li global-id="'+list[i].id+'" data-id="'+list[i].id+'" class="global_mousemove ">'+list[i].name+'<span class="brain_ico brain_ico_bj"></span></li>';
	   if(i ==1){
		   	global_list +='<div class="block_list" global-list="'+list[i].id+'">';		   	
		    global_list +='<ul class="condition_all_ul">';
		    global_list +='<span class="classify">投资时间</span>';
		    global_list +='<li class="pick_on" global-id="'+list[i].id+'">全部</li>';
		    for(var j = 0; j< list[i].children.length; j++){
		    	global_list +='<li global-id="'+list[i].id+'" data-id="'+list[i].children[j].id+'">'+list[i].children[j].name+'<span class="brain_ico brain_ico_bj"></span></li>';
		    }
	   }else{
		   	global_list +='<div class="block_list" global-list="'+list[i].id+'">';
		    global_list +='<ul class="condition_all_ul">';
		    global_list +='<li class="pick_on" global-id="'+list[i].id+'">全部</li>';
		    for(var j = 0; j< list[i].children.length; j++){
		    	global_list +='<li global-id="'+list[i].id+'" data-id="'+list[i].children[j].id+'">'+list[i].children[j].name+'<span class="brain_ico brain_ico_bj"></span></li>';
		    }
	   }
	   
	    global_list +='</ul>';
	    global_list +='</div>';
	}
}else{
	var list = data.data.district;
	for(var i = 0; i< list.length; i++){
	    global_all +='<li global-id="'+list[i].id+'" data-id="'+list[i].id+'" class="global_mousemove ">'+list[i].name+'<span class="brain_ico brain_ico_bj"></span></li>';
	    global_list +='<div class="block_list" global-list="'+list[i].id+'">';
	    global_list +='<ul class="condition_all_ul">';
	    global_list +='<li class="pick_on" global-id="'+list[i].id+'">全部</li>';
	    for(var j = 0; j< list[i].children.length; j++){
	    	global_list +='<li global-id="'+list[i].id+'" data-id="'+list[i].children[j].id+'">'+list[i].children[j].name+'<span class="brain_ico brain_ico_bj"></span></li>';
	    }
	    global_list +='</ul>';
	    global_list +='</div>';
	}
}

$('#global_all').html(global_all);
$('#global_list').html(global_list)

//类型事件点击事件
$('body').delegate('[data-query="listingTypeIds:nor"] li','click', function(event){	
	event.stopPropagation(); 
	var click_this =$(this).index();
	var click_id = $(this).attr('global-id')
	$("[global-id='"+click_id+"']").removeClass('pick_on');
	$("[global-list='"+click_id+"'] li").first().addClass('pick_on');
	console.log(click_id)
	//$('[global-id="'+click_id+'"]').removeClass('pick_on');
	if(click_this == 0){
		$('#global_all li').removeClass('pick_on');
		$(".block_list .condition_all_ul li").removeClass('pick_on');
		$(".block_list .condition_all_ul").each(function(i){
			$(this).children('li').first().addClass('pick_on');
		});
		$(this).addClass('pick_on');
		$(".block_list").hide();
	}else{
		$('[data-query="listingTypeIds:nor"] li').removeClass('pick_on');
		$(this).addClass('pick_on');
	}
	_query();
})


//国内切换点击事件
$('body').delegate('#global_all li','click', function(event){	
	event.stopPropagation(); 
	var click_this =$(this).index();
	var click_id = $(this).attr('global-id')
	$("[global-id='"+click_id+"']").removeClass('pick_on');
	$(this).addClass('pick_on');
	$("[global-list='"+click_id+"'] li").first().addClass('pick_on');
	console.log(click_id)
	//$('[global-id="'+click_id+'"]').removeClass('pick_on');
	if(click_this == 0){
		$('#global_all li').removeClass('pick_on');
		$(".block_list .condition_all_ul li").removeClass('pick_on');
		$(".block_list .condition_all_ul").each(function(i){
			$(this).children('li').first().addClass('pick_on');
		});
		$(this).addClass('pick_on');
		$(".block_list").hide();
	}else{
		$("#global_all li").first().removeClass('pick_on');
	}
	_query();
})
//地区选择list事件
$('body').delegate('.block_list .condition_all_ul li','click', function(event){
	event.stopPropagation();	
	var click_this =$(this).index();
	var global_id = $(this).attr('global-id');
	$("#global_all [global-id='"+global_id+"']").removeClass('pick_on');
	if(click_this == 0){
		$(this).parent().children('li').removeClass('pick_on');
		$(this).parent().children('li').first().addClass('pick_on');
	}else{
		$(this).parent().children('li').first().removeClass('pick_on');
		$(this).addClass('pick_on');
		$('#global_all').children('li').first().removeClass('pick_on');
		
	}
	_query();
})
//地区选择list删除
$('body').delegate('.block_list .condition_all_ul li .brain_ico_bj','click', function(event){	
	event.stopPropagation(); 
	$(this).parent().removeClass('pick_on');
	var pick_on_length = $(this).parent().parent().children('.pick_on').length;
	if(pick_on_length == 0){
		$(this).parent().parent().children('li').first().addClass('pick_on');
	}
	_query();
})
//地区选择list删除
$('body').delegate('.block_list .condition_all_ul li .brain_ico_bj','click', function(event){	
	event.stopPropagation(); 
	$(this).parent().removeClass('pick_on');
	var pick_on_length = $(this).parent().parent().children('.pick_on').length;
	if(pick_on_length == 0){
		$(this).parent().parent().children('li').first().addClass('pick_on');
	}
	_query();
})
//global_all删除
$('body').delegate('#global_all li .brain_ico_bj','click', function(event){	
	event.stopPropagation(); 
	$(this).parent().removeClass('pick_on');
	var pick_on_length = $(this).parent().parent().children('.pick_on').length;
	if(pick_on_length == 0){
		$(this).parent().parent().children('li').first().addClass('pick_on');
	}
	_query();
})
//global_all选择事件
$('body').delegate('.global_mousemove','mousemove', function(event){	
	event.stopPropagation(); 
	var global_id = $(this).attr('global-id');
	$('#global_list .block_list').hide();
	$("[global-list='"+global_id+"']").show();
})
//条件折叠
$('body').delegate('.click_show','click', function(event){	
	event.stopPropagation(); 
	if($(this).hasClass('click_show_on')){
		$('.switch_condition').hide();
		$(this).removeClass('click_show_on');
	}else{
		$('.switch_condition').show();
		$(this).addClass('click_show_on')
	}
})
//日期显示
$("#begin").datetimepicker({
	language:  'zh-CN',
	 minView: "day",//设置只显示到月份
	format : "yyyy-mm-dd",//日期格式
    weekStart: 1,  
    todayBtn:  1,  
    autoclose: 1,  
    todayHighlight: 1,  
    forceParse: 0,
    showMeridian: 1  
}).on('changeDate', function (ev) {  
    $(this).datetimepicker('hide');  
});  

$("#end").datetimepicker({
	language:  'zh-CN',
	format : "yyyy-mm-dd",//日期格式
	 minView: "day",//设置只显示到月份
    weekStart: 1,
    todayBtn:  1,  
    autoclose: 1,  
    todayHighlight: 1,  
    forceParse: 0,
    showMeridian: 1  
}).on('changeDate', function (ev) {  
    $(this).datetimepicker('hide');
    _query();
});  
console.log(data)
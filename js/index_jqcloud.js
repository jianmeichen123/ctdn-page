var data = [
		['广州', 13, 100],
		['浙江', 10, 123],
		['江苏', 9, 222],
		['北京', 8, 111],
		['上海', 7, 111],
		['河南', 6, 111],
		['河北', 5, 111],
		['四川', 5, 111],
		['安徽', 5, 111],
		['湖北', 5, 111],
		['福建', 4, 111],
		['辽宁', 4, 111],
		['湖南', 3, 111],
		['陕西', 3, 111],
		['广西', 3, 111],
		['江西', 3, 111],
		['重庆', 3, 111],
		['天津', 3, 111],
		['云南', 2, 111],
		['山西', 2, 111],
		['黑龙江', 2, 111],
		['吉林', 2, 111],
		['内蒙古', 2, 111],
		['贵州', 2, 111],
		['甘肃', 2, 111],
		['海南', 2, 111],
		['宁夏', 2, 111],
		['青海', 1, 111],
		['西藏', 1, 111],
		['香港', 1, 111],
		['未知', 1, 111],
		['台湾', 1, 111]
	];
	
	var string_ = "";
	for (var i = 0; i < data.length; i++) {
		var string_f = data[i][0];
		var string_n = data[i][1];
		string_ += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list',onmouseover:'on_mouseover(this,event)',onmouseout:'on_mouseout()'}},";
	}

	function on_mouseover(e, ev) {
		var txt = $(e).html();
		ev = ev || event;

		var aaa = $(document).scrollTop()+ ev.clientY;
		$.each(data, function(i, item) {
			if(txt == item[0]){
				var html = item[0]+"<br />曝光数"+item[1]+"<br />"+item[2];
				$("#my_favorite_latin_words").after("<div class='append_div' style='position: absolute;left:" + ev.clientX + "px; top:" + aaa + "px; '>" + html + "</div>");
				return;
			}
			
		});
	}
	$(function() {
		$("#my_favorite_latin_words").jQCloud(word_list);
	});
	var string_list = string_;
	var word_list = eval("[" + string_list + "]");

	function on_mouseout() {
		$(".append_div").remove();
	}
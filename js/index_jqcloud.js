var data = [
		['工具软件', 13, 100],
		['金融科技', 10, 123],
		['手机游戏', 8, 222],
		['平台', 8, 111],
		['电商解决方案', 8, 111],
		['车主工具及服务', 5, 111],
		['O2O', 5, 111],
		['水果', 5, 111],
		['交通出行', 5, 111],
		['车主服务', 5, 111],
		['传统行业互联网化', 4, 111],
		['综合电商', 4, 111],
		['IP知识产权', 3, 111],
		['电子商务', 3, 111],
		['演艺', 3, 111],
		['驾照驾校', 3, 111],
		['同城交友', 3, 111],
		['K12', 3, 111],
		['腾讯系', 2, 111],
		['金融', 2, 111],
		['教育', 2, 111],
	
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
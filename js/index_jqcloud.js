var data = [['企业服务', 13, 249],
            ['金融', 10, 147],
            ['电子商务', 9, 134],
            ['医疗健康', 8, 124],
            ['本地生活', 7, 112],
            ['文化娱乐', 7, 108],
            ['硬件', 6, 96],
            ['汽车交通', 6, 93],
            ['教育', 6, 80],
            ['O2O', 6, 68],
            ['人工智能', 6, 62],
            ['大数据', 5, 60],
            ['解决方案', 4, 57],
            ['工具软件', 4, 55],
            ['共享经济', 3, 51],
            ['数据服务', 3, 48],
            ['平台', 3, 47],
            ['SAAS', 3, 46],
            ['其他企业服务', 2, 42],
            ['房产服务', 2, 41]]
;
	
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
				var html = item[0]+"<br />投资事件"+item[2];
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
var data = [['企业服务', 13, 249],
            ['金融', 7, 147],
            ['电子商务', 6, 134],
            ['医疗健康', 6, 124],
            ['本地生活', 5, 112],
            ['文化娱乐', 5, 108],
            ['硬件', 5, 96],
            ['汽车交通', 4, 93],
            ['教育', 4, 80],
            ['O2O', 3, 68],
            ['人工智能', 3, 62],
            ['大数据', 3, 60],
            ['解决方案', 2, 57],
            ['工具软件', 2, 55],
            ['共享经济', 2, 51],
            ['数据服务', 2, 48],
            ['平台', 2, 47],
            ['SAAS', 2, 46],
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
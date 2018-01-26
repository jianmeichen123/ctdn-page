var myChart_default_industry_num = 29
var myChartDB_default_industry_num = 29
var industry_data = null
var round_data = null
var rzbk_data =null
var cxhtfx_data =null
var rxgmfb_data = null
var moneyRange =[];
var roundName=[]
var yAxis_name = '融资笔数'
var myChart = echarts.init(document.getElementById('commerce_one'));
//加载行业
sendGetRequest(platformUrl.industry,function(data){
    if(data.status ==10000){
    var html = "<li class='trade_list_on' value=0>全部</li>"
        $(data.data).each(function(){
            html += "<li value="+$(this)[0].id+">"+$(this)[0].name+"</li>"
        })
        $("#industryList").html(html);
    }
})
//加载热门地区
sendGetRequest(echars.hotDistrict,function(data){
    if(data.status ==10000){
    var html = "<option value=-1>所有地区</option>"
        $(data.data).each(function(){
            html += "<option value="+$(this)[0].id+">"+$(this)[0].name+"</option>"
        })
        $("select[name='districtSubId']").html(html);
    }
})
function querytotalheader(){
    var industryId =$("#industryList li.trade_list_on").attr("value")
    var json ={"industryId":industryId,"type":3}
	sendPostRequestByJsonObj(detail.queryHeaderStatCommon,json,function(data){
		if(data.data){
	    $("#projectNum_total").text(data.data.projectNum)
	    $("#investedProjNum_total").text(data.data.investedProjNum)
	    $("#eventNum_total").text(data.data.eventNum)
	    $("#amount_total").text(data.data.amount)
		}
	})
}
function querycurmontheader(){
	sendPostRequest(detail.queryGGCurMonthHeaderStat,function(data){
		if(data.data){
		    $("#projectNum_curmonth").text(data.data.projectNum)
		    $("#investedProjNum_curmonth").text(data.data.investedProjNum)
		    $("#eventNum_curmonth").text(data.data.eventNum)
		    $("#amount_curmonth").text(data.data.amount)
		}
	})
}
//图表按投资笔数或融资金额显示 按融资笔数(1) 按融资金额(2) 默认融资笔数
var query_flag = 1
// 指定图表的配置项和数据
var option = {
    title: {
        text: ''
    },
    color: [
        '#58082e', '#d40054', '#a95c76', '#f192b2', '#ff783d',
        '#ff1000', '#ba51cd','#663ab6', '#1a2a80', '#798eff',
        '#00afff', '#92f2ff', '#46cbbe', '#0b8f82', '#2d771f',
        '#65ff6b', '#95cc55', '#d0ff99', '#8b9b1b', '#e2d249',
        '#fff25e', '#be930e','#896e58', '#950951', '#ac5a40',
        '#ff635b', '#cfbf97','#9d9d9d', '#b0ffd7', '#000000'
    ],
    tooltip: {
        trigger: 'item',
        type:'solid'
    },
    legend: {
         right:20,
         left:30,
        data:[],
        selected:{
        	"邮件营销":true,
        	"联盟广告":false
        },
        type:'scroll',
        bottom: 10,
    },
    grid: {
        left: '3%',
        top:'30',
        right: '3%',
        bottom: '10%',
        containLabel: true
    },
    toolbox: {
        feature: {
           // saveAsImage: {}
        }
    },
    xAxis: [
	 {
		type : 'category',
		splitLine :{show:false},
		boundaryGap: false,
		data: [],
		scale:true,
		top:0,

		scale: true,
		axisLine:{
		  show:true,
		  lineStyle:{
		  	color: '#e6e6e6',
		  	width: 1,
		  	type: 'solid'
		  }
		},
		axisTick:{
		  show:false
		 },
		  axisLabel: {
		      //formatter: '{value}',
		      textStyle: {
		      	color: '#333333',
		          fontSize:'12'
		      }
		  }

		 }
	],
    yAxis:[
	    	 {
                 type : 'value',
                 splitLine :{
                	 show:true,
                	 lineStyle: {

                		 color: ['#e6e6e6'],

                		 width: 1,

                		 type: 'solid',
                		 },
                },
                 scale:true,
                 top:'0%',

                 nameTextStyle :{
                     color:'#333333',
                     //nameLocation:'top',
                     right:'20',
                 },
                 scale: true,
                 /* nameLocation:'middle',
                 nameGap:25, */
                 nameTextStyle: {
                     color: '#333',
                     fontSize: '12'
                 },
			      axisLine:{
			        show:false,
			        lineStyle:{
			        	color: '#e6e6e6',
			        	width: 1,
			        	type: 'solid'
			        }
			      },
			      axisTick:{
			        show:false
			       },
			        axisLabel: {
			            //formatter: '{value}',
			            textStyle: {
			            	color: '#333333',
			                fontSize:'12'
			            }
			        }

             }
	    ],
    series: []
};
myChart.setOption(option,true);


//行业融资对比
var myChart_db = echarts.init(document.getElementById('commerce_two'));
var option_db = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    color:['#3396c9','#6bcff2','#2ea7ef','#6ee8de','#b4fdbc','#96cbe2'],
    legend: {
    	 x : '630',
         y : '450',
        data:[]
    },
    grid: {
    	 left: '3%',
         top:'30',
         right: '3%',
         bottom: '100',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : [],
            axisTick:{
  			  show:false
  			 },
            axisLabel: {
			    //formatter: '{value}',
			    interval:0,
			    rotate:40 ,
			    textStyle: {
			    	color: '#333333',
			        fontSize:'12'
			    }
			},
			axisLine:{
			  show:false,
			  lineStyle:{
			  	color: '#e2e3e4',
			  	width: 1,
			  	type: 'solid'
			  }
			}
        }
    ],
    yAxis : [
        {
            type : 'value',
            splitLine :{
	           	 show:true,
	           	 lineStyle: {

	           		 color: ['#e6e6e6'],

	           		 width: 1,

	           		 type: 'solid',
           		 },
           },
            nameTextStyle: {
                color: '#333',
                fontSize: '12'
            },
            axisLabel: {
			    interval:0,
			    textStyle: {
			    	color: '#333333',
			        fontSize:'12'
			    }
			},
			axisLine:{
			  show:false,
			  lineStyle:{
			  	color: '#e2e3e4',
			  	width: 1,
			  	type: 'solid'
			  }
			}

        }
    ],
    series : []
};
//融资版块
var myChart_three = echarts.init(document.getElementById('commerce_three'));
var option_three = {
                           title: {
                           },
                           tooltip: {
                            formatter:function(params){
                                var time = $("div[echarts_flag=3]").find("select[name='time']").find("option:selected").text();
                                var district = $("div[echarts_flag=3]").find("select[name='districtSubId']").find("option:selected").text();
                                var result =params.name+"<br/>"+district+ "&nbsp;&nbsp;"+time+ "&nbsp;&nbsp;共获投"+params.value+"笔"
                                return result
                            }
                           },
                           color: [
                                   '#58082e', '#d40054', '#a95c76', '#f192b2', '#ff783d',
                                   '#ff1000', '#ba51cd','#663ab6', '#1a2a80', '#798eff',
                                   '#00afff', '#92f2ff', '#46cbbe', '#0b8f82', '#2d771f',
                                   '#65ff6b', '#95cc55', '#d0ff99', '#8b9b1b', '#e2d249',
                                   '#fff25e', '#be930e','#896e58', '#950951', '#ac5a40',
                                   '#ff635b', '#cfbf97','#9d9d9d', '#b0ffd7', '#000000'
                               ],
                           series: [{
                               name: '',
                               type: 'treemap',
                               visibleMin: 300,
                   	           roam: 'move',
                               data:[],
                               leafDepth: 1,
                               top:30,
                               left:0,
                               right:0,
                               bottom:40,
                               levels: [
                                   {
                                       itemStyle: {
                                           normal: {
                                               borderColor: '#555',
                                               borderWidth: 0,
                                               gapWidth: 0
                                           }
                                       }
                                   },
                                   {
                                       colorSaturation: [0.3, 0.6],
                                       itemStyle: {
                                           normal: {
                                               borderColorSaturation: 0.7,
                                               gapWidth: 0,
                                               borderWidth: 0
                                           }
                                       }
                                   },
                                   {
                                       colorSaturation: [0.3, 0.5],
                                       itemStyle: {
                                           normal: {
                                               borderColorSaturation: 0.6,
                                               gapWidth: 1
                                           }
                                       }
                                   },
                                   {
                                       colorSaturation: [0.3, 0.5]
                                   }
                               ]
                           }]
                       }
//持续获投分析
var myChart_four = echarts.init(document.getElementById('commerce_four'));
var option_four = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
        },formatter:function(params){
            var time = $("select[name='investQuarter']").find("option:selected").text();
            var district = $("div[echarts_flag=4]").find("select[name='districtSubId']").find("option:selected").text();
            var result =params[0].axisValue+"<br/>"+district+ "&nbsp;&nbsp;"+time+"进入下一轮比率"+ "&nbsp;&nbsp;"+params[0].value+"%"
            return result
        }
    },
    color:['#72bdff'],
    grid: {
    	 left: '3%',
         top:'30',
         right: '3%',
         bottom: '80',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : [],
            axisTick:{
  			  show:false
  			 },
            axisLabel: {
			    //formatter: '{value}',
			    interval:0,
			    rotate:40 ,
			    textStyle: {
			    	color: '#333333',
			        fontSize:'12'
			    }
			},
			axisLine:{
			  show:false,
			  lineStyle:{
			  	color: '#e6e6e6',
			  	width: 1,
			  	type: 'solid'
			  }
			}
        }
    ],
    yAxis : [
             {
                 type : 'value',
                 splitLine :{
     	           	 show:true,
     	           	 lineStyle: {

     	           		 color: ['#e6e6e6'],

     	           		 width: 1,

     	           		 type: 'solid',
                		 },
                },
                 nameTextStyle: {
                     color: '#333',
                     fontSize: '12'
                 },
                 axisLabel: {
     			    interval:0,
     			    textStyle: {
     			    	color: '#333333',
     			        fontSize:'12'
     			    }
     			},
     			axisLine:{
     			  show:false,
     			  lineStyle:{
     			  	color: '#e6e6e6',
     			  	width: 1,
     			  	type: 'solid'
     			  }
     			}

             }
         ],

    series : [
              {
                  name:'进入下一轮的比率:',
                  type:'bar',
                  barWidth: '30',
                  itemStyle : { normal: {label : {show: true, position: 'top',color:'#333333'}}},
                  data:[10, 52, 20, 34, 90, 30, 22]
              }
    ]
};
var myChart_five = echarts.init(document.getElementById('commerce_five'));
var option_five = {
    title: {
    },
    legend: {
    },
    color:['#67ddd9'],
    grid: {
   	 	left: '30',
        top:'20',
        right: '35',
        bottom: '10',
       containLabel: true
   },
    tooltip: {
        position: 'top',
        formatter: function (params) {
            var time = $("select[name='timeType']").find("option:selected").text()
            var result =time+roundName[params.value[0]]+"</br>规模在"+moneyRange[params.value[1]]+"区间的有"+params.value[2]+"笔融资"
            return result
        }
    },
    xAxis: {
        type: 'category',
        data: roundName,
        boundaryGap: false,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#999',
                type: 'dashed'
            }
        },
        axisLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        data: moneyRange,
        axisLine: {
            show: false
        }
    },
    series: [{
        name: 'Punch Card',
        type: 'scatter',
        symbolSize: '',
        data: [],
        animationDelay: function (idx) {
            return idx * 5;
        }
    }]
};

$(".background_boeder_commerce select[name]" ).change(function(){
   var div = $(this).closest(".background_boeder_commerce");
   var tab = $(this).closest('.commerce_tit_all').parent().find(".num_or_money");
   var flag = 1;
   if(tab){
      flag = tab.find("span.eachrst_tit_on").attr("lang")
   }
   var json =  getJson(div);
   var echarts_flag = div.attr("echarts_flag");
   switch(echarts_flag){
    case "1" : freshEchars1(json,flag); break;
    case "2" : freshEchars2(json,flag); break;
    case "3" : freshEchars3(json,flag); break;
    case "4" : freshEchars4(json,flag); break;
    case "5" : freshEchars5(json,flag); break;
   }
})
function getJson(div){
    var ls =  div.find("select[name]");
    var json = {};
    $(ls).each(function(){
        if($(this).attr("name")=="time"){
            json["timeType"] =  $(this).find("option:selected").attr("name");
            json["time"] =  $(this).find("option:selected").val();
        }else{
            json[$(this).attr("name")] =  $(this).find("option:selected").val();
        }
    })
    json["industryId"] =$("#industryList li.trade_list_on").attr("value")
    return json;
}
// 请求行业融资对比数据
function freshEchars1(json,flag){
    sendPostRequestByJsonObj(echars.getRZQS,json,function(data){
        if(data.success){
            industry_data = data
            showEcharts(1,flag)
        }
    });
}

// 请求行业融资对比数据
function freshEchars2(json,flag){
    sendPostRequestByJsonObj(echars.getRZDB,json,function(data){
        if(data.success){
            round_data = data
            showEcharts(2,flag)
        }
    });
}

// 请求行业融资对比数据
function freshEchars3(json){
    sendPostRequestByJsonObj(echars.getRZBK,json,function(data){
        if(data.success){
            rzbk_data = data
            showEcharts(3,null)
        }
    });
}

// 请求行业融资对比数据
function freshEchars4(json){
    sendPostRequestByJsonObj(echars.getCXHTFX,json,function(data){
        if(data.success){
            cxhtfx_data = data
            showEcharts(4,null)
        }
    });
}
// 请求行业融资对比数据
function freshEchars5(json){
    sendPostRequestByJsonObj(echars.getRXGMFB,json,function(data){
        if(data.success){
            rxgmfb_data = data
            showEcharts(5,null)
        }
    });
}
//页面初始化加载数据
reloadEchars()
querytotalheader()
querycurmontheader()
function reloadEchars(){
     var industryId = $("#industryList li.trade_list_on").attr("value")
     freshEchars1({"time":12,"timeType":"M","industryId":industryId},1)
     freshEchars2({"time":30,"timeType":"D","industryId":industryId},1)
     freshEchars3({"time":30,"timeType":"D","industryId":industryId},1)
     freshEchars4({"investQuarter":"2017Q3","industryId":industryId},1)
     freshEchars5({"timeType":1,"industryId":industryId},1)
}

//按融资笔数(1) 按融资金额(2) 切换
$('.num_or_money span').click(function(){
    var div = $(this).closest(".background_boeder_commerce")
    var echarts_flag = div.attr("echarts_flag");
	yAxis_name = $(this).text()
	div.find("span").removeClass('eachrst_tit_on')
	$(this).addClass('eachrst_tit_on')
	var lang = $(this).attr('lang')
	showEcharts(echarts_flag,lang)
})
//行业点击事件
$('body').delegate('#industryList li','click', function(event){
	event.stopPropagation();
	if(!$(this).hasClass("trade_list_on")){
        $(this).toggleClass('trade_list_on')
        $(this).siblings().removeClass('trade_list_on')
        $('select').each(function(i,j){
            var options = $(j).find("option");
            options.attr("selected", false);
            options.first().attr("selected", true);
        });
        $(".num_or_money span").removeClass("$(".num_or_money span")
        $(".num_or_money span[lang=1]").attr("eachrst_tit_on");
        $(".industryTab").html($(this).html())
        if($(this).val()==0){
            $("#curmonth").show()
        }else{
            $("#curmonth").hide()
        }
       //加载图表
       querytotalheader()
       reloadEchars();
    }
})

function showEcharts(echarts_flag,lang){
    if(echarts_flag == 1 ){ //图表1
    		if(industry_data==null){
    			return
    		}
    		option.xAxis[0].data = industry_data.data.xAxis
    		if(lang==2){
    		    option.yAxis[0].name = yAxis_name+"/万元"
    		}else{
    		    option.yAxis[0].name = yAxis_name
    		}
    		var legend = industry_data.data.legend.slice(0,myChart_default_industry_num)
    		legend.push('平均值')
    		option.legend.data=legend
    		var series =  industry_data.data.series.slice(0,myChart_default_industry_num)
    		var num_array = [0,0,0,0,0,0,0,0,0,0,0,0]
    		for(var j=0;j<series.length;j++){
    			var entity = series[j]
    			var json = {}
    			if(lang == 1){
    				for(var m = 0;m<num_array.length;m++){
    					num_array[m] = parseInt(entity.investedNumStrList[m]) + num_array[m]
    				}
    			}
    			if(lang == 2){
    				for(var m = 0;m<num_array.length;m++){
    					num_array[m] = parseInt(entity.investedAmountStrList[m]) + num_array[m]
    				}
    			}
    		}
    		for(var n =0;n<num_array.length;n++){
    			num_array[n] = (num_array[n]/myChart_default_industry_num).toFixed(2)
    		}
    		var avg_json = {}
    		avg_json['industryName'] = '平均值'
    		if(lang == 1){
    			avg_json['investedNumStrList'] = num_array
    		}
    		if(lang == 2){
    			avg_json['investedAmountStrList'] = num_array
    		}

    		series.push(avg_json)
    		var y_data =  new Array()
    		for(var i=0;i<series.length;i++){
    			var entity = series[i]
    			var json = {}
    			json['name'] = entity.industryName
    			if(lang == 1){
    				json['data'] = entity.investedNumStrList
    			}
    			if(lang == 2){
    				json['data'] = entity.investedAmountStrList
    			}
    			json['type'] = 'line'
    			json['symbol'] = 'circle'
    			json['smooth'] = true
    			y_data.push(json)
    		}
    		option.series = y_data

    		for(var s =0;s<legend.length;s++){
    			var data_legend = legend[s]
    			if(s <= 9){
    				option.legend.selected[data_legend] = true
    			}else{
    				option.legend.selected[data_legend] = false
    			}
    		}
    		myChart.setOption(option,true); //true  防止多次请求，数据重叠
    	}
    else if(echarts_flag == 2) { //图表2
    		if(round_data==null){
    			return
    		}
    		option_db.xAxis[0].data = round_data.data.xAxis.slice(0,myChartDB_default_industry_num)
    		option_db.legend.data=round_data.data.legend
    		if(lang==2){
                option_db.yAxis[0].name = yAxis_name+"/万元"
            }else{
                option_db.yAxis[0].name = yAxis_name
            }
    		var series =  round_data.data.series.slice(0,myChartDB_default_industry_num)
    		var y_data =  new Array()
    		for(var i=0;i<series.length;i++){
    			var entity = series[i]
    			var json = {}
    			json['name'] = entity.roundName
    			if(lang == 1){
    				json['data'] = entity.investedNumList
    			}
    			if(lang == 2){
    				json['data'] = entity.investedAmountList
    			}
    			json['type'] = 'bar'
    			json['barWidth']=15
    			json[ 'stack' ] = '总量'
    			y_data.push(json)
    		}
    		option_db.series = y_data
    		myChart_db.setOption(option_db,true);
    }
    else if(echarts_flag ==3){
        if(rzbk_data==null){
            return
        }
       var industryId = $("#industryList li.trade_list_on").attr("value")
       option_three.series[0].name =  $("#industryList li.trade_list_on").html()
       if(industryId==0){
          option_three.series[0].data=rzbk_data.data.series;
       }else{
          option_three.series[0].data=rzbk_data.data.series[0].children;
       }
       myChart_three.setOption(option_three,true);
    }
    else if(echarts_flag ==4){
        if(cxhtfx_data==null){
            return
        }
        option_four.xAxis[0].data= cxhtfx_data.data.xAxis;
        option_four.series[0].data= cxhtfx_data.data.series;
        myChart_four.setOption(option_four,true);
    }
    else if(echarts_flag ==5){
        if(rxgmfb_data==null){
            return
        }
        option_five.xAxis.data= rxgmfb_data.data.xAxis;
        option_five.yAxis.data= rxgmfb_data.data.legend;
        roundName= rxgmfb_data.data.xAxis;
        moneyRange= rxgmfb_data.data.legend;
        // 获取到最大的交易量值 来控制气泡半径
        var maxTotalCount = 1;
        var data = rxgmfb_data.data.series.map(function (item) {
           if (parseInt(item[2]) >= maxTotalCount) {
               maxTotalCount = parseInt(item[2]);
           }
           return [item[1], item[0], item[2]];
        });
        option_five.series[0].data= data;
        option_five.series[0].symbolSize=function (val) {
            // 根据最大的交易量值 来控制气泡半径  （最小 3  最大 40）
          return Math.round(3 + val[2] * 40 / maxTotalCount);
        }
        myChart_five.setOption(option_five,false);
    }
}
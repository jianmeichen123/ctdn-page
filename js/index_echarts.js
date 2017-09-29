//基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('index_eachart_l'));
var option = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    color:['#ea4322','#ff722d','#ff975e','#ffc470','#e9e612','#c7ff66','#a5ee26'],
	    legend: {
	    	 x : '525',
	         y : '340',
	        data:['种子/天使/PreA轮', 'A/A+轮','PreB/B/B+轮','C轮','D轮','D轮以上','其他']
	    },
	    grid: {
	        left: '17',
	        top:'40',
	        right: '17',
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
				  	color: '#000',
				  	width: 1,
				  	type: 'solid'
				  }
				}
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
                name:'                   新增投资事件数（本季度）',
                axisTick:{
  	  			  show:false
  	  			 },
                nameTextStyle: {
                    color: '#333',
                    fontSize: '12'
                },
                axisLabel: {
				    interval:0,  
				    textStyle: {
				    	color: '#333',
				        fontSize:'12'
				    }
				},
				splitLine:{//网格线的格式
					// show:false//去掉y轴上的网格线——
					lineStyle:{
					color: '#e5e5e5',//网格线颜色
					width: 1,//网格线宽度
					type: 'solid'//网格线样式

					}
				},
				axisLine:{
				  show:false,
				  lineStyle:{
				  	color: '#f2f2f2',
				  	width: 1,
				  	type: 'solid'
				  }
				}

	        }
	    ],
	    series : [],
	};
    var json ={"year":"2017"}
	sendPostRequestByJsonObj(platformUrl.eventIndustryMonth,json,function(data){
	    var data = data.data;
	    option.xAxis[0].data= data.industryNameList
	    var list = new Array();
	    var roundList = option.legend.data;
	    for(var i = 0;i<roundList.length;i++){
	        var json = {};
	        json.name = roundList[i];
	        json.type = "bar";
	        json.stack = "总量";
	        json.barWidth = 15;
	        json.data =data.roundNumList[i]
	        list.push(json)
	    }
	    option.series = list
	})
	                    
//使用刚指定的配置项和数据显示图表。
myChart.setOption(option);   

//var ecConfig = require('echarts/config');
myChart.on('click',  function eConsole(param) {
//这个params可以获取你要的饼图中的当前点击的项的参数
	//console.log(param)
});


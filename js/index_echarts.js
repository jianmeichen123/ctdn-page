//基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('index_eachart_l'));
var option = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    color:['#ea4322','#ff722d','#ff975e','#ffc470','#e9e612','#c7ff66'],
	    legend: {
	    	 x : '630',
	         y : '330',
	        data:['种子/天使/PreA轮', 'A轮','B轮','C轮','D轮','D轮以上']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '100',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['金融科技','互联网银行','电子商务','O2O','人工智能'],
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
                name:'新增投资事件',
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
	    series : [
	              
  	        {
	            name:'种子/天使/PreA轮',
	            type:'bar',
	            stack: '总量',
	            barWidth : 15,//柱图宽度 
	            data:[320, 302, 301, 334, 390, 330, 320]
	        },
	        {
	            name:'A轮',
	            type:'bar',
	            stack: '总量',
	            barWidth : 15,//柱图宽度
	            data:[120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            name:'B轮',
	            type:'bar',
	            stack: '总量',
	            barWidth : 15,//柱图宽度
	            data:[220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            name:'C轮',
	            type:'bar',
	            stack: '总量',
	            barWidth : 15,//柱图宽度
	            data:[150, 212, 201, 154, 190, 330, 410]
	        },
	        {
	            name:'D轮',
	            type:'bar',
	            stack: '总量',
	            barWidth : 15,//柱图宽度
	            data:[820, 832, 901, 934, 1290, 1330, 1320]
	        },
	        {
	            name:'D轮以上',
	            type:'bar',
	            stack: '总量',
	            barWidth : 15,//柱图宽度
	            data:[820, 832, 901, 934, 1290, 1330, 1320]
	        }
	    ]
	};

	                    
//使用刚指定的配置项和数据显示图表。
myChart.setOption(option);   


//var ecConfig = require('echarts/config');
myChart.on('click',  function eConsole(param) {
//这个params可以获取你要的饼图中的当前点击的项的参数
	console.log(param)
  alert(param);
});


//资本地图
var myChart = echarts.init(document.getElementById('commerce_one'));

var data = [
    { name: "上海", value: 290},
    { name: "珠海", value: 2186},
    { name: "三亚", value: 1135},
    { name: "惠州", value: 1973},
    { name: "海口", value: 2568},
    { name: "合肥", value: 4039},
    { name: "南京", value: 6959},
    { name: "杭州", value: 5632},
    { name: "苏州", value: 6707},
    { name: "无锡", value: 3393},
    { name: "昆山", value: 1894},
    { name: "广州", value: 15769},
    { name: "深圳", value: 8259},
    { name: "佛山", value: 5741},
    { name: "东莞", value: 3030},
    { name: "福州", value: 4542},
    { name: "厦门", value: 3329},
    { name: "南宁", value: 3157},
    { name: "郑州", value: 6690},
    { name: "武汉", value: 8678},
    { name: "长沙", value: 5303},
    { name: "南昌", value: 3025},
    { name: "北京", value: 20259},
    { name: "长春", value: 3016},
    { name: "大连", value: 3202},
    { name: "沈阳", value: 4540},
    { name: "哈尔滨", value: 3141},
    { name: "天津", value: 8626},
    { name: "济南", value: 4361},
    { name: "青岛", value: 6667},
    { name: "太原", value: 4080},
    { name: "石家庄", value: 6137},
    { name: "西安", value: 6991},
    { name: "成都", value: 13873},
    { name: "重庆", value: 13283},
    { name: "昆明", value: 4633},


];

var geoCoordMap = {
    "上海": [121.48, 31.22],
    "珠海": [113.52, 22.3],
    "三亚": [109.31, 18.14],
    "惠州": [114.4, 23.09],
    "海口": [110.35, 20.02],
    "合肥": [117.27, 31.86],
    "南京": [118.78, 32.04],
    "杭州": [120.19, 30.26],
    "苏州": [120.62, 31.32],
    "无锡": [120.29, 31.59],
    "昆山": [120.95, 31.39],
    "广州": [113.23, 23.16],
    "深圳": [114.07, 22.62],
    "佛山": [113.11, 23.05],
    "东莞": [113.75, 23.04],
    "福州": [119.3, 26.08],
    "厦门": [118.1, 24.46],
    "南宁": [108.33, 22.84],
    "郑州": [113.65, 34.76],
    "武汉": [114.31, 30.52],
    "长沙": [113, 28.21],
    "南昌": [115.89, 28.68],
    "北京": [116.46, 39.92],
    "长春": [125.35, 43.88],
    "大连": [121.62, 38.92],
    "沈阳": [123.38, 41.8],
    "哈尔滨": [126.63, 45.75],
    "天津": [117.2, 39.13],
    "济南": [117, 36.65],
    "青岛": [120.33, 36.07],
    "太原": [112.53, 37.87],
    "石家庄": [114.48, 38.03],
    "西安": [108.95, 34.27],
    "成都": [104.06, 30.67],
    "重庆": [106.54, 29.59],
    "昆明": [102.73, 25.04],
};

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

var convertedData = [
    convertData(data),
    convertData(data.sort(function(a, b) {
        return b.value - a.value;
    }).slice(0, 6))
];
data.sort(function(a, b) {
    return a.value - b.value;
})

var selectedItems = [];
var categoryData = [];
var barData = [];
//   var maxBar = 30;
var sum = 0;
var count = data.length;
for (var i = 0; i < data.length; i++) {
    categoryData.push(data[i].name);
    barData.push(data[i].value);
    sum += data[i].value;
}
console.log(categoryData);
console.log(sum + "   " + count)
var option = {
    backgroundColor: '#fff',
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicInOut',
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut',
    title: [{
        text: '',
       /* link: 'http://pages.anjuke.com/expert/newexpert.html',
        subtext: 'data from Anjuke',
        sublink: 'http://pages.anjuke.com/expert/newexpert.html',*/
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    }],
    toolbox: {
    	show :false,
    },
    brush: {
        outOfBrush: {
            color: '#abc'
        },
        brushStyle: {
            borderWidth: 2,
            color: 'rgba(0,0,0,0.2)',
            borderColor: 'rgba(0,0,0,0.5)',
        },
        seriesIndex: [0, 1],
        throttleType: 'debounce',
        throttleDelay: 300,
        geoIndex: 0
    },
    geo: {
        map: 'china',
        left: '1',
        center: [100, 36],
        zoom: 1.1,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#9bb9d3',
                borderColor: '#4479a2'
            },
            emphasis: {
                areaColor: '#7aa5c7'
            }
        }
    },
    tooltip: {
        trigger: 'item'
    },
    grid: {
        right: 40,
        top: 100,
        bottom: 40,
        width: '30%'
    },
    xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        boundaryGap: false,
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            margin: 2,
            textStyle: {
                color: '#333333'
            }
        },
    },
    yAxis: {
        type: 'category',
        //  name: 'TOP 20',
        nameGap: 16,
        axisLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        },
        axisTick: {
            show: false,
            lineStyle: {
                color: '#ddd'
            }
        },
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#333333'
            }
        },
        data: categoryData
    },
    series: [{
        // name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertedData[0],
        symbolSize: function(val) {
            return Math.max(val[2] / 300, 8);
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#FF8C00',
                position: 'right',
                show: true
            }
        }
    }, {
        //  name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertedData[0],
        symbolSize: function(val) {
            return Math.max(val[2] / 500, 8);
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#f4e925',
                shadowBlur: 50,
                shadowColor: '#EE0000'
            }
        },
        zlevel: 1
    }, {
        id: 'bar',
        zlevel: 2,
        type: 'bar',
        symbol: 'none',
        itemStyle: {
            normal: {
                color: '#83bcef'
            }
        },

        data: data
    }]
};



function renderBrushed(params) {
    var mainSeries = params.batch[0].selected[0];

    var selectedItems = [];
    var categoryData = [];
    var barData = [];
    var maxBar = 30;
    var sum = 0;
    var count = 0;

    for (var i = 0; i < mainSeries.dataIndex.length; i++) {
        var rawIndex = mainSeries.dataIndex[i];
        var dataItem = convertedData[0][rawIndex];
        var pmValue = dataItem.value[2];

        sum += pmValue;
        count++;

        selectedItems.push(dataItem);
    }

    selectedItems.sort(function(a, b) {
        //   return b.value[2] - a.value[2];
        return a.value - b.value;
    });

    for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
        categoryData.push(selectedItems[i].name);
        barData.push(selectedItems[i].value[2]);
    }

    this.setOption({
        yAxis: {
            data: categoryData
        },
        xAxis: {
            axisLabel: {
                show: !!count
            }
        },
        series: {
            id: 'bar',
            //        sort:'descending',
            data: barData
        }
    });
}
	                    
myChart.setOption(option,true);


//投资机构轮次分布
var myChart_two = echarts.init(document.getElementById('commerce_two'));
var option_two = {
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    color:['#ffc560','#4595a1'],
	    toolbox: {
	    },
	    grid: {
	        left: '3%',
	        top:'30',
	        right: '3%',
	        bottom: '10%',
	        containLabel: true
	    },
	    legend: {
	        data:['获投金额','获投笔数'],
	        right:30,
	        bottom: 10,
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	            axisPointer: {
	                type: 'shadow'
	            },
		        axisLine:{
	      		  show:true,
	    		  lineStyle:{
	    		  	color: '#e6e6e6',
	    		  	width: 1,
	    		  	type: 'solid'
	    		  }
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
	    yAxis: [
	        {
	            type: 'value',
	            name: '获投金额',
	            min: 0,
	            axisLine:{
			        show:false,
			        lineStyle:{
			        	color: '#e6e6e6',
			        	width: 1,
			        	type: 'solid'
			        }
			      },
	            max: 250,
	            interval: 50,
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
	        },
	        {
	            type: 'value',
	            name: '获投笔数',
	            min: 0,
	            axisLine:{
			        show:false,
			        lineStyle:{
			        	color: '#e6e6e6',
			        	width: 1,
			        	type: 'solid'
			        }
			      },
	            max: 25,
	            interval: 5,
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
	    series: [
	        {
	            name:'获投金额',
	            type:'bar',
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	        {
	            name:'获投笔数',
	            type:'line',

	            symbol:'circle',
	            yAxisIndex: 1,
	            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	        }
	    ]
	};
	    
	                   
myChart_two.setOption(option_two,true);

//投资事件轮次分析

var myChart_three = echarts.init(document.getElementById('commerce_three'));
var option_three = {
	    title: {
	        text: ''
	    },
	    color: [
	        '#aadc33', '#6cb1ff', '#ff8661'
	    ],
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['初创期','发展期','成熟期'],
	        right:30,
	        bottom: 10,
	    },
	    grid: {
	        left: '3%',
	        top:'30',
	        right: '4%',
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
			data: ['2017/01','2017/02','2017/03','2017/04','2017/05','2017/06','2017/07'],
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
	                 name:'投资笔数',
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
	    series: [
	        {
	            name:'初创期',
	            type:'line',
	            symbol:'circle',
	            data:[120, 13, 121, 134, 90, 230, 210]
	        },
	        {
	            name:'发展期',
	            type:'line',
	            symbol:'circle',
	            data:[120, 132, 101, 134, 90, 230, 110]
	        },
	        {
	            name:'成熟期',
	            type:'line',
	            symbol:'circle',
	            data:[120, 142, 101, 134, 90, 23, 240]
	        }
	    ]
	}

myChart_three.setOption(option_three,true); 

//并购股权和币种分析

var myChart_four_l = echarts.init(document.getElementById('commerce_four_l')); 
var option_four_l = {
	    title : {
	        text: '并购股权占比情况',
	        x:'center',
	        textStyle: {
  		      	color: '#333333',
  		          fontSize:'18',
  		        fontStyle: 'normal',

  		      fontWeight: 'normal',
  		      }
	    },
	    color:['#5ba5de','#9dfff9','#c3afe9','#42d9e2'],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        //orient: 'vertical',
	        bottom: '0',
	        x:'center',
	        data: ['0-10%','10%-30%','30%-50%','50%以上']
	    },
	    series : [
	        {
	            name: '并购股权',
	            type: 'pie',
	            radius : '75%',
	            center: ['50%', '50%'],
	            data:[
	                {value:335, name:'0-10%'},
	                {value:310, name:'10%-30%'},
	                {value:234, name:'30%-50%'},
	                {value:135, name:'50%以上'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
myChart_four_l.setOption(option_four_l ,true); 


var myChart_four_r = echarts.init(document.getElementById('commerce_four_r'));
var option_four_r = {
	    title : {
	        text: '并购币种分布情况',
	        x:'center',
	        textStyle: {
  		      	color: '#333333',
  		          fontSize:'18',
  		        fontStyle: 'normal',

  		      fontWeight: 'normal',
  		      }
	    },
	    color:['#5ab1f0','#2ec8c9','#ffba80','#d87b80','#8d98b3','#e5ce0c','#98b652','#95706e','#b6a2de'],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        //orient: 'vertical',
	        bottom: '0',
	        x:'center',
	        data: ['人民币','美元','欧元','新台币','港元','日元','英镑','卢比','其他']
	    },
	    series : [
	        {
	            name: '并购币种',
	            type: 'pie',
	            radius : '75%',
	            center: ['50%', '50%'],
	            data:[
	                {value:335, name:'人民币'},
	                {value:310, name:'美元'},
	                {value:234, name:'欧元'},
	                {value:135, name:'新台币'},
	                {value:234, name:'港元'},
	                {value:135, name:'日元'},
	                {value:234, name:'英镑'},
	                {value:234, name:'卢比'},
	                {value:135, name:'其他'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
myChart_four_r.setOption(option_four_r ,true); 

//IPO上市地点分布
var myChart_five = echarts.init(document.getElementById('commerce_five'));
var option_five = {
		 title: {
		        text: '统计范围：截止到当前时间，所有IPO上市公司数',
		        bottom:0,
		        x:'center',
		        textStyle: {
	  		      	color: '#333333',
	  		          fontSize:'12',
	  		        fontStyle: 'normal',

	  		      fontWeight: 'normal',
	  		      }
		    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    color:['#75e5cc'],
	    toolbox: {
	    },
	    grid: {
	        left: '3%',
	        top:'30',
	        right: '3%',
	        bottom: '10%',
	        containLabel: true
	    },
	    legend: {
	        data:[],
	        right:30,
	        bottom: 10,
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	            axisPointer: {
	                type: 'shadow'
	            },
		        axisLine:{
	      		  show:true,
	    		  lineStyle:{
	    		  	color: '#e6e6e6',
	    		  	width: 1,
	    		  	type: 'solid'
	    		  }
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
	    yAxis: [
	        {
	            type: 'value',
	            name: '上市公司数',
	            min: 0,
	            axisLine:{
			        show:false,
			        lineStyle:{
			        	color: '#e6e6e6',
			        	width: 1,
			        	type: 'solid'
			        }
			      },
	            max: 250,
	            interval: 50,
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
	    series: [
	        {
	            name:'上市数量',
	            type:'bar',
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        }
	    ]
	};

myChart_five.setOption(option_five,true); 
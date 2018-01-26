//事件总数
sendGetRequest(platformUrl.queryIndexHeaderStat,function(data){
    $("[common_data]").each(function(i,e){
        $(e).html(data.data[$(e).attr('common_data')]);
    })
})
sendGetRequest(detail.queryHeaderStatAdd,function(data){
    $("[common_data]").each(function(i,e){
        if($(e).html() =="0"){
            $(e).html(data.data[$(e).attr('common_data').split(":")[0]]);
        }
    })
})
function com_area(year){
    var myChart = echarts.init(document.getElementById('commerce_one'));

    var data = [];
    sendGetRequest(comOverview.area+year,function(t){
        data = t;
    })
    var geoCoordMap = { '北京':[116.46,39.92 ], '河北':[114.48,38.03], '辽宁':[123.38,41.8], '四川':[104.06,30.67], '安徽':[117.27,31.86], '河南':[113.65,34.76], '呼和浩特':[111.65,40.82], '福建':[119.3,26.08], '黑龙江':[126.63,45.75], '宁夏':[106.27,38.47], '西藏':[91.11,29.97], '甘肃':[103.73,36.03], '湖北':[114.31,30.52], '青海':[101.74,36.56], '新疆':[87.68,43.77], '广东':[113.23,23.16], '湖南':[113,28.21], '山东':[117,36.65], '云南':[102.73,25.04], '广西':[102.73,25.04], '云南':[102.73,25.04], '广西':[108.33,22.84], '吉林':[125.35,43.88], '山西':[112.53,37.87], '浙江':[120.19,30.26], '贵州':[106.71,26.57], '江苏':[118.78,32.04], '陕西':[108.95,34.27], '重庆':[106.54,29.59], '海南':[110.35,20.02], '江西':[115.89,28.68], '上海':[121.48,31.22], '香港':[114.15,22.15], '台湾':[120.19,22.37], '澳门':[113.54,22.18] };

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
            center: [75, 36],
            zoom: 1.1,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#9dc6ea',
                    borderColor: '#4479a2'
                },
                emphasis: {
                    areaColor: '#7aa5c7'
                }
            }
        },
        tooltip: {
            trigger: 'item',
            formatter:function(params){
               return params.name+"  新成立公司 "+params.value[2] +"家";
            }
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
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#333333'
                }
            },
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            //data: categoryData
        },
        series: [{
            // name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertedData[0]*100,
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
        }/*, {
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
        }*/]
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
}
com_area("1")

//投资机构轮次分布
function com_industry(year){
    if (year == undefined){
        year = "1"
    }
    var myChart_two = echarts.init(document.getElementById('commerce_two'));
    var data = []
    var names = []
    sendGetRequest(comOverview.industry+year,function(t){
        names.push('其他')
        $(t).each(function(i,e){
            names.push(e.name)
            if (e.name == undefined||e.name == "undefined"||e["name"] == "其他"){
                e["name"] = e["name"] + e["value"]
            }else{
                data.push(e)
            }

        })
    })
    var option_two = {
    	    title : {
    	        text: '',
    	        x:'center',
    	        textStyle: {
      		      	color: '#333333',
      		          fontSize:'18',
      		        fontStyle: 'normal',

      		      fontWeight: 'normal',
      		      }
    	    },
    	    color:['#5ab1f0','#2ec8c9','#ffba80','#d87b80','#8d98b3','#e5ce0c','#98b652','#95706e','#b6a2de'],
/*    	    tooltip : {
    	        trigger: 'item',
    	        formatter: "{a} <br/>{b} : {c} ({d}%)"
    	    },*/
    	    legend: {
    	        //orient: 'vertical',
    	        bottom: '2',
    	        x:'center',
    	        borderWidth:1,
    	        itemGap: 20,    	        
    	        borderRadius:40,
    	        borderColor: '#ccc',
    	        itemHeight: 14,
    	        itemWidth: 14,
    	        padding: [15, 30],
    	        data: names
    	    },
    	    series : [
    	        {
    	            name: '并购币种',
    	            type: 'pie',
    	            radius : '65%',
    	            center: ['50%', '40%'],
    	            data:data,
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


    myChart_two.setOption(option_two,true);
}
com_industry()
//投资事件轮次分析

var myChart_three = echarts.init(document.getElementById('commerce_three'));
var dataMap = {};
var myChart_three_j = {}
var myChart_three_series =[]
var quartersCoumt = {}
var quarters = []
sendGetRequest(comOverview.projectSetup,function(t){
    myChart_three_j["name"] = t["names"];
    var quartersCoumt = []
    quarters = t["quarters"]
    $.each(t['quartersCoumt'],function(k,v){
        quartersCoumt.push({"name":k,"value":v})
    })
    $.each(t["data:bar"],function(k,v){
        myChart_three_series.push({ series: [ {data: v}, {data: quartersCoumt} ] })
    })
})

var option_three = {
    baseOption: {
        timeline: {
            // y: 0,
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 1000,
            symbol: 'emptyCircle' ,
            lineStyle:{color: '#cccccc', width: 1, type: 'solid'},
            checkpointStyle:{
            	 symbolSize : '13',
            	 borderColor : '#baebff',
            	 borderWidth : '4',
                color : '#4dcbff'
            },
            controlStyle: {
            	show: true,
        	   emphasis: {

        	   color: '#a9a9a9',

        	   borderColor: '#a9a9a9',

        	   borderWidth: 2,
        	   },
        	   normal: {

        	   color: '#a9a9a9',

        	   borderColor: '#a9a9a9',

        	   borderWidth: 1,
        	   }
           },
            // controlStyle: {
            //     position: 'left'
            // },
            data: quarters,
            label: {
                formatter : function(s) {
                    return s;
                }
            }
        },
        title: {
            subtext: ''
        },
        tooltip: {
            trigger: 'item',
            formatter:function(params){
               console.log(params)

               return params[0].name+"  新成立公司 "+param[0].value +"家";
            }
        },
        calculable : true,
        color:['#498be9','#59b2f1','#58caf4','#48f1f9','#29d4a7','#7cd84d','#a9eb63','#d5f566'],
        grid: {
        	 left: '3%',
             top:'30',
             right: '3%',
             bottom: '100',
            containLabel: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value.replace('\n', '') ;
                        }
                    }
                }
            }
        },
        xAxis: [
            {
                'type':'category',
                'axisLabel':{'interval':0},
                'data':myChart_three_j["name"],
                axisLabel: {
    			    formatter: '{value}',
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
    				},
                splitLine: {show: false}
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                axisLabel: {
    			    //formatter: '{value}',
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
        series: [
            {name: '初创公司', type: 'bar'},
            {
                type: 'pie',
                center: ['85%', '20%'],
                radius: '28%',
                z: 100
            }
        ]
    },
    options:myChart_three_series,
};

myChart_three.setOption(option_three,true);

//并购股权和币种分析

var myChart_four = echarts.init(document.getElementById('commerce_four'));

var myChart_four_data
sendGetRequest(comOverview.investedRate,function(t){
    myChart_four_data = t
})

var option_four = {
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
                        start: 30,
                        end: 70,
            filterMode: 'empty'
        }],
	    color:['#63e4ec','#12c1cc','#ee9898','#ffe0aa'],
	    toolbox: {
	    },
	    grid: {
	        left: '3%',
	        top:'30',
	        right: '3%',
	        bottom: '100',
	        containLabel: true
	    },
	    legend: {
	        data:['未获投公司数','获投公司数','本年度获投率','上一年度获投率'],
	        right:40,
	        itemGap: 30,
	        bottom: 60,
	        itemHeight: 14,
	        itemWidth: 14,
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: myChart_four_data["industryName"],
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
	            name: '新成立创业公司数',
	            min: 0,
	            axisLine:{
			        show:false,
			        lineStyle:{
			        	color: '#e6e6e6',
			        	width: 1,
			        	type: 'solid'
			        }
			      },
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
	            name: '获投率',
	            min: 0,
	            axisLine:{
			        show:false,
			        lineStyle:{
			        	color: '#e6e6e6',
			        	width: 1,
			        	type: 'solid'
			        }
			      },
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
			            formatter: '{value} %',
			            textStyle: {
			            	color: '#333333',
			                fontSize:'12'
			            }
			        }
	        }
	    ],
	    series: [
	        {
	            name:'未获投公司数',
	            type:'bar',
	            data:myChart_four_data["unInvestedNum"]
	        },
	        {
	            name:'获投公司数',
	            type:'bar',
	            barCategoryGap: '30',
	            data:myChart_four_data["investedNum"]
	        },
	        {
	            name:'本年度获投率',
	            type:'line',

	            symbol:'circle',
	            yAxisIndex: 1,
	            data:myChart_four_data["investedRate"]
	        },
	        {
	            name:'上一年度获投率',
	            type:'line',

	            symbol:'circle',
	            yAxisIndex: 1,
	            data:myChart_four_data["investedRateLastYear"]
	        }
	    ]
	};
myChart_four.setOption(option_four ,true);

$("select").eq(0).change(function(){
  com_area($(this).val())
});
$("select").eq(1).change(function(){
  com_industry($(this).val())
});
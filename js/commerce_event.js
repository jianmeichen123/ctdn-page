
//事件总数
sendGetRequest(platformUrl.queryIndexHeaderStat,function(data){
    $("#tzzs").html(data.data.invstedNum);
    $("#bgzs").html(data.data.mergerNum);
    $("#shzs").html(data.data.listedNum);
})

//事件新增数
sendPostRequestByJsonObj(detail.queryHeaderStatCommon,{"type":2},function(data){
     $("#tzadd").html(data.data.invstedNum);
     $("#bgadd").html(data.data.mergerNum);
     $("#shadd").html(data.data.listedNum);
})

//资本地图
var capDist = [];
var capAmount = [];
var capDatas = [];
var map = { '北京':[116.46,39.92 ], '河北':[114.48,38.03], '辽宁':[123.38,41.8], '四川':[104.06,30.67], '安徽':[117.27,31.86], '河南':[113.65,34.76], '呼和浩特':[111.65,40.82], '福建':[119.3,26.08], '黑龙江':[126.63,45.75], '宁夏':[106.27,38.47], '西藏':[91.11,29.97], '甘肃':[103.73,36.03], '湖北':[114.31,30.52], '青海':[101.74,36.56], '新疆':[87.68,43.77], '广东':[113.23,23.16], '湖南':[113,28.21], '山东':[117,36.65], '云南':[102.73,25.04], '广西':[102.73,25.04], '云南':[102.73,25.04], '广西':[108.33,22.84], '吉林':[125.35,43.88], '山西':[112.53,37.87], '浙江':[120.19,30.26], '贵州':[106.71,26.57], '江苏':[118.78,32.04], '陕西':[108.95,34.27], '重庆':[106.54,29.59], '海南':[110.35,20.02], '江西':[115.89,28.68], '上海':[121.48,31.22], '天津':[117.10,39.10], '内蒙古':[111.65,40.82]};
 var geoMap = {};
var capTime = $("#zbdt").val();
$("#zbdt").change(function(){
    capTime = $("#zbdt").val();
    capData();
})

function capData(){
    if(capTime.length){
        if(capTime.indexOf("一")>-1){
            capTime = 4;
        }else if(capTime.indexOf("三")>-1){
            capTime = 5;
        }else if(capTime.indexOf("六")>-1){
            capTime = 6;
        }
    }
    sendGetRequest(detail.getEventDistricts+"/"+capTime,function(data){
       if(capDatas){
            capDatas = [];
        }
        for(i in data.data){
            var capJson = {};
            capJson["name"] = data.data[i].districtSubName;
            capJson["value"] = data.data[i].eventNum;
            geoMap[data.data[i].districtSubName] = map[data.data[i].districtSubName]
            capDatas.push(capJson);
        }
        commerce_one();
    })
}
sendGetRequest(detail.getEventDistricts+"/"+4,function(data){
    for(i in data.data){
        var capJson = {};
        capJson["name"] = data.data[i].districtSubName;
        capJson["value"] = data.data[i].eventNum;
        geoMap[data.data[i].districtSubName] = map[data.data[i].districtSubName]
        capDatas.push(capJson);
        capDist.push(data.data[i].districtSubName);
        capAmount.push(data.data[i].eventNum);
    }
    commerce_one();
})

//资本地图
function commerce_one(){
var myChart = echarts.init(document.getElementById('commerce_one'));
var data = capDatas;
var geoCoordMap = geoMap;

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat((data[i].value))
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
//console.log(categoryData);
//console.log(sum + "   " + count)
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
        roam: false,
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
    	  trigger: 'axis',
    	  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
        formatter:function(params){
                return params[0].data.name+"   "+params[0].data.value+"笔";
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
         tooltip: {
                trigger: 'item',
                formatter:function(params){
                        return params.name+"   "+params.data.value[2]+"笔";
                }
          },
        symbolSize: function(val) {
            return Math.max(val[2] / 50, 8);
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
}



//投资事件分析
var dateData = [];
var numData = [];
var amountData = [];

 var eventTime = $("#eventTime").val();
    var eventDist = $("#eventDist").val();

    $("#eventDist").change(function(){
        eventDist = $(this).val();
        eventAmount();
    })

 $("#eventTime").change(function(){
        eventTime = $(this).val();
        eventAmount();
    })

function eventAmount(){
    if(eventTime.indexOf("一")>-1){
        eventTime = "M";
    }else  if(eventTime.indexOf("三")>-1){
        eventTime = "Q";
    }else  if(eventTime.indexOf("六")>-1){
         eventTime = "Y";
     }
     sendGetRequest(detail.getStagesDistics+"/"+eventTime+"/"+eventDist,function(data){
            if(dateData){
                dateData = [];
            }
            if(numData){
                numData = [];
            }
            if(amountData){
                amountData = [];
            }
            if(eventTime.indexOf("Y")>-1){
                var timeOne = [];
                var numOne = [];
                var amountOne = [];
                for(i in data.data){
                    if(i<6){
                        timeOne.push(data.data[i].timDim);
                        numOne.push(data.data[i].eventNum);
                        amountOne.push(data.data[i].invstAmount);
                    }
                 }
                 for(var i=0;i<6;i++){
                    dateData.push(timeOne[6-i-1]);
                    numData.push(numOne[6-i-1]);
                    amountData.push(amountOne[6-i-1])
                 }
            }else{
                 for(i in data.data){
                    var num = data.data.length-i-1;
                    dateData.push(data.data[num].timDim);
                    numData.push(data.data[num].eventNum);
                    amountData.push(data.data[num].invstAmount);
                 }
            }

     })
     commerce_two();
}

sendGetRequest(detail.getStagesDistics+"/"+"M"+"/"+"所有地区",function(data){
    for(i in data.data){
        var num = data.data.length-i-1;
        dateData.push(data.data[num].timDim);
        numData.push(data.data[num].eventNum);
        amountData.push(data.data[num].invstAmount);
     }
     commerce_two();
})

function commerce_two(){
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
	            data: dateData,
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
//	  		      formatter: '{value}',
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
//	            max: 250,
//	            interval: 50,
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
			            formatter: '{value}'+"万元",
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
//	            max: 25,
//	            interval: 5,
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
	            data:amountData
	        },
	        {
	            name:'获投笔数',
	            type:'line',

	            symbol:'circle',
	            yAxisIndex: 1,
	            data:numData
	        }
	    ]
	};

myChart_two.setOption(option_two,true);
}
//投资事件轮次分析
var roundName = ['初创期','发展期','成熟期'];
var stageOne = [];
var stageTwo = [];
var stageThree = [];
var stageDate = [];
var stageTime = $("#roundDate").val();
var stageDist =$("#roundDist").val();

$("#roundDate").change(function(data){
    stageTime = $(this).val();
    stageTimeChange();
    commerce_three();
})

$("#roundDist").change(function(data){
    stageDist = $(this).val();
    stageTimeChange();
    commerce_three();
})

function stageTimeChange(){
    if(stageTime.length>2){
        if(stageTime.indexOf("一")>-1){
            stageTime = "M"
        }else if(stageTime.indexOf("三")>-1){
            stageTime = "Q"
        }else if(stageTime.indexOf("六")>-1){
            stageTime = "Y"
        }
    }
    sendGetRequest(detail.getStages+stageTime+"/"+stageDist,function(data){
        if(stageOne){
            stageOne = [];
        }
         if(stageTwo){
            stageTwo = [];
        }
        if(stageThree){
            stageThree = [];
        }
        if(stageDate){
            stageDate = [];
        }
        if(stageTime.indexOf("Y")>-1){
            var one = [];
            var two = [];
            var three= [];
            var fourDate = [];
            for(i in data.data[0]){
                if(i<6){
                    one.push(data.data[0][i].eventNum);
                    fourDate.push(data.data[0][i].timDim);
                }
            }
            for(i in data.data[1]){
                if(i<6){
                    two.push(data.data[1][i].eventNum);
                }
            }
            for(i in data.data[2]){
                if(i<6){
                    three.push(data.data[2][i].eventNum);
                }
            }
             for(var i=0;i<6;i++){
                stageOne.push(one[6-1-i]);
                stageDate.push(fourDate[6-i-1]);
                stageTwo.push(two[6-i-1]);
                stageThree.push(three[6-i-1]);
             }
        }else{
            for(i in data.data[0]){
                var num = data.data[0].length-i-1;
                stageOne.push(data.data[0][num].eventNum);
                stageDate.push(data.data[0][num].timDim);
            }
            for(i in data.data[1]){
                var num = data.data[1].length-i-1;
                stageTwo.push(data.data[1][num].eventNum);
            }
            for(i in data.data[2]){
                 var num = data.data[2].length-i-1;
                 stageThree.push(data.data[2][num].eventNum);
            }
        }

    })
    commerce_three();
}
sendGetRequest(detail.getStages+"M"+"/"+"所有地区",function(data){
    for(i in data.data[0]){
        var num = data.data[0].length-i-1;
        stageOne.push(data.data[0][num].eventNum);
        stageDate.push(data.data[0][num].timDim);
    }
    for(i in data.data[1]){
        var num = data.data[1].length-i-1;
        stageTwo.push(data.data[1][num].eventNum);
    }
    for(i in data.data[2]){
         var num = data.data[2].length-i-1;
         stageThree.push(data.data[2][num].eventNum);
    }
    commerce_three();
})

function commerce_three(){
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
	        data:roundName,
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
			data: stageDate,
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
	            name:roundName[0],
	            type:'line',
	            symbol:'circle',
	            data:stageOne
	        },
	        {
	            name:roundName[1],
	            type:'line',
	            symbol:'circle',
	            data:stageTwo
	        },
	        {
	            name:roundName[2],
	            type:'line',
	            symbol:'circle',
	            data:stageThree
	        }
	    ]
	}

myChart_three.setOption(option_three,true); 
}


//并购股权和币种分析
var merName =[];
var merData = [];
var curData = [];
var curName = [];

var merTime = $("#merTime").val();
$("#merTime").change(function(){
    merTime = $(this).val();
    merTimeChange();
    commerce_four_l();
    commerce_four_r();
})

function merTimeChange(){
    if(merTime.length){
        if(merTime.indexOf("一")>-1){
            merTime = 1;
        }else  if(merTime.indexOf("三")>-1){
            merTime = 2;
        }else  if(merTime.indexOf("六")>-1){
            merTime = 3;
        }
    }
    sendGetRequest(detail.getMergerEquitys+"/"+merTime,function(data){
        if(merData){
            merData = [];
        }
        for(i in data.data){
            var merJson = {}
            merJson["name"] = data.data[i].equityRateTypeName;
            merJson["value"] = data.data[i].mergerNum;
            merData.push(merJson);
            merName.push(data.data[i].equityRateTypeName);
        }
    })
    sendGetRequest(detail.getMergerCurrencys+"/"+merTime,function(data){
        if(curData){
            curData = [];
        }
        for(i in data.data){
            var merJson = {}
            if(data.data[i].currencyName){
                merJson["name"] = data.data[i].currencyName;
                merJson["value"] = data.data[i].mergerNum;
                curData.push(merJson);
                curName.push(data.data[i].currencyName)
           }
        }
        commerce_four_r();
    })
}

//股权
sendGetRequest(detail.getMergerEquitys+"/"+1,function(data){
    for(i in data.data){
        var merJson = {}
        merJson["name"] = data.data[i].equityRateTypeName;
        merJson["value"] = data.data[i].mergerNum;
        merData.push(merJson);
        merName.push(data.data[i].equityRateTypeName);
    }
    commerce_four_l();
})

//币种
sendGetRequest(detail.getMergerCurrencys+"/"+1,function(data){
    for(i in data.data){
        var merJson = {}
        if(data.data[i].currencyName){
             merJson["name"] = data.data[i].currencyName;
             merJson["value"] = data.data[i].mergerNum;
             curData.push(merJson);
             curName.push(data.data[i].currencyName)
        }
    }
    commerce_four_r();
})

//股权
function commerce_four_l(){
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
	        data: merName,
	    },
	    series : [
	        {
	            name: '并购股权',
	            type: 'pie',
	            radius : '75%',
	            center: ['50%', '50%'],
	            data:merData,
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
}

//币种
function commerce_four_r(){
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
	        data: curName
	    },
	    series : [
	        {
	            name: '并购币种',
	            type: 'pie',
	            radius : '75%',
	            center: ['50%', '50%'],
	            data:curData,
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
}

//IPO上市地点分布
var listedEx = []
var listedAmount = []
sendGetRequest(detail.getListedExchanges,function(data){
    for(i in data.data){
        listedEx.push(data.data[i].exchangeName)
        listedAmount.push(data.data[i].eventNum)
    }
})

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
	            data: listedEx,
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
//	            max: 250,
//	            interval: 50,
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
	            barWidth: '60',
	            data:listedAmount
	        }
	    ]
	};

myChart_five.setOption(option_five,true);


//并购事件领域分布
var merDate ='';
var merIndName = [];
var merIndNum = [];
$("#merIndustry").change(function(data){
    merDate = $(this).val();
    merDateChange();
})

function merDateChange(){
    if(merDate.length){
        if(merDate.indexOf("一")>-1){
            merDate = 1;
        }else if(merDate.indexOf("三")>-1){
            merDate = 2;
        }else if(merDate.indexOf("六")>-1){
             merDate = 3;
         }
    }
    sendGetRequest(detail.getMergerIndustrys+merDate,function(data){
        if(merIndName){
            merIndName = [];
        }
        if(merIndNum){
            merIndNum = [];
        }
        for(i in data.data){
            merIndName.push(data.data[i].industryName);
            merIndNum.push(data.data[i].mergerNum);
        }
    })
    commerce_six();
}

sendGetRequest(detail.getMergerIndustrys+"1",function(data){
    for(i in data.data){
        merIndName.push(data.data[i].industryName);
        merIndNum.push(data.data[i].mergerNum);
    }
    commerce_six();
})

//并购事件领域分布
function commerce_six(){
var myChart_six = echarts.init(document.getElementById('commerce_six'));
var option_six = {
		 title: {
		        text: '',
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
	        bottom: 10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: merIndName,
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
			    interval:0,
			    rotate:40 ,
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
//	            name: '上市公司数',
	            min: 0,
	            axisLine:{
			        show:false,
			        lineStyle:{
			        	color: '#e6e6e6',
			        	width: 1,
			        	type: 'solid'
			        }
			      },
//	            max: 250,
//	            interval: 50,
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
	            name:'并购数量',
	            type:'bar',
	            data:merIndNum
	        }
	    ]
	};

myChart_six.setOption(option_six,true);
}
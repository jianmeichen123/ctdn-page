//资本地图
`commerce_one()
function commerce_one(){

var myChart = echarts.init(document.getElementById('commerce_one'));

var data = []

sendPostRequestByJsonObj("http://127.0.0.1:8081/api/comOverview/area",json,function(data){
    data = data;
})
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
        center: [75, 36],
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

//投资机构轮次分布
var myChart_two = echarts.init(document.getElementById('commerce_two'));
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
	    
	                   
myChart_two.setOption(option_two,true);

//投资事件轮次分析

var myChart_three = echarts.init(document.getElementById('commerce_three'));
var dataMap = {};
function dataFormatter(obj) {
    var pList = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];
    var temp;
    for (var year = 2002; year <= 2011; year++) {
        var max = 0;
        var sum = 0;
        temp = obj[year];
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
                name : pList[i],
                value : temp[i]
            }
        }
        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = sum;
    }
    return obj;
}

dataMap.dataGDP = dataFormatter({
    //max : 60000,
    2011:[16251.93,11307.28,24515.76,11237.55,14359.88,22226.7,10568.83,12582,19195.69,49110.27,32318.85,15300.65,17560.18,11702.82,45361.85,26931.03,19632.26,19669.56,53210.28,11720.87,2522.66,10011.37,21026.68,5701.84,8893.12,605.83,12512.3,5020.37,1670.44,2102.21,6610.05],
    2010:[14113.58,9224.46,20394.26,9200.86,11672,18457.27,8667.58,10368.6,17165.98,41425.48,27722.31,12359.33,14737.12,9451.26,39169.92,23092.36,15967.61,16037.96,46013.06,9569.85,2064.5,7925.58,17185.48,4602.16,7224.18,507.46,10123.48,4120.75,1350.43,1689.65,5437.47],
    2009:[12153.03,7521.85,17235.48,7358.31,9740.25,15212.49,7278.75,8587,15046.45,34457.3,22990.35,10062.82,12236.53,7655.18,33896.65,19480.46,12961.1,13059.69,39482.56,7759.16,1654.21,6530.01,14151.28,3912.68,6169.75,441.36,8169.8,3387.56,1081.27,1353.31,4277.05],
    2008:[11115,6719.01,16011.97,7315.4,8496.2,13668.58,6426.1,8314.37,14069.87,30981.98,21462.69,8851.66,10823.01,6971.05,30933.28,18018.53,11328.92,11555,36796.71,7021,1503.06,5793.66,12601.23,3561.56,5692.12,394.85,7314.58,3166.82,1018.62,1203.92,4183.21],
    2007:[9846.81,5252.76,13607.32,6024.45,6423.18,11164.3,5284.69,7104,12494.01,26018.48,18753.73,7360.92,9248.53,5800.25,25776.91,15012.46,9333.4,9439.6,31777.01,5823.41,1254.17,4676.13,10562.39,2884.11,4772.52,341.43,5757.29,2703.98,797.35,919.11,3523.16],
    2006:[8117.78,4462.74,11467.6,4878.61,4944.25,9304.52,4275.12,6211.8,10572.24,21742.05,15718.47,6112.5,7583.85,4820.53,21900.19,12362.79,7617.47,7688.67,26587.76,4746.16,1065.67,3907.23,8690.24,2338.98,3988.14,290.76,4743.61,2277.35,648.5,725.9,3045.26],
    2005:[6969.52,3905.64,10012.11,4230.53,3905.03,8047.26,3620.27,5513.7,9247.66,18598.69,13417.68,5350.17,6554.69,4056.76,18366.87,10587.42,6590.19,6596.1,22557.37,3984.1,918.75,3467.72,7385.1,2005.42,3462.73,248.8,3933.72,1933.98,543.32,612.61,2604.19],
    2004:[6033.21,3110.97,8477.63,3571.37,3041.07,6672,3122.01,4750.6,8072.83,15003.6,11648.7,4759.3,5763.35,3456.7,15021.84,8553.79,5633.24,5641.94,18864.62,3433.5,819.66,3034.58,6379.63,1677.8,3081.91,220.34,3175.58,1688.49,466.1,537.11,2209.09],
    2003:[5007.21,2578.03,6921.29,2855.23,2388.38,6002.54,2662.08,4057.4,6694.23,12442.87,9705.02,3923.11,4983.67,2807.41,12078.15,6867.7,4757.45,4659.99,15844.64,2821.11,713.96,2555.72,5333.09,1426.34,2556.02,185.09,2587.72,1399.83,390.2,445.36,1886.35],
    2002:[4315,2150.76,6018.28,2324.8,1940.94,5458.22,2348.54,3637.2,5741.03,10606.85,8003.67,3519.72,4467.55,2450.48,10275.5,6035.48,4212.82,4151.54,13502.42,2523.73,642.73,2232.86,4725.01,1243.43,2312.82,162.04,2253.39,1232.03,340.65,377.16,1612.6]
});

dataMap.dataPI = dataFormatter({
    //max : 4000,
    2011:[136.27,159.72,2905.73,641.42,1306.3,1915.57,1277.44,1701.5,124.94,3064.78,1583.04,2015.31,1612.24,1391.07,3973.85,3512.24,2569.3,2768.03,2665.2,2047.23,659.23,844.52,2983.51,726.22,1411.01,74.47,1220.9,678.75,155.08,184.14,1139.03],
    2010:[124.36,145.58,2562.81,554.48,1095.28,1631.08,1050.15,1302.9,114.15,2540.1,1360.56,1729.02,1363.67,1206.98,3588.28,3258.09,2147,2325.5,2286.98,1675.06,539.83,685.38,2482.89,625.03,1108.38,68.72,988.45,599.28,134.92,159.29,1078.63],
    2009:[118.29,128.85,2207.34,477.59,929.6,1414.9,980.57,1154.33,113.82,2261.86,1163.08,1495.45,1182.74,1098.66,3226.64,2769.05,1795.9,1969.69,2010.27,1458.49,462.19,606.8,2240.61,550.27,1067.6,63.88,789.64,497.05,107.4,127.25,759.74],
    2008:[112.83,122.58,2034.59,313.58,907.95,1302.02,916.72,1088.94,111.8,2100.11,1095.96,1418.09,1158.17,1060.38,3002.65,2658.78,1780,1892.4,1973.05,1453.75,436.04,575.4,2216.15,539.19,1020.56,60.62,753.72,462.27,105.57,118.94,691.07],
    2007:[101.26,110.19,1804.72,311.97,762.1,1133.42,783.8,915.38,101.84,1816.31,986.02,1200.18,1002.11,905.77,2509.14,2217.66,1378,1626.48,1695.57,1241.35,361.07,482.39,2032,446.38,837.35,54.89,592.63,387.55,83.41,97.89,628.72],
    2006:[88.8,103.35,1461.81,276.77,634.94,939.43,672.76,750.14,93.81,1545.05,925.1,1011.03,865.98,786.14,2138.9,1916.74,1140.41,1272.2,1532.17,1032.47,323.48,386.38,1595.48,382.06,724.4,50.9,484.81,334,67.55,79.54,527.8],
    2005:[88.68,112.38,1400,262.42,589.56,882.41,625.61,684.6,90.26,1461.51,892.83,966.5,827.36,727.37,1963.51,1892.01,1082.13,1100.65,1428.27,912.5,300.75,463.4,1481.14,368.94,661.69,48.04,435.77,308.06,65.34,72.07,509.99],
    2004:[87.36,105.28,1370.43,276.3,522.8,798.43,568.69,605.79,83.45,1367.58,814.1,950.5,786.84,664.5,1778.45,1649.29,1020.09,1022.45,1248.59,817.88,278.76,428.05,1379.93,334.5,607.75,44.3,387.88,286.78,60.7,65.33,461.26],
    2003:[84.11,89.91,1064.05,215.19,420.1,615.8,488.23,504.8,81.02,1162.45,717.85,749.4,692.94,560,1480.67,1198.7,798.35,886.47,1072.91,658.78,244.29,339.06,1128.61,298.69,494.6,40.7,302.66,237.91,48.47,55.63,412.9],
    2002:[82.44,84.21,956.84,197.8,374.69,590.2,446.17,474.2,79.68,1110.44,685.2,783.66,664.78,535.98,1390,1288.36,707,847.25,1015.08,601.99,222.89,317.87,1047.95,281.1,463.44,39.75,282.21,215.51,47.31,52.95,305]
});

dataMap.dataSI = dataFormatter({
    //max : 26600,
    2011:[3752.48,5928.32,13126.86,6635.26,8037.69,12152.15,5611.48,5962.41,7927.89,25203.28,16555.58,8309.38,9069.2,6390.55,24017.11,15427.08,9815.94,9361.99,26447.38,5675.32,714.5,5543.04,11029.13,2194.33,3780.32,208.79,6935.59,2377.83,975.18,1056.15,3225.9],
    2010:[3388.38,4840.23,10707.68,5234,6367.69,9976.82,4506.31,5025.15,7218.32,21753.93,14297.93,6436.62,7522.83,5122.88,21238.49,13226.38,7767.24,7343.19,23014.53,4511.68,571,4359.12,8672.18,1800.06,3223.49,163.92,5446.1,1984.97,744.63,827.91,2592.15],
    2009:[2855.55,3987.84,8959.83,3993.8,5114,7906.34,3541.92,4060.72,6001.78,18566.37,11908.49,4905.22,6005.3,3919.45,18901.83,11010.5,6038.08,5687.19,19419.7,3381.54,443.43,3448.77,6711.87,1476.62,2582.53,136.63,4236.42,1527.24,575.33,662.32,1929.59],
    2008:[2626.41,3709.78,8701.34,4242.36,4376.19,7158.84,3097.12,4319.75,6085.84,16993.34,11567.42,4198.93,5318.44,3554.81,17571.98,10259.99,5082.07,5028.93,18502.2,3037.74,423.55,3057.78,5823.39,1370.03,2452.75,115.56,3861.12,1470.34,557.12,609.98,2070.76],
    2007:[2509.4,2892.53,7201.88,3454.49,3193.67,5544.14,2475.45,3695.58,5571.06,14471.26,10154.25,3370.96,4476.42,2975.53,14647.53,8282.83,4143.06,3977.72,16004.61,2425.29,364.26,2368.53,4648.79,1124.79,2038.39,98.48,2986.46,1279.32,419.03,455.04,1647.55],
    2006:[2191.43,2457.08,6110.43,2755.66,2374.96,4566.83,1915.29,3365.31,4969.95,12282.89,8511.51,2711.18,3695.04,2419.74,12574.03,6724.61,3365.08,3187.05,13469.77,1878.56,308.62,1871.65,3775.14,967.54,1705.83,80.1,2452.44,1043.19,331.91,351.58,1459.3],
    2005:[2026.51,2135.07,5271.57,2357.04,1773.21,3869.4,1580.83,2971.68,4381.2,10524.96,7164.75,2245.9,3175.92,1917.47,10478.62,5514.14,2852.12,2612.57,11356.6,1510.68,240.83,1564,3067.23,821.16,1426.42,63.52,1951.36,838.56,264.61,281.05,1164.79],
    2004:[1853.58,1685.93,4301.73,1919.4,1248.27,3061.62,1329.68,2487.04,3892.12,8437.99,6250.38,1844.9,2770.49,1566.4,8478.69,4182.1,2320.6,2190.54,9280.73,1253.7,205.6,1376.91,2489.4,681.5,1281.63,52.74,1553.1,713.3,211.7,244.05,914.47],
    2003:[1487.15,1337.31,3417.56,1463.38,967.49,2898.89,1098.37,2084.7,3209.02,6787.11,5096.38,1535.29,2340.82,1204.33,6485.05,3310.14,1956.02,1777.74,7592.78,984.08,175.82,1135.31,2014.8,569.37,1047.66,47.64,1221.17,572.02,171.92,194.27,719.54],
    2002:[1249.99,1069.08,2911.69,1134.31,754.78,2609.85,943.49,1843.6,2622.45,5604.49,4090.48,1337.04,2036.97,941.77,5184.98,2768.75,1709.89,1523.5,6143.4,846.89,148.88,958.87,1733.38,481.96,934.88,32.72,1007.56,501.69,144.51,153.06,603.15]
});

dataMap.dataTI = dataFormatter({
    //max : 25000,
    2011:[12363.18,5219.24,8483.17,3960.87,5015.89,8158.98,3679.91,4918.09,11142.86,20842.21,14180.23,4975.96,6878.74,3921.2,17370.89,7991.72,7247.02,7539.54,24097.7,3998.33,1148.93,3623.81,7014.04,2781.29,3701.79,322.57,4355.81,1963.79,540.18,861.92,2245.12],
    2010:[10600.84,4238.65,7123.77,3412.38,4209.03,6849.37,3111.12,4040.55,9833.51,17131.45,12063.82,4193.69,5850.62,3121.4,14343.14,6607.89,6053.37,6369.27,20711.55,3383.11,953.67,2881.08,6030.41,2177.07,2892.31,274.82,3688.93,1536.5,470.88,702.45,1766.69],
    2009:[9179.19,3405.16,6068.31,2886.92,3696.65,5891.25,2756.26,3371.95,8930.85,13629.07,9918.78,3662.15,5048.49,2637.07,11768.18,5700.91,5127.12,5402.81,18052.59,2919.13,748.59,2474.44,5198.8,1885.79,2519.62,240.85,3143.74,1363.27,398.54,563.74,1587.72],
    2008:[8375.76,2886.65,5276.04,2759.46,3212.06,5207.72,2412.26,2905.68,7872.23,11888.53,8799.31,3234.64,4346.4,2355.86,10358.64,5099.76,4466.85,4633.67,16321.46,2529.51,643.47,2160.48,4561.69,1652.34,2218.81,218.67,2699.74,1234.21,355.93,475,1421.38],
    2007:[7236.15,2250.04,4600.72,2257.99,2467.41,4486.74,2025.44,2493.04,6821.11,9730.91,7613.46,2789.78,3770,1918.95,8620.24,4511.97,3812.34,3835.4,14076.83,2156.76,528.84,1825.21,3881.6,1312.94,1896.78,188.06,2178.2,1037.11,294.91,366.18,1246.89],
    2006:[5837.55,1902.31,3895.36,1846.18,1934.35,3798.26,1687.07,2096.35,5508.48,7914.11,6281.86,2390.29,3022.83,1614.65,7187.26,3721.44,3111.98,3229.42,11585.82,1835.12,433.57,1649.2,3319.62,989.38,1557.91,159.76,1806.36,900.16,249.04,294.78,1058.16],
    2005:[4854.33,1658.19,3340.54,1611.07,1542.26,3295.45,1413.83,1857.42,4776.2,6612.22,5360.1,2137.77,2551.41,1411.92,5924.74,3181.27,2655.94,2882.88,9772.5,1560.92,377.17,1440.32,2836.73,815.32,1374.62,137.24,1546.59,787.36,213.37,259.49,929.41],
    2004:[4092.27,1319.76,2805.47,1375.67,1270,2811.95,1223.64,1657.77,4097.26,5198.03,4584.22,1963.9,2206.02,1225.8,4764.7,2722.4,2292.55,2428.95,8335.3,1361.92,335.3,1229.62,2510.3,661.8,1192.53,123.3,1234.6,688.41,193.7,227.73,833.36],
    2003:[3435.95,1150.81,2439.68,1176.65,1000.79,2487.85,1075.48,1467.9,3404.19,4493.31,3890.79,1638.42,1949.91,1043.08,4112.43,2358.86,2003.08,1995.78,7178.94,1178.25,293.85,1081.35,2189.68,558.28,1013.76,96.76,1063.89,589.91,169.81,195.46,753.91],
    2002:[2982.57,997.47,2149.75,992.69,811.47,2258.17,958.88,1319.4,3038.9,3891.92,3227.99,1399.02,1765.8,972.73,3700.52,1978.37,1795.93,1780.79,6343.94,1074.85,270.96,956.12,1943.68,480.37,914.5,89.56,963.62,514.83,148.83,171.14,704.5]
});






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
            data: [
                '2002-01-01','2003-01-01','2004-01-01',
              /*  {
                    value: '2005-01-01',
                    tooltip: {
                        formatter: '{b} GDP达到一个高度'
                    },
                    symbol: 'diamond',
                    symbolSize: 16
                },*/
                '2006-01-01', '2007-01-01','2008-01-01','2009-01-01','2010-01-01',
               /* {
                    value: '2011-01-01',
                    tooltip: {
                        formatter: function (params) {
                            return params.name + 'GDP达到又一个高度';
                        }
                    },
                    symbol: 'diamond',
                    symbolSize: 18
                },*/
            ],
            label: {
                formatter : function(s) {
                    return (new Date(s)).getFullYear();
                }
            }
        },
        title: {
            subtext: ''
        },
        tooltip: {
        },
        /*legend: {
            x: 'right',
            data: ['第一产业', '第二产业', '第三产业', 'GDP', '金融', '房地产'],
            selected: {
                'GDP': false, '金融': false, '房地产': false
            }
        },*/
        calculable : true,
       color:['#5ab3f0','#7db1ff','#58c9f2'],
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
                            return params.value.replace('\n', '');
                        }
                    }
                }
            }
        },
        xAxis: [
            {
                'type':'category',
                'axisLabel':{'interval':0},
                'data':[
                    '北京','\n天津','河北','\n山西','内蒙古','\n辽宁','吉林','\n黑龙江',
                    '上海','\n江苏','浙江','\n安徽','福建','\n江西','山东','\n河南',
                    '湖北','\n湖南','广东','\n广西','海南','\n重庆','四川','\n贵州',
                    '云南','\n西藏','陕西','\n甘肃','青海','\n宁夏','新疆'
                ],
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
            {name: 'GDP', type: 'bar'},
            {
                name: 'GDP占比',
                type: 'pie',
                center: ['85%', '20%'],
                radius: '28%',
                z: 100
            }
        ]
    },
    options: [
        {
            series: [
                {data: dataMap.dataGDP['2002']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2002sum']},
                    {name: '第二产业', value: dataMap.dataSI['2002sum']},
                    {name: '第三产业', value: dataMap.dataTI['2002sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2003']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2003sum']},
                    {name: '第二产业', value: dataMap.dataSI['2003sum']},
                    {name: '第三产业', value: dataMap.dataTI['2003sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2004']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2004sum']},
                    {name: '第二产业', value: dataMap.dataSI['2004sum']},
                    {name: '第三产业', value: dataMap.dataTI['2004sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2005']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2005sum']},
                    {name: '第二产业', value: dataMap.dataSI['2005sum']},
                    {name: '第三产业', value: dataMap.dataTI['2005sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2006']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2006sum']},
                    {name: '第二产业', value: dataMap.dataSI['2006sum']},
                    {name: '第三产业', value: dataMap.dataTI['2006sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2007']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2007sum']},
                    {name: '第二产业', value: dataMap.dataSI['2007sum']},
                    {name: '第三产业', value: dataMap.dataTI['2007sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2008']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2008sum']},
                    {name: '第二产业', value: dataMap.dataSI['2008sum']},
                    {name: '第三产业', value: dataMap.dataTI['2008sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2009']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2009sum']},
                    {name: '第二产业', value: dataMap.dataSI['2009sum']},
                    {name: '第三产业', value: dataMap.dataTI['2009sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2010']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2010sum']},
                    {name: '第二产业', value: dataMap.dataSI['2010sum']},
                    {name: '第三产业', value: dataMap.dataTI['2010sum']}
                ]}
            ]
        },
        {
            series : [
                {data: dataMap.dataGDP['2011']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2011sum']},
                    {name: '第二产业', value: dataMap.dataSI['2011sum']},
                    {name: '第三产业', value: dataMap.dataTI['2011sum']}
                ]}
            ]
        }
    ]
};

myChart_three.setOption(option_three,true); 

//并购股权和币种分析

var myChart_four = echarts.init(document.getElementById('commerce_four')); 
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
	    color:['#63e4ec','#12c1cc','#ee9898','#ffe0aa'],
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
	        data:['未获投公司数','获投公司数','本年度获投率','上一年度获投率'],
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
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	        {
	            name:'获投公司数',
	            type:'bar',
	            barCategoryGap: '30',
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	        {
	            name:'本年度获投率',
	            type:'line',

	            symbol:'circle',
	            yAxisIndex: 1,
	            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	        },
	        {
	            name:'上一年度获投率',
	            type:'line',

	            symbol:'circle',
	            yAxisIndex: 1,
	            data:[4.0, 2.32, 3.23, 14.5, 6.3, 12.2, 10.3, 23.4, 23.4, 14.5, 15.0, 6.6]
	        }
	    ]
	};
myChart_four.setOption(option_four ,true); 


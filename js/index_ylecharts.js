//图标切换标识 (1、行业融资趋势 2、行业融资对比) 默认行业融资
var echarts_flag = 1
//图表按投资笔数或融资金额显示 按融资笔数(1) 按融资金额(2) 默认融资笔数
var query_flag = 1
//基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main_yl'));
var industry_data = null
var round_data = null
var yAxis_name = '按融资笔数'
var myChart_default_industry_num = 29
var myChartDB_default_industry_num = 29
var markLine ={}
var avg_data = new Array()
var data1 = {}
data1['type'] = 'average'
data1['name'] = '平均值'
var normal = {}
normal['color'] = 'black'
data1['itemStyle'] = normal
avg_data[0] = data1
markLine['data'] = avg_data
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
        trigger: 'axis',
        type:'solid'
    },
    legend: {
    	 x : 'right',
         y : 'bottom',
        data:['邮件营销','联盟广告'],
        selected:{
        	"邮件营销":true,
        	"联盟广告":true
        },
        type:'scroll',
        bottom: 10,
    },
    grid: {
        left: '3%',
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
		  show:false,
		  lineStyle:{
		  	color: '#e2e3e4',
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
                 splitLine :{show:true},
                 scale:true,
                 top:0,
                 name:'融资笔数',

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
			        	color: '#e2e3e4',
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
            name:'邮件营销',
            type:'line',
            symbol:'circle',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            symbol:'circle',
            data:[220, 182, 191, 234, 290, 330, 310]
        }
    ]
};
sendPostRequestByJsonStr(detail.queryIndustryMonthForEchart,null,function(data){
	if(data.success){
		industry_data = data
		showEcharts()
	}
});

sendPostRequestByJsonStr(detail.queryIndustryMonthMergerForEchart,null,function(data){
	if(data.success){
		round_data = data
//		showEcharts()
	}
});

//行业融资对比

var myChart_db = echarts.init(document.getElementById('main_yl_db'));
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
         y : '400',
        data:[ 'A轮','B轮','C轮','D轮','D轮以上']
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
            name:'D轮以上',
            type:'bar',
            stack: '总量',
            barWidth : 15,//柱图宽度
            data:[820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
};

$('#main_yl_db').hide();
$('.eachrst_tit [cmd="yl_tit"]').click(function(){
	var name = $(this).attr('name');
	$('.eachrst_tit .fl span').removeClass('eachrst_tit_on')
	$(this).addClass('eachrst_tit_on');
	//$('#main_yl').html('')
	if(name=='one'){
		echarts_flag = 1
		$('#main_yl').show()
		$('#main_yl_db').hide();
	}else{
		echarts_flag = 2
		$('#main_yl_db').show();
		$('#main_yl').hide();
	}
	showEcharts()
})
//按融资笔数(1) 按融资金额(2) 切换
$('#num_or_money span').click(function(){
	yAxis_name = $(this).text()
	$('#num_or_money span').removeClass('eachrst_tit_on')
	$(this).addClass('eachrst_tit_on')
	var lang = $(this).attr('lang')
	query_flag = lang
	showEcharts()
})
function showEcharts(){
	if(echarts_flag == 1 ){ //图表1
		if(industry_data==null){
			return
		}
		option.xAxis[0].data = industry_data.data.xAxis
		option.yAxis[0].name = yAxis_name
		var legend = industry_data.data.legend.slice(0,myChart_default_industry_num)
		legend.push('平均值')
		option.legend.data=legend
	
		var series =  industry_data.data.series.slice(0,myChart_default_industry_num)
		var num_array = [0,0,0,0,0,0,0,0,0,0,0,0]
		for(var j=0;j<series.length;j++){
			var entity = series[j]
			var json = {}
			if(query_flag == 1){
				for(var m = 0;m<num_array.length;m++){
					num_array[m] = parseInt(entity.investedNumStrList[m]) + num_array[m] 
				}
			}
			if(query_flag == 2){
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
		if(query_flag == 1){
			avg_json['investedNumStrList'] = num_array
		}
		if(query_flag == 2){
			avg_json['investedAmountStrList'] = num_array
		}
		
		series.push(avg_json)
		var y_data =  new Array()
		for(var i=0;i<series.length;i++){
			var entity = series[i]
			var json = {}
			json['name'] = entity.industryName
			if(query_flag == 1){
				json['data'] = entity.investedNumStrList
			}
			if(query_flag == 2){
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
	if(echarts_flag == 2) { //图表2
		if(round_data==null){
			return
		}
		option_db.xAxis[0].data = round_data.data.xAxis.slice(0,myChartDB_default_industry_num)
		option_db.legend.data=round_data.data.legend
		option_db.yAxis[0].name = yAxis_name
		var series =  round_data.data.series.slice(0,myChartDB_default_industry_num)
		var y_data =  new Array()
		for(var i=0;i<series.length;i++){
			var entity = series[i]
			var json = {}
			json['name'] = entity.roundName
			if(query_flag == 1){
				json['data'] = entity.investedNumList
			}
			if(query_flag == 2){
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
}
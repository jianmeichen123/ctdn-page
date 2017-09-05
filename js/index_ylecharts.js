//基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main_yl'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: ''
    },
    color: [
        '#000', '#000', '#da70d6', '#32cd32', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
        '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
    ],
    tooltip: {
        trigger: 'axis',
        type:'solid'
    },
    legend: {
    	 x : 'right',
         y : 'bottom',
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
        },
        {
            name:'视频广告',
            type:'line',
            symbol:'circle',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            symbol:'circle',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            symbol:'circle',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

//行业融资对比

var myChart_db = echarts.init(document.getElementById('main_yl_db'));
var option_db = {
    tooltip : {
        trigger: 'axis',
    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
    }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '100',
        containLabel: true
    },
    color: [
        '#227bea', '#389aff', '#5ea7ff', '#91c3ff', '#12e9e6',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
        '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
    ],
    legend: {
    	 x : 'right',
         y : 'bottom',
        data:['种子/天使/PreA轮', 'A轮','B轮','C轮','D轮','D轮以上']
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
    {
		type : 'category',
		splitLine :{show:false},
		boundaryGap: false,
		 data : ['金融科技','互联网银行','电子商务','O2O','人工智能'],
		scale:true,
		top:0,			
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
		    interval:0,  
		rotate:40 ,
		    textStyle: {
		    	color: '#333333',
		        fontSize:'12'
		    }
		}
		     
	 }
    ],
    yAxis : [
	    	 {
                 type : 'value',
                 splitLine :{show:true},
                 scale:true,
                 top:0,
                 name:'新增投资事件',

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
    series : [
        {
            name:'种子/天使/PreA轮',
            type:'bar',
            stack: '总量',
            barWidth : 15,//柱图宽度
           // itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[320, 302, 301, 334, 390, 330, 320]
        },
        {
            name:'A轮',
            type:'bar',
            stack: '总量',
            barWidth : 15,//柱图宽度
           // itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'B轮',
            type:'bar',
            stack: '总量',
            barWidth : 15,//柱图宽度
           // itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'C轮',
            type:'bar',
            stack: '总量',
            barWidth : 15,//柱图宽度
           // itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[150, 212, 201, 154, 190, 330, 410]
        },
        {
            name:'D轮',
            type:'bar',
            stack: '总量',
            barWidth : 15,//柱图宽度
            //itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[820, 832, 901, 934, 1290, 1330, 1320]
        },
        {
            name:'D轮以上',
            type:'bar',
            stack: '总量',
            barWidth : 15,//柱图宽度
            //itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
};

myChart_db.setOption(option_db);
$('#main_yl_db').hide();
$('.eachrst_tit [cmd="yl_tit"]').click(function(){
	var name = $(this).attr('name');
	$('.eachrst_tit .fl span').removeClass('eachrst_tit_on')
	$(this).addClass('eachrst_tit_on');
	//$('#main_yl').html('')
	if(name=='one'){
		$('#main_yl').show()
		$('#main_yl_db').hide();
	}else{
		$('#main_yl_db').show();
		$('#main_yl').hide();

		myChart_db.setOption(option_db)
	}
})
/**
 * 商业洞察-机构分析
 */
var myChart = echarts.init(document.getElementById('commerce_in'));
var org_chart= {
	initParentIndustries:function(parentId){ //获取行业
		sendPostRequestByJsonObj(detail.childIndustries　+ "/" + parentId,null,function(data){
			console.log(data.success)
			if(data.success){
				$("#industry ul").html("");
				$("#industry ul").append("<li  onclick=\"org_chart.load(this)\" class=\"trade_list_on\" lang=\"0\" style=\"cursor:pointer;\">全部</li>")
				$("#industry_script").tmpl(data).appendTo($("#industry ul"))
			}else{
				
			}
		});
	},
	load:function(obj){ 
		$('.partner_div').hide()
		$('.compete_div').hide()
		//加载图表
		$('#industry li').removeClass('trade_list_on')
		if(obj){
			$(obj).addClass('trade_list_on')
		}else{
			$('#industry li').first().addClass('trade_list_on')
		}
		var id = $('#industry ul').find('.trade_list_on').first().attr('lang');
		var value = $('#industry ul').find('.trade_list_on').first().text();
		$('#selected_title').text(value)	
		var industryType = 1 //一级行业
		if(id !=0){
			industryType = 2 //二级行业
		}else{
			id = null
		}
		var industry_timeType = $('#orgIndustry option:selected').val()
		var round_timeType = $('#orgRound option:selected').val()
		var project_timeType = $('#orgProject option:selected').val()
		this.loadHeaderInfo(id) //历史累计、新增
		this.loadOrgIndustry(id,industry_timeType,industryType) //行业分布
		this.loadOrgRound(id,round_timeType,industryType) //轮次分布
		this.loadOrgProject(id,project_timeType,industryType) //关系图谱
	},
	loadHeaderInfo:function(id){
		
	},
	loadOrgIndustry:function(id,timeType,industryType){
		var json = {
			"timeType":timeType,
			"industryType":industryType,
			"industryId":id
		}
		sendPostRequestByJsonObj(detail.orgIndustry,json,function(data){
			if(data.success){
				$.each(data.data,function(key,value){
					for(i in value){
						if(i == 'orgJson'){
							var orgJson = value[i]
							console.log(orgJson)
	                        var orgArr = eval(orgJson );
							console.log( typeof orgArr)
							value.arr = orgArr
						}
					}
				})
				$("#orgIndustry_tbody").html("");
				$("#orgIndustry_script").tmpl(data).appendTo($("#orgIndustry_tbody"))
			}else{
				console.log(data)
				$("#orgIndustry_script").tmpl(null).appendTo($("#orgIndustry_tbody"))
			}
		});
	},
	loadOrgRound:function(id,timeType,industryType){
		var json = {
				"timeType":timeType,
				"industryType":industryType,
				"industryId":id
			}
		sendPostRequestByJsonObj(detail.orgRound,json,function(data){
			if(data.success){
				$.each(data.data,function(key,value){
					for(i in value){
						if(i == 'orgJson'){
							var orgJson = value[i]
							console.log(orgJson)
	                        var orgArr = eval(orgJson );
							console.log( typeof orgArr)
							value.arr = orgArr
						}
					}
				})
				$("#orgRound_tbody").html("");
				$("#orgRound_script").tmpl(data).appendTo($("#orgRound_tbody"))
			}else{
				$("#orgRound_tbody").html("");
				$("#orgRound_script").tmpl(null).appendTo($("#orgRound_tbody"))
			}
		});
	},
	loadOrgProject:function(id,timeType,industryType){
		var json = {
				"timeType":timeType,
				"industryType":industryType,
				"industryId":id
			}
		sendPostRequestByJsonObj(detail.orgProject,json,function(data){
			if(data.success){
				var linksArr =  new Array()
				var projOrgArr = data.data.chartProjectOrgList
				for(var m=0;m<projOrgArr.length;m++){
					var json = {}
					json['source'] = projOrgArr[m].source
					json['target'] = projOrgArr[m].target
					linksArr.push(json)
				}
				console.log(linksArr)
				option.series[0].links = linksArr
				var dataArr = new Array()
				var projNameArr = data.data.projectNameList
				for(var i=0;i<projNameArr.length;i++){
					var json = {}
					json['name'] = projNameArr[i].projName
					json['category'] = '投资项目'
					json['symbolSize'] = 60
					json['draggable'] = "true"
					dataArr.push(json)
				}
				var orgNameArr = data.data.orgNameList
				for(var j=0;j<orgNameArr.length;j++){
					var json = {}
					json['name'] = orgNameArr[j].orgName
					json['category'] = '投资机构'
					json['symbolSize'] = 60
					json['draggable'] = "true"
//					json['value'] = 1
					json['code'] = orgNameArr[j].orgCode
					dataArr.push(json)
				}
				console.log(option)
				option.series[0].data = dataArr
				myChart.setOption(option,true);
				console.log(option)
			}else{
				
			}
		});
	},
	loadChartBySelectTimeType:function(type){
		var id = $('#industry ul').find('.trade_list_on').first().attr('lang');
		var industryType = 1 //一级行业
		if(id !=0){
			industryType = 2 //二级行业
		}else{
			id = null
		}
		if(type == '1'){ //行业分布
			var timeType = $('#orgIndustry option:selected').val()
			this.loadOrgIndustry(id,timeType,industryType)
		}else if(type == '2'){ //轮次分布
			var timeType = $('#orgRound option:selected').val()
			this.loadOrgRound(id,timeType,industryType) //轮次分布
		}else{ //关系图谱
			var timeType = $('#orgProject option:selected').val()
			this.loadOrgProject(id,timeType,industryType) //关系图谱
		}
	},
	graphClick:function(orgCode,name){
		$('.clicked_org').text(name)
		if(!orgCode){
			return
		}
		var id = $('#industry ul').find('.trade_list_on').first().attr('lang');
		var industryType = 1 //一级行业
		if(id !=0){
			industryType = 2 //二级行业
		}else{
			id = null
		}
		var timeType = $('#orgProject option:selected').val()
		var json = {
				"timeType":timeType,
				"industryType":industryType,
				"industryId":id,
				"orgCode":orgCode
			}
		sendPostRequestByJsonObj(detail.getOrgPartnerAndCompeteCount,json,function(data){
			if(data.success){
				var competeCount = data.data.competeCount
				var partnerCount = data.data.partnerCount
				if(competeCount ==0 && partnerCount ==0){
				}else{
					org_chart.loadProjOrgPartner(data.data.orgCode)
					$('.partner_div').show()
					$('.compete_div').show()
				}
			}else{
				
			}
		});
	},
	loadProjOrgPartner:function(orgCode){
		if(!orgCode){
			return
		}
		var id = $('#industry ul').find('.trade_list_on').first().attr('lang');
		var industryType = 1 //一级行业
		if(id !=0){
			industryType = 2 //二级行业
		}
		var timeType = $('#orgProject option:selected').val()
		var json = {
				"timeType":timeType,
				"industryType":industryType,
				"industryId":id,
				"orgCode":orgCode
			}
		sendPostRequestByJsonObj(detail.orgPartner,json,function(data){
			if(data.success){
				$.each(data.data.partnerList,function(key,value){
					for(i in value){
						if(i=='orgJson'){
							value.orgList = eval(value[i])
						}
					}
				})
				console.log(data)
				$("#partner_tr").html("");
				$("#partner_tr_script").tmpl(data).appendTo($("#partner_tr"))
				$("#partner_tbody").html("");
				$("#partner_tbody_script").tmpl(data).appendTo($("#partner_tbody"))
			}else{
				
			}
		})	
	}
}
var  option = {
	    title: {
	    },
	    tooltip: {},
	    color:['#4cbce6', '#fbb271',],
	    legend: [{
	        formatter: function(name) {
	            return echarts.format.truncateText(name, 80, '14px Microsoft Yahei', '…');
	        },
	        tooltip: {
	            show: true
	        },
	        selectedMode: 'false',
	        left: 20,
	        data: ['投资项目', '投资机构']
	    }],
	    toolbox: {
	        show: false,
	        feature: {
	            dataView: {
	                show: true,
	                readOnly: true
	            },
	            restore: {
	                show: true
	            },
	            saveAsImage: {
	                show: true
	            }
	        }
	    },
	    animationDuration: 3000,
	    animationEasingUpdate: 'quinticInOut',
	    series: [{
	        type: 'graph',
	        layout: 'force',

	        force: {
	            repulsion: 300
	        },
	        data: null,
	        links:null,
	        categories: [{
	            'name': '投资项目'
	        }, {
	            'name': '投资机构'
	        }],
	        focusNodeAdjacency: true,
	        roam: true,
	        label: {
	            normal: {

	                show: true,
	                position: 'top',

	            }
	        },
	        lineStyle: {
	            normal: {
	                color: 'source',
	                curveness: 0,
	                type: "solid"
	            }
	        }
	    }]
	}; 
	//关系图谱点击机构事件
	myChart.on('click', function (params) {
		if(!params.data.code){
			return
		}
		org_chart.graphClick('4',params.data.name);
	});
$(function(){
	org_chart.initParentIndustries(0)
	org_chart.load()
})

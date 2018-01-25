/**
 * 商业洞察-机构分析
 */
var myChart = echarts.init(document.getElementById('commerce_in'));
var org_chart= {
	loadTotalHeader:function(){
		sendPostRequestByJsonObjInOrgChart(detail.queryGGTotalHeaderStat,null,function(data){
			if(data.data){
		    $("#investedProjNum_total").text(data.data.orgNum)
		    $("#eventNum_total").text(data.data.invstEventNum)
		    $("#amount_total").text(data.data.invstAmount)
			}
		})
	},
	loadMonthAddHeader:function(){
		sendPostRequestByJsonObjInOrgChart(detail.queryGGCurMonthHeaderStat,null,function(data){
			if(data.data){
			    $("#investedProjNum_curmonth").text(data.data.orgNum)
			    $("#eventNum_curmonth").text(data.data.invstEventNum)
			    $("#amount_curmonth").text(data.data.invstAmount)
			}
		})
	},
	initParentIndustries:function(parentId){ //获取行业
		sendPostRequestByJsonObjInOrgChart(detail.childIndustries　+ "/" + parentId,null,function(data){
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
			$('#current_month').hide()
			industryType = 2 //二级行业
		}else{
			$('#current_month').show()
			id = null
		}
		var industry_timeType = $('#orgIndustry option:selected').val()
		var round_timeType = $('#orgRound option:selected').val()
		var project_timeType = $('#orgProject option:selected').val()
	
		this.loadOrgIndustry(id,industry_timeType,industryType) //行业分布
		this.loadOrgRound(id,round_timeType,industryType) //轮次分布
		this.loadOrgProject(id,project_timeType,industryType) //关系图谱
	},
	loadOrgIndustry:function(id,timeType,industryType){
		var json = {
			"timeType":timeType,
			"industryType":industryType,
			"industryId":id
		}
		sendPostRequestByJsonObjInOrgChart(detail.orgIndustry,json,function(data){
			if(data.success){
				//计算总量
				var orgNum_max = 0
				$.each(data.data,function(key,value){
					if(key ==0){
						for(i in value){
							if(i =='orgNum'){
								orgNum_max = parseInt(value[i])
							}
						}
					}
				})
				
				$.each(data.data,function(key,value){
					for(i in value){
						if(i == 'orgJson'){
							var orgJson = value[i]
	                        var orgArr = eval(orgJson );
							value.arr = orgArr
						}
						if(i == 'orgNum'){
							var rate = (parseInt(value[i])/orgNum_max)*412*0.8*(timeType/5)
							value.rate=parseInt(rate)
						}
					}
				})
				$("#orgIndustry_tbody").html("");
				$("#orgIndustry_script").tmpl(data).appendTo($("#orgIndustry_tbody"))
			}else{
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
		sendPostRequestByJsonObjInOrgChart(detail.orgRound,json,function(data){
			if(data.success){
				//计算总量
				var orgNum_sum = 0
				$.each(data.data,function(key,value){
					if(key ==0){
						for(i in value){
							if(i =='orgNum'){
								orgNum_max = parseInt(value[i])
							}
						}
					}
				})
				
				$.each(data.data,function(key,value){
					for(i in value){
						if(i == 'orgJson'){
							var orgJson = value[i]
	                        var orgArr = eval(orgJson );
							value.arr = orgArr
						}
						if(i == 'orgNum'){
							var rate = (parseInt(value[i])/orgNum_max)*412*0.8*(timeType/5)
							value.rate=parseInt(rate)
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
		sendPostRequestByJsonObjInOrgChart(detail.orgProject,json,function(data){
			if(data.success){
				var linksArr =  new Array()
				var projOrgArr = data.data.chartProjectOrgList
				for(var m=0;m<projOrgArr.length;m++){
					var json = {}
					json['source'] = projOrgArr[m].orgName
					json['target'] = projOrgArr[m].projName
					linksArr.push(json)
				}
				option.series[0].links = linksArr
				var dataArr = new Array()
				var projNameArr = data.data.projNames
				for(var i=0;i<projNameArr.length;i++){
					var json = {}
					json['name'] = projNameArr[i]
					json['category'] = '投资项目'
					json['symbolSize'] = 60
//					json['symbol']='circle'
					json['draggable'] = true
					dataArr.push(json)
				}
				var orgNameArr = data.data.orgNames
				for(var j=0;j<orgNameArr.length;j++){
					var json = {}
					var orgNamesAndCodes  = orgNameArr[j].split(':')
					json['name'] = orgNamesAndCodes[0]
					json['category'] = '投资机构'
					json['symbolSize'] = 60
					json['draggable'] = false
//					json['symbol']='circle'
//					json['value'] = 1
					json['code'] = orgNamesAndCodes[1]
					dataArr.push(json)
				}
				option.series[0].data = dataArr
				console.log(option)
				myChart.setOption(option,true);
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
		sendPostRequestByJsonObjInOrgChart(detail.getOrgPartnerAndCompeteCount,json,function(data){
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
		sendPostRequestByJsonObjInOrgChart(detail.orgPartner,json,function(data){
			if(data.success){
				$("#partner_tr").html("");
				$("#partner_tr_script").tmpl(data).appendTo($("#partner_tr"))
				if(data.data.partnerList==null || data.data.partnerList.length==0){
					$("#partner_tbody").html('<tr ><td style="text-align:center;"  colspan="'+(data.data.industryList.length+2)+'" >暂无数据</td></tr>')
					return
				}
				$.each(data.data.partnerList,function(key,value){
					for(i in value){
						if(i=='orgJson'){
							var arr  = new Array()
							var org_list = value[i].split(',')
							for(var j=0;j<org_list.length;j++){
								var json = {}
								var org = org_list[j]
								var org_arr = org.split(':')
								var name = org_arr[0]
								var orgEventNum = org_arr[1]
								json['name'] = name
								json['num'] = orgEventNum
								arr.push(json)
							}
							value.orgList = arr
						}
					}
				})
				$("#partner_tr").html("");
				$("#partner_tr_script").tmpl(data).appendTo($("#partner_tr"))
				$("#partner_tbody").html("");
				$("#partner_tbody_script").tmpl(data).appendTo($("#partner_tbody"))
			}else{
				
			}
		})
		//jingzheng
		sendPostRequestByJsonObjInOrgChart(detail.orgCompete,json,function(data){
			if(data.success){
				$("#compete_tr").html("");
				$("#compete_tr_script").tmpl(data).appendTo($("#compete_tr"))
				if(data.data.competeList== null || data.data.competeList.length==0){
					$("#compete_tbody").html('<tr ><td style="text-align:center;"  colspan="'+(data.data.industryList.length+2)+'" >暂无数据</td></tr>')
					return
				}
				$.each(data.data.competeList,function(key,value){
					for(i in value){
						if(i=='orgJson'){
//							value.orgList = eval(value[i])
//							var json_arr = eval(value[i])
//							for(var j=0;j<json_arr.length;j++){
//								var json = json_arr[j]
//								var orgEventNum = json.orgEventNum
//								var competeOrgEventNum = json.competeOrgEventNum
//								var sum = parseInt(orgEventNum) + parseInt(competeOrgEventNum)
//								if(sum ==0){
//									json['rate'] = 0
//								}else{
//									json['rate'] = competeOrgEventNum/ sum
//								}
//							}
//							value.orgList = json_arr
							
							var arr  = new Array()
							var org_list = value[i].split(',')
							for(var i=0;i<org_list.length;i++){
								var json = {}
								var org = org_list[i]
								var org_arr = org.split(':')
								var name = org_arr[0]
								var orgEventNum = org_arr[1]
								var competeOrgEventNum = org_arr[2]
								var sum = parseInt(orgEventNum) + parseInt(competeOrgEventNum)
								if(sum ==0){
									json['rate'] = 0
								}else{
									var rate = (competeOrgEventNum/ sum).toFixed(2)
									if(rate==0.00){
										rate = -(orgEventNum/ sum).toFixed(2)
									}
									json['rate'] = rate
								}
								json['name'] = name
								json['orgEventNum'] = orgEventNum
								json['competeOrgEventNum'] = competeOrgEventNum
								arr.push(json)
								console.log(json)
							}
							value.orgList = arr
							
						}
					}
				})
				$("#compete_tr").html("");
				$("#compete_tr_script").tmpl(data).appendTo($("#compete_tr"))
				$("#compete_tbody").html("");
				$("#compete_tbody_script").tmpl(data).appendTo($("#compete_tbody"))
				pie1.init();
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
	        data: ['投资项目', '投资机构'],
	        icon: 'circle'
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
	        cursor:'pointer',
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
		$('.partner_div').hide()
		$('.compete_div').hide()
		if(!params.data.code){
			return
		}
		org_chart.graphClick(params.data.code,params.data.name);
	});
$(function(){
//	org_chart.initParentIndustries(0)
	org_chart.loadTotalHeader()
	org_chart.loadMonthAddHeader()
	org_chart.load()
})

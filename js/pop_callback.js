var opCallBack={
  weibo :function(data){
        if (data.success){
            var  date = []
            var weibo =[]
            var fans =[]
            var follow = []
            $(data.data).each(function(i,e){
                var str = e.date.toString()
                date.push(str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8))
                weibo.push(e.weibo)
                fans.push(e.fans)
				follow.push(e.follow)
            });
            option_download.xAxis[0].data = date

            var myChart_option_download = echarts.init(document.getElementById('option_download'));
            option_download.series[0].data = weibo
            myChart_option_download.setOption(option_download);

            var myChart_option_rveryday = echarts.init(document.getElementById('option_rveryday'));
            option_download.series[0].data = fans
            myChart_option_rveryday.setOption(option_download)

            var myChart_option_star = echarts.init(document.getElementById('option_star'));
            option_download.series[0].data = follow
            myChart_option_star.setOption(option_download)
        }

    },
         ios :function(data){
                if (data.downData.success){
                    var  date = []
                    var downday =[]
                    var downsum =[]
                    $(data.downData.data).each(function(i,e){
                        var str = e.date.toString()
                        date.push(str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8))
                        downday.push(e.downday)
                        downsum.push(e.downsum)
                    });
                    var myChart_option_download = echarts.init(document.getElementById('option_download'));
                    option_download.xAxis[0].data = date
                    option_download.series[0].data = downsum
                    if(downsum.length > 0){
                        $("#down-count").html("下载量:"+downsum[downsum.length-1])
                    }
                    myChart_option_download.setOption(option_download);

                    var myChart_option_rveryday = echarts.init(document.getElementById('option_rveryday'));
                    option_download.series[0].data = downday
                    if(downday.length > 0){
                        $("#down-add-count").html("昨日新增下载量:"+downday[downday.length-1])
                    }
                    myChart_option_rveryday.setOption(option_download)
                }
                if (data.rateDailyData.success){
                    var  date = []
                    var negetives =[]
                    var positives =[]
                    $(data.rateDailyData.data).each(function(i,e){
                        var str = e.date.toString()
                        date.push(str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8))
                        negetives.push(e.negetives)
                        positives.push(e.positives)
                    });

                    var myChart_option_star = echarts.init(document.getElementById('option_star'));
                	option_start.xAxis[0].data = date
                	option_start.series[0].data = positives
                	option_start.series[1].data = negetives
                	myChart_option_star.setOption(option_start)
                }
                if(data.rateData.success){
                    $(data.rateDailyData.data).each(function(i,e){
                        var str = e.date.toString()
                        date.push(str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8))
                        negetives.push(e.negetives)
                        positives.push(e.positives)
                    });
                }
                if(data.rateData.success){
                    $(data.rateData.data).each(function(i,e){
                        var li = $('li[star-type="'+e.type+'"]')
                        li.find(".name_grade_cent_1").html(e.avgr/10)
                        li.find(".name_grade_cent_2").html("评分次数："+e.sumr)
                        li.find(".name_grade_cent_on .star_ico_bj_on").attr("style","width:"+e.avgr/50*100+"%;")
                        li.find(".star_ul li").each(function(j,f){
                            var v =e["r"+(5-j)]
                            $(f).find(".star_ul_bj_on").attr("style","width:"+v/e.sumr*100+"%;")
                            $(f).find(".star_ul_r").html(v)
                        })
                    })
                }
            },
            pvuv :function(data){
                    if (data.success){
                        var  date = []
                        var pv =[]
                        var uv =[]
                        var rank = []
                        $(data.data).each(function(i,e){
                            var str = e.date.toString()
                            date.push(str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8))
                            pv.push(e.pv)
                            uv.push(e.uv)
                            if(!e.rank){
                                rank.push(0)
                            }
                        });
                        var myChart_option_download = echarts.init(document.getElementById('option_download'));
                        option_download.xAxis[0].data = date
                        option_download.series[0].data = pv
                        myChart_option_download.setOption(option_download);
                        var myChart_option_rveryday = echarts.init(document.getElementById('option_rveryday'));
                        option_download.series[0].data = uv
                        myChart_option_rveryday.setOption(option_download)
                        var myChart_option_star = echarts.init(document.getElementById('option_star'));
                        option_download.series[0].data = rank
                        myChart_option_star.setOption(option_download)
                    }

                },
                 weixin :function(data){
                        if (data.success){
                            var  date = []
                            var pv =[]
                            var uv =[]
                            $(data.data).each(function(i,e){
                                date.push(formatDate(e/1000,"yyyy-MM-dd"))
                                pv.push(e.avgArticleClicksCount)
                                uv.push(e.avgArticleLikesCount)
                            });
                            var myChart_option_download = echarts.init(document.getElementById('option_download'));
                            option_download.xAxis[0].data = date
                            option_download.series[0].data = pv
                            myChart_option_download.setOption(option_download);
                            var myChart_option_rveryday = echarts.init(document.getElementById('option_rveryday'));
                            option_download.series[0].data = uv
                            myChart_option_rveryday.setOption(option_download)
                        }

                    }
}
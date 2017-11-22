function fillList(dataList,divList){
    var dl = $("*[data-query='list']")
    $(dl).each(function(){
        var div = $(this);
        if(dataList){
            var entityList = dataList[div.attr("data-formatter")];
            var num = entityList.length;
            var matter = div.attr("data-formatter")
            switch(matter){
                case 'projectMarkInfoList' :
                //var num = entityList.length;
                //共有结果个数
                $(".project_t").find("#mark").text(num)
                break;

                case 'projectPatentInfoList' :
               // var num = entityList.length;
                //共有结果个数
                $(".project_t").find("#patent").text(num)
                break;

                case 'projectCopyrightInfoList' :
                //var num = entityList.length;
                //共有结果个数
                $(".project_t").find("#copyright").text(num)
                break;

                case 'softwareCopyrightInfoList' :
                //var num = entityList.length;
                //共有结果个数
                $(".project_t").find("#software").text(num)
                break;

                case 'projectWebInfoList' :
                //var num = entityList.length;
                //共有结果个数
                 $(".project_t").find("#web").text(num)
                 break;

                 case 'certificateInfoList' :
                 //var num = entityList.length;
                 //共有结果个数
                 $(".project_t").find("#cert").text(num)
                 break;
            }

            var formatter= div.attr("data-formatter")+"Formatter";
            if(formatter && formatter in window){
                window[formatter](entityList,div)
            }
        }else{
            var formatter= div.attr("data-formatter")+"Formatter";
            window[formatter](dataList,divList)
        }

    })
}


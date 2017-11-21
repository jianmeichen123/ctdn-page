//本地

var Constants = {
	platformContentURL: "http://127.0.0.1:8081/api/",
	searchContentURL: "http://127.0.0.1:8089/search/",
	dataContentURL: "http://127.0.0.1:8085/data/",
	logoPath: "http://static.galaxyinternet.com/img/"
}



//线上
//var Constants = {
//	platformContentURL: "http://ctdndev.gi.com/api/",
//	searchContentURL: "http://ctdndev.gi.com/search/",
//	dataContentURL: "http://ctdndev.gi.com/data/",
//    logoPath: "http://static.galaxyinternet.com/"
//}
var home = {
	    index : "http://ctdndev.gi.com"
	}
var docUrl = {

      /**
        * 文档
      */

       shareDocList:Constants.docContentURL+"share/query",

       getShareDoc:Constants.docContentURL+"share/get/"


}
var searchUrl = {
    project:Constants.searchContentURL+"project",
    investEvent:Constants.searchContentURL+"investEvent",
    quitEvent:Constants.searchContentURL+"quitEvent",
    mergeEvent:Constants.searchContentURL+"mergeEvent",
    launchEvent:Constants.searchContentURL+"launchEvent",
    investfirms:Constants.searchContentURL+"investfirms",
    news:Constants.searchContentURL+"news",
    total:Constants.searchContentURL+"total"
}
var dataUrl = {
    products:Constants.dataContentURL+"op/is/",
    pvuv:Constants.dataContentURL+"op/pvuv/",
    weixin:Constants.dataContentURL+"op/weixinindice/",
    weibo:Constants.dataContentURL+"op/weiboIndice/",
    android:Constants.dataContentURL+"op/android/",
    ios:Constants.dataContentURL+"op/ios/",
}

var platformUrl = {
//	me:Constants.userContentURL+"userlogin/me",
	allQuery:Constants.platformContentURL+"common/allQuery",
	industry:Constants.platformContentURL+"common/industry",
	userIndustry:Constants.platformContentURL+"index/userIndustry/",
	updateUserIndustry:Constants.platformContentURL+"index/updateUserIndustry",
	eventIndustryMonth:Constants.platformContentURL+"eventIndustryMonth/query",
	queryIndexHeaderStat:Constants.platformContentURL+"index/queryIndexHeaderStat",
	fileUpload:Constants.platformContentURL+"upload"
}
var table ={
   empty: "-"
}
var detail = {

    queryProject:Constants.platformContentURL+"/projectList/queryProjectByCode/",
    queryProjectMediaInfoByCode:Constants.platformContentURL+"/projectList/queryMediaInfoByCode",
    queryProjectTeamByCode:Constants.platformContentURL+"/projectList/queryProjectTeamByCode",
    queryProjectInvestEvent:Constants.platformContentURL+"/eventInfo/queryProjectEventList/",
    queryProjectEventListed:Constants.platformContentURL+"/eventListedInfo/queryProjectEventListed/",
    queryMergeEventBySourceCode:Constants.platformContentURL+"/eventMergerInfo/queryMergeEventBySourceCode/",
    queryProjectContactByCode:Constants.platformContentURL+"/projectList/queryProjectContactByCode/",

    queryRelativeListByCode:Constants.platformContentURL+"/projectList/queryRelativeListByCode/",
    queryMergeEventInfo:Constants.platformContentURL+"/eventMergerInfo/getListByEventId/",
    queryEventInfo:Constants.platformContentURL+"/eventInfo/getById/",
    queryInvestOrgInfo:Constants.platformContentURL+"/orgInfo/getListByOrgId/",
    queryListedInfo:Constants.platformContentURL+"/eventListedInfo/getListByEventId/",
    queryEventByName:Constants.platformContentURL+"/eventInfo/getListByName/",
    queryCompetationlist:Constants.platformContentURL+"/projectList/queryCompetationlist/",
    queryExcutedByPage:Constants.dataContentURL+"risk/queryExcutedByPage",
    queryDishonestyExcuted:Constants.dataContentURL+"risk/queryDishonestyExcuted/",
    queryCourtAnnouncement:Constants.dataContentURL+"risk/queryCourtAnnouncement/",
    queryRiskJudgmentDocument:Constants.dataContentURL+"risk/queryRiskJudgmentDocument/",
    queryOperationException:Constants.dataContentURL+"risk/queryOperationException/",
    queryPorjectBusniessInfo:Constants.platformContentURL+"/businessInfo/getListBySourceCode/",
    queryZSCQInfo:Constants.platformContentURL+"/projectMarkInfo/getListBySourceCode/",
    queryLatestProjects:Constants.platformContentURL+"/projectList/queryLatestProjects/",
    getLatestEventInfo:Constants.platformContentURL+"/eventInfo/getLatestEventInfo/",
    getOrgsByTimes:Constants.platformContentURL+"/orgRank/getOrgsByTimes/",
    getOrgsByAllTimes:Constants.platformContentURL+"/orgRank/getOrgsByAllTimes/",
    getAllnews:Constants.platformContentURL+"/news/getAllnews/",
    getNewsByTypeName:Constants.platformContentURL+"/news/getNewsByTypeName/",
    getCTDNEventInfo:Constants.platformContentURL+"/eventInfo/getCtdnEventInfo/",
    getNewsByLabels:Constants.platformContentURL+"/news/getByLabels/",
    getNewsByLabel:Constants.platformContentURL+"/news/getNewsByLabel/",
    queryByProjTitle:Constants.platformContentURL+"/projectList/queryByProjTitle/",
    getListByCompany:Constants.platformContentURL+"/eventInfo/getListByCompany/",
    getListByRegName:Constants.platformContentURL+"/businessInfo/getListByRegName/",
    getAllCompMember:Constants.platformContentURL+"/compMember/getAllCompMember/",
    getAllCompSubs:Constants.platformContentURL+"/compSub/getAllCompSubs/",
    insertProject:Constants.platformContentURL+"/appProjectDemandInfo/insert",
    getListByProjCode:Constants.platformContentURL+"/projectContact/getListByProjCode/",
}
/**
 * how to use? location.href = platformUrl.login
 */

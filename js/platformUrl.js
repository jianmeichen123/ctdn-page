

var Constants = {
	platformContentURL: "http://ctdndev.gi.com/api/",
	searchContentURL: "http://ctdndev.gi.com/search/",
	dataContentURL: "http://ctdndev.gi.com/data/",
	uploadURL: "http://ctdndev.gi.com/cloudstorage/",
	logoPath: "http://static.galaxyinternet.com/img/",
	userContentURL: "http://ctdndev.gi.com/user/"

}
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
    total:Constants.searchContentURL+"total",
    startUp:Constants.searchContentURL+"startUp",
    investor:Constants.searchContentURL+"investor",
    getGGNews:Constants.searchContentURL+"getGGNews",
    report:Constants.searchContentURL+"report",
    getGGCompeteInfo:Constants.searchContentURL+"getGGCompeteInfo"
}
var dataUrl = {
    products:Constants.dataContentURL+"op/is/",
    pvuv:Constants.dataContentURL+"op/pvuv/",
    weixin:Constants.dataContentURL+"op/weixinindice/",
    weibo:Constants.dataContentURL+"op/weiboIndice/",
    android:Constants.dataContentURL+"op/android/",
    ios:Constants.dataContentURL+"op/ios/",
}

var echars = {
    hotDistrict :Constants.platformContentURL+"common/hotDistrict",
    getRZBK:Constants.platformContentURL+"echarsIndustryAnalyze/getRZBK",
    getRZQS :Constants.platformContentURL+"echarsIndustryAnalyze/getRZQS",
    getRZDB :Constants.platformContentURL+"echarsIndustryAnalyze/getRZDB",
    getCXHTFX:Constants.platformContentURL+"echarsIndustryAnalyze/getCXHTFX",
    getRXGMFB:Constants.platformContentURL+"echarsIndustryAnalyze/getRXGMFB"
}
var platformUrl = {
	me:Constants.userContentURL + "userlogin/me",
	toLogin: Constants.userContentURL + "userlogin/toLogin",
	register:Constants.userContentURL + "userlogin/toRegister",
	logout:Constants.userContentURL + "userlogin/logout",
	modifyPass:Constants.userContentURL + "userlogin/modifyPass",
	allQuery:Constants.platformContentURL+"common/allQuery",
	comQuery:Constants.platformContentURL+"common/comQuery",
	industry:Constants.platformContentURL+"common/industry",
	userIndustry:Constants.platformContentURL+"index/queryUserIndustry/",
	updateUserIndustry:Constants.platformContentURL+"index/saveUserIndustry",
	resetUserIndustry:Constants.platformContentURL+"index/resetUserIndustry/",
	eventIndustryMonth:Constants.platformContentURL+"eventIndustryMonth/query",
	queryIndexHeaderStat:Constants.platformContentURL+"index/queryIndexHeaderStat",
	fileUpload:Constants.platformContentURL+"upload"
}
var table ={
   empty: "--"
}

var publicsea = {
	comQuery:Constants.platformContentURL+"publicsea/comQuery",
	upload:Constants.uploadURL+"/upload/image",
	insertProject:Constants.platformContentURL+"/publicsea/insertProject",
	editProject:Constants.platformContentURL+"/publicsea/editProject",
	queryProjectById:Constants.platformContentURL+"/publicsea/queryPubSeaById",
	queryPubSeaList:Constants.platformContentURL+"/publicsea/queryPubSeaList"
}

var detail = {

    queryProject:Constants.platformContentURL+"projectList/queryProjectByCode/",
    queryProjectMediaInfoByCode:Constants.platformContentURL+"projectList/queryMediaInfoByCode",
    queryProjectTeamByCode:Constants.platformContentURL+"projectList/queryProjectTeamByCode",
    queryProjectInvestEvent:Constants.platformContentURL+"eventInfo/queryProjectEventList/",
    queryProjectEventListed:Constants.platformContentURL+"eventListedInfo/queryProjectEventListed/",
    queryMergeEventBySourceCode:Constants.platformContentURL+"/eventMergerInfo/queryMergeEventBySourceCode/",
    queryProjectContactByCode:Constants.platformContentURL+"/projectList/queryProjectContactByCode/",

    queryRelativeListByCode:Constants.platformContentURL+"projectList/queryRelativeListByCode/",
    queryMergeEventInfo:Constants.platformContentURL+"eventMergerInfo/getListByEventId/",
    queryEventInfo:Constants.platformContentURL+"eventInfo/getById/",
    queryInvestOrgInfo:Constants.platformContentURL+"orgInfo/getListByOrgCode/",
    queryListedInfo:Constants.platformContentURL+"eventListedInfo/getListByEventId/",
    queryEventByName:Constants.platformContentURL+"eventInfo/getListByName/",
    queryCompetationlist:Constants.platformContentURL+"projectList/queryCompetationlist/",
    queryExcutedByPage:Constants.dataContentURL+"risk/queryExcutedByPage",
    queryDishonestyExcuted:Constants.dataContentURL+"risk/queryDishonestyExcuted/",
    queryCourtAnnouncement:Constants.dataContentURL+"risk/queryCourtAnnouncement/",
    queryRiskJudgmentDocument:Constants.dataContentURL+"risk/queryRiskJudgmentDocument/",
    queryOperationException:Constants.dataContentURL+"risk/queryOperationException/",
    queryPorjectBusniessInfo:Constants.platformContentURL+"businessInfo/getListBySourceCode/",
    queryZSCQInfo:Constants.platformContentURL+"projectMarkInfo/getListBySourceCode/",
    queryLatestProjects:Constants.platformContentURL+"projectList/queryLatestProjects/",
    getLatestEventInfo:Constants.platformContentURL+"eventInfo/getLatestEventInfo/",
    getOrgsByTimes:Constants.platformContentURL+"orgRank/getOrgsByTimes/",
    getOrgsByAllTimes:Constants.platformContentURL+"/orgRank/getOrgsByAllTimes/",
    getAllnews:Constants.platformContentURL+"news/getAllnews/",
    getNewsByTypeName:Constants.platformContentURL+"news/getNewsByTypeName/",
    getCTDNEventInfo:Constants.platformContentURL+"eventInfo/getCtdnEventInfo/",
    getNewsByLabels:Constants.platformContentURL+"news/getByLabels/",
    getNewsByLabel:Constants.platformContentURL+"news/getNewsByLabel/",
    queryByCompCode:Constants.platformContentURL+"projectList/queryByCompCode/",
    getListByCompany:Constants.platformContentURL+"eventInfo/getListByCompany/",
    getListByRegName:Constants.platformContentURL+"businessInfo/getListByRegName/",
    getAllCompMember:Constants.platformContentURL+"compMember/getAllCompMember/",
    getAllCompSubs:Constants.platformContentURL+"compSub/getAllCompSubs/",
    getListByProjCode:Constants.platformContentURL+"projectContact/getListByProjCode/",
    queryLastestLoadProject:Constants.platformContentURL+"index/queryLastestLoadProject/",
    queryLastestFinanceProject:Constants.platformContentURL+"index/queryLastestFinanceProject/",
    queryLastestOrg:Constants.platformContentURL+"index/queryLastestOrg/",
    getParentIndustrys:Constants.platformContentURL+"index/getParentIndustrys/",
    getCompeteInfo:Constants.platformContentURL+"index/getCompeteInfo/",
    queryGGTotalHeaderStat:Constants.platformContentURL+"index/queryGGTotalHeaderStat",
    queryGGCurMonthHeaderStat:Constants.platformContentURL+"index/queryGGCurMonthHeaderStat",
    queryIndustryMonthForEchart:Constants.platformContentURL+"index/queryIndustryMonthForEchart",
    queryIndustryMonthMergerForEchart:Constants.platformContentURL+"index/queryIndustryMonthMergerForEchart",
    getBusinessLineMappingIndustry:Constants.platformContentURL+"index/getBusinessLineMappingIndustry",
    getUserIndustry:Constants.platformContentURL+"index/getUserIndustry",
    queryByCodeList:Constants.platformContentURL+"projectList/queryByCodeList/",
    queryReportByPage:Constants.platformContentURL+"report/queryReportByPage/",
    queryReports:Constants.platformContentURL+"report/queryReports/",
    getReport:Constants.platformContentURL+"report/getReport/",
    getEventCount:Constants.platformContentURL+"eventInfo/getEventCount/",
    getMergerCount:Constants.platformContentURL+"eventMergerInfo/getMergerCount/",
    getEventDistrictList:Constants.platformContentURL+"eventDistrict/getEventDistrictList/",
    getEventDistricts:Constants.platformContentURL+"eventDistrict/getEventDistricts/",
    getListedExchanges:Constants.platformContentURL+"listedExchange/getListedExchanges/",
    getMergerEquitys:Constants.platformContentURL+"mergerEquity/getMergerEquitys/",
    getMergerCurrencys:Constants.platformContentURL+"mergerCurrency/getMergerCurrencys/",
    getStagesDistics:Constants.platformContentURL+"stagesDistrict/getStagesDistics/",
    getMergerIndustrys:Constants.platformContentURL+"mergerIndustry/getMergerIndustrys/",
    getStages:Constants.platformContentURL+"stagesDistrict/getStages/",

//  创业者/投资人
    queryPersonComExpr:Constants.platformContentURL+"person/queryPersonComExpr/",
    queryPersonEduExpr:Constants.platformContentURL+"person/queryPersonEduExpr/",
    queryPersonWorkExpr:Constants.platformContentURL+"person/queryPersonWorkExpr/",
    queryStartUpBaseInfo:Constants.platformContentURL+"person/queryStartUpBaseInfo/",
    queryInvestorBaseInfo:Constants.platformContentURL+"person/queryInvestorBaseInfo/",
    queryInvestPolicyInfo:Constants.platformContentURL+"person/queryInvestPolicyInfo/",
    //机构分析
    orgIndustry:Constants.platformContentURL+"orgChart/orgIndustry",
    childIndustries:Constants.platformContentURL+"orgChart/childIndustries",
    orgRound:Constants.platformContentURL+"orgChart/orgRound",
    orgProject:Constants.platformContentURL+"orgChart/orgProject",
    getOrgPartnerAndCompeteCount:Constants.platformContentURL+"orgChart/getOrgPartnerAndCompeteCount",
    orgPartner:Constants.platformContentURL+"orgChart/orgPartner",
}
var user = {
    collectOne:Constants.platformContentURL+"userCollection/collectOne",
    cancelOneCol:Constants.platformContentURL+"userCollection/cancelOneCol/",
    countNum:Constants.platformContentURL+"userCollection/countNum/",
    getCodeList:Constants.platformContentURL+"userCollection/getCodeList/",
    getColList:Constants.platformContentURL+"userCollection/getColList/",
    queryProPageByCodeList:Constants.platformContentURL+"projectList/queryByCodeList/"
}
/**
 * how to use? location.href = platformUrl.login
 */

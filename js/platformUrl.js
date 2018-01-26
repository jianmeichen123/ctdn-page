

var Constants = {
	platformContentURL: "http://ctdnqa.gi.com/api/",
	searchContentURL: "http://ctdnqa.gi.com/search/",
	dataContentURL: "http://ctdnqa.gi.com/data/",
	uploadURL: "http://ctdnqa.gi.com/cloudstorage/",
	logoPath: "http://static.galaxyinternet.com/img/",
	userContentURL: "http://ctdnqa.gi.com/user/",
	htmlContentUrl : "http://ctdnqa.gi.com/"
}
var home = {
	    index : "http://ctdnqa.gi.com"
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
	login: Constants.userContentURL + "userlogin/login",
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
	fileUpload:Constants.platformContentURL+"upload",
	//登录相关
    toIndex :Constants.userContentURL+  "user/index",
    checkPwd : Constants.userContentURL + "user/user/checkPwd",
    updatePwd : Constants.userContentURL + "user/user/updatePwd",
    ctdncx : Constants.userContentURL + "list_page_com.html",
    index : Constants.userContentURL + "/index_normal.html",
    loginByCode:Constants.userContentURL + "userlogin/loginByCode",
    toRegister:"register.html",
    register:Constants.userContentURL + "userlogin/register",
    forgetPassword:"forget_password.html",
    updatePassword:Constants.userContentURL + "userlogin/updatePassword",
    sendCode:Constants.userContentURL + "userlogin/sendCode",
    loginByPassword:Constants.userContentURL + "userlogin/loginByPassword",
    checkUserExists:Constants.userContentURL + "userlogin/checkUserExists",
    checkCode:Constants.userContentURL + "userlogin/checkCode",
    checkInternalUserExists:Constants.userContentURL + "userlogin/checkInternalUserExists",
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

var comOverview = {

    area:Constants.platformContentURL+"comOverview/area/",
    industry:Constants.platformContentURL+"comOverview/industry/",
    projectSetup:Constants.platformContentURL+"comOverview/projectSetup/",
    investedRate:Constants.platformContentURL+"comOverview/investedRate/",
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

     //事件分析
    getEventDistrictList:Constants.platformContentURL+"eventDistrict/getEventDistrictList/",
    getEventDistricts:Constants.platformContentURL+"eventDistrict/getEventDistricts/",
    getListedExchanges:Constants.platformContentURL+"listedExchange/getListedExchanges/",
    getMergerEquitys:Constants.platformContentURL+"mergerEquity/getMergerEquitys/",
    getMergerCurrencys:Constants.platformContentURL+"mergerCurrency/getMergerCurrencys/",
    getStagesDistics:Constants.platformContentURL+"stagesDistrict/getStagesDistics/",
    getMergerIndustrys:Constants.platformContentURL+"mergerIndustry/getMergerIndustrys/",
    getStages:Constants.platformContentURL+"stagesDistrict/getStages/",
    queryHeaderStatAdd:Constants.platformContentURL+"index/queryHeaderStatAdd/",

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
    orgCompete:Constants.platformContentURL+"orgChart/orgCompete",
    //头部统计条件查询
    queryHeaderStatCommon:Constants.platformContentURL+"index/queryHeaderStatCommon"
}
var user = {
    collectOne:Constants.platformContentURL+"userCollection/collectOne",
    cancelOneCol:Constants.platformContentURL+"userCollection/cancelOneCol/",
    countNum:Constants.platformContentURL+"userCollection/countNum/",
    getCodeList:Constants.platformContentURL+"userCollection/getCodeList/",
    getColList:Constants.platformContentURL+"userCollection/getColList/",
    queryProPageByCodeList:Constants.platformContentURL+"projectList/queryByCodeList/"
}
var htmlPlatformUrl = {
    search:Constants.htmlContentUrl + "/search_index.html",
    search_finance:Constants.htmlContentUrl + "/seek_financing.html",
    index_head:Constants.htmlContentUrl + "/index_normal.html",
    evaluating:Constants.htmlContentUrl+"/project_evaluating.html",
    report:Constants.htmlContentUrl+"/report_list.html",
    news_head:Constants.htmlContentUrl+"/news.html",
    investor:Constants.htmlContentUrl+"/list_page_investor.html",
    startup:Constants.htmlContentUrl+"/list_page_startup.html",
    org:Constants.htmlContentUrl+"/list_page_org.html",
    tz:Constants.htmlContentUrl+"/list_page_rz.html",
    com:Constants.htmlContentUrl+"/list_page_com.html",
    index_manager:Constants.htmlContentUrl+"/index_manager.html",
    index_senior:Constants.htmlContentUrl+"/index_senior.html",
    index_external:Constants.htmlContentUrl+"/index_external.html",
    index_normal:Constants.htmlContentUrl+"/index_normal.html",
    person_center_myproject:Constants.htmlContentUrl+"/person_center_myproject.html",
    concern_industry:Constants.htmlContentUrl+"/concern_industry.html",
    person_center_fonder:Constants.htmlContentUrl+"/person_center_fonder.html",
    person_resetpassword:Constants.htmlContentUrl+"/person_resetpassword.html",
}
/**
 * how to use? location.href = platformUrl.login
 */

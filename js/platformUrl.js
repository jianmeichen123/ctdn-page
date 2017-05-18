//本地
var Constants = {
	platformContentURL: "http://10.9.130.143:8081/api/",
	userContentURL: "http://ctdndev.gi.com/user/",
	searchContentURL: "http://127.0.0.1:8089/search/",
	dataContentURL: "http://ctdndev.gi.com/data/",
	logoPath: "http:///10.10.0.147/"
}
var home = {
	    //;index : "http://ctdn.galaxyinternet.com"
	}
//线上
/*var Constants = {
	platformContentURL: "http://ctdndev.gi.com/api/",
	userContentURL: "http://ctdndev.gi.com/user/",
	searchContentURL: "http://ctdndev.gi.com/search/",
	dataContentURL: "http://ctdndev.gi.com/data/",
    logoPath: "http:///10.10.0.147/"
}
var home = {
	    index : "http://ctdn.galaxyinternet.com"
	}*/
var docUrl = {

      /**
        * 文档
      */

       shareDocList:Constants.docContentURL+"share/query",

       getShareDoc:Constants.docContentURL+"share/get/"


}
var searchUrl = {
    com:Constants.searchContentURL+"project",
    investEvent:Constants.searchContentURL+"investEvent",
    org:Constants.searchContentURL+"investfirms",
    quitEvent:Constants.searchContentURL+"quitEvent",
    mergeEvent:Constants.searchContentURL+"mergeEvent",
    launchEvent:Constants.searchContentURL+"launchEvent",
    investOrg:Constants.searchContentURL+"investfirms"
}
var dataUrl = {
}
var ctdnUrl = {

}
var platformUrl = {
	me:Constants.userContentURL+"userlogin/me",
	allQuery:Constants.platformContentURL+"common/allQuery",
}
var table ={
   empty: "-"
}
/**
 * how to use? location.href = platformUrl.login
 */

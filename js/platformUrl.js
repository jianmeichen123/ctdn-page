var Constants = {
	platformContentURL: "http://ctdndev.gi.com/api/",
	userContentURL: "http://ctdndev.gi.com/user/",
	searchContentURL: "http://ctdndev.gi.com/search/",
	dataContentURL: "http://ctdndev.gi.com/data/",
}
var home = {
    //;index : "http://ctdn.galaxyinternet.com"
}
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

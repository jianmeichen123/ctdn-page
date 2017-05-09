var Constants = {
	platformContentURL: "http://10.9.130.143:8081/api/",
	userContentURL: "http://ctdn.galaxyinternet.com/user/",
	docContentURL: "http://ctdn.galaxyinternet.com/doc/",
	searchContentURL: "http://10.9.130.135:8089/search/",
	dataContentURL: "http://ctdn.galaxyinternet.com/data/",
}
var home = {
    index : "http://ctdn.galaxyinternet.com"
}
var docUrl = {

      /**
        * 文档
      */

       shareDocList:Constants.docContentURL+"share/query",

       getShareDoc:Constants.docContentURL+"share/get/"


}
var searchUrl = {
    com:Constants.searchContentURL+"project"
}
var dataUrl = {
}
var ctdnUrl = {

}
var platformUrl = {
	me:Constants.userContentURL+"userlogin/me",
}
/**
 * how to use? location.href = platformUrl.login
 */

var Constants = {
	platformContentURL: "http://ctdn.galaxyinternet.com/api/",
	userContentURL: "http://ctdn.galaxyinternet.com/user/",
	docContentURL: "http://ctdn.galaxyinternet.com/doc/",
	searchContentURL: "http://ctdn.galaxyinternet.com/search/",
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

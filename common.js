var getPrefix = function() {
    return "oogi$"
};

var processCookieStr = function(cookiesStr) {
    var prefix = getPrefix();
    var cookieStrList = cookiesStr.split('; ');
    var newStrList = [];
    cookieStrList.forEach(function(cookieStr){
        if (cookieStr.indexOf(prefix)==0) {
            newStrList.push(cookieStr.substring(prefix.length, cookieStr.length));
        }
    });
    return newStrList.join("; ");
};

var processSetCookieStr = function(str) {
    return getPrefix()+str;
};
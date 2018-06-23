var actualCode = `var cookieGetter = document.__lookupGetter__("cookie").bind(document);
var cookieSetter = document.__lookupSetter__("cookie").bind(document);

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
    console.log("Processing set cookie string " + str);
    return getPrefix()+str;
};

Object.defineProperty(document, 'cookie', {
    get: function() {
        var storedCookieStr = cookieGetter();
        console.log("Intercepted a cookie get " + storedCookieStr + " , and returning processed cookie string " + processCookieStr(storedCookieStr));
        return processCookieStr(storedCookieStr);
    },

    set: function(cookieString) {
        var newValue = processSetCookieStr(cookieString);
        console.log("Intercepted a cookie set " + newValue)
        return cookieSetter(newValue);
    }
});
console.log("cookie get/set injector completed");
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();
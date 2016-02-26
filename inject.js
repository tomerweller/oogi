var cookieGetter = document.__lookupGetter__("cookie").bind(document);
var cookieSetter = document.__lookupSetter__("cookie").bind(document);


Object.defineProperty(document, 'cookie', {
    get: function() {
        var storedCookieStr = cookieGetter();
        return processCookieStr(storedCookieStr);
    },

    set: function(cookieString) {
        var newValue = processSetCookieStr(cookieString);
        return cookieSetter(newValue);
    }
});
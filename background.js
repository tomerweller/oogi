chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        for(var i=0; i<details.requestHeaders.length; i++) {
            if (details.requestHeaders[i].name.toLowerCase() === "cookie") {
                var cookiesStr = details.requestHeaders[i].value;
                details.requestHeaders[i].value = processCookieStr(cookiesStr);
            }
        }
        return {
            requestHeaders: details.requestHeaders
        };
    },
    {
        urls: [
            "*://*/*"
        ]
    },
    [
        'blocking',
        'requestHeaders'
    ]
);

chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        for(var i=0; i<details.responseHeaders.length; i++) {
            if (details.responseHeaders[i].name.toLowerCase() === "set-cookie") {
                var setCookiesStr = details.responseHeaders[i].value;
                details.responseHeaders[i].value = processSetCookieStr(setCookiesStr);
            }
        }
        return {
            responseHeaders: details.responseHeaders
        };
    },
    {
        urls: [
            "*://*/*"
        ]
    },
    [
        'blocking',
        'responseHeaders'
    ]
);
console.log('This is background page!');
chrome.runtime.onInstalled.addListener(() => {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        (details) => {
            if (!details.requestHeaders) return {};
            const requestHeaders = [];
            for (let n = 0; n < details.requestHeaders.length; n += 1) {
                const name = details.requestHeaders[n].name.toLowerCase();
                if (name === 'x-referrer') {
                    requestHeaders.push({
                        name: 'Referer',
                        value: details.requestHeaders[n].value,
                    });
                } else if (name !== 'referer') {
                    requestHeaders.push({ name, value: details.requestHeaders[n].value });
                }
            }
            return { requestHeaders };
        },
        {
            urls: ['*://leetcode-cn.com/*'],
        },
        ['requestHeaders', 'blocking', 'extraHeaders'],
    );
});

export default undefined;

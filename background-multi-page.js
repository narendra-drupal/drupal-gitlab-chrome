export function multiPageListener() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.call === "fetchIssueRows") {
            const pages = [];
            request.urls.forEach(url => {
                fetch(url)
                    .then((response) => {
                        response.text()
                    })
                    .then(
                        (pageBody) => {
                            pageBody.text()
                        }
                    )
                    .then(
                        (text) => {
                            sendResponse({page: text})
                        }
                    )
            });

        }
    });
}


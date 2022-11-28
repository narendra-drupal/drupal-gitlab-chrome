chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.call === "multiple-page-issue-queue") {
        const rows = [];
        request.urls.forEach(url => {
           fetch(url)
               .then(response => {
                   const html = document.createElement('html')
                   html.innerHTML = response.text();
                   rows.concat(html.querySelectorAll('.view-project-issue-search-project-searchapi tbody tr'));
               });
        });
        sendResponse({"rows": rows});
    }
});

const multiPage = {
    addPages: function () {
        const pageLinks = document.querySelectorAll('.view-project-issue-search-project-searchapi .pager .pager-item a');
        const urls = [];
        const table = document.querySelector('.view-project-issue-search-project-searchapi tbody');
        pageLinks.forEach(link => {
            urls.push('https://www.drupal.org/' + link.getAttribute('href'));
        });
        chrome.runtime.sendMessage(
            { call: "fetchIssueRows", urls:  urls},
            function (response) {

                    const parser = new DOMParser();
                    const pageParser = parser.parseFromString(response.page,  "text/html");
                    pageParser.querySelectorAll('.view-project-issue-search-project-searchapi tbody tr').forEach(row => {
                        table.append(row);
                    });

            }
        );
    }
}

export { multiPage };

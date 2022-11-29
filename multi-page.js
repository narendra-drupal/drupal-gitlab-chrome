/**
 * Loads issues from the pagination results.
 *
 * @todo Limit to only queries with 3 pages
 * @todo considering triggering from a link
 *
 * @type {{addPages: multiPage.addPages}}
 */
const multiPage = {
    addPages: function () {
        const viewEl = document.querySelector('.view-project-issue-search-project-searchapi');
        const pageLinks = viewEl.querySelectorAll('.pager .pager-item a');
        const table = viewEl.querySelector( 'tbody');
        const parser = new DOMParser();

        pageLinks.forEach(link => {
            const url = 'https://www.drupal.org/' + link.getAttribute('href');
            function reqListener() {
                const responseDom = parser.parseFromString(this.responseText, "text/html");
                const rows = responseDom.querySelectorAll(".view-project-issue-search-project-searchapi tbody tr");
                rows.forEach(row => {
                    table.append(row);
                });

                console.log(this.responseText);
            }
            const req = new XMLHttpRequest();
            req.addEventListener("load", reqListener);
            req.open("GET", url);
            req.send();
        });

    }
}

export { multiPage };

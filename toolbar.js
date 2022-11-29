let src = chrome.runtime.getURL("drupal-user-count.js");
const { userCount } = await import(src);
src = chrome.runtime.getURL("dynamic-filter-script.js");
const { titleFilter } = await import(src);
const listingToolbar = {
    create: function () {
        const existingToolbar = document.getElementById("custom-toolbar");
        if (existingToolbar) {
            existingToolbar.remove();
        }
        const customToolbar = document.createElement('div');
        customToolbar.id = "custom-toolbar";
        const issueTable = document.querySelector("table.project-issue");

        // Add the individual elements to the toolbar.
        customToolbar.appendChild(userCount.createElement());
        customToolbar.appendChild(titleFilter.createElement());
        issueTable.parentNode.insertBefore(customToolbar, issueTable);
    }
}
export { listingToolbar };

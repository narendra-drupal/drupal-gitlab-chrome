(async () => {
  // @todo Is there a better way to import these files. Wanted to have import functionality that works for both content
  //   and background scripts.
  let src = chrome.runtime.getURL("common.js");
  const { utils } = await import(src);
  // Import the source files the individual features on this page.
  src = chrome.runtime.getURL("drupal-user-count.js");
  const { userCount } = await import(src);
  src = chrome.runtime.getURL("dynamic-filter-script.js");
  const { titleFilter } = await import(src);
  src = chrome.runtime.getURL("multi-page.js");
  const { multiPage } = await import(src);

  const customToolbar = document.createElement('div');
  customToolbar.id = "custom-toolbar";
  const issueTable = document.querySelector("table.project-issue");
  multiPage.addPages();
  // Add the individual elements to the toolbar.
  customToolbar.appendChild(userCount.createElement());
  customToolbar.appendChild(titleFilter.createElement());
  issueTable.parentNode.insertBefore(customToolbar, issueTable);
})();

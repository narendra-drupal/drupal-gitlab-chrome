(async () => {
  let src = chrome.runtime.getURL("common.js");
  const { utils } = await import(src);
  src = chrome.runtime.getURL("drupal-user-count.js");
  const { userCount } = await import(src);
  src = chrome.runtime.getURL("dynamic-filter-script.js");
  const { titleFilter } = await import(src);
  
  const customToolbar = document.createElement('div');
  customToolbar.id = "custom-toolbar";
  const issueTable = document.querySelector("table.project-issue");
  customToolbar.appendChild(userCount.createElement());
  customToolbar.appendChild(titleFilter.createElement());
  issueTable.parentNode.insertBefore(customToolbar, issueTable);
})();

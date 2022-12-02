(async () => {
  let src = chrome.runtime.getURL("common.js");
  const { utils } = await import(src);
  // Import the source files the individual features on this page.
  src = chrome.runtime.getURL("multi-page.js");
  const { multiPage } = await import(src);
  src = chrome.runtime.getURL("toolbar.js");
  const { listingToolbar } = await import(src);

  src = chrome.runtime.getURL("merge-request-status.js");
  const { mergeRequestStatus } = await import(src);

  chrome.storage.sync.get(utils.settingDefaults, function (items) {
    items.projects.every((project) => {
      if (document.URL.includes(`issues/search/${project}`)) {
        if (items.load_pages) {
          multiPage.addPages();
          const checkInterval = setInterval(function () {
            if (
              document
                .querySelector(".content .attachment-before")
                .textContent.includes("Showing all") ||
              document
                .querySelector(".content .attachment-before")
                .textContent.includes(
                  "auto-loading page not allowed because too many pages"
                )
            ) {
              listingToolbar.create();
              window.clearInterval(checkInterval);
              mergeRequestStatus.addColumn();
            }
          }, 500);
        } else {
          listingToolbar.create();
          mergeRequestStatus.addColumn();
        }
        return false;
      }
      return true;
    });
  });
})();

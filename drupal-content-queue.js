(async () => {
  let src = chrome.runtime.getURL("common.js");
  const { utils } = await import(src);
  // Import the source files the individual features on this page.
  src = chrome.runtime.getURL("multi-page.js");
  const { multiPage } = await import(src);
  src = chrome.runtime.getURL("toolbar.js");
  const { listingToolbar } = await import(src);

  multiPage.addPages();
  listingToolbar.create();
})();

// background.js
import { utils } from "./common.js";

function fetchJson(url, parser, sendResponse) {
  fetch(url)
    .then((response) => response.text())
    .then((text) => sendResponse({ issues: parser(text) }))
    // @todo handle error.
    .catch((error) => sendResponse({ farewell: error }));
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.call === "sample_call") {
    console.log("sample_call was called");
    return true; // Will respond asynchronously.
  }
});

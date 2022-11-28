// background.js
import { utils } from "./common.js";

function findDrupalIssueId(issue) {
  let description = issue.fields.description;
  const regex = /https:\/\/www\.drupal\.org\/project\/.*\/issues\/\d*/g;
  let matches = description.match(regex);

  if (matches && matches.length > 0) {
    let issueId;
    matches.forEach(function (match) {
      issueId = utils.getIssueIdFromUrl(match);
    });
    return issueId;
  }
}


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
  let url = `${jiraConfig.jira_base_url}rest/api/2/search?jql=`;
  if (request.call === "getConsoleOutURL") {

    return true; // Will respond asynchronously.
  }
});

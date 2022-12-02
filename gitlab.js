(async () => {
  let src = chrome.runtime.getURL("common.js");
  const { utils } = await import(src);

  function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  waitForElm('.js-discussion-container').then(() => {
    const allLinks = document.querySelectorAll('.note-text a');
    for (const anchorElement of allLinks) {
      const hrefAtt = anchorElement.getAttribute('href');
      if (hrefAtt.includes("https://www.drupal.org/project/")) {
        const issueId = utils.getIssueIdFromUrl(hrefAtt);
        // Make request to Drupal to get status.
        if (!isNaN(issueId)) {
          console.log(hrefAtt, issueId);
        }
      }
    }

  });

})();

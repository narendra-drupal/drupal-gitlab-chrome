/**
 * Creates a new column for merge request status.
 *
 * @type {{createElement: (function(): HTMLElement)}}
 */
import { utils } from "./common.js";

const mergeRequestStatus = {
  createElement: function () {
    // store name elements in array-like object
    const namesFromDOM = document.querySelectorAll("tbody .views-field-title a");
    for (const nameElement of namesFromDOM) {
      const issueId = utils.getIssueIdFromUrl(nameElement.getAttribute('href'));

      const address = fetch(`https://git.drupalcode.org/api/v4/merge_requests?state=opened&scope=all&in=title&search=` + issueId)
          .then((response) => response.json())
          .then((data) => {
            if (data.length >= 0) {
              console.log(data)
            }
            else {

            }
          });


    }
  }
};

export { mergeRequestStatus };

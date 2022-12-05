let src = chrome.runtime.getURL("rowFilterer.js");
const { rowFilterer } = await import(src);

/**
 * Creates a search input for dynamic title searching.
 *
 * @type {{createElement: (function(): HTMLElement)}}
 */
class titleFilterer extends rowFilterer {
  createElement() {
    const searchInput = document.createElement("INPUT");
    Object.assign(searchInput, {
      type: "text",
      placeholder: "Search issues...",
      id: "extension-filter",
      size: 250,
      maxlength: 250,
    });

    // store name elements in array-like object
    const namesFromDOM = document.querySelectorAll(
      "tbody .views-field-title a"
    );

    // listen for user events
    searchInput.addEventListener("keyup", (event) => {
      const { value } = event.target;

      // get user search input converted to lowercase
      const searchQuery = value.toLowerCase();

      for (const nameElement of namesFromDOM) {
        // store name text and convert to lowercase
        let name = nameElement.textContent.toLowerCase();
        // compare current name to search input
        if (name.includes(searchQuery)) {
          // found name matching search, display it
          this.removeHideCondition(nameElement);
        } else {
          // no match, don't display name
          this.addHideCondition(nameElement);
        }
      }
    });
    return searchInput;
  }
}
const titleFilter = new titleFilterer();
export { titleFilter };

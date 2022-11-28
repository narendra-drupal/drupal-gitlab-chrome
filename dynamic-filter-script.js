(async () => {
  var url = document.URL;
  const regex = /https:\/\/www\.drupal\.org\/project\/issues\/.*/g;
  if (url.match(regex)) {
    const issueTable = document.querySelector("table.project-issue");
    const input = document.createElement("INPUT");
    Object.assign(input, {
      type: "text",
      placeholder: "Search issues...",
      id: "extension-filter",
      size: 250,
      maxlength: 250,
    });

    issueTable.parentNode.insertBefore(input, issueTable);

    // get search bar element
    const searchInput = document.getElementById("extension-filter");

    // store name elements in array-like object
    const namesFromDOM = document.querySelectorAll("tbody .views-field-title a");

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
          nameElement.parentNode.parentNode.style.display = "table-row";
        } else {
          // no match, don't display name
          nameElement.parentNode.parentNode.style.display = "none";
        }
      }
    });
  }

})();

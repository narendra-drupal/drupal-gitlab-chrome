(async () => {
  const issueTable = document.querySelector("table.project-issue");
  const x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("placeholder", "Search issues...");
  x.setAttribute("id", "extension-filter");
  x.setAttribute("size", 250);
  x.setAttribute("maxlength", 250);
  issueTable.parentNode.insertBefore(x, issueTable);


  // get search bar element
  const searchInput = document.getElementById("extension-filter");

  // store name elements in array-like object
  const namesFromDOM = document.querySelectorAll("tbody .views-field-title a");
  console.log(namesFromDOM);
  // listen for user events
  searchInput.addEventListener("keyup", (event) => {
    const { value } = event.target;

    // get user search input converted to lowercase
    const searchQuery = value.toLowerCase();


    // for (const nameElement of namesFromDOM) {
    //   // store name text and convert to lowercase
    //   let name = nameElement.textContent.toLowerCase();
    //
    //   // compare current name to search input
    //   if (name.includes(searchQuery)) {
    //     // found name matching search, display it
    //     nameElement.style.display = "block";
    //   } else {
    //     // no match, don't display name
    //     nameElement.style.display = "none";
    //   }
    // }
  });


})();

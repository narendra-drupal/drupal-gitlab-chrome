(async () => {
  const src = chrome.runtime.getURL("common.js");
  const { utils } = await import(src);

  var url = document.URL;
  const regex = /https:\/\/www\.drupal\.org\/project\/issues\/search\/.*/g;
  if (url.match(regex)) {
    // On issue queue search page
    const assignedInput = document.getElementById("edit-assigned");
    const assignedText = assignedInput.getAttribute("value").trim();
    const assignedFields = document.querySelectorAll(
      "td.views-field-field-issue-assigned"
    );
    let names = [];
    if (assignedText) {
      names = assignedText.split(",").map((name) => name.trim());
    } else {
      names = [
        ...new Set(
          [...assignedFields].map((assignedField) =>
            assignedField.innerText.trim()
          )
        ),
      ];
    }

    let userIssues = [];

    const usersDiv = document.createElement("div");
    usersDiv.className = "usersCount";
    names.forEach((name) => {
      let userIssue = { name: name, count: 0 };
      assignedFields.forEach((field) => {
        if (field.textContent.includes(name)) {
          userIssue.count++;
        }
      });
      const userDiv = document.createElement("div");
      userDiv.innerText = `${name}: ${userIssue.count}`;
      if (userIssue.count) {
        const clicker = document.createElement("a");
        //clicker.setAttribute('href', '#')
        clicker.setAttribute("user", name);
        clicker.onclick = function (event) {
          const target = event.target;
          const targetIsFiltered = target.hasAttribute("filtered");
          document.querySelectorAll(".user-filter").forEach((link) => {
            link.innerText = "🔎";
            link.removeAttribute("filtered");
          });
          if (targetIsFiltered) {
            assignedFields.forEach(
              (assignedField) =>
                (assignedField.closest("tr").style.display = "table-row")
            );
            return;
          }

          target.innerText = "✅";
          target.setAttribute("filtered", true);
          assignedFields.forEach((assignedField) => {
            const parentRow = assignedField.closest("tr");
            if (assignedField.innerText.includes(name)) {
              parentRow.style.display = "table-row";
            } else {
              parentRow.style.display = "none";
            }
          });
        };
        clicker.innerText = "🔎";
        clicker.className = "user-filter";
        userDiv.appendChild(clicker);
      }

      userDiv.className = `user-issue-cnt-${userIssue.count}`;
      usersDiv.appendChild(userDiv);
      userIssues.push(userIssue);
    });
    const issueTable = document.querySelector("table.project-issue");
    issueTable.parentNode.insertBefore(usersDiv, issueTable);

    issueTable.insertBefore();
    //alert('d');
  }
})();

const drupalConfig = {
  statusField: {
    ACTIVE: "1",
    FIXED: "2",
    CLOSED_DUPLICATE: "3",
    POSTPONED: "4",
    CLOSED_WONT_FIX: "5",
    CLOSED_WORKS_AS_DESIGNED: "6",
    CLOSED_FIXED: "7",
    NEEDS_REVIEW: "8",
    NEEDS_WORK: "13",
    RTBC: "14",
    PATCH_TO_BE_PORTED: "15",
    POSTPONED_MAINTAINER_NEEDS_MO_INFO: "16",
    CLOSED_OUTDATED: "17",
    CLOSED_CANNOT_REPRODUCE: "18",
  },
};
const utils = {
  settingDefaults: {
    projects: [],
    load_pages: false,
    auto_tags: ["Needs tests", "Needs issue summary update", "Accessibility"],
  },

  getIssueListViewElement: function () {
    return document.querySelector(
      ".view-project-issue-search-project-searchapi"
    );
  },
  getIssueIdFromUrl: function (url) {
    let parts = url.split("/");
    let lastPart = parts[parts.length - 1];
    parts = lastPart.split("#");
    return parts[0];
  },
  getStatusForId: (id) => {
    return Object.keys(drupalConfig.statusField).find(
      (key) => drupalConfig.statusField[key] === id
    );
  },
  getIssueTableElement: function () {
    return this.getIssueListViewElement().querySelector("table.project-issue");
  },
};
export { utils };

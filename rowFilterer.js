/**
 * A filter table rows.
 */
class rowFilterer {
  addHideCondition(element) {
    const parentRow = element.closest("tr");
    if (!parentRow.hasOwnProperty("hideConditions")) {
      parentRow.hideConditions = new Set();
    }
    parentRow.hideConditions.add(this.getElementColumnIndex(element));
    this.setHideStatus(parentRow);
  }
  removeHideCondition(element) {
    const parentRow = element.closest("tr");
    if (!parentRow.hasOwnProperty("hideConditions")) {
      return;
    }
    parentRow.hideConditions.delete(this.getElementColumnIndex(element));
    this.setHideStatus(parentRow);
  }
  setHideStatus(element) {
    if (
      element.hasOwnProperty("hideConditions") &&
      element.hideConditions.size > 0
    ) {
      element.style.display = "none";
    } else {
      element.style.display = "table-row";
    }
  }

  getElementColumnIndex(element) {
    const td = element.closest("td");
    const tds = Array.from(td.closest("tr").children);
    return tds.indexOf(td);
  }
}
export { rowFilterer };

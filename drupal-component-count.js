let src = chrome.runtime.getURL("toolbarRowFilterer.js");
const { toolbarRowFilterer } = await import(src);

/**
 * Creates a toolbar item that lists the number of issues with different components.
 *
 * @type {{createElement: (function(): HTMLDivElement)}}
 */
class componentCountFilter extends toolbarRowFilterer {
  createElement() {
    const componentFields = document.querySelectorAll(
      "td.views-field.views-field-field-issue-component"
    );
    return this.setUpFilter(componentFields, "component");
  }
}
const componentCount = new componentCountFilter();
export { componentCount };

(async () => {
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
      console.log(anchorElement);
    }

  });

})();

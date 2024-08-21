(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const main = "";
const refsMenu = {
  openMenuButton: document.querySelector(".js-menu-open"),
  closeMenuButton: document.querySelector(".js-menu-close"),
  overlayMenu: document.querySelector(".js-menu")
};
const toggleMenu = () => {
  const isOpenMenu = refsMenu.openMenuButton.getAttribute("aria-expanded") === "true" || false;
  refsMenu.closeMenuButton.setAttribute("aria-expanded", !isOpenMenu);
  refsMenu.overlayMenu.classList.toggle("is-open");
  document.body.style.overflow = isOpenMenu ? "hidden" : "auto";
};
refsMenu.openMenuButton.addEventListener("click", toggleMenu);
refsMenu.closeMenuButton.addEventListener("click", toggleMenu);
window.matchMedia("(min-width: 1200px)").addEventListener("change", (event) => {
  if (!event.matches)
    return;
  refsMenu.closeMenuButton.setAttribute("aria-expanded", false);
  refsMenu.overlayMenu.classList.remove("is-open");
  document.body.style.overflow = "auto";
});

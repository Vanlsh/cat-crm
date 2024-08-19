import "../scss/main.scss";

const refsMenu = {
  openMenuButton: document.querySelector(".js-menu-open"),
  closeMenuButton: document.querySelector(".js-menu-close"),
  overlayMenu: document.querySelector(".js-menu"),
};

const toggleMenu = () => {
  const isOpenMenu =
    refsMenu.openMenuButton.getAttribute("aria-expanded") === "true" || false;
  refsMenu.closeMenuButton.setAttribute("aria-expanded", !isOpenMenu);
  refsMenu.overlayMenu.classList.toggle("is-open");

  document.body.style.overflow = isOpenMenu ? "hidden" : "auto";
};

toggleMenu.openMenuButton.addEventListener("click", toggleMenu);
toggleMenu.closeMenuButton.addEventListener("click", toggleMenu);

window.matchMedia("(min-width: 1200px)").addEventListener("change", (event) => {
  if (!event.matches) return;

  refsMenu.closeMenuButton.setAttribute("aria-expanded", false);
  refsMenu.overlayMenu.classList.remove("is-open");
  document.body.style.overflow = "auto";
});

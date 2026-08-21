document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const siteNav = document.getElementById("siteNav");

  if (!hamburger || !siteNav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("show");

    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");

    document.body.style.overflow =
      isOpen ? "hidden" : "";
  });

});

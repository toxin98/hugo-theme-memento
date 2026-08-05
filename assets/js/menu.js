document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const siteNav = document.getElementById("siteNav");

  hamburger.addEventListener("click", () => {
    siteNav.classList.toggle("show");

    document.body.style.overflow =
      siteNav.classList.contains("show") ? "hidden" : "";
  });

});

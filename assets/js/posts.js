document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll(".posts-category-title").forEach(button => {
    button.addEventListener("click", () => {

      document.querySelectorAll(".posts-category-title").forEach(b => {
        b.classList.remove("active");
      });
      button.classList.add("active");

      showYear(button.dataset.target);
    });
  });

  showYear("all");

  function showYear(year) {
    document.querySelectorAll(".posts-year-collection").forEach(el => {
        if (year === "all") {
            el.classList.add("show");
        } else {
            el.classList.toggle("show", el.classList.contains(year));
        }
    });
  }

});

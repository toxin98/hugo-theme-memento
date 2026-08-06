document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll(".posts-year-filter button");
  const sections = document.querySelectorAll(".posts-section");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const year = button.dataset.filter;

      buttons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      sections.forEach(section => {

        if (year === "all" || section.dataset.year === year) {
          section.classList.remove("hidden");
        } else {
          section.classList.add("hidden");
        }

      });

    });

  });

});

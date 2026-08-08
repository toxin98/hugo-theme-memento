document.addEventListener('DOMContentLoaded', () => {

  const yearButtons = document.querySelectorAll(".posts-filter.year");
  const tagButtons = document.querySelectorAll(".posts-filter.tag");
  const tagsCleaner = document.querySelector("#tagsCleaner");

  let currentYear = "all";
  let currentTags = [];

  yearButtons.forEach(button => {

    button.addEventListener("click", () => {

      currentYear = button.dataset.filter;

      yearButtons.forEach(btn => {
        btn.classList.toggle(
          "active",
          btn === button
        );
      });

      filterPosts();

    });

  });

  tagButtons.forEach(button => {

    button.addEventListener("click", () => {

      const tag = button.dataset.filter;

      if (currentTags.includes(tag)) {
        currentTags = currentTags.filter(item => item !== tag);
        button.classList.remove("active");
      } else {
        currentTags.push(tag);
        button.classList.add("active");
      }

      updateClearButton();

      filterPosts();

    });

  });

  tagsCleaner.addEventListener("click",()=>{

    currentTags = [];

    tagButtons.forEach(button=>{
      button.classList.remove("active");
    });

    updateClearButton();

    filterPosts();

  });

  function updateClearButton() {

    tagsCleaner.classList.toggle(
      "show",
      currentTags.length > 0
    );

  }

  function filterPosts() {

    document.querySelectorAll(".posts .collection-group")
      .forEach(section => {


        const yearMatch =
          currentYear === "all" ||
          section.dataset.year === currentYear;

        let hasVisiblePost = false;


        section.querySelectorAll(".posts .collection-item")
          .forEach(post => {

            const tags = post.dataset.tags
              .split(",")
              .map(tag => tag.trim());

            const tagMatch =
              currentTags.length === 0 ||
              currentTags.every(tag =>
                tags.includes(tag)
              );

            const visible =
              yearMatch && tagMatch;

            post.classList.toggle(
              "hidden",
              !visible
            );

            if (visible) {
              hasVisiblePost = true;
            }

          });


        section.classList.toggle(
          "hidden",
          !hasVisiblePost
        );


      });

  }

});

console.log("ephemera loaded");

window.addEventListener("DOMContentLoaded", () => {
  /**
   * 切换视图
   */
  const feed = document.getElementById("ephemeraFeed");

  if (feed) {

    document
      .querySelectorAll(".view-toggle")
      .forEach(button => {

        button.addEventListener("click", () => {

          feed.classList.toggle(
            "grid-view",
            button.dataset.view === "grid"
          );

          feed.classList.toggle(
            "stream-view",
            button.dataset.view === "stream"
          );

        });

      });

  }

  document.addEventListener("click", (e) => {

    const trigger = e.target.closest(
      ".ephemera-maximize, .ephemera-media"
    );

    if (!trigger) return;

    const item = trigger.closest(
      ".ephemera-item"
    );

    if (!item) return;

    openViewer(item);

  });

  const viewer = document.getElementById("ephemeraViewer");

  const viewerLeft =
    viewer.querySelector(".viewer-left");

  const viewerRight =
    viewer.querySelector(".viewer-right");

  function openViewer(item) {

    const media =
      item.querySelector(".ephemera-media");

    const date =
      item.querySelector(".ephemera-date");

    const content =
      item.querySelector(".ephemera-content");

    viewerLeft.innerHTML = "";

    viewerRight.innerHTML = "";

    const mediaClone =
      media.cloneNode(true);

    const dateClone =
      date.cloneNode(true);

    const contentClone =
      content.cloneNode(true);

    const sudoku =
      mediaClone.querySelector(".sudoku");

    if (sudoku) {

      //
      // 替换容器 class
      //

      sudoku.className =
        "ephemera-image-gallery";

      //
      // 使用大图替换缩略图
      //

      sudoku
        .querySelectorAll("img")
        .forEach(img => {

          const large =
            img.dataset.viewerSrc;

          if (large) {
            img.src = large;
          }

        });

    }


    viewerLeft.append(mediaClone);

    viewerRight.append(
      dateClone,
      contentClone
    );

    viewer.classList.remove("hidden");

    document.body.classList.add(
      "viewer-open"
    );

  }

  function closeViewer() {

    viewer.classList.add("hidden");

    document.body.style.overflow = "";

  }

  document
    .querySelector(".viewer-close")
    ?.addEventListener("click", closeViewer);

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      closeViewer();

    }

  });

});

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

  const viewerMain =
    viewer.querySelector(".overlay-main");

  const viewerSide =
    viewer.querySelector(".overlay-side");

  function openViewer(item) {

    const sudoku = item.querySelector(".sudoku");

    if (sudoku) {

      buildImageGallery(sudoku);

    } else {

      viewerMain.replaceChildren(
        item.querySelector(".ephemera-media").cloneNode(true)
      );

    }

    viewerSide.replaceChildren(
      item.querySelector(".ephemera-date").cloneNode(true),
      item.querySelector(".ephemera-content").cloneNode(true)
    );

    viewer.classList.remove("hidden");

    document.documentElement.classList.add("overlay-open");

  }

  function closeViewer() {

    viewer.classList.add("hidden");

    document.documentElement.classList.remove("overlay-open");

  }

  document
    .querySelector(".button-close")
    ?.addEventListener("click", closeViewer);

  function buildImageGallery(sudoku) {

    const images = [
      ...sudoku.querySelectorAll(
        "img[data-viewer-src]"
      )
    ];

    let index = 0;

    viewerMain.innerHTML = `
      <div class="ephemera-image-gallery">

        <img
          class="ephemera-image-gallery-image"
        >

        <div class="ephemera-image-gallery-controls">

          <button
            type="button"
            data-gallery-prev
          >
            ‹
          </button>

          <span
            class="ephemera-image-gallery-status"
          ></span>

          <button
            type="button"
            data-gallery-next
          >
            ›
          </button>

        </div>

      </div>
    `;

    const image =
      viewerMain.querySelector(
        ".ephemera-image-gallery-image"
      );

    const status =
      viewerMain.querySelector(
        ".ephemera-image-gallery-status"
      );

    function render() {

      image.src =
        images[index].dataset.viewerSrc;

      status.textContent =
        `${index + 1} / ${images.length}`;

    }

    render();

    viewerMain
      .querySelector("[data-gallery-prev]")
      .addEventListener("click", () => {

        index =
          (index - 1 + images.length)
          % images.length;

        render();

      });

    viewerMain
      .querySelector("[data-gallery-next]")
      .addEventListener("click", () => {

        index =
          (index + 1)
          % images.length;

        render();

      });

  }

  document.addEventListener("keydown", (e) => {

    if (
      viewer.classList.contains(
        "hidden"
      )
    ) return;

    if (e.key === "ArrowLeft") {

      gallery.index =
        (
          gallery.index
          - 1
          + gallery.images.length
        )
        %
        gallery.images.length;

      renderGallery();

    }

    if (e.key === "ArrowRight") {

      gallery.index =
        (
          gallery.index
          + 1
        )
        %
        gallery.images.length;

      renderGallery();

    }

    if (e.key === "Escape") {

      closeViewer();

    }

  });

});

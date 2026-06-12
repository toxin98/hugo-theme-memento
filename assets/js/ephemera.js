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

    const item = e.target.closest(".ephemera-item");

    if (!item) return;

    // const media =
    //   e.target.closest("[data-ephemera-media]");

    // if (!media) return;

    // const item =
    //   media.closest("[data-ephemera-item]");

    // if (!item) return;

    openViewer(item);

  });

  const viewer = document.getElementById("ephemeraViewer");

  const viewerLeft =
    viewer.querySelector(".viewer-left");

  const viewerRight =
    viewer.querySelector(".viewer-right");

  function openViewer(item) {

    /*
    * 右侧
    */
    viewerRight.innerHTML = `
      ${item.querySelector(".ephemera-date").outerHTML}
      ${item.querySelector(".ephemera-content").outerHTML}
    `;

    /*
    * 左侧媒体单独处理
    */
    const media =
      item.querySelector(".ephemera-media");

    if (media) {

      const clone = media.cloneNode(true);

      /*
      * Feed中的缩略图
      * 换成Viewer大图
      */
      clone.querySelectorAll("img").forEach(img => {

        if (img.dataset.viewerSrc) {

          img.src = img.dataset.viewerSrc;

        }

      });

      viewerLeft.replaceChildren(clone);

    }

    viewer.classList.remove("hidden");

    document.body.style.overflow = "hidden";
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

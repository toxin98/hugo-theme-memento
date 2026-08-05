document.addEventListener("DOMContentLoaded", () => {

  const feed = document.getElementById("ephemeraFeed");

  const buttons = document.querySelectorAll(".layout-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const layout = button.dataset.layout;
      feed.dataset.layout = layout;
    });
  });

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
  const viewerMain = viewer?.querySelector(".viewer-main");
  const viewerSide = viewer?.querySelector(".viewer-side");

  function openViewer(item) {

    viewer.style.removeProperty("transform");
    viewer.style.removeProperty("opacity");

    const mediaDiv = document.createElement("div");
    mediaDiv.className = "ephemera-media";
    mediaDiv.append(
      createSwiper(item.querySelector(".ephemera-media"))
    );

    viewerMain.replaceChildren(mediaDiv);

    viewerSide.replaceChildren(
      item.querySelector(".ephemera-date").cloneNode(true),
      item.querySelector(".ephemera-content").cloneNode(true)
    );

    viewer.classList.remove("hidden");

    document.documentElement.classList.add("viewer-show");

  }

  function closeViewer() {
    viewer.style.transform = "";
    viewer.style.opacity = "";
    viewer.classList.add("hidden");
    document.documentElement.classList.remove("viewer-show");
  }

  document.querySelector(".button-close")?.addEventListener("click", closeViewer);

  let startY = 0;
  let currentY = 0;
  let dragging = false;


  viewer.addEventListener("touchstart", e => {

    startY = e.touches[0].clientY;
    currentY = 0;
    dragging = true;

    viewer.classList.add("is-dragging");

  });


  viewer.addEventListener("touchmove", e => {

    if (!dragging) return;


    currentY =
      e.touches[0].clientY - startY;


    // 只允许向下拖
    if (currentY > 0) {

      viewer.style.transform =
        `translateY(${currentY}px)`;

      viewer.style.opacity =
        1 - currentY / 500;

    }

  });


  viewer.addEventListener("touchend", () => {

    dragging = false;

    viewer.classList.remove("is-dragging");

    if (currentY > 120) {

      viewer.style.transform =
        `translateY(100%)`;

      viewer.style.opacity = "0";


      viewer.addEventListener(
        "transitionend",
        closeViewer,
        { once:true }
      );

    } else {

      viewer.style.transform = "";
      viewer.style.opacity = "";

    }

  });

  function createSwiper(itemMedia) {

    const swiper = document.createElement(
      "swiper-container"
    );

    swiper.setAttribute("pagination", "true");
    swiper.setAttribute("pagination-type", "fraction");
    swiper.setAttribute("navigation", "true")


    itemMedia
      .querySelectorAll("img[data-viewer-src]")
      .forEach(img => {

        const slide = document.createElement(
          "swiper-slide"
        );

        const image = document.createElement("img");

        image.src = img.dataset.viewerSrc;

        slide.append(image);

        swiper.append(slide);

      });


    return swiper;
  }

});

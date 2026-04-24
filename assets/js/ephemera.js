function initEphemeraGallery(root = document) {
  const galleries = [];

  if (root.matches?.("[data-ephemera-gallery]")) {
    galleries.push(root);
  }

  galleries.push(...root.querySelectorAll?.("[data-ephemera-gallery]"));

  galleries.forEach((gallery) => {
    if (gallery.dataset.ephemeraReady === "true") return;

    const slides = Array.from(gallery.querySelectorAll("[data-ephemera-slide]"));
    const prevButton = gallery.querySelector("[data-ephemera-prev]");
    const nextButton = gallery.querySelector("[data-ephemera-next]");
    const status = gallery.querySelector("[data-ephemera-status]");

    if (slides.length === 0) return;

    let currentIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    function render(index) {
      currentIndex = index;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      if (status) {
        status.textContent = `${currentIndex + 1} / ${slides.length}`;
      }
    }

    prevButton?.addEventListener("click", () => {
      render((currentIndex - 1 + slides.length) % slides.length);
    });

    nextButton?.addEventListener("click", () => {
      render((currentIndex + 1) % slides.length);
    });

    gallery.dataset.ephemeraReady = "true";
    render(currentIndex);
  });
}

function initEphemeraViewer() {
  const viewer = document.getElementById("viewer");
  const list = document.querySelector(".ephemera-stream");

  if (!viewer || !list) return;

  const left = viewer.querySelector(".viewer-left");
  const right = viewer.querySelector(".viewer-right");
  const closeButton = viewer.querySelector(".viewer-close");

  function closeViewer() {
    viewer.classList.add("hidden");
    viewer.classList.remove("viewer-empty-media");
    left.innerHTML = "";
    right.innerHTML = "";
    document.body.style.overflow = "";
  }

  function renderViewerContent(ephemera) {
    const summary = ephemera.querySelector(".ephemera-summary")?.cloneNode(true);
    const content = ephemera.querySelector(".ephemera-content")?.cloneNode(true);

    left.innerHTML = "";
    right.innerHTML = "";

    if (summary) {
      left.appendChild(summary);
      initEphemeraGallery(left);
      viewer.classList.remove("viewer-empty-media");
    } else {
      viewer.classList.add("viewer-empty-media");
    }

    if (content) {
      right.appendChild(content);
    }
  }

  async function openViewer(url) {
    if (!url) {
      console.error("Ephemera card is missing data-url.");
      return;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status}`);
      }

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const ephemera = doc.querySelector(".content");

      if (!ephemera) {
        throw new Error(`Missing .content in ${url}`);
      }

      renderViewerContent(ephemera);
      viewer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error(error);
    }
  }

  list.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;

    const item = event.target.closest(".ephemera-item");
    if (!item) return;

    openViewer(item.dataset.url);
  });

  closeButton?.addEventListener("click", closeViewer);

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !viewer.classList.contains("hidden")) {
      closeViewer();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initEphemeraGallery();
    initEphemeraViewer();
  });
} else {
  initEphemeraGallery();
  initEphemeraViewer();
}

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
      const ephemera = doc.querySelector(".ephemera-body");

      if (!ephemera) {
        throw new Error(`Missing .ephemera-body in ${url}`);
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

    const card = event.target.closest(".ephemera-card");
    if (!card) return;

    openViewer(card.dataset.url);
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
  document.addEventListener("DOMContentLoaded", initEphemeraViewer);
} else {
  initEphemeraViewer();
}

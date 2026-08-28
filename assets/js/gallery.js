function getGalleryOptions(gallery) {

  const styles = getComputedStyle(gallery);

  return {
    itemSelector: ".fj-gallery-item",
    gutter: parseFloat(styles.getPropertyValue("--fj-gutter")) || 10,
    rowHeight: parseFloat(styles.getPropertyValue("--fj-row-height")) || 320,
  };

}

function initGallery(gallery) {
  if (gallery.dataset.fjGalleryInitialized) return;

  fjGallery(
    gallery,
    getGalleryOptions(gallery)
  );

  gallery.dataset.fjGalleryInitialized = "true";
}

function initGalleries(root) {
  const galleries = root.querySelectorAll(".fj-gallery");
  galleries.forEach(initGallery);
}

document.addEventListener("DOMContentLoaded", async () => {

  // 初始化当前页面已有的 Gallery
  initGalleries(document);

  // 监听以后动态加入的 DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        initGalleries(node);
      });
    });
  });

  const root = document.querySelector(
    "[data-infinite-scroll-list]"
  );

  if (root) {
    observer.observe(root, {
      childList: true,
      subtree: true,
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const readingHeader = document.querySelector("main > .reading-bar");
  const sourceTitle = document.querySelector("main article.content > h1");

  if (!header || !readingHeader || !sourceTitle) return;

  const tocButton = readingHeader.querySelector(".sidebar-toggle-reading");
  const hasToc = Boolean(document.querySelector("#TableOfContents a"));

  header.classList.add("has-reading-header");
  header.classList.toggle("has-reading-toc", hasToc);
  if (!hasToc) tocButton?.remove();

  const layout = ["three", "two", "one"].find((name) =>
    document.querySelector(`.${name}-column-layout`)
  );
  if (layout) header.classList.add(`reading-layout-${layout}`);

  let frame;
  let lastScrollY = window.scrollY;
  let pendingScrollDelta = 0;
  let direction = "down";
  let isReading = false;
  let readingStartAt;
  let readingEndAt;

  function measureReadingRange() {
    const titleRect = sourceTitle.getBoundingClientRect();
    const titleTop = titleRect.top + window.scrollY;
    const titleBottom = titleRect.bottom + window.scrollY;
    const visibleHeaderHeight = header.getBoundingClientRect().height;

    readingStartAt = Math.max(0, titleBottom - visibleHeaderHeight);
    readingEndAt = Math.max(0, titleTop - visibleHeaderHeight);
  }

  function hideReadingHeader() {
    isReading = false;
    header.classList.remove("reading-header-up", "reading-header-down");
    readingHeader.setAttribute("aria-hidden", "true");
  }

  function update() {
    frame = undefined;

    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;
    pendingScrollDelta += scrollDelta;

    if (Math.abs(pendingScrollDelta) >= 8) {
      direction = pendingScrollDelta > 0 ? "down" : "up";
      pendingScrollDelta = 0;
    }

    if (!isReading && currentScrollY >= readingStartAt) {
      isReading = true;
    }

    if (isReading && currentScrollY <= readingEndAt) {
      hideReadingHeader();
      return;
    }

    if (!isReading) return;

    readingHeader.setAttribute("aria-hidden", "false");
    header.classList.toggle("reading-header-up", direction === "up");
    header.classList.toggle("reading-header-down", direction !== "up");
  }

  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => {
    if (!isReading) measureReadingRange();
    requestUpdate();
  });
  measureReadingRange();
  update();
});

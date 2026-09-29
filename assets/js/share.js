document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector("[data-share-dialog]");
  const closeButton = document.querySelector("[data-share-close]");
  const copyButton = document.querySelector("[data-share-copy]");

  if (!dialog) return;

  document.addEventListener("click", (e) => {
    const openButton = e.target.closest("[data-share-open]");

    if (openButton) {
      dialog.showModal();
    }
  });

  closeButton?.addEventListener("click", () => {
    dialog.close();
  });

  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      copyButton.querySelector("span").textContent = "Copied";

      setTimeout(() => {
        copyButton.querySelector("span").textContent = "Copy link";
      }, 1500);
    } catch {
      console.error("Failed to copy link");
    }
  });
});
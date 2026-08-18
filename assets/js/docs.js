document.addEventListener("DOMContentLoaded", () => {
  const expandButton = document.querySelector("#docs-expand");
  const collapseButton = document.querySelector("#docs-collapse");

  expandButton?.addEventListener("click", () => {
    document.querySelectorAll(".docs-tree details").forEach(details => {
      details.open = true;
    });
  });

  collapseButton?.addEventListener("click", () => {
    document.querySelectorAll(".docs-tree details").forEach(details => {
      details.open = false;
    });
  });
});
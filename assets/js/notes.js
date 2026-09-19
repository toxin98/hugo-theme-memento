document.addEventListener("DOMContentLoaded", () => {
  const expandButton = document.querySelector("#notes-expand");
  const collapseButton = document.querySelector("#notes-collapse");

  expandButton?.addEventListener("click", () => {
    document.querySelectorAll(".notes-tree details").forEach(details => {
      details.open = true;
    });
  });

  collapseButton?.addEventListener("click", () => {
    document.querySelectorAll(".notes-tree details").forEach(details => {
      details.open = false;
    });
  });
});
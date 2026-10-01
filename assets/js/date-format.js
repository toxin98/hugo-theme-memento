document.addEventListener("DOMContentLoaded", () => {
  function updateLocalTime(el) {
    const date = new Date(el.dateTime);
    const layout = el.dataset.timeLayout;

    if (Number.isNaN(date.getTime())) {
      return;
    }

    // 辅助函数：补齐双位数 (例如 8 -> "08")
    const pad = num => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    let output = "";

    switch (layout) {
      case "notes":
        output = `${year}/${month}/${day} ${hours}:${minutes}`;
        break;

      case "posts-section":
        output = `${year}/${month}/${day}`;
        break;

      case "posts-page":
        output = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        break;

      case "ephemera": {
        // 独立获取星期英文全称
        const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
        output = `${year}/${month}/${day} ${hours}:${minutes} ${weekday}`;
        break;
      }

      default:
        return;
    }

    el.textContent = output;
    el.hidden = false;
  }

  document.querySelectorAll(".local-time").forEach(updateLocalTime)

  const observer = new MutationObserver(mutations => {
    console.log("[local-time] DOM mutation", mutations);
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }

        if (node.matches(".local-time")) {
          updateLocalTime(node);
        }

        node.querySelectorAll(".local-time")
          .forEach(updateLocalTime);
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

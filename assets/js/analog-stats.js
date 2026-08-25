document.addEventListener("DOMContentLoaded", () => {
  if (typeof metadataList === "undefined" || !Array.isArray(metadataList)) {
    console.error("未找到 metadataList 数据，请检查 analog-metadata.js 是否正确加载。");
    return;
  }

  renderOverview(metadataList);
  renderCharts(metadataList);
  renderFilmList(metadataList);
});

// 辅助：计算某个字段值的频次并排序
function getCounts(arr) {
  const counts = {};
  arr.forEach((item) => {
    if (item) counts[item] = (counts[item] || 0) + 1;
  });
  // 按出现次数从大到小排序
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

// 1. 渲染顶部统计看板
function renderOverview(data) {
  document.getElementById("total-rolls").textContent = data.length;

  const topCamera = getCounts(data.map((d) => d.camera))[0];
  const topFilm = getCounts(data.map((d) => d.film))[0];
  const topLab = getCounts(data.map((d) => d.development?.lab))[0];

  document.getElementById("top-camera").textContent = topCamera ? topCamera[0] : "无";
  document.getElementById("top-film").textContent = topFilm ? topFilm[0] : "无";
  document.getElementById("top-lab").textContent = topLab ? topLab[0] : "无";
}

// 2. 渲染图表 (柱状图 & 饼状图)
function renderCharts(data) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js 未能加载，无法绘制图表");
    return;
  }

  // ---- 柱状图：相机使用频率 ----
  const cameraCounts = getCounts(data.map((d) => d.camera));
  const cameraLabels = cameraCounts.map((item) => item[0]);
  const cameraData = cameraCounts.map((item) => item[1]);

  new Chart(document.getElementById("cameraChart"), {
    type: "bar",
    data: {
      labels: cameraLabels,
      datasets: [
        {
          label: "使用卷数",
          data: cameraData,
          backgroundColor: "#d97706", // 胶片暖橙色
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
      },
    },
  });

  // ---- 饼状图：胶卷类型比例 ----
  const filmCounts = getCounts(data.map((d) => d.film));
  const filmLabels = filmCounts.map((item) => item[0]);
  const filmData = filmCounts.map((item) => item[1]);

  // 胶片风调配色盘
  const palette = ["#d97706", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#6b7280"];

  new Chart(document.getElementById("filmChart"), {
    type: "doughnut", // 圆环/饼图
    data: {
      labels: filmLabels,
      datasets: [
        {
          data: filmData,
          backgroundColor: palette.slice(0, filmLabels.length),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "right" },
      },
    },
  });
}

// 3. 渲染底部的胶卷列表
function renderFilmList(data) {
  const container = document.getElementById("films-container");
  container.innerHTML = "";

  const sortedData = [...data].sort((a, b) => b.id.localeCompare(a.id));

  sortedData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "film-card";

    const scannerBrand = item.development?.digitization?.brand || "";
    const scannerModel = item.development?.digitization?.model || "";
    const scannerText = [scannerBrand, scannerModel].filter(Boolean).join(" ") || "未记录";

    const startDate = item.date?.started || "未知";
    const finishedDate = item.date?.finished || "未完";

    card.innerHTML = `
      <div>
        <div class="film-header">
          <div>
            <div class="film-name">${item.film || "未知胶卷"}</div>
            <span class="badge">${item.development?.process || "未知工艺"}</span>
          </div>
          <span class="film-id">#${item.id}</span>
        </div>

        <div class="film-details">
          <div class="detail-item">
            <span class="detail-label">使用相机</span>
            <span class="detail-value">${item.camera || "未记录"}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">冲洗店家</span>
            <span class="detail-value">${item.development?.lab || "未记录"}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">数字化方式</span>
            <span class="detail-value">${scannerText}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">拍摄周期</span>
            <span class="detail-value" style="font-size: 0.75rem;">${startDate} ~ ${finishedDate}</span>
          </div>
        </div>
      </div>

      ${item.note ? `<div class="note-box">💬 ${item.note}</div>` : ""}
    `;

    container.appendChild(card);
  });
}

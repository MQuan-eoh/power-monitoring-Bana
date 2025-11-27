/**
 * UI Handlers Module
 * Handles all UI interactions, modals, and user feedback
 */

import { state, elements } from "./config.js";
import { generateHistoryChart } from "./chart.js";

/**
 * Show history modal with chart
 */
export function showHistory(type) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const titles = {
    voltage: "Lịch sử Điện áp",
    current: "Lịch sử Dòng điện",
    power: "Lịch sử Công suất",
    thd: "Xu hướng THD",
  };

  modalTitle.textContent = titles[type] || "Lịch sử dữ liệu";
  modalBody.innerHTML =
    '<div class="chart-container"><canvas id="historyChart"></canvas></div>';

  modal.style.display = "block";

  // Generate chart data
  generateHistoryChart(type);
}

/**
 * Show details modal
 */
export function showDetails(type) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const titles = {
    voltage: "Chi tiết Điện áp",
    current: "Chi tiết Dòng điện",
    power: "Chi tiết Công suất",
    peak: "Chi tiết Giá trị đỉnh",
    thd: "Chi tiết THD",
  };

  modalTitle.textContent = titles[type] || "Chi tiết dữ liệu";
  modalBody.innerHTML = generateDetailsHTML(type);
  modal.style.display = "block";
}

/**
 * Generate details HTML content
 */
function generateDetailsHTML(type) {
  const detailsData = getDetailsData(type);
  const data = detailsData[type] || { items: [] };
  let html = '<div style="display: grid; gap: 12px; margin-top: 20px;">';

  data.items.forEach((item) => {
    const statusColor = getStatusColor(item.status);
    html += `
      <div style="background: rgba(15, 23, 42, 0.6); border-radius: 12px; padding: 16px; border-left: 3px solid ${statusColor};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-weight: 600; color: #f1f5f9;">${item.label}</span>
          <span style="font-size: 18px; font-weight: 700; color: ${statusColor};">${item.value}</span>
        </div>
        <div style="font-size: 12px; color: #94a3b8;">
          Phạm vi: ${item.range}
        </div>
      </div>
    `;
  });

  html += "</div>";
  return html;
}

/**
 * Get status color
 */
function getStatusColor(status) {
  const colors = {
    good: "#10b981",
    normal: "#3b82f6",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#8b5cf6",
  };
  return colors[status] || "#64748b";
}

/**
 * Get details data structure
 */
function getDetailsData(type) {
  return {
    voltage: {
      items: [
        {
          label: "Điện áp pha 1-N",
          value: "--",
          status: "normal",
          range: "200-240V",
        },
        {
          label: "Điện áp pha 2-N",
          value: "--",
          status: "normal",
          range: "200-240V",
        },
        {
          label: "Điện áp pha 3-N",
          value: "--",
          status: "normal",
          range: "200-240V",
        },
        {
          label: "Điện áp trung bình",
          value: "--",
          status: "normal",
          range: "200-240V",
        },
        { label: "Độ lệch điện áp", value: "--", status: "good", range: "<3%" },
      ],
    },
    current: {
      items: [
        {
          label: "Dòng điện pha 1",
          value: "--",
          status: "normal",
          range: "0-20A",
        },
        {
          label: "Dòng điện pha 2",
          value: "--",
          status: "normal",
          range: "0-20A",
        },
        {
          label: "Dòng điện pha 3",
          value: "--",
          status: "normal",
          range: "0-20A",
        },
        {
          label: "Dòng điện trung bình",
          value: "--",
          status: "normal",
          range: "0-20A",
        },
        {
          label: "Độ lệch dòng điện",
          value: "--",
          status: "normal",
          range: "<10%",
        },
      ],
    },
    power: {
      items: [
        {
          label: "Công suất tác dụng",
          value: "--",
          status: "normal",
          range: "0-15kW",
        },
        {
          label: "Công suất phản kháng",
          value: "--",
          status: "normal",
          range: "0-5kVAr",
        },
        {
          label: "Công suất biểu kiến",
          value: "--",
          status: "normal",
          range: "0-16kVA",
        },
        {
          label: "Hệ số công suất",
          value: "--",
          status: "good",
          range: ">0.9",
        },
        {
          label: "Tần số",
          value: "--",
          status: "normal",
          range: "49.5-50.5Hz",
        },
      ],
    },
    peak: {
      items: [
        {
          label: "Công suất tối đa",
          value: "--",
          status: "normal",
          range: "Thời gian: --",
        },
        {
          label: "Dòng điện tối đa",
          value: "--",
          status: "normal",
          range: "Thời gian: --",
        },
        {
          label: "Năng lượng tiêu thụ",
          value: "--",
          status: "normal",
          range: "Hôm nay",
        },
        {
          label: "Thời gian reset cuối",
          value: "--",
          status: "info",
          range: "Hôm nay",
        },
        {
          label: "Chu kỳ ghi nhận",
          value: "15 phút",
          status: "info",
          range: "Tự động",
        },
      ],
    },
    thd: {
      items: [
        { label: "THD Tổng", value: "--", status: "good", range: "<5%" },
        {
          label: "THD Dòng điện L1",
          value: "--",
          status: "good",
          range: "<5%",
        },
        {
          label: "THD Dòng điện L2",
          value: "--",
          status: "good",
          range: "<5%",
        },
        {
          label: "THD Dòng điện L3",
          value: "--",
          status: "good",
          range: "<5%",
        },
        {
          label: "THD Điện áp U1-N",
          value: "--",
          status: "good",
          range: "<3%",
        },
        {
          label: "THD Điện áp U2-N",
          value: "--",
          status: "good",
          range: "<3%",
        },
        {
          label: "THD Điện áp U3-N",
          value: "--",
          status: "good",
          range: "<3%",
        },
      ],
    },
  };
}

/**
 * Reset peak values
 */
export function resetPeak() {
  if (!state.eraWidget || !state.actions.length) {
    alert("Không thể thực hiện reset. Vui lòng kiểm tra kết nối E-RA.");
    return;
  }

  if (confirm("Bạn có chắc chắn muốn reset các giá trị đỉnh không?")) {
    try {
      const resetAction = state.actions.find(
        (action) => action.name && action.name.toLowerCase().includes("reset")
      );

      if (resetAction) {
        state.eraWidget.publishAction(resetAction.id, 1);
        showNotification("Reset thành công!", "success");

        // Reset display values temporarily
        elements.pmax.innerHTML = '0.0<span class="metric-unit">kW</span>';
        elements.imax.innerHTML = '0.0<span class="metric-unit">A</span>';

        console.log("Peak values reset successfully");
      } else {
        throw new Error("Reset action not found");
      }
    } catch (error) {
      console.error("Error resetting peak values:", error);
      showNotification("Lỗi khi reset giá trị đỉnh", "error");
    }
  }
}

/**
 * Analyze THD
 */
export function analyzeTHD() {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = "Phân tích THD Chi tiết";

  // Get current THD values
  const currentTHD = {
    thd: parseFloat(elements.thd.textContent) || 0,
    thdi1: parseFloat(elements.thdi1.textContent) || 0,
    thdi2: parseFloat(elements.thdi2.textContent) || 0,
    thdi3: parseFloat(elements.thdi3.textContent) || 0,
    thdu1n: parseFloat(elements.thdu1n.textContent) || 0,
    thdu2n: parseFloat(elements.thdu2n.textContent) || 0,
    thdu3n: parseFloat(elements.thdu3n.textContent) || 0,
  };

  let analysisHTML = generateTHDAnalysisHTML(currentTHD);
  modalBody.innerHTML = analysisHTML;
  modal.style.display = "block";
}

/**
 * Generate THD analysis HTML
 */
function generateTHDAnalysisHTML(currentTHD) {
  const maxTHD = Math.max(currentTHD.thdi1, currentTHD.thdi2, currentTHD.thdi3);
  const avgTHD = (currentTHD.thdi1 + currentTHD.thdi2 + currentTHD.thdi3) / 3;
  const maxVTHD = Math.max(
    currentTHD.thdu1n,
    currentTHD.thdu2n,
    currentTHD.thdu3n
  );

  let overallStatus = "excellent";
  let overallColor = "#10b981";
  let overallText = "Tuyệt vời";

  if (maxTHD > 8 || maxVTHD > 5) {
    overallStatus = "poor";
    overallColor = "#ef4444";
    overallText = "Cần cải thiện";
  } else if (maxTHD > 5 || maxVTHD > 3) {
    overallStatus = "fair";
    overallColor = "#f59e0b";
    overallText = "Chấp nhận được";
  } else if (maxTHD > 3 || maxVTHD > 2) {
    overallStatus = "good";
    overallColor = "#3b82f6";
    overallText = "Tốt";
  }

  let html = `
    <div style="margin-top: 20px;">
      <div style="background: rgba(15, 23, 42, 0.6); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="color: #f1f5f9; margin-bottom: 16px;">Đánh giá tổng quan</h3>
        <div style="display: grid; gap: 12px;">
          <div style="background: rgba(30, 41, 59, 0.6); border-radius: 8px; padding: 12px; border-left: 3px solid ${overallColor};">
            <strong style="color: ${overallColor};">Tình trạng chung: ${overallText}</strong>
            <p style="color: #cbd5e1; font-size: 14px; margin-top: 4px;">
              THD trung bình dòng điện: ${avgTHD.toFixed(
                2
              )}% | THD cao nhất: ${maxTHD.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
      <div style="background: rgba(15, 23, 42, 0.6); border-radius: 12px; padding: 20px;">
        <h3 style="color: #f1f5f9; margin-bottom: 16px;">Khuyến nghị</h3>
        <div style="display: grid; gap: 12px;">
  `;

  if (overallStatus === "excellent") {
    html += `
      <div style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; padding: 12px;">
        <p style="color: #10b981;">Chất lượng điện rất tốt. Tiếp tục duy trì mức vận hành hiện tại.</p>
      </div>
    `;
  } else if (overallStatus === "good") {
    html += `
      <div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 12px;">
        <p style="color: #3b82f6;">Chất lượng điện tốt. Theo dõi định kỳ để đảm bảo ổn định.</p>
      </div>
    `;
  } else {
    html += `
      <div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 12px;">
        <p style="color: #f59e0b;">Kiểm tra các thiết bị phi tuyến trong hệ thống</p>
      </div>
      <div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 12px;">
        <p style="color: #f59e0b;">Cân nhắc lắp đặt bộ lọc sóng hài</p>
      </div>
    `;
  }

  const currentImbalance = Math.abs(
    Math.max(currentTHD.thdi1, currentTHD.thdi2, currentTHD.thdi3) -
      Math.min(currentTHD.thdi1, currentTHD.thdi2, currentTHD.thdi3)
  );

  if (currentImbalance > 1) {
    html += `
      <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 12px;">
        <p style="color: #ef4444;">Phát hiện mất cân bằng THD giữa các pha (${currentImbalance.toFixed(
          2
        )}%)</p>
      </div>
    `;
  }

  html += `
        </div>
      </div>
    </div>
  `;

  return html;
}

/**
 * Close modal
 */
export function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/**
 * Show connection error
 */
export function showConnectionError() {
  const connectionElements = document.querySelectorAll(".connection-status");
  connectionElements.forEach((el) => {
    el.innerHTML =
      '<div style="width: 8px; height: 8px; border-radius: 50%; background: #ef4444;"></div><span>Connection Error</span>';
    el.style.background = "rgba(239, 68, 68, 0.1)";
    el.style.borderColor = "rgba(239, 68, 68, 0.3)";
  });

  showNotification("Lỗi kết nối E-RA. Vui lòng kiểm tra cấu hình.", "error");
}

/**
 * Show notification
 */
export function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    padding: 16px 20px;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    transform: translateX(100%);
  `;

  const colors = {
    success:
      "background: rgba(16, 185, 129, 0.9); border: 1px solid rgba(16, 185, 129, 0.3);",
    error:
      "background: rgba(239, 68, 68, 0.9); border: 1px solid rgba(239, 68, 68, 0.3);",
    info: "background: rgba(59, 130, 246, 0.9); border: 1px solid rgba(59, 130, 246, 0.3);",
    warning:
      "background: rgba(245, 158, 11, 0.9); border: 1px solid rgba(245, 158, 11, 0.3);",
  };

  notification.style.cssText += colors[type] || colors.info;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

/**
 * Update system status periodically
 */
export function updateSystemStatus() {
  const now = new Date();
  console.log(`Status updated at ${now.toLocaleTimeString()}`);
}

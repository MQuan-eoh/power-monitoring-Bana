/**
 * Chart.js Module
 * Handles chart generation and visualization
 */

/**
 * Generate history chart for different data types
 */
export function generateHistoryChart(type) {
  const canvas = document.getElementById("historyChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Generate sample data for demonstration
  const labels = [];
  const data1 = [];
  const data2 = [];
  const data3 = [];

  for (let i = 23; i >= 0; i--) {
    const time = new Date();
    time.setHours(time.getHours() - i);
    labels.push(time.getHours() + ":00");

    // Generate realistic sample data based on type
    switch (type) {
      case "voltage":
        data1.push(220 + Math.random() * 4 - 2);
        data2.push(220 + Math.random() * 4 - 2);
        data3.push(220 + Math.random() * 4 - 2);
        break;
      case "current":
        data1.push(10 + Math.random() * 6);
        data2.push(10 + Math.random() * 6);
        data3.push(10 + Math.random() * 6);
        break;
      case "power":
        data1.push(8 + Math.random() * 4);
        data2.push(2 + Math.random() * 2);
        data3.push(8.5 + Math.random() * 4);
        break;
      case "thd":
        data1.push(2 + Math.random() * 1);
        data2.push(1.5 + Math.random() * 1);
        data3.push(2.2 + Math.random() * 1);
        break;
    }
  }

  const chartConfig = {
    voltage: {
      datasets: [
        {
          label: "U1-N",
          data: data1,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
        },
        {
          label: "U2-N",
          data: data2,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
        },
        {
          label: "U3-N",
          data: data3,
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
        },
      ],
      title: "Điện áp theo thời gian",
    },
    current: {
      datasets: [
        {
          label: "I1",
          data: data1,
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
        },
        {
          label: "I2",
          data: data2,
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
        },
        {
          label: "I3",
          data: data3,
          borderColor: "#06b6d4",
          backgroundColor: "rgba(6, 182, 212, 0.1)",
        },
      ],
      title: "Dòng điện theo thời gian",
    },
    power: {
      datasets: [
        {
          label: "P (kW)",
          data: data1,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
        },
        {
          label: "Q (kVAr)",
          data: data2,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
        },
        {
          label: "S (kVA)",
          data: data3,
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
        },
      ],
      title: "Công suất theo thời gian",
    },
    thd: {
      datasets: [
        {
          label: "THD I",
          data: data1,
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
        },
        {
          label: "THD U",
          data: data2,
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
        },
      ],
      title: "THD theo thời gian",
    },
  };

  const config = chartConfig[type];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: config.datasets.map((dataset) => ({
        ...dataset,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: dataset.borderColor,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: config.title,
          color: "#f1f5f9",
          font: { size: 16, weight: "bold" },
        },
        legend: {
          labels: { color: "#cbd5e1" },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(148, 163, 184, 0.1)" },
          ticks: { color: "#94a3b8" },
        },
        y: {
          grid: { color: "rgba(148, 163, 184, 0.1)" },
          ticks: { color: "#94a3b8" },
        },
      },
    },
  });
}

/**
 * Configuration Management Module
 * Handles E-RA widget configuration and state
 */

// Global state
export const state = {
  eraWidget: null,
  configs: {
    voltage: [],
    current: [],
    power: [],
    peak: [],
    thd: [],
  },
  actions: [],
  totalDevices: 5, // 5 tủ điện (panels)
  onlineDevices: 0,
  totalValues: 0,
};

// DOM Elements Cache
export const elements = {
  u1n: document.getElementById("u1n"),
  u2n: document.getElementById("u2n"),
  u3n: document.getElementById("u3n"),
  i1: document.getElementById("i1"),
  i2: document.getElementById("i2"),
  i3: document.getElementById("i3"),
  power: document.getElementById("power"),
  reactivepower: document.getElementById("reactivepower"),
  apparentpower: document.getElementById("apparentpower"),
  pmax: document.getElementById("pmax"),
  imax: document.getElementById("imax"),
  energy: document.getElementById("energy"),
  thd: document.getElementById("thd"),
  thdi1: document.getElementById("thdi1"),
  thdi2: document.getElementById("thdi2"),
  thdi3: document.getElementById("thdi3"),
  thdu1n: document.getElementById("thdu1n"),
  thdu2n: document.getElementById("thdu2n"),
  thdu3n: document.getElementById("thdu3n"),
  // Header elements
  totalDevices: document.getElementById("totalDevices"),
  totalValues: document.getElementById("totalValues"),
  onlineStatus: document.getElementById("onlineStatus"),
};

/**
 * Update DOM element with value
 */
export function updateElement(element, value, unit) {
  if (!element) return;

  if (value !== undefined && value !== null) {
    const formattedValue = typeof value === "number" ? value.toFixed(1) : value;
    element.innerHTML = `${formattedValue}<span class="metric-unit">${unit}</span>`;
  }
}

/**
 * Update header statistics
 */
export function updateHeaderStats(valuesCount) {
  // Update total values count
  state.totalValues = valuesCount;
  if (elements.totalValues) {
    elements.totalValues.textContent = valuesCount;
  }

  // Update online status (simplified: if we receive data, assume online)
  state.onlineDevices = valuesCount > 0 ? state.totalDevices : 0;
  if (elements.onlineStatus) {
    elements.onlineStatus.textContent = `${state.onlineDevices}/${state.totalDevices}`;
  }

  // Update total devices display
  if (elements.totalDevices) {
    elements.totalDevices.textContent = state.totalDevices;
  }
}

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
  totalPower: document.getElementById("totalPower"),
  warnings: document.getElementById("warnings"),
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
 * Check for warning conditions
 */
export function checkWarnings(values) {
  let warningCount = 0;

  // Check THD values
  state.configs.thd.forEach((config) => {
    const value = values[config?.id]?.value;
    if (value && value > 5) warningCount++;
  });

  elements.warnings.textContent = warningCount;
}

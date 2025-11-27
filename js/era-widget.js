/**
 * E-RA Widget Integration Module
 * Handles communication with E-RA IoT platform
 */

import { state, elements, updateElement, updateHeaderStats } from "./config.js";
import { showConnectionError } from "./ui-handlers.js";

/**
 * Initialize E-RA Widget
 */
export function initERAWidget() {
  try {
    state.eraWidget = new EraWidget();
    state.eraWidget.init({
      needRealtimeConfigs: true,
      needHistoryConfigs: true,
      needActions: true,
      maxRealtimeConfigsCount: 20,
      maxHistoryConfigsCount: 5,
      maxActionsCount: 5,
      minRealtimeConfigsCount: 0,
      minHistoryConfigsCount: 0,
      minActionsCount: 0,
      onConfiguration: handleConfiguration,
      onValues: handleValues,
    });
    console.log("E-RA Widget initialized successfully");
  } catch (error) {
    console.error("Error initializing E-RA Widget:", error);
    showConnectionError();
  }
}

/**
 * Handle Configuration from E-RA
 */
function handleConfiguration(configuration) {
  try {
    console.log("Configuration received:", configuration);

    if (configuration.realtime_configs) {
      // Map configs to respective categories
      state.configs.voltage = configuration.realtime_configs.slice(0, 3);
      state.configs.current = configuration.realtime_configs.slice(3, 6);
      state.configs.power = configuration.realtime_configs.slice(6, 9);
      state.configs.peak = configuration.realtime_configs.slice(9, 12);
      state.configs.thd = configuration.realtime_configs.slice(12);
    }

    if (configuration.actions) {
      state.actions = configuration.actions;
    }

    console.log("Configs mapped:", state.configs);
  } catch (error) {
    console.error("Error handling configuration:", error);
  }
}

/**
 * Handle Real-time Values from E-RA
 */
function handleValues(values) {
  try {
    console.log("Values received:", values);

    let valueCount = 0;

    // Update Voltage
    if (state.configs.voltage.length >= 3) {
      const v1 = values[state.configs.voltage[0]?.id]?.value;
      const v2 = values[state.configs.voltage[1]?.id]?.value;
      const v3 = values[state.configs.voltage[2]?.id]?.value;

      updateElement(elements.u1n, v1, "V");
      updateElement(elements.u2n, v2, "V");
      updateElement(elements.u3n, v3, "V");

      if (v1 !== undefined && v1 !== null) valueCount++;
      if (v2 !== undefined && v2 !== null) valueCount++;
      if (v3 !== undefined && v3 !== null) valueCount++;
    }

    // Update Current
    if (state.configs.current.length >= 3) {
      const i1 = values[state.configs.current[0]?.id]?.value;
      const i2 = values[state.configs.current[1]?.id]?.value;
      const i3 = values[state.configs.current[2]?.id]?.value;

      updateElement(elements.i1, i1, "A");
      updateElement(elements.i2, i2, "A");
      updateElement(elements.i3, i3, "A");

      if (i1 !== undefined && i1 !== null) valueCount++;
      if (i2 !== undefined && i2 !== null) valueCount++;
      if (i3 !== undefined && i3 !== null) valueCount++;
    }

    // Update Power
    if (state.configs.power.length >= 3) {
      const powerVal = values[state.configs.power[0]?.id]?.value;
      const reactiveVal = values[state.configs.power[1]?.id]?.value;
      const apparentVal = values[state.configs.power[2]?.id]?.value;

      updateElement(elements.power, powerVal, "kW");
      updateElement(elements.reactivepower, reactiveVal, "kVAr");
      updateElement(elements.apparentpower, apparentVal, "kVA");

      if (powerVal !== undefined && powerVal !== null) valueCount++;
      if (reactiveVal !== undefined && reactiveVal !== null) valueCount++;
      if (apparentVal !== undefined && apparentVal !== null) valueCount++;
    }

    // Update Peak values
    if (state.configs.peak.length >= 3) {
      const pmaxVal = values[state.configs.peak[0]?.id]?.value;
      const imaxVal = values[state.configs.peak[1]?.id]?.value;
      const energyVal = values[state.configs.peak[2]?.id]?.value;

      updateElement(elements.pmax, pmaxVal, "kW");
      updateElement(elements.imax, imaxVal, "A");
      updateElement(elements.energy, energyVal, "kWh");

      if (pmaxVal !== undefined && pmaxVal !== null) valueCount++;
      if (imaxVal !== undefined && imaxVal !== null) valueCount++;
      if (energyVal !== undefined && energyVal !== null) valueCount++;
    }

    // Update THD
    if (state.configs.thd.length >= 7) {
      const thd = values[state.configs.thd[0]?.id]?.value;
      const thd1 = values[state.configs.thd[1]?.id]?.value;
      const thd2 = values[state.configs.thd[2]?.id]?.value;
      const thd3 = values[state.configs.thd[3]?.id]?.value;
      const thdu1 = values[state.configs.thd[4]?.id]?.value;
      const thdu2 = values[state.configs.thd[5]?.id]?.value;
      const thdu3 = values[state.configs.thd[6]?.id]?.value;

      updateElement(elements.thd, thd, "%");
      updateElement(elements.thdi1, thd1, "%");
      updateElement(elements.thdi2, thd2, "%");
      updateElement(elements.thdi3, thd3, "%");
      updateElement(elements.thdu1n, thdu1, "%");
      updateElement(elements.thdu2n, thdu2, "%");
      updateElement(elements.thdu3n, thdu3, "%");

      if (thd !== undefined && thd !== null) valueCount++;
      if (thd1 !== undefined && thd1 !== null) valueCount++;
      if (thd2 !== undefined && thd2 !== null) valueCount++;
      if (thd3 !== undefined && thd3 !== null) valueCount++;
      if (thdu1 !== undefined && thdu1 !== null) valueCount++;
      if (thdu2 !== undefined && thdu2 !== null) valueCount++;
      if (thdu3 !== undefined && thdu3 !== null) valueCount++;
    }

    // Update header statistics
    updateHeaderStats(valueCount);
  } catch (error) {
    console.error("Error handling values:", error);
  }
}

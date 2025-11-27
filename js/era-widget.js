/**
 * E-RA Widget Integration Module
 * Handles communication with E-RA IoT platform
 */

import { state, elements, updateElement, checkWarnings } from "./config.js";
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

    // Update Voltage
    if (state.configs.voltage.length >= 3) {
      updateElement(
        elements.u1n,
        values[state.configs.voltage[0]?.id]?.value,
        "V"
      );
      updateElement(
        elements.u2n,
        values[state.configs.voltage[1]?.id]?.value,
        "V"
      );
      updateElement(
        elements.u3n,
        values[state.configs.voltage[2]?.id]?.value,
        "V"
      );
    }

    // Update Current
    if (state.configs.current.length >= 3) {
      updateElement(
        elements.i1,
        values[state.configs.current[0]?.id]?.value,
        "A"
      );
      updateElement(
        elements.i2,
        values[state.configs.current[1]?.id]?.value,
        "A"
      );
      updateElement(
        elements.i3,
        values[state.configs.current[2]?.id]?.value,
        "A"
      );
    }

    // Update Power
    if (state.configs.power.length >= 3) {
      const powerVal = values[state.configs.power[0]?.id]?.value;
      updateElement(elements.power, powerVal, "kW");
      updateElement(
        elements.reactivepower,
        values[state.configs.power[1]?.id]?.value,
        "kVAr"
      );
      updateElement(
        elements.apparentpower,
        values[state.configs.power[2]?.id]?.value,
        "kVA"
      );

      // Update total power in header
      if (powerVal) {
        elements.totalPower.textContent = `${powerVal} kW`;
      }
    }

    // Update Peak values
    if (state.configs.peak.length >= 3) {
      updateElement(
        elements.pmax,
        values[state.configs.peak[0]?.id]?.value,
        "kW"
      );
      updateElement(
        elements.imax,
        values[state.configs.peak[1]?.id]?.value,
        "A"
      );
      updateElement(
        elements.energy,
        values[state.configs.peak[2]?.id]?.value,
        "kWh"
      );
    }

    // Update THD
    if (state.configs.thd.length >= 7) {
      updateElement(elements.thd, values[state.configs.thd[0]?.id]?.value, "%");
      updateElement(
        elements.thdi1,
        values[state.configs.thd[1]?.id]?.value,
        "%"
      );
      updateElement(
        elements.thdi2,
        values[state.configs.thd[2]?.id]?.value,
        "%"
      );
      updateElement(
        elements.thdi3,
        values[state.configs.thd[3]?.id]?.value,
        "%"
      );
      updateElement(
        elements.thdu1n,
        values[state.configs.thd[4]?.id]?.value,
        "%"
      );
      updateElement(
        elements.thdu2n,
        values[state.configs.thd[5]?.id]?.value,
        "%"
      );
      updateElement(
        elements.thdu3n,
        values[state.configs.thd[6]?.id]?.value,
        "%"
      );
    }

    // Check for warnings
    checkWarnings(values);
  } catch (error) {
    console.error("Error handling values:", error);
  }
}

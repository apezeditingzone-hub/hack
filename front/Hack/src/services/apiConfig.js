// Centralized API configuration for RiskBalance backend connection
const DEFAULT_PORTS = [8088, 8080, 8085, 9080];

let activeApiBase = import.meta.env.VITE_API_URL || 'http://localhost:8088/api';

export function getApiBaseUrl() {
  return activeApiBase;
}

export async function fetchWithAutoPort(endpoint, options = {}) {
  const urlPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Try configured active base first
  try {
    const res = await fetch(`${activeApiBase}${urlPath}`, options);
    return res;
  } catch (initialErr) {
    // If connection refused, scan fallback ports
    for (const port of DEFAULT_PORTS) {
      const candidateBase = `http://localhost:${port}/api`;
      if (candidateBase === activeApiBase) continue;

      try {
        const candidateRes = await fetch(`${candidateBase}${urlPath}`, { ...options, signal: AbortSignal.timeout(1000) });
        activeApiBase = candidateBase;
        return candidateRes;
      } catch (e) {
        // continue trying
      }
    }
    throw initialErr;
  }
}

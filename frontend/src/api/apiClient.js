const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchWithAuth = async (url, authToken, options = {}) => {
  if (!authToken) {
    console.error("fetchWithAuth: Missing authToken, request blocked.");
    return Promise.reject("Unauthorized");
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 401) {
    console.error("fetchWithAuth: Unauthorized access detected");
    if (typeof window !== "undefined" && window.dispatchEvent) {
      window.dispatchEvent(new Event("logout"));
    }
    return Promise.reject("Unauthorized");
  }

  if (response.status === 204) {
    console.warn("fetchWithAuth: No Content (204), returning null");
    return []; 
  }

  return response.ok ? response.json() : Promise.reject(response);
};

const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };
  
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Something went wrong");
    return data;
  };
  
  export default {
    get: (url) => fetchWithAuth(url),
    post: (url, body) => fetchWithAuth(url, { method: "POST", body: JSON.stringify(body) }),
    patch: (url, body) => fetchWithAuth(url, { method: "PATCH", body: JSON.stringify(body) }),
    delete: (url) => fetchWithAuth(url, { method: "DELETE" }),
  };
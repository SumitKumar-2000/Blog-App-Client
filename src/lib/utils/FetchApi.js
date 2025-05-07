const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL

const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem("token");
    if (token?.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }
    const headers = {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
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
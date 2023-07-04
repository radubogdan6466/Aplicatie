// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded. Please wait",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  requestFailure: {
    title: "Error!",
    message: "An error occur while parsing request data",
  },
  responseFailure: {
    title: "Error!",
    message:
      "An error occur while fetching response from server. Please try again",
  },
  networkError: {
    title: "Error!",
    message:
      "Unable to connect to the server. Please check internet connectivity and try again.",
  },
};

// API SERVICE URL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE" }
export const SERVICE_URLS = {
  userLogin: { url: "/login", method: "POST" },
  userSignup: { url: "/signup", method: "POST" },
  getAllAngajati: { url: "/posts", method: "GET", params: true },
  getRefreshToken: { url: "/token", method: "POST" },
  createAngajat: { url: "create", method: "POST" },
  deleteAngajat: { url: "delete", method: "DELETE", query: true },
  getAngajatById: { url: "post", method: "GET", query: true },
  updateAngajat: { url: "update", method: "PUT", query: true },

  getAllTichete: { url: "/vizualizare-tichete", method: "GET", params: true },
  createTichet: { url: "/inregistrare-tichet", method: "POST" },
  deleteTichet: {
    url: "/vizualizare-tichete/delete",
    method: "DELETE",
    query: true,
  },
  getTichetById: {
    url: "/vizualizare-tichete/tichet",
    method: "GET",
    query: true,
  },
  updateTichet: {
    url: "/vizualizare-tichete/tichet/actualizare",
    method: "PUT",
    query: true,
  },
};

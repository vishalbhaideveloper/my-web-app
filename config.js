const BACKEND_URL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
  ? "http://127.0.0.1:5000"  // Local backend
  : "https://your-deployed-backend.com"; // Change this to your deployed backend URL

export default BACKEND_URL;

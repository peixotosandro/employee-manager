import axios from "axios";

const baseURL = "http://localhost:8000";

const request = axios.create({
  baseURL: baseURL
});

export default { request, baseURL };

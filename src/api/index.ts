import axios from "axios";
import { BASE_URL } from "../const";

export const request = axios.create({
  baseURL: BASE_URL,
});

import { env } from "process";

export const BACKEND_URL = env.NEXT_PUBLIC_ENV === "production" ? "https://atlantic-ui-test.vercel.app/api/" : "http://localhost:3000/api/";

//CONFIG FOR AXIOS
export const HEADER_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};
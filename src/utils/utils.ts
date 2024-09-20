import { env } from "process";

//CONFIG FOR AXIOS
export const HEADER_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};

export const LINKS = {
  github_url : "https://github.com/krishpatel023/Atlantic-UI",
  hosted_url : "https://atlantic-ui-test.vercel.app/api/",
}

export const BACKEND_URL = env.NEXT_PUBLIC_ENV === "production" ? LINKS.hosted_url : "http://localhost:3000/api/";
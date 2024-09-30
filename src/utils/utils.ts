//CONFIG FOR AXIOS
export const HEADER_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
};

export const LINKS = {
  github_url: "https://github.com/krishpatel023/Atlantic-Web-Builder",
  hosted_url: "https://atlantic-web-builder.vercel.app/api/",
};

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? LINKS.hosted_url
    : "http://localhost:3000/api/";

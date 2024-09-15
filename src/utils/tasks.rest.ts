// GET https://tasks.googleapis.com/tasks/v1/lists/[TASKLIST]/tasks/[TASK]?key=[YOUR_API_KEY] HTTP/1.1

import axios from "axios";

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

// import { google } from "googleapis";
// import { authenticate } from "@google-cloud/local-auth";

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/tasks.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// export const ApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
export const ClientKey = import.meta.env.VITE_CLIENT_KEY;

export const initAxios = () => {
  //   if (!ApiKey) {
  //     throw Error("Invalid API Key");
  //   }

  axios.defaults.headers.common = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: "Bearer " + ApiKey,
  };
};

export const fetchTaskLists = async () => {
  const url = "https://tasks.googleapis.com/tasks/v1/users/@me/lists";

  return axios.get(url);
};

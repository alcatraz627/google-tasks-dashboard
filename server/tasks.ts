import { authenticate } from "@google-cloud/local-auth";
import { promises as fs } from "fs";
import type { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import path from "path";
import process from "process";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/tasks.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = (await fs.readFile(TOKEN_PATH)).toString();
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: OAuth2Client) {
  const content = (await fs.readFile(CREDENTIALS_PATH)).toString();
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
  let client: any = await loadSavedCredentialsIfExist();
  if (client) {
    console.log(1, { client });
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  console.log(2, { client });
  return client;
}

/**
 * Lists the user's first 10 task lists.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export async function listTaskLists(auth: any) {
  const service = google.tasks({ version: "v1", auth });
  const res = await service.tasklists.list({
    maxResults: 10,
  });
  const taskLists = res.data.items;
  if (taskLists && taskLists.length) {
    console.log("Task lists:");
    taskLists.forEach((taskList) => {
      console.log(`${taskList.title} (${taskList.id})`);
    });

    return taskLists;
  } else {
    console.log("No task lists found.");
  }
}

import { Client, Account } from "appwrite";
import { appwriteConfig } from "./config";

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);

export { client, account };

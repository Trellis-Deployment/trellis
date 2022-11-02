import {
  ReactStaticSite,
  use,
  StackContext
  } from "@serverless-stack/resources";
import config from "../util/config";
import { ApiStack } from "./ApiStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api, webSocketApi } = use(ApiStack);
  const site = new ReactStaticSite(stack, "FrontEnd", {
    path: "client",
    environment: {
      REACT_APP_Client_ID: config.Client_ID,
      REACT_APP_Client_secret: config.Client_secret,
      REACT_APP_API_URL:api.url,
      REACT_APP_GitHubApp: config.GitHubApp,
      REACT_APP_Websocket_URL: webSocketApi.url,
    },
  });
  
  stack.addOutputs({
    SiteUrl: site.url,
  });
}
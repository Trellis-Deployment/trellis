import { App } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";
import { BuildServerStack } from "./BuildServerStack";
import { FrontendStack } from "./FrontendStack";
import { CronJobStack } from "./CronJobStack";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(StorageStack).stack(BuildServerStack).stack(ApiStack).stack(FrontendStack).stack(CronJobStack);
}

import * as DotEnv from "dotenv";
import * as kcors from "kcors";
import * as UrlMount from "koa-mount";
import * as StaticServer from "koa-static";

import { BankController } from "./controllers/BankController";
import { Application } from "./core/Application";

DotEnv.config();

const app = new Application();
app.useController(BankController);

app.useNativeMiddleware(UrlMount("/assets", StaticServer(__dirname + "/assets")));
app.useNativeMiddleware(kcors({
    origin: "*",
    allowHeaders: ["Content-Type"]
}));

app.start(parseInt(process.env.PORT));
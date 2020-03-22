import "reflect-metadata";

import { Server } from "http";
import * as Koa from "koa";
import * as os from "os";
import {
    useContainer,
    useKoaServer
} from "routing-controllers";
import { AuthorizationChecker } from "routing-controllers/AuthorizationChecker";
import { CurrentUserChecker } from "routing-controllers/CurrentUserChecker";

import * as _ from "lodash";
import Container from "typedi";

// tslint:disable: ban-types
export class Application {
    private _controllers: string[] | Function[] = [];
    private _middlewares: string[] | Function[] = [];

    protected koa: Koa;
    protected server: Server;
    protected authorizationChecker?: AuthorizationChecker;
    protected currentUserChecker?: CurrentUserChecker;

    constructor() {
        this.koa = new Koa();
    }

    public useNativeMiddleware(middleware: Koa.Middleware) {
        this.koa.use(middleware);
    }

    public useMiddleware<T extends string | Function>(middleware: T) {
        if (typeof (middleware) === "string") {
            (this._middlewares as string[]).push(middleware as string);
        } else {
            (this._middlewares as Function[]).push(middleware as Function);
        }
    }

    public useController<T extends string | Function>(controller: T) {
        if (typeof (controller) === "string") {
            (this._controllers as string[]).push(controller as string);
        } else {
            (this._controllers as Function[]).push(controller as Function);
        }
    }

    public async start(port: number): Promise<void> {
        useContainer(Container);
        useKoaServer(this.koa, {
            defaultErrorHandler: false,
            controllers: this._controllers,
            middlewares: this._middlewares,
            authorizationChecker: this.authorizationChecker,
            currentUserChecker: this.currentUserChecker,
            validation: {
                validationError: {
                    target: false
                }
            }
        });

        const interfaces = _.filter(
            _.reduce(os.networkInterfaces(), (prev, curr) => [...prev, ...curr]),
            iface => iface.family === "IPv4");

        this.server = this.koa.listen(port);
        console.log(`Application start at port ${port}, see at \n` 
            + _.join(_.map(interfaces, (iface) => `http://${iface.address}:${port}/`), "\n"));
    }

}

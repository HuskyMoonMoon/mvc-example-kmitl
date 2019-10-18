import * as Knex from "knex";
import { Container, Service } from "typedi";

@Service()
export class Database {
    private static _instance: Database;
    protected _knex: Knex;

    constructor(connectionSetting?: Knex.Config) {
        this._knex = (connectionSetting) ?
            // tslint:disable-next-line: no-require-imports
            Knex(connectionSetting) : Knex(require("knexfile"));
    }

    public static get instance(): Database {
        if (!Database._instance) {
            Database._instance = new Database();
        }

        return Database._instance;
    }

    public get knex(): Knex {
        return this._knex;
    }

    public static getConnection(connectionName: string): Database {
        return Container.get(connectionName);
    }

    public static createConnection(connectionName: string, connectionSetting: Knex.Config) {
        Container.set(connectionName, new Database(connectionSetting));
    }
}

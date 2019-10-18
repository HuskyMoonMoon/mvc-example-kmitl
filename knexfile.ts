// Update with your config settings.
import * as DotEnv from "dotenv";

DotEnv.config();

module.exports.development = module.exports.staging = module.exports.production = {

    client: process.env.DATABASE__DRIVER,
    connection: {
        host: process.env.DATABASE__HOST,
        database: process.env.DATABASE__SCHEMA,
        user: process.env.DATABASE__USER,
        password: process.env.DATABASE__PASSWORD
    },
    pool: {
        min: process.env.DATABASE__POOL_MIN ? parseInt(process.env.DATABASE__POOL_MIN) : 1,
        max: process.env.DATABASE__POOL_MAX ? parseInt(process.env.DATABASE__POOL_MAX) : 1,
        refreshIdle: false
    }
};

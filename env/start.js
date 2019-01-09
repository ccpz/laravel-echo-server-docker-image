//reference: https://gist.github.com/TitasGailius/4b8721604ade4790a542029e65fa6dde#file-server-js

require('dotenv').config();

function string2bool(str) {
    return String(str).toLowerCase() == "true";
}

function parse_client_id_key(str, app_id, app_key) {
    ret = [];

    data = str.split(' ');
    data.forEach(function(item){
        if(item.length==0)
            return
        arr = item.split(',');
        if(arr.length!=2) {
            throw "Format error, \",\" is not found in key string \""+item+"\"";
        }
        ret.push({appId:arr[0], key:arr[1]});
    })
    if(app_id!=null && app_key!=null) {
        ret.push({appId:app_id, key:app_key});
    }    
    return ret;
}

const env = process.env;
const authHost = env.AUTH_HOST || "http://localhost";
const authEndpoint = env.AUTH_ENDPOINT || "/broadcasting/auth";
const database = env.DATABASE || "redis";
const redisHost = env.REDIS_HOST || "127.0.0.1";
const redisPort = env.REDIS_PORT || "6379";
const redisPassword = env.REDIS_PASSWORD || "";
const redisDB = env.REDIS_DB || "0";
const sqlitePath = env.SQLITE_PATH || "/laravel-echo-server.sqlite";
const client_key = env.CLIENT_KEY || "";
const devMode = string2bool(env.DEV_MODE) || false;
const host = env.ECHO_SERVER_HOST || null;
const port = env.ECHO_SERVER_PORT || "6001";
const protocol = env.ECHO_SERVER_PROTOCOL || "http";
const allow_cors = string2bool(env.ALLOW_CORS) || true;
const allow_origin = env.ALLOW_ORIGIN || "http://localhost:80";
const allow_methods = env.ALLOW_METHODS || "GET, POST";
const allow_headers = env.ALLOW_HEADERS || "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
const app_id = env.APP_ID || null;
const app_key = env.APP_KEY || null;

require('laravel-echo-server').run({
    authHost: authHost,
    authEndpoint: authEndpoint,
    clients: parse_client_id_key(client_key, app_id, app_key),
    database: database,
    databaseConfig: {
        redis: {
            host: redisHost,
            port: redisPort,
            password: redisPassword,
            db: redisDB,
        },
        sqlite: {
            databasePath: sqlitePath,
        },
    },
    devMode: devMode,
    host: host,
    port: port,
    protocol: protocol,
    apiOriginAllow: {
        allowCors: allow_cors,
        allowOrigin: allow_origin,
        allowMethods: allow_methods,
        allowHeaders: allow_headers
    },
});

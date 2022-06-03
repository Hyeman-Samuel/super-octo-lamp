declare global{
    namespace NodeJS{
        interface ProcessEnv {
            DB_PORT:string
            DB_PASSWORD:string
            DB_USER:string
            DB_HOST:any
            DB_NAME:any
            REMOVE_BG_API_KEY:string
            FLUTTERWAVE_SECRET_KEY:string
            ADMIN_EMAIL:string
            NO_REPLY_EMAIL:string
            ADMIN_PASSWORD:string
        }
    }
}

export {};
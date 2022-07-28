const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5432;
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '';
const database_name = process.env.DB_NAME || 'localhost';
const database_type = "postgres"


module.exports = [
{
    "type": database_type,
    "host": host,
    "port": port,
    "username": username,
    "password": password,
    "database": database_name,
    "name":"migration",
    "synchronize": false,
    "logging": true,
    "entities": [
        "build/src/**/*.entity{.js,.ts}"
    ],
    "migrations": [
        "build/src/migration/**/*{.js,.ts}"
    ],
    "cli": {
        "migrationsDir": `src/migration`
    },
}
]

module.exports = {
    type: 'postgres',
    host: process.env.PG_HOST /*'localhost'*/,
    port: process.env.PG_PORT /*5432*/,
    username: process.env.PG_USERNAME /*'postgres'*/,
    password: process.env.PG_PASSWORD /*'1'*/,
    database: process.env.PG_DATABASE /*'postgres'*/,
    entities: ['src/entities/**/*.ts'],
    synchronize: true,
    logging: ['error'],
};

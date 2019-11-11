import pino from 'pino';

const config = {
    level: "debug",
    prettyPrint: {
        colorize: true
    }
};

export default pino(config);
import pino from 'pino';
import pinoHTTP from 'pino-http';

const config = {
    level: 'error',
    prettyPrint: {
        colorize: true,
    },
    customLogLevel(res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
        } else if (res.statusCode >= 500 || err) {
            return 'error';
        }
        return 'info';
    },
    serializers: {
        req: req => {
            const result: Record<string, unknown> = {
                method: req.method,
            };
            // const body = req.raw?.body;
            // const graphqlQuery = body?.query;
            // if (graphqlQuery) {
            // не могу придумать как вывести graphql запрос в несколько строк по-другому
            // result.query = graphqlQuery.split('\n');
            // } else if (body) {
            //     result.body = body;
            // }
            return result;
        },
        res: () => undefined,
    },
};

export const logger = pino(config);
export const httpLogger = pinoHTTP(config);

import winston from "winston";

const format = winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
)

export const logger = winston.createLogger({
    transports: [new winston.transports.Console({
        level: 'debug',
        format: format,
    })]
});


export const logParams = (req, res, next) => {
    const {
        url,
        params,
        query
    } = req;

    logger.info(
        JSON.stringify({
            'url': url,
            'params': JSON.stringify(params),
            'query': JSON.stringify(query)
        }));

    next();
}
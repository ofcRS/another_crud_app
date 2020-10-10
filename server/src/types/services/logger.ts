type Message = string;
type LoggerAction = (message: Message) => void;

export type Logger = {
    info: LoggerAction;
    error: LoggerAction;
};

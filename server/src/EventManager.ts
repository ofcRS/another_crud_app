import NodeJSEventManager from 'nodejs-event-manager';

// храним в этом классе глобальный объект менеджера
class GlobalEventManager {
    eventManager: NodeJSEventManager;
    constructor() {
        this.eventManager = new NodeJSEventManager({
            application: 'Auth',
        });
    }
}

const globalEventManager = new GlobalEventManager();

export class EventManager {
    private readonly globalEventManager: GlobalEventManager;
    constructor() {
        this.globalEventManager = globalEventManager;
        this.initListeners();
    }

    waitForEvent = (event: string) => {
        return new Promise(resolve => {
            this.getEventManager().on(event, payload => {
                resolve(payload);
            });
        });
    };

    private initListeners = () => {
        const manager = this.getEventManager();
        manager.on('USER_HAS_REGISTERED', (...args) => {
            console.log(...args);
        });
    };

    getEventManager = () => {
        return this.globalEventManager.eventManager;
    };
}

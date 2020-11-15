import { EventManager } from '../EventManager';

export class BaseResolver {
    eventManager: EventManager;
    constructor() {
        this.eventManager = new EventManager();
    }
}

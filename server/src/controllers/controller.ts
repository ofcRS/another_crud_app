import { Router } from 'express';

type Controller = {
    path: string;
    router: Router;
};

export class ControllerImplementation implements Controller {
    path: string;
    router: Router;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
    }

    getApiPath(path: string) {
        const hasBackslash = path[0] === '/';
        return this.path + (hasBackslash ? path : path.slice(1));
    }
}

///<reference path="node.d.ts" />

declare module "express" {
    export function (): ExpressServer;
    export function createApplication(): any;
    export function createServer(): ExpressServer;
    export function static (path: string): any;
    import http = module("http");
    export var listen;

    // Connect middleware
    export function bodyParser(options?: any): ExpressHandler;
    export function errorHandler(opts?: any): ExpressHandler;
    export function methodOverride(): ExpressHandler;

    export interface ExpressSettings {
        env?: string;
        views?: string;
    }

    export interface ExpressHandler {
        (req: ExpressServerRequest, res: ExpressServerResponse, next?: () => void): void;
    };

    export interface ExpressServer {
        options: any;
        router: any;
        set (name: string): any;
        set (name: string, val: any): any;
        enable(name: string): ExpressServer;
        disable(name: string): ExpressServer;
        enabled(name: string): bool;
        disabled(name: string): bool;
        configure(env: string, callback: () => void ): ExpressServer;
        configure(env: string, env2: string, callback: () => void ): ExpressServer;
        configure(callback: () => void ): ExpressServer;
        settings: ExpressSettings;
        engine(ext: string, callback: any): void;
        param(param: Function): ExpressServer;
        param(name: string, callback: Function): ExpressServer;
        param(name: string, expressParam: any): ExpressServer;
        param(name: any[], callback: Function): ExpressServer;
        get (name: string): any;
        get (path: string, handler: ExpressHandler): void;
        get (path: RegExp, handler: ExpressHandler): void;
        get (path: string, callback: any, handler: ExpressHandler): void;
        post(path: RegExp, handler: ExpressHandler): void;
        post(path: string, requiredHandler: ExpressHandler, ...optionalHandlers: ExpressHandler[]): void;
        put(path: string, requiredHandler: ExpressHandler, ...optionalHandlers: ExpressHandler[]): void;
        delete (path: string, handler: ExpressHandler): void;
        all(path: string, callback: Function): void;
        all(path: string, callback: Function, callback2: Function): void;
        locals: any;
        render(view: string, callback: (err: Error, html) => void ): void;
        render(view: string, opts: any, callback: (err: Error, html) => void ): void;
        routes: any;
        listen(port: number, hostname: string, backlog: number, callback: Function): void;
        listen(port: number, callback: Function): void;
        listen(path: string, callback?: Function): void;
        listen(handle: any, listeningListener?: Function): void;
        use(route: string, callback: Function): ExpressServer;
        use(route: string, server: ExpressServer): ExpressServer;
        use(callback: Function): ExpressServer;
        use(server: ExpressServer): ExpressServer;
    }

    export class ExpressServerRequest extends http.ServerRequest {
        params: any;
        query: any;
        body: any;
        files: any;
        param(name: string): any;
        route: any;
        cookies: any;
        signedCookies: any;
        get (field: string): string;
        accepts(types: string): any;
        accepts(types: string[]): any;
        accepted: any;
        is(type: string): bool;
        ip: string;
        ips: string[];
        path: string;
        host: string;
        fresh: bool;
        stale: bool;
        xhr: bool;
        protocol: string;
        secure: bool;
        subdomains: string[];
        acceptedLanguages: string[];
        acceptedCharsets: string[];
        acceptsCharset(charset: string): bool;
        acceptsLanguage(lang: string): bool;
    }

    export class ExpressServerResponse extends http.ServerResponse {
        status(code: number): any;
        set (field: any): void;
        set (field: string, value: string): void;
        header(field: any): void;
        header(field: string, value: string): void;
        get (field: string): any;
        cookie(name: string, value: any, options?: any): void;
        clearcookie(name: string, options?: any): void;
        redirect(status: number, url: string): void;
        redirect(url: string): void;
        charset: string;
        send(bodyOrStatus?: any): ExpressServerResponse;
        send(status: number, body: any): ExpressServerResponse;
        json(bodyOrStatus: any);
        json(body: any, status: any);
        json(body: any, headers: any, status: number);
        jsonp(bodyOrStatus: any);
        jsonp(body: any, status: any);
        jsonp(body: any, headers: any, status: number);
        type(type: string): void;
        format(object: any): void;
        attachment(filename?: string);
        sendfile(path: string): void;
        sendfile(path: string, options: any): void;
        sendfile(path: string, options: any, fn: (err: Error) => void ): void;
        download(path: string): void;
        download(path: string, filename: string): void;
        download(path: string, filename: string, fn: (err: Error) => void ): void;
        links(links: any): void;
        locals: any;
        render(view: string, locals: any): void;
        render(view: string, callback: (err: Error, html: any) => void ): void;
        render(view: string, locals: any, callback: (err: Error, html: any) => void ): void;
    }
}

import { ProxiesPool } from './ProxiesPool';
export declare class ProxyInstance {
    readonly target: object;
    protected pool: ProxiesPool;
    private allSubscribersMap;
    private allInterceptorsMap;
    private subscribersMap;
    private interceptorsMap;
    readonly proxy: any;
    constructor(target: object, pool: ProxiesPool);
    notifySubscriber(keyChain: any[], type: string, args: any[]): void;
    notifyInterceptor(keyChain: any[], type: string, args: any[], lastResult?: any): any;
    subscribe(isAll: boolean, keyChain: any[], handlersMap?: {
        [key: string]: (...args: any[]) => any;
    }): string;
    intercept(isAll: boolean, keyChain: any[], handlersMap?: {
        [key: string]: (...args: any[]) => any;
    }): string;
    unsubscribe(identity: string): void;
    cancelIntercept(identity: string): void;
}

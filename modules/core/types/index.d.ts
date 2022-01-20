import { ProxiesPool } from './_class/ProxiesPool';
export declare function intercept(object: object, propertyChain: any[] | string, setter: Function): string;
export declare function intercept(object: object, propertyChain: any[] | string, handlers: {
    [key: string]: Function;
}): string;
export declare function intercept(object: object, handlers: {
    [key: string]: Function;
}): string;
export declare function intercept(object: object, setter: Function): string;
export declare function subscribe(object: object, propertyChain: any[] | string, setter: Function): string;
export declare function subscribe(object: object, propertyChain: any[] | string, handlers: {
    [key: string]: Function;
}): string;
export declare function subscribe(object: object, handlers: {
    [key: string]: Function;
}): string;
export declare function subscribe(object: object, setter: Function): string;
export declare function unsubscribe(object: object, identityId: any): void;
export declare function cancelIntercept(object: object, identityId: any): void;
export declare function proxy<T extends object>(object: T): T;
export declare function readonly<T extends object>(object: T): T;
export declare function shallow<T extends object>(object: T): T;
export declare function hasProxy(proxy: object): boolean;
export declare function createPool(poolName: string): ProxiesPool;
export declare function getPool(poolName: string): ProxiesPool;
export declare function getDefaultPool(): ProxiesPool;
export declare const LIB_NAME = "@proxies/core";

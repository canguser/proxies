import { ProxiesPool } from './ProxiesPool';
import { ProxyInstance } from './ProxyInstance';
export declare class ProxiesManager {
    proxiesPoolsMap: Map<string, ProxiesPool>;
    proxy2objectMap: WeakMap<object, object>;
    proxy2poolMap: WeakMap<object, ProxiesPool>;
    proxyRelationshipMap: WeakMap<object, Map<object, any>>;
    proxy2instanceMap: WeakMap<object, ProxyInstance>;
    constructor();
    getDefaultPool(): ProxiesPool;
    getPool(poolName: string): ProxiesPool;
    createPool(poolName: string): ProxiesPool;
    linkPoolProxyInstance(pool: ProxiesPool, instance: ProxyInstance): void;
    getInstance(proxy: object): ProxyInstance;
    linkRelationShip(proxy: object, property: any, parentProxy: object): void;
    linkTheSame(proxy1: object, proxy2: object, unidirectional?: boolean): void;
    traverseRelationship(proxy: object, callback: (parent: object, propertyChain: any[]) => void, propertyChain?: any[]): void;
    hasProxy(proxy: object): boolean;
    getRaw<T extends object>(object: T): T;
    subscribe(object: object, propertyChain: any[] | string, setter: Function): string;
    subscribe(object: object, propertyChain: any[] | string, handlers: {
        [key: string]: Function;
    }): string;
    subscribe(object: object, handlers: {
        [key: string]: Function;
    }): string;
    subscribe(object: object, setter: Function): string;
    intercept(object: object, propertyChain: any[] | string, setter: Function): string;
    intercept(object: object, propertyChain: any[] | string, handlers: {
        [key: string]: Function;
    }): string;
    intercept(object: object, handlers: {
        [key: string]: Function;
    }): string;
    intercept(object: object, setter: Function): string;
    unsubscribe(object: object, subscriptionId: string): void;
    cancelIntercept(object: object, subscriptionId: string): void;
    proxy<T extends object>(object: T): T;
    readonly<T extends object>(object: T): T;
    shallow<T extends object>(object: T): T;
}

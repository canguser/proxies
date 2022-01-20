import { ProxiesManager } from './ProxiesManager';
import { ProxyInstance } from './ProxyInstance';
import { InterceptResult } from '../_interface';
export interface PoolOptions {
    readonly?: boolean;
    shallow?: boolean;
}
export declare class ProxiesPool {
    readonly manager?: ProxiesManager;
    object2proxyMap: WeakMap<object, object>;
    proxy2objectMap: WeakMap<object, object>;
    proxy2instanceMap: WeakMap<object, ProxyInstance>;
    proxyRelationshipMap: WeakMap<object, Map<object, any>>;
    private readonly options;
    constructor(manager?: ProxiesManager, options?: PoolOptions);
    proxy<T extends object>(object: T): T;
    genLinkedProxy(object: object, property: any, parentProxy: object): object;
    linkTheSame(proxy1: object, proxy2: object, unidirectional?: boolean): void;
    linkRelationShip(proxy: object, property: any, parentProxy: object): void;
    traverseRelationship(proxy: object, callback: (parent: object, propertyChain: any[]) => void, propertyChain?: any[]): void;
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
    unsubscribe(object: object, identityId: any): void;
    cancelIntercept(object: object, identityId: any): void;
    notifySubscriber(proxy: object, type: string, args: any[]): void;
    notifyInterceptor(proxy: object, type: string, args: any[]): InterceptResult;
    has(object: object): boolean;
    hasRaw(object: object): boolean;
    hasProxy(proxy: object): boolean;
    getInstance(object: object): ProxyInstance;
    getRaw<T extends object>(object: T): T;
    getProxy<T extends object>(proxy: T): T;
}

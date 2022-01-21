import { ProxiesManager } from './ProxiesManager';
import { ProxyInstance } from './ProxyInstance';
import { linkRelationShip, linkTheSame, removeRelationship, traverseRelationship } from '../_common';
import { InterceptResult } from '../_interface';

export interface PoolOptions {
    readonly?: boolean;
    shallow?: boolean;
}

const defaultOptions: PoolOptions = {
    readonly: false,
    shallow: false
};

export class ProxiesPool {
    object2proxyMap = new WeakMap<object, object>();
    proxy2objectMap = new WeakMap<object, object>();

    // following 2 are using without manager
    proxy2instanceMap = new WeakMap<object, ProxyInstance>();
    proxyRelationshipMap = new WeakMap<object, Map<object, any[][]>>();

    private readonly options: PoolOptions;

    constructor(public readonly manager?: ProxiesManager, options: PoolOptions = {}) {
        this.options = { ...defaultOptions, ...options };
    }

    proxy<T extends object>(object: T): T {
        if (this.manager) {
            object = this.manager.getRaw(object);
        }

        if (this.has(object)) {
            return this.getProxy(object);
        }

        const proxyInstance = new ProxyInstance(object, this);
        const proxy = proxyInstance.proxy;
        this.proxy2instanceMap.set(proxy, proxyInstance);
        this.proxy2objectMap.set(proxy, object);
        this.object2proxyMap.set(object, proxy);

        if (this.manager) {
            this.manager.linkPoolProxyInstance(this, proxyInstance);
        }

        if (this.options.shallow) {
            return proxy;
        }

        Object.keys(object).forEach((key) => {
            const value = object[key];
            if (typeof value === 'object') {
                this.genLinkedProxy(value, key, proxy);
            }
        });

        this.intercept(proxy, {
            get: ({ lastReturnValue, preventDefault, proxy, directProperty }) => {
                if (typeof lastReturnValue === 'object') {
                    preventDefault();
                    return this.genLinkedProxy(lastReturnValue, directProperty, proxy);
                }
            },
            set: ({ directProperty, proxy, value, preventDefault, notModifiedValue, oldValue }) => {
                if (this.options.readonly) {
                    preventDefault();
                    console.warn(`Target object is readonly. Property "${directProperty}" is not writable.`);
                    return notModifiedValue;
                }
                if (typeof oldValue === 'object' && this.has(oldValue)) {
                    this.removeRelationship(this.getProxy(oldValue), proxy);
                }
                if (typeof value === 'object') {
                    const raw = this.getRaw(this.genLinkedProxy(value, directProperty, proxy));
                    preventDefault();
                    return raw;
                }
            }
        });

        return proxy;
    }

    genLinkedProxy(object: object, property: any, parentProxy: object): object {
        const result = this.proxy(object);
        if (this.manager && this.manager.hasProxy(object) && !this.has(object)) {
            this.linkTheSame(object, result);
        }
        this.linkRelationShip(result, property, parentProxy);
        return result;
    }

    linkTheSame(proxy1: object, proxy2: object, unidirectional: boolean = false) {
        if (this.manager) {
            this.manager.linkTheSame(proxy1, proxy2, unidirectional);
            return;
        }
        if (!this.has(proxy1) || !this.has(proxy2)) {
            console.warn('Proxy is not in pool.');
            return;
        }
        linkTheSame(this.proxyRelationshipMap, proxy1, proxy2, unidirectional);
    }

    linkRelationShip(proxy: object, property: any, parentProxy: object) {
        if (this.manager) {
            this.manager.linkRelationShip(proxy, [property], parentProxy);
            return;
        }
        if (!this.has(proxy) || !this.has(parentProxy)) {
            console.warn('[ProxiesPool] linkRelationShip: object or parent is not a proxy from this pool');
            return;
        }
        linkRelationShip(this.proxyRelationshipMap, proxy, [property], parentProxy);
    }

    removeRelationship(proxy: object, parentProxy: object) {
        if (this.manager) {
            this.manager.removeRelationship(proxy, parentProxy);
            return;
        }
        if (!this.has(proxy) || !this.has(parentProxy)) {
            console.warn('[ProxiesPool] removeRelationship: object or parent is not a proxy from this pool');
            return;
        }
        removeRelationship(this.proxyRelationshipMap, proxy, parentProxy);
    }

    traverseRelationship(proxy: object, callback: (parent: object, propertyChain: any[]) => void, propertyChain = []) {
        if (this.manager) {
            this.manager.traverseRelationship(proxy, callback, propertyChain);
            return;
        }
        if (!this.has(proxy)) {
            console.warn('[ProxiesPool] traverseRelationship: object is not a proxy from this pool');
            return;
        }
        traverseRelationship(this.proxyRelationshipMap, proxy, callback, propertyChain);
    }

    subscribe(object: object, propertyChain: any[] | string, setter: Function): string;

    subscribe(object: object, propertyChain: any[] | string, handlers: { [key: string]: Function }): string;

    subscribe(object: object, handlers: { [key: string]: Function }): string;

    subscribe(object: object, setter: Function): string;

    subscribe(object: object, ...args): string {
        const instance = this.getInstance(object);
        if (!instance) {
            console.warn(`Object ${object} is not proxied from target pool`);
            return;
        }
        if (args.length === 1) {
            const [handlers] = args;
            if (typeof handlers === 'function') {
                return instance.subscribe(true, [], { set: handlers });
            }
            return instance.subscribe(true, [], handlers);
        }
        if (args.length === 2) {
            const [propertyChain, handlers] = args;
            if (typeof handlers === 'function') {
                return instance.subscribe(false, propertyChain, { set: handlers });
            }
            return instance.subscribe(false, propertyChain, handlers);
        }
        console.warn(`Invalid arguments for subscribe`);
    }

    intercept(object: object, propertyChain: any[] | string, setter: Function): string;

    intercept(object: object, propertyChain: any[] | string, handlers: { [key: string]: Function }): string;

    intercept(object: object, handlers: { [key: string]: Function }): string;

    intercept(object: object, setter: Function): string;

    intercept(object: object, ...args): string {
        const instance = this.getInstance(object);
        if (!instance) {
            console.warn(`Object ${object} is not proxied from target pool`);
            return;
        }
        if (args.length === 1) {
            const [handlers] = args;
            if (typeof handlers === 'function') {
                return instance.intercept(true, [], { set: handlers });
            }
            return instance.intercept(true, [], handlers);
        }
        if (args.length === 2) {
            const [propertyChain, handlers] = args;
            if (typeof handlers === 'function') {
                return instance.intercept(false, propertyChain, { set: handlers });
            }
            return instance.intercept(false, propertyChain, handlers);
        }
        console.warn(`Invalid arguments for intercept`);
    }

    unsubscribe(object: object, identityId): void {
        const instance = this.getInstance(object);
        if (!instance) {
            console.warn(`Object ${object} is not proxied from target pool`);
            return;
        }
        instance.unsubscribe(identityId);
    }

    cancelIntercept(object: object, identityId): void {
        const instance = this.getInstance(object);
        if (!instance) {
            console.warn(`Object ${object} is not proxied from target pool`);
            return;
        }
        instance.cancelIntercept(identityId);
    }

    notifySubscriber(proxy: object, type: string, args: any[]) {
        const instance = this.getInstance(proxy);
        if (!instance) {
            console.warn(`Object ${proxy} is not proxied from target pool`);
            return;
        }
        const [, property] = args;
        this.traverseRelationship(
            proxy,
            (parent, propertyChain) => {
                const instance = this.getInstance(parent);
                instance.notifySubscriber(propertyChain, type, args);
            },
            [property]
        );
    }

    notifyInterceptor(proxy: object, type: string, args: any[]): InterceptResult {
        const instance = this.getInstance(proxy);
        if (!instance) {
            console.warn(`Object ${proxy} is not proxied from target pool`);
            return;
        }
        const [, property] = args;
        let result = {};
        this.traverseRelationship(
            proxy,
            (parent, propertyChain) => {
                const instance = this.getInstance(parent);
                result = instance.notifyInterceptor(propertyChain, type, args, { ...result });
            },
            [property]
        );
        return {
            ...result
        };
    }

    has(object: object): boolean {
        return this.hasRaw(object) || this.hasProxy(object);
    }

    hasRaw(object: object): boolean {
        return this.object2proxyMap.has(object);
    }

    hasProxy(proxy: object): boolean {
        return this.proxy2objectMap.has(proxy);
    }

    getInstance(object: object): ProxyInstance {
        if (this.manager) {
            return this.manager.getInstance(object);
        }
        if (this.has(object)) {
            return this.proxy2instanceMap.get(this.getProxy(object));
        }
    }

    getRaw<T extends object>(object: T): T {
        if (this.hasRaw(object)) {
            return object;
        }
        if (this.hasProxy(object)) {
            return this.proxy2objectMap.get(object) as T;
        }
        return undefined;
    }

    getProxy<T extends object>(proxy: T): T {
        if (this.hasProxy(proxy)) {
            return proxy;
        }
        if (this.hasRaw(proxy)) {
            return this.object2proxyMap.get(proxy) as T;
        }
        return undefined;
    }
}

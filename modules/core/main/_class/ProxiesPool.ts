import { ProxiesManager } from './ProxiesManager';
import { ProxyInstance } from './ProxyInstance';

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
    proxy2instanceMap = new WeakMap<object, ProxyInstance>();

    proxyRelationshipMap = new WeakMap<object, Map<object, any>>();
    private readonly options: PoolOptions;

    constructor(protected manager?: ProxiesManager, options: PoolOptions = {}) {
        this.options = { ...defaultOptions, ...options };
    }

    proxy<T extends object>(object: T): T {
        if (this.has(object)) {
            return this.getProxy(object);
        }

        if (this.manager) {
            object = this.manager.getRaw(object);
        }

        const proxyInstance = new ProxyInstance(object, this);
        const proxy = proxyInstance.proxy;
        this.proxy2instanceMap.set(proxy, proxyInstance);
        this.proxy2objectMap.set(proxy, object);
        this.object2proxyMap.set(object, proxy);

        if (this.manager) {
            this.manager.linkProxy(proxy, object);
            this.manager.linkPool(proxy, this);
        }

        if (this.options.shallow) {
            return proxy;
        }

        Object.keys(object).forEach((key) => {
            const value = object[key];
            if (typeof value === 'object') {
                const target = this.proxy(value);
                this.linkRelationShip(target, key, proxy);
            }
        });

        this.intercept(proxy, {
            get: ({ lastReturnValue, preventDefault, proxy, directProperty }) => {
                if (typeof lastReturnValue === 'object') {
                    preventDefault();
                    const result = this.proxy(lastReturnValue);
                    this.linkRelationShip(result, directProperty, proxy);
                    return result;
                }
            },
            set: ({ directProperty, proxy, value, preventDefault }) => {
                if (this.options.readonly) {
                    preventDefault();
                    console.warn(`Target object is readonly. Property "${directProperty}" is not writable.`);
                    return true;
                }
                if (typeof value === 'object') {
                    const result = this.proxy(value);
                    this.linkRelationShip(result, directProperty, proxy);
                }
            }
        });

        return proxy;
    }

    linkRelationShip(object: object, property: any, parent: object) {
        if (!this.has(object) || !this.has(parent)) {
            console.warn('[ProxiesPool] linkRelationShip: object or parent is not a proxy from this pool');
            return;
        }
        object = this.getProxy(object);
        parent = this.getProxy(parent);
        if (!this.proxyRelationshipMap.has(object)) {
            this.proxyRelationshipMap.set(object, new Map());
        }
        const relationshipMap = this.proxyRelationshipMap.get(object);
        relationshipMap.set(parent, property);
    }

    traverseParent(object: object, callback: (parent: object, propertyChain: any[]) => void, propertyChain = []) {
        if (!this.has(object)) {
            console.warn('[ProxiesPool] traverseParent: object is not a proxy from this pool');
            return;
        }
        if (this.proxyRelationshipMap.has(object)) {
            const relationshipMap = this.proxyRelationshipMap.get(object);
            relationshipMap.forEach((property, parent) => {
                callback(parent, [property, ...propertyChain]);
                this.traverseParent(parent, callback, [property, ...propertyChain]);
            });
        }
    }

    subscribe(object: object, propertyChain: any[] | string, setter: Function): string;

    subscribe(object: object, propertyChain: any[] | string, handlers: { [key: string]: Function }): string;

    subscribe(object: object, handlers: { [key: string]: Function }): string;

    subscribe(object: object, ...args): string {
        const instance = this.getInstance(object);
        if (!instance) {
            console.warn(`Object ${object} is not proxied from target pool`);
            return;
        }
        if (args.length === 1) {
            const [handlers] = args;
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

    intercept(object: object, ...args): string {
        const instance = this.getInstance(object);
        if (!instance) {
            console.warn(`Object ${object} is not proxied from target pool`);
            return;
        }
        if (args.length === 1) {
            const [handlers] = args;
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
        instance.notifySubscriber([property], type, args);
        this.traverseParent(
            proxy,
            (parent, propertyChain) => {
                const instance = this.getInstance(parent);
                instance.notifySubscriber(propertyChain, type, args);
            },
            [property]
        );
    }

    notifyInterceptor(proxy: object, type: string, args: any[]) {
        const instance = this.getInstance(proxy);
        if (!instance) {
            console.warn(`Object ${proxy} is not proxied from target pool`);
            return;
        }
        const [, property] = args;
        let results = [instance.notifyInterceptor([property], type, args)];
        this.traverseParent(
            proxy,
            (parent, propertyChain) => {
                const instance = this.getInstance(parent);
                results.push(instance.notifyInterceptor(propertyChain, type, args));
            },
            [property]
        );
        return (
            results.find((result) => result?.preventDefault) || {
                preventDefault: false,
                returnValue: undefined
            }
        );
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

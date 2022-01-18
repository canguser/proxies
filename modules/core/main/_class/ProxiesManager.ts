import { ProxiesPool } from './ProxiesPool';
import { linkRelationShip, linkTheSame, traverseRelationship } from '../_common';
import { ProxyInstance } from './ProxyInstance';

export class ProxiesManager {
    proxiesPoolsMap: Map<string, ProxiesPool> = new Map<string, ProxiesPool>();
    proxy2objectMap = new WeakMap<object, object>();
    proxy2poolMap = new WeakMap<object, ProxiesPool>();
    proxyRelationshipMap = new WeakMap<object, Map<object, any>>();
    proxy2instanceMap = new WeakMap<object, ProxyInstance>();

    constructor() {
        this.proxiesPoolsMap.set('default', new ProxiesPool(this));
        this.proxiesPoolsMap.set('readonly', new ProxiesPool(this, { readonly: true }));
        this.proxiesPoolsMap.set('shallow', new ProxiesPool(this, { shallow: true }));
    }

    getDefaultPool(): ProxiesPool {
        return this.proxiesPoolsMap.get('default');
    }

    getPool(poolName: string): ProxiesPool {
        return this.proxiesPoolsMap.get(poolName);
    }

    createPool(poolName: string): ProxiesPool {
        if (this.proxiesPoolsMap.has(poolName)) {
            throw new Error(`Pool with name ${poolName} already exists`);
        }
        const newPool = new ProxiesPool(this);
        this.proxiesPoolsMap.set(poolName, newPool);
        return newPool;
    }

    linkPoolProxyInstance(pool: ProxiesPool,instance: ProxyInstance) {
        const proxy = instance.proxy;
        this.proxy2objectMap.set(proxy, instance.target);
        this.proxy2instanceMap.set(proxy, instance);
        this.proxy2poolMap.set(proxy, pool);
    }

    getInstance(proxy: object): ProxyInstance {
        return this.proxy2instanceMap.get(proxy);
    }

    linkRelationShip(proxy: object, property: any, parentProxy: object) {
        if (!this.hasProxy(proxy) || !this.hasProxy(parentProxy)) {
            console.warn('[ProxiesManager] linkRelationShip: object or parent is not a proxy from this manager');
            return;
        }
        linkRelationShip(this.proxyRelationshipMap, proxy, property, parentProxy);
    }

    linkTheSame(proxy1: object, proxy2: object) {
        if (!this.hasProxy(proxy1) || !this.hasProxy(proxy2)) {
            console.warn('[ProxiesManager] linkTheSame: is not a proxy from this manager');
            return;
        }
        linkTheSame(this.proxyRelationshipMap, proxy1, proxy2);
    }

    traverseRelationship(proxy: object, callback: (parent: object, propertyChain: any[]) => void, propertyChain = []) {
        if (!this.hasProxy(proxy)) {
            console.warn('[ProxiesManager] traverseRelationship: object is not a proxy from this manager');
            return;
        }
        traverseRelationship(this.proxyRelationshipMap, proxy, callback, propertyChain);
    }

    hasProxy(proxy: object): boolean {
        return this.proxy2objectMap.has(proxy);
    }

    getRaw<T extends object>(object: T): T {
        if (this.hasProxy(object)) {
            return this.getRaw(this.proxy2objectMap.get(object) as T);
        }
        return object;
    }

    subscribe(object: object, propertyChain: any[] | string, setter: Function): string;

    subscribe(object: object, propertyChain: any[] | string, handlers: { [key: string]: Function }): string;

    subscribe(object: object, handlers: { [key: string]: Function }): string;

    subscribe(object: object, ...args): string {
        const pool = this.proxy2poolMap.get(object);
        if (!pool) {
            throw new Error(`Object ${object} can't be subscribed`);
        }
        return pool.subscribe.apply(pool, [object, ...args]);
    }

    intercept(object: object, propertyChain: any[] | string, setter: Function): string;

    intercept(object: object, propertyChain: any[] | string, handlers: { [key: string]: Function }): string;

    intercept(object: object, handlers: { [key: string]: Function }): string;

    intercept(object: object, ...args): string {
        const pool = this.proxy2poolMap.get(object);
        if (!pool) {
            throw new Error(`Object ${object} can't be intercepted`);
        }
        return pool.intercept.apply(pool, [object, ...args]);
    }

    unsubscribe(object: object, subscriptionId: string): void {
        const pool = this.proxy2poolMap.get(object);
        if (pool) {
            pool.unsubscribe(object, subscriptionId);
        }
    }

    cancelIntercept(object: object, subscriptionId: string): void {
        const pool = this.proxy2poolMap.get(object);
        if (pool) {
            pool.cancelIntercept(object, subscriptionId);
        }
    }

    proxy<T extends object>(object: T): T {
        const pool = this.getDefaultPool();
        return pool.proxy(object);
    }

    readonly<T extends object>(object: T): T {
        const pool = this.getPool('readonly');
        return pool.proxy(object);
    }

    shallow<T extends object>(object: T): T {
        const pool = this.getPool('shallow');
        return pool.proxy(object);
    }
}

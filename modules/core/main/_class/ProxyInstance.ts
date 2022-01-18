import { ProxiesPool } from './ProxiesPool';
import { fromEntries } from '@rapidly/utils/lib/commom/fromEntries';
import { unique } from '@rapidly/utils/lib/array/unique';
import { genOrderedId } from '@rapidly/utils/lib/commom/genOrderedId';
import { genStrategyMapper } from '@rapidly/utils/lib/commom/genStrategyMapper';
import { parseKeyChain } from '@rapidly/utils/lib/commom/parseKeyChain'

const proxyMethods = ['get', 'set', 'has', 'deleteProperty', 'getOwnPropertyDescriptor', 'defineProperty'];

export class ProxyInstance {
    private allSubscribersMap: { [identity: string]: { [key: string]: (...args) => any } } = {};
    private allInterceptorsMap: { [identity: string]: { [key: string]: (...args) => any } } = {};
    private subscribersMap = new Map<any[], { [identity: string]: { [key: string]: (...args) => any } }>();
    private interceptorsMap = new Map<any[], { [identity: string]: { [key: string]: (...args) => any } }>();
    public readonly proxy;

    constructor(target: object, protected pool: ProxiesPool) {
        const handlers = fromEntries(
            proxyMethods.map((method) => [
                method,
                (...args) => {
                    let realReturnValue;
                    const { preventDefault, returnValue } = this.pool.notifyInterceptor(this.proxy, method, args);
                    if (preventDefault) {
                        realReturnValue = returnValue;
                    } else {
                        realReturnValue = Reflect[method](...args);
                    }
                    Promise.resolve().then(() => this.pool.notifySubscriber(this.proxy, method, args));
                    return realReturnValue;
                }
            ])
        );
        this.proxy = new Proxy(target, handlers);
    }

    public notifySubscriber(keyChain: any[], type: string, args: any[]) {
        const uniqueKeyChain = unique(keyChain);
        const subscribers = {
            ...this.allSubscribersMap,
            ...(this.subscribersMap.get(uniqueKeyChain) || {})
        };
        Object.keys(subscribers).forEach((identity) => {
            const subscriber = subscribers[identity];
            const handler = subscriber[type];
            if (typeof handler === 'function') {
                const strategyMapper = genStrategyMapper(
                    {
                        get: () => {
                            const [target, property] = args;
                            const propertyChain = [...uniqueKeyChain];
                            const getterValue = Reflect.get(target, property);
                            handler({
                                getterValue,
                                directProperty: property,
                                property: propertyChain.join('.'),
                                propertyChain,
                                proxy: this.proxy,
                                pool: this.pool
                            });
                        },
                        set: () => {
                            const [, property, value] = args;
                            const propertyChain = [...uniqueKeyChain];
                            handler({
                                directProperty: property,
                                property: propertyChain.join('.'),
                                propertyChain,
                                value,
                                proxy: this.proxy,
                                pool: this.pool
                            });
                        }
                    },
                    () => {
                        const [, property] = args;
                        const propertyChain = [...uniqueKeyChain];
                        handler(
                            {
                                directProperty: property,
                                property: propertyChain.join('.'),
                                propertyChain,
                                proxy: this.proxy,
                                pool: this.pool
                            },
                            ...[...args.slice(1)]
                        );
                    }
                );
                strategyMapper[type]();
            }
        });
    }

    public notifyInterceptor(keyChain: any[], type: string, args: any[]) {
        const uniqueKeyChain = unique(keyChain);
        const interceptors = {
            ...this.allInterceptorsMap,
            ...(this.interceptorsMap.get(uniqueKeyChain) || {})
        };
        return Object.keys(interceptors).reduce(
            ({ returnValue, preventDefault: pd }, identity) => {
                const interceptor = interceptors[identity];
                const handler = interceptor[type];
                if (typeof handler === 'function') {
                    let preventDefaultValue = false;
                    function preventDefault() {
                        preventDefaultValue = true;
                    }
                    const lastReturnValue = pd ? returnValue : undefined;
                    const strategyMapper = genStrategyMapper(
                        {
                            get: () => {
                                const [target, property] = args;
                                const propertyChain = [...uniqueKeyChain];
                                const getterValue = Reflect.get(target, property);

                                const value = handler({
                                    directProperty: property,
                                    property: propertyChain.join('.'),
                                    getterValue,
                                    propertyChain,
                                    lastReturnValue: lastReturnValue ? lastReturnValue : getterValue,
                                    proxy: this.proxy,
                                    pool: this.pool,
                                    preventDefault
                                });
                                return {
                                    preventDefault: preventDefaultValue,
                                    returnValue: value
                                };
                            },
                            set: () => {
                                const [target, property, value] = args;
                                const propertyChain = [...uniqueKeyChain];
                                const returnValue = handler({
                                    directProperty: property,
                                    property: propertyChain.join('.'),
                                    propertyChain,
                                    value,
                                    oldValue: Reflect.get(target, property),
                                    proxy: this.proxy,
                                    pool: this.pool,
                                    preventDefault,
                                    lastReturnValue
                                });
                                return {
                                    preventDefault: preventDefaultValue,
                                    returnValue
                                };
                            }
                        },
                        () => {
                            let preventDefault = false;
                            const [, property] = args;
                            const propertyChain = [...uniqueKeyChain];
                            const returnValue = handler(
                                {
                                    propertyChain,
                                    proxy: this.proxy,
                                    pool: this.pool,
                                    lastReturnValue,
                                    preventDefault,
                                    directProperty: property,
                                    property: propertyChain.join('.')
                                },
                                ...[...args.slice(1)]
                            );
                            return {
                                preventDefault: preventDefaultValue,
                                returnValue
                            };
                        }
                    );
                    const result = strategyMapper[type]();
                    return {
                        returnValue: result.returnValue,
                        preventDefault: result.preventDefault || pd
                    };
                }
            },
            { returnValue: undefined, preventDefault: false }
        );
    }

    public subscribe(isAll: boolean, keyChain: any[], handlersMap: { [key: string]: (...args) => any } = {}) {
        keyChain = parseKeyChain(keyChain);
        const identity = genOrderedId();
        if (isAll) {
            const subscribersMap = this.allSubscribersMap;
            subscribersMap[identity] = handlersMap;
            return identity;
        }
        const uniqueKeyChain = unique(keyChain);
        const subscribersMap = this.subscribersMap.get(uniqueKeyChain) || {};
        subscribersMap[identity] = handlersMap;
        this.subscribersMap.set(uniqueKeyChain, subscribersMap);
        return identity;
    }

    public intercept(isAll: boolean, keyChain: any[], handlersMap: { [key: string]: (...args) => any } = {}) {
        keyChain = parseKeyChain(keyChain);
        const identity = genOrderedId();
        if (isAll) {
            const interceptorsMap = this.allInterceptorsMap;
            interceptorsMap[identity] = handlersMap;
            return identity;
        }
        const uniqueKeyChain = unique(keyChain);
        const interceptorsMap = this.interceptorsMap.get(uniqueKeyChain) || {};
        interceptorsMap[identity] = handlersMap;
        this.interceptorsMap.set(uniqueKeyChain, interceptorsMap);
        return identity;
    }

    public unsubscribe(identity: string) {
        this.subscribersMap.forEach((subscribersMap, keyChain) => {
            delete subscribersMap[identity];
            if (Object.keys(subscribersMap).length === 0) {
                this.subscribersMap.delete(keyChain);
            }
        });
        Object.keys(this.allSubscribersMap).forEach((key) => {
            delete this.allSubscribersMap[key];
        });
    }

    public cancelIntercept(identity: string) {
        this.interceptorsMap.forEach((interceptorsMap, keyChain) => {
            delete interceptorsMap[identity];
            if (Object.keys(interceptorsMap).length === 0) {
                this.interceptorsMap.delete(keyChain);
            }
        });
        Object.keys(this.allSubscribersMap).forEach((key) => {
            delete this.allSubscribersMap[key];
        });
    }
}

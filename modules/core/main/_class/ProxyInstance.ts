import { ProxiesPool } from './ProxiesPool';
import { fromEntries } from '@rapidly/utils/lib/commom/fromEntries';
import { unique } from '@rapidly/utils/lib/array/unique';
import { genOrderedId } from '@rapidly/utils/lib/commom/genOrderedId';
import { genStrategyMapper } from '@rapidly/utils/lib/commom/genStrategyMapper';
import { parseKeyChain } from '@rapidly/utils/lib/commom/parseKeyChain';

const proxyMethods = ['get', 'set', 'has', 'deleteProperty', 'getOwnPropertyDescriptor', 'defineProperty'];
const FALSY_RETURN_VALUE = Object.freeze(Object.create(null));

export class ProxyInstance {
    private allSubscribersMap: { [identity: string]: { [key: string]: (...args) => any } } = {};
    private allInterceptorsMap: { [identity: string]: { [key: string]: (...args) => any } } = {};
    private subscribersMap = new Map<any[], { [identity: string]: { [key: string]: (...args) => any } }>();
    private interceptorsMap = new Map<any[], { [identity: string]: { [key: string]: (...args) => any } }>();
    public readonly proxy;

    constructor(public readonly target: object, protected pool: ProxiesPool) {
        const handlers = fromEntries(
            proxyMethods.map((method) => [
                method,
                (...args) => {
                    let oldValue;
                    if (method === 'set') {
                        oldValue = Reflect['get'](args[0], args[1]);
                    }
                    let realReturnValue;
                    const { preventDefault, returnValue } = this.pool.notifyInterceptor(this.proxy, method, [
                        ...args,
                        oldValue
                    ]);
                    if (preventDefault) {
                        if (method === 'set') {
                            if (returnValue === FALSY_RETURN_VALUE) {
                                realReturnValue = true;
                            } else {
                                realReturnValue = Reflect['set'](args[0], args[1], returnValue);
                            }
                        } else {
                            realReturnValue = returnValue;
                        }
                    } else {
                        realReturnValue = Reflect[method](...args);
                    }
                    try {
                        this.pool.notifySubscriber(this.proxy, method, [...args, oldValue]);
                    } catch (e) {
                        console.warn(e);
                    }
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
        Object.keys(subscribers)
            .sort((a, b) => (a > b ? 1 : -1))
            .forEach((identity) => {
                const subscriber = subscribers[identity];
                const handler = subscriber[type];
                const [target, property] = args;
                const propertyChain = [...uniqueKeyChain];
                const defaultParams = {
                    directProperty: property,
                    propertyChain,
                    property: propertyChain.join('.'),
                    proxy: this.proxy,
                    pool: this.pool
                };
                if (typeof handler === 'function') {
                    const strategyMapper = genStrategyMapper(
                        {
                            get: () => {
                                const getterValue = Reflect.get(target, property);
                                handler(
                                    {
                                        ...defaultParams,
                                        getterValue
                                    },
                                    ...args
                                );
                            },
                            set: () => {
                                const [, , value, , oldValue] = args;
                                handler(
                                    {
                                        ...defaultParams,
                                        value,
                                        oldValue
                                    },
                                    ...args
                                );
                            }
                        },
                        () => {
                            handler(
                                {
                                    ...defaultParams
                                },
                                ...args
                            );
                        }
                    );
                    strategyMapper[type]();
                }
            });
    }

    public notifyInterceptor(keyChain: any[], type: string, args: any[], lastResult: any = {}) {
        const uniqueKeyChain = unique(keyChain);
        const interceptors = {
            ...this.allInterceptorsMap,
            ...(this.interceptorsMap.get(uniqueKeyChain) || {})
        };
        return Object.keys(interceptors)
            .sort((a, b) => (a > b ? -1 : 1))
            .reduce((last, identity) => {
                const { returnValue, preventDefault: pd } = last;
                const interceptor = interceptors[identity];
                const handler = interceptor[type];
                if (typeof handler === 'function') {
                    let preventDefaultValue = false;
                    function preventDefault() {
                        preventDefaultValue = true;
                    }
                    const lastReturnValue = pd ? returnValue : undefined;
                    const [target, property] = args;
                    const propertyChain = [...uniqueKeyChain];
                    const defaultParams = {
                        target: this.target,
                        directTarget: target,
                        directProperty: property,
                        property: propertyChain.join('.'),
                        propertyChain,
                        lastReturnValue,
                        proxy: this.proxy,
                        pool: this.pool,
                        preventDefault
                    };
                    const strategyMapper = genStrategyMapper(
                        {
                            get: () => {
                                const getterValue = Reflect.get(target, property);

                                const value = handler(
                                    {
                                        ...defaultParams,
                                        getterValue,
                                        lastReturnValue: pd ? lastReturnValue : getterValue
                                    },
                                    ...args
                                );
                                return {
                                    preventDefault: preventDefaultValue,
                                    returnValue: value
                                };
                            },
                            set: () => {
                                const [, , value, , oldValue] = args;
                                const returnValue = handler(
                                    {
                                        ...defaultParams,
                                        oldValue,
                                        value: pd ? lastReturnValue : value,
                                        notModifiedValue: FALSY_RETURN_VALUE,
                                        lastReturnValue: pd ? lastReturnValue : value
                                    },
                                    ...args
                                );
                                return {
                                    preventDefault: preventDefaultValue,
                                    returnValue
                                };
                            }
                        },
                        () => {
                            const returnValue = handler(
                                {
                                    ...defaultParams
                                },
                                ...args
                            );
                            return {
                                preventDefault: preventDefaultValue,
                                returnValue
                            };
                        }
                    );
                    const result = strategyMapper[type]();
                    if (!result.preventDefault) {
                        return last;
                    }
                    return {
                        returnValue: result.returnValue,
                        preventDefault: true
                    };
                }
                return last;
            }, lastResult);
    }

    public subscribe(isAll: boolean, keyChain: any[], handlersMap: { [key: string]: (...args) => any } = {}) {
        keyChain = parseKeyChain(keyChain);
        const identity = '_subscript__' + genOrderedId();
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
        const identity = '_intercept__' + genOrderedId();
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

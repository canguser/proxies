export interface NormalProxyParams<T> {
    original: T;
    originalArgs: any[];
    proxy: T;
}

export interface BubblingProxyParams<T> extends NormalProxyParams<T> {
    properties: any[];
}

export interface PropertyProxyParams {
    property: string;
}

export interface GetProxyParams extends PropertyProxyParams {
    value: any;
}

export interface SetProxyParams extends PropertyProxyParams {
    oldValue: any;
    value: any;
}

export interface SubscribePropertyProxyParams<T> extends PropertyProxyParams, BubblingProxyParams<T> {}

export interface SubscriberGetProxyParams<T> extends GetProxyParams, SubscribePropertyProxyParams<T> {}

export interface SubscriberSetProxyParams<T> extends SetProxyParams, SubscribePropertyProxyParams<T> {}

export interface InterceptorPropertyProxyParams<T> extends PropertyProxyParams, NormalProxyParams<T> {}

export interface InterceptorGetProxyParams<T> extends GetProxyParams, InterceptorPropertyProxyParams<T> {}

export interface InterceptorSetProxyParams<T> extends SetProxyParams, InterceptorPropertyProxyParams<T> {}

export interface InterceptorSubscribeProxyParams<T> extends NormalProxyParams<T> {
    preventDefault: () => void;
    stopPropagation: () => void;
}

export interface PropertiesHandler<T> {
    keys: string[];
    handler: T;
}

export interface SubscriberHandler<T> {
    get?(params: SubscriberGetProxyParams<T>): void;
    apply?(params: BubblingProxyParams<T>): void;
    construct?(params: BubblingProxyParams<T>): void;
    defineProperty?(params: SubscribePropertyProxyParams<T>): void;
    deleteProperty?(params: SubscribePropertyProxyParams<T>): void;
    getOwnPropertyDescriptor?(params: SubscribePropertyProxyParams<T>): void;
    getPrototypeOf?(params: BubblingProxyParams<T>): void;
    has?(params: SubscribePropertyProxyParams<T>): void;
    isExtensible?(params: BubblingProxyParams<T>): void;
    ownKeys?(params: BubblingProxyParams<T>): void;
    preventExtensions?(params: BubblingProxyParams<T>): void;
    set?(params: SubscriberSetProxyParams<T>): void;
    setPrototypeOf?(params: BubblingProxyParams<T>): void;
}

export interface SubscribeOption<T> {
    handler: PropertiesHandler<SubscriberHandler<T>>;
    target: T;
}

export interface InterceptorHandler<T>{
    get?(params: InterceptorGetProxyParams<T>): any;
    apply?(params: NormalProxyParams<T>): any;
    construct?(params: NormalProxyParams<T>): object;
    defineProperty?(params: InterceptorPropertyProxyParams<T>): boolean;
    deleteProperty?(params: InterceptorPropertyProxyParams<T>): boolean;
    getOwnPropertyDescriptor?(params: InterceptorPropertyProxyParams<T>): void;
    getPrototypeOf?(params: NormalProxyParams<T>): void;
    has?(params: InterceptorPropertyProxyParams<T>): void;
    isExtensible?(params: NormalProxyParams<T>): void;
    ownKeys?(params: NormalProxyParams<T>): void;
    preventExtensions?(params: NormalProxyParams<T>): void;
    set?(params: InterceptorSetProxyParams<T>): void;
    setPrototypeOf?(params: NormalProxyParams<T>): void;
    subscribe?(params: SubscribeOption<T>): void;
}

export interface InterceptorOption<T> {
    handler: PropertiesHandler<InterceptorHandler<T>>;
    target: T;
}
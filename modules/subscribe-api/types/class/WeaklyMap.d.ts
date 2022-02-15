export declare class WeaklyMap<K = any, V = any> {
    map: Map<K, V>;
    weekMap: WeakMap<object, V>;
    delete(key: K): boolean;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
}

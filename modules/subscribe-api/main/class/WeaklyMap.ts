import { isBasicDataType } from '../utils'

export class WeaklyMap<K = any, V = any> {
    map: Map<K, V> = new Map()
    weekMap: WeakMap<object, V> = new WeakMap<object, V>()

    delete(key: K): boolean {
        if (isBasicDataType(key)) {
            return this.map.delete(key)
        }
        return this.weekMap.delete(key as unknown as object)
    }

    get(key: K): V | undefined {
        if (isBasicDataType(key)) {
            return this.map.get(key)
        }
        return this.weekMap.get(key as unknown as object)
    }

    has(key: K): boolean {
        if (isBasicDataType(key)) {
            return this.map.has(key)
        }
        return this.weekMap.has(key as unknown as object)
    }

    set(key: K, value: V): this {
        if (isBasicDataType(key)) {
            this.map.set(key, value)
        } else {
            this.weekMap.set(key as unknown as object, value)
        }
        return this
    }
}

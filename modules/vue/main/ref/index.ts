import { getRaw, intercept, manager, shallow } from '@proxies/core/main';
import { reactive } from '../reactive';

const refKeyMap = new WeakMap();
const rawRefMap = new WeakMap();

export function ref(value, key = 'value') {
    if (isRefRaw(value)) {
        value = rawRefMap.get(value);
    }
    if (isRef(value)) {
        return value;
    }
    const raw = {
        [key]: value
    };
    const refProxy = shallow(raw);
    intercept(refProxy, ({ preventDefault, property, value, oldValue, directTarget }) => {
        if (property !== key) {
            preventDefault();
            console.warn(`Ref proxy only accepts '${key}' property`);
            return value;
        }
        const raw = getRaw(refProxy);
        if (directTarget !== raw) {
            raw[property] = value;
        }
        return value;
    });
    refKeyMap.set(refProxy, key);
    rawRefMap.set(raw, refProxy);
    return refProxy;
}

export function isRef(value) {
    return refKeyMap.has(value);
}

export function isRefRaw(value) {
    return rawRefMap.has(value);
}

export function getRefKey(ref) {
    return refKeyMap.get(ref);
}

export function getRefValue(ref) {
    return ref[getRefKey(ref)];
}

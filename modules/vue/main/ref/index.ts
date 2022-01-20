import { intercept, shallow } from '@proxies/core/main';

const refKeyMap = new WeakMap();

export function ref(value, key = 'value') {
    if (isRef(value)) {
        return value;
    }
    const refProxy = shallow({
        [key]: value
    });
    intercept(refProxy, ({ preventDefault, property, value }) => {
        if (property !== key) {
            preventDefault();
            console.warn(`Ref proxy only accepts '${key}' property`);
        }
        // todo change the value of ref
        return value;
    });
    refKeyMap.set(refProxy, key);
    return refProxy;
}

export function isRef(value) {
    return refKeyMap.has(value);
}

export function getRefKey(ref) {
    return refKeyMap.get(ref);
}

export function getRefValue(ref) {
    return ref[getRefKey(ref)];
}

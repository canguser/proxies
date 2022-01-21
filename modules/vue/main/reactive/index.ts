import { getRaw, hasProxy, intercept, manager, proxy } from '@proxies/core/main';
import { isRef, isRefRaw } from '../ref';
import { getRefKey, getRefValue } from '../ref';
import { setProperty } from '@rapidly/utils/lib/object/setProperty';

function _applyReactiveObject(object: object, parent: object, parentKeys: any[]) {
    if (isRef(object)) {
        const parentProxy = reactive(parent);
        const refKey = getRefKey(object);
        manager.linkRelationShip(object, parentKeys, parentProxy, [refKey]);
        manager.linkRelationShip(parentProxy, [refKey], object, parentKeys);
        return getRefValue(object);
    }
    return reactive(object);
}

export function reactive(target) {
    if (hasProxy(target)) {
        return target;
    }

    Object.keys(target).forEach((key) => {
        const value = target[key];
        if (typeof value === 'object') {
            _applyReactiveObject(value, target, [key]);
        }
    });

    const reactiveProxy = proxy(target);

    intercept(reactiveProxy, {
        get({ preventDefault, lastReturnValue, proxy, propertyChain = [] }) {
            if (typeof lastReturnValue === 'object') {
                preventDefault();
                return _applyReactiveObject(lastReturnValue, proxy, propertyChain);
            }
        },
        set({ preventDefault, value, proxy, propertyChain, directTarget }) {
            if (isRefRaw(directTarget)) {
                const raw = getRaw(reactiveProxy);
                setProperty(raw, propertyChain, value);
            }
            if (typeof value === 'object') {
                preventDefault();
                return _applyReactiveObject(value, proxy, propertyChain);
            }
        }
    });

    return reactiveProxy;
}

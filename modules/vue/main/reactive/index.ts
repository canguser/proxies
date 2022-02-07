import { getRaw, hasProxy, intercept, manager, proxy } from '@proxies/core/main';
import { isRef, isRefRaw } from '../ref';
import { getRefKey, getRefValue } from '../ref';
import { setProperty } from '@rapidly/utils/lib/object/setProperty';
import { unique } from '@rapidly/utils/lib/array/unique';

const refRelationshipMap = new WeakMap();

function _applyReactiveObject(object: object, parent: object, parentKeys: any[]) {
    if (isRef(object)) {
        const parentProxy = reactive(parent);
        const refKey = getRefKey(object);
        manager.linkRelationShip(object, parentKeys, parentProxy, [refKey]);
        manager.linkRelationShip(parentProxy, [refKey], object, parentKeys);
        const targetRefRelationshipMap = refRelationshipMap.get(parentProxy) || new Map();
        targetRefRelationshipMap.set(unique(parentKeys), object);
        refRelationshipMap.set(parentProxy, targetRefRelationshipMap);
        return getRefValue(object);
    }
    return reactive(object);
}

export function reactive(target) {
    if (hasProxy(target)) {
        return target;
    }

    const reactiveProxy = proxy(target);

    intercept(reactiveProxy, {
        get({ preventDefault, lastReturnValue, proxy, propertyChain = [] }) {
            const isShallowLevel = propertyChain.length === 1;
            if (!isShallowLevel) {
                return;
            }
            if (typeof lastReturnValue === 'object') {
                preventDefault();
                return _applyReactiveObject(lastReturnValue, proxy, propertyChain);
            }
        },
        set({ preventDefault, value, proxy, propertyChain, directTarget }) {
            const isShallowLevel = propertyChain.length === 1;
            if (!isShallowLevel) {
                return;
            }
            if (isRef(value)) {
                const lastRef = refRelationshipMap.get(proxy)?.get(unique(propertyChain));
                if (lastRef) {
                    manager.removeRelationship(proxy, lastRef);
                    manager.removeRelationship(lastRef, proxy);
                }
            }
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

    Object.keys(target).forEach((key) => {
        const value = target[key];
        if (typeof value === 'object') {
            target[key] = _applyReactiveObject(value, reactiveProxy, [key]);
        }
    });

    return reactiveProxy;
}

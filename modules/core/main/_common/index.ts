export function linkRelationShip(
    targetMap: WeakMap<object, Map<object, any>>,
    child: object,
    property: any,
    parent: object
) {
    if (!targetMap.has(child)) {
        targetMap.set(child, new Map());
    }
    const relationshipMap = targetMap.get(child);
    relationshipMap.set(parent, property);
}

export function traverseRelationship(
    targetMap: WeakMap<object, Map<object, any>>,
    target: object,
    callback: (parent: object, propertyChain: any[]) => void,
    propertyChain = [],
    passedTargets = []
) {
    callback(
        target,
        [...propertyChain].filter((p) => p != null)
    );
    if (targetMap.has(target)) {
        const relationshipMap = targetMap.get(target);
        relationshipMap.forEach((property, parent) => {
            // prevent infinite loop
            if (!passedTargets.includes(parent)) {
                traverseRelationship(
                    targetMap,
                    parent,
                    callback,
                    [property, ...propertyChain].filter((p) => p != null),
                    [...passedTargets, target]
                );
            }
        });
    }
}

export function linkTheSame(
    targetMap: WeakMap<object, Map<object, any>>,
    target1: object,
    target2: object,
    unidirectional: boolean = false
) {
    if (target1 !== target2) {
        linkRelationShip(targetMap, target1, null, target2);
        if (!unidirectional) {
            linkRelationShip(targetMap, target2, null, target1);
        }
    }
}

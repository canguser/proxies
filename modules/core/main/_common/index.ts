export function linkRelationShip(
    targetMap: WeakMap<object, Map<object, any[][]>>,
    child: object,
    parentProperties: any[],
    parent: object,
    childProperties?: any[]
) {
    if (!targetMap.has(child)) {
        targetMap.set(child, new Map());
    }
    const relationshipMap = targetMap.get(child);
    relationshipMap.set(parent, [parentProperties || [], childProperties || []]);
}

export function removeRelationship(targetMap: WeakMap<object, Map<object, any[][]>>, child: object, parent: object) {
    if (targetMap.has(child)) {
        const relationshipMap = targetMap.get(child);
        relationshipMap.delete(parent);
    }
}

export function traverseRelationship(
    targetMap: WeakMap<object, Map<object, any[][]>>,
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
        relationshipMap.forEach(([parentProperties = [], childProperties = []], parent) => {
            // prevent infinite loop
            if (!passedTargets.includes(parent)) {
                if (
                    childProperties.every((p, index) => {
                        return p === propertyChain[index];
                    })
                ) {
                    propertyChain.splice(0, childProperties.length);
                }
                traverseRelationship(
                    targetMap,
                    parent,
                    callback,
                    [...parentProperties, ...propertyChain].filter((p) => p != null),
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
        linkRelationShip(targetMap, target1, null, target2, null);
        if (!unidirectional) {
            linkRelationShip(targetMap, target2, null, target1, null);
        }
    }
}

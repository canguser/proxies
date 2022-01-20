export declare function linkRelationShip(targetMap: WeakMap<object, Map<object, any>>, child: object, property: any, parent: object): void;
export declare function traverseRelationship(targetMap: WeakMap<object, Map<object, any>>, target: object, callback: (parent: object, propertyChain: any[]) => void, propertyChain?: any[], passedTargets?: any[]): void;
export declare function linkTheSame(targetMap: WeakMap<object, Map<object, any>>, target1: object, target2: object, unidirectional?: boolean): void;

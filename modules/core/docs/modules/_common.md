[@proxies/core](../README.md) / [Modules](../modules.md) / _common

# Module: \_common

## Table of contents

### Functions

- [linkRelationShip](_common.md#linkrelationship)
- [linkTheSame](_common.md#linkthesame)
- [traverseRelationship](_common.md#traverserelationship)

## Functions

### linkRelationShip

▸ **linkRelationShip**(`targetMap`, `child`, `property`, `parent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetMap` | `WeakMap`<`object`, `Map`<`object`, `any`\>\> |
| `child` | `object` |
| `property` | `any` |
| `parent` | `object` |

#### Returns

`void`

#### Defined in

[_common/index.ts:1](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_common/index.ts#L1)

___

### linkTheSame

▸ **linkTheSame**(`targetMap`, `target1`, `target2`, `unidirectional?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `targetMap` | `WeakMap`<`object`, `Map`<`object`, `any`\>\> | `undefined` |
| `target1` | `object` | `undefined` |
| `target2` | `object` | `undefined` |
| `unidirectional` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[_common/index.ts:42](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_common/index.ts#L42)

___

### traverseRelationship

▸ **traverseRelationship**(`targetMap`, `target`, `callback`, `propertyChain?`, `passedTargets?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `targetMap` | `WeakMap`<`object`, `Map`<`object`, `any`\>\> | `undefined` |
| `target` | `object` | `undefined` |
| `callback` | (`parent`: `object`, `propertyChain`: `any`[]) => `void` | `undefined` |
| `propertyChain` | `any`[] | `[]` |
| `passedTargets` | `any`[] | `[]` |

#### Returns

`void`

#### Defined in

[_common/index.ts:14](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_common/index.ts#L14)

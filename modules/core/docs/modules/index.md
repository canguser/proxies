[@proxies/core](../README.md) / [Modules](../modules.md) / index

# Module: index

## Table of contents

### Variables

- [LIB\_NAME](index.md#lib_name)

### Functions

- [cancelIntercept](index.md#cancelintercept)
- [createPool](index.md#createpool)
- [getDefaultPool](index.md#getdefaultpool)
- [getPool](index.md#getpool)
- [hasProxy](index.md#hasproxy)
- [intercept](index.md#intercept)
- [proxy](index.md#proxy)
- [readonly](index.md#readonly)
- [shallow](index.md#shallow)
- [subscribe](index.md#subscribe)
- [unsubscribe](index.md#unsubscribe)

## Variables

### LIB\_NAME

• `Const` **LIB\_NAME**: ``"@proxies/core"``

#### Defined in

[index.ts:48](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L48)

## Functions

### cancelIntercept

▸ **cancelIntercept**(`object`, `identityId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `identityId` | `any` |

#### Returns

`void`

#### Defined in

[index.ts:23](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L23)

___

### createPool

▸ **createPool**(`poolName`): [`ProxiesPool`](../classes/_class_ProxiesPool.ProxiesPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolName` | `string` |

#### Returns

[`ProxiesPool`](../classes/_class_ProxiesPool.ProxiesPool.md)

#### Defined in

[index.ts:28](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L28)

___

### getDefaultPool

▸ **getDefaultPool**(): [`ProxiesPool`](../classes/_class_ProxiesPool.ProxiesPool.md)

#### Returns

[`ProxiesPool`](../classes/_class_ProxiesPool.ProxiesPool.md)

#### Defined in

[index.ts:30](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L30)

___

### getPool

▸ **getPool**(`poolName`): [`ProxiesPool`](../classes/_class_ProxiesPool.ProxiesPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolName` | `string` |

#### Returns

[`ProxiesPool`](../classes/_class_ProxiesPool.ProxiesPool.md)

#### Defined in

[index.ts:29](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L29)

___

### hasProxy

▸ **hasProxy**(`proxy`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxy` | `object` |

#### Returns

`boolean`

#### Defined in

[index.ts:27](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L27)

___

### intercept

▸ **intercept**(`object`, `propertyChain`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `propertyChain` | `any`[] \| `string` |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[index.ts:5](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L5)

▸ **intercept**(`object`, `propertyChain`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `propertyChain` | `any`[] \| `string` |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[index.ts:6](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L6)

▸ **intercept**(`object`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[index.ts:11](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L11)

▸ **intercept**(`object`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[index.ts:12](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L12)

___

### proxy

▸ **proxy**<`T`\>(`object`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

`T`

#### Defined in

[index.ts:24](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L24)

___

### readonly

▸ **readonly**<`T`\>(`object`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

`T`

#### Defined in

[index.ts:25](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L25)

___

### shallow

▸ **shallow**<`T`\>(`object`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

`T`

#### Defined in

[index.ts:26](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L26)

___

### subscribe

▸ **subscribe**(`object`, `propertyChain`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `propertyChain` | `any`[] \| `string` |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[index.ts:14](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L14)

▸ **subscribe**(`object`, `propertyChain`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `propertyChain` | `any`[] \| `string` |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[index.ts:15](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L15)

▸ **subscribe**(`object`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[index.ts:20](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L20)

▸ **subscribe**(`object`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[index.ts:21](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L21)

___

### unsubscribe

▸ **unsubscribe**(`object`, `identityId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `identityId` | `any` |

#### Returns

`void`

#### Defined in

[index.ts:22](https://github.com/canguser/proxies/blob/55748c5/modules/core/main/index.ts#L22)

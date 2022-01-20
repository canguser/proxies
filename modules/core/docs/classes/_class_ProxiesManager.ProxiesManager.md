[@proxies/core](../README.md) / [Modules](../modules.md) / [_class/ProxiesManager](../modules/_class_ProxiesManager.md) / ProxiesManager

# Class: ProxiesManager

[_class/ProxiesManager](../modules/_class_ProxiesManager.md).ProxiesManager

## Table of contents

### Constructors

- [constructor](_class_ProxiesManager.ProxiesManager.md#constructor)

### Properties

- [proxiesPoolsMap](_class_ProxiesManager.ProxiesManager.md#proxiespoolsmap)
- [proxy2instanceMap](_class_ProxiesManager.ProxiesManager.md#proxy2instancemap)
- [proxy2objectMap](_class_ProxiesManager.ProxiesManager.md#proxy2objectmap)
- [proxy2poolMap](_class_ProxiesManager.ProxiesManager.md#proxy2poolmap)
- [proxyRelationshipMap](_class_ProxiesManager.ProxiesManager.md#proxyrelationshipmap)

### Methods

- [cancelIntercept](_class_ProxiesManager.ProxiesManager.md#cancelintercept)
- [createPool](_class_ProxiesManager.ProxiesManager.md#createpool)
- [getDefaultPool](_class_ProxiesManager.ProxiesManager.md#getdefaultpool)
- [getInstance](_class_ProxiesManager.ProxiesManager.md#getinstance)
- [getPool](_class_ProxiesManager.ProxiesManager.md#getpool)
- [getRaw](_class_ProxiesManager.ProxiesManager.md#getraw)
- [hasProxy](_class_ProxiesManager.ProxiesManager.md#hasproxy)
- [intercept](_class_ProxiesManager.ProxiesManager.md#intercept)
- [linkPoolProxyInstance](_class_ProxiesManager.ProxiesManager.md#linkpoolproxyinstance)
- [linkRelationShip](_class_ProxiesManager.ProxiesManager.md#linkrelationship)
- [linkTheSame](_class_ProxiesManager.ProxiesManager.md#linkthesame)
- [proxy](_class_ProxiesManager.ProxiesManager.md#proxy)
- [readonly](_class_ProxiesManager.ProxiesManager.md#readonly)
- [shallow](_class_ProxiesManager.ProxiesManager.md#shallow)
- [subscribe](_class_ProxiesManager.ProxiesManager.md#subscribe)
- [traverseRelationship](_class_ProxiesManager.ProxiesManager.md#traverserelationship)
- [unsubscribe](_class_ProxiesManager.ProxiesManager.md#unsubscribe)

## Constructors

### constructor

• **new ProxiesManager**()

#### Defined in

[_class/ProxiesManager.ts:12](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L12)

## Properties

### proxiesPoolsMap

• **proxiesPoolsMap**: `Map`<`string`, [`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)\>

#### Defined in

[_class/ProxiesManager.ts:6](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L6)

___

### proxy2instanceMap

• **proxy2instanceMap**: `WeakMap`<`object`, [`ProxyInstance`](_class_ProxyInstance.ProxyInstance.md)\>

#### Defined in

[_class/ProxiesManager.ts:10](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L10)

___

### proxy2objectMap

• **proxy2objectMap**: `WeakMap`<`object`, `object`\>

#### Defined in

[_class/ProxiesManager.ts:7](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L7)

___

### proxy2poolMap

• **proxy2poolMap**: `WeakMap`<`object`, [`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)\>

#### Defined in

[_class/ProxiesManager.ts:8](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L8)

___

### proxyRelationshipMap

• **proxyRelationshipMap**: `WeakMap`<`object`, `Map`<`object`, `any`\>\>

#### Defined in

[_class/ProxiesManager.ts:9](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L9)

## Methods

### cancelIntercept

▸ **cancelIntercept**(`object`, `subscriptionId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `subscriptionId` | `string` |

#### Returns

`void`

#### Defined in

[_class/ProxiesManager.ts:120](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L120)

___

### createPool

▸ **createPool**(`poolName`): [`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolName` | `string` |

#### Returns

[`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)

#### Defined in

[_class/ProxiesManager.ts:26](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L26)

___

### getDefaultPool

▸ **getDefaultPool**(): [`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)

#### Returns

[`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)

#### Defined in

[_class/ProxiesManager.ts:18](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L18)

___

### getInstance

▸ **getInstance**(`proxy`): [`ProxyInstance`](_class_ProxyInstance.ProxyInstance.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxy` | `object` |

#### Returns

[`ProxyInstance`](_class_ProxyInstance.ProxyInstance.md)

#### Defined in

[_class/ProxiesManager.ts:42](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L42)

___

### getPool

▸ **getPool**(`poolName`): [`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolName` | `string` |

#### Returns

[`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)

#### Defined in

[_class/ProxiesManager.ts:22](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L22)

___

### getRaw

▸ **getRaw**<`T`\>(`object`): `T`

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

[_class/ProxiesManager.ts:74](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L74)

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

[_class/ProxiesManager.ts:70](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L70)

___

### intercept

▸ **intercept**(`object`, `propertyChain`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `propertyChain` | `string` \| `any`[] |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[_class/ProxiesManager.ts:97](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L97)

▸ **intercept**(`object`, `propertyChain`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `propertyChain` | `string` \| `any`[] |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[_class/ProxiesManager.ts:99](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L99)

▸ **intercept**(`object`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[_class/ProxiesManager.ts:101](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L101)

▸ **intercept**(`object`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[_class/ProxiesManager.ts:103](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L103)

___

### linkPoolProxyInstance

▸ **linkPoolProxyInstance**(`pool`, `instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md) |
| `instance` | [`ProxyInstance`](_class_ProxyInstance.ProxyInstance.md) |

#### Returns

`void`

#### Defined in

[_class/ProxiesManager.ts:35](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L35)

___

### linkRelationShip

▸ **linkRelationShip**(`proxy`, `property`, `parentProxy`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxy` | `object` |
| `property` | `any` |
| `parentProxy` | `object` |

#### Returns

`void`

#### Defined in

[_class/ProxiesManager.ts:46](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L46)

___

### linkTheSame

▸ **linkTheSame**(`proxy1`, `proxy2`, `unidirectional?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `proxy1` | `object` | `undefined` |
| `proxy2` | `object` | `undefined` |
| `unidirectional` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[_class/ProxiesManager.ts:54](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L54)

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

[_class/ProxiesManager.ts:127](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L127)

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

[_class/ProxiesManager.ts:132](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L132)

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

[_class/ProxiesManager.ts:137](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L137)

___

### subscribe

▸ **subscribe**(`object`, `propertyChain`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `propertyChain` | `string` \| `any`[] |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[_class/ProxiesManager.ts:81](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L81)

▸ **subscribe**(`object`, `propertyChain`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `propertyChain` | `string` \| `any`[] |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[_class/ProxiesManager.ts:83](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L83)

▸ **subscribe**(`object`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[_class/ProxiesManager.ts:85](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L85)

▸ **subscribe**(`object`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[_class/ProxiesManager.ts:87](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L87)

___

### traverseRelationship

▸ **traverseRelationship**(`proxy`, `callback`, `propertyChain?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `proxy` | `object` | `undefined` |
| `callback` | (`parent`: `object`, `propertyChain`: `any`[]) => `void` | `undefined` |
| `propertyChain` | `any`[] | `[]` |

#### Returns

`void`

#### Defined in

[_class/ProxiesManager.ts:62](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L62)

___

### unsubscribe

▸ **unsubscribe**(`object`, `subscriptionId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `subscriptionId` | `string` |

#### Returns

`void`

#### Defined in

[_class/ProxiesManager.ts:113](https://github.com/canguser/proxies/blob/0a04f76/modules/core/main/_class/ProxiesManager.ts#L113)

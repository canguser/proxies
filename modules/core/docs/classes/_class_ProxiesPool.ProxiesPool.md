[@proxies/core](../README.md) / [Modules](../modules.md) / [_class/ProxiesPool](../modules/_class_ProxiesPool.md) / ProxiesPool

# Class: ProxiesPool

[_class/ProxiesPool](../modules/_class_ProxiesPool.md).ProxiesPool

## Table of contents

### Constructors

- [constructor](_class_ProxiesPool.ProxiesPool.md#constructor)

### Properties

- [manager](_class_ProxiesPool.ProxiesPool.md#manager)
- [object2proxyMap](_class_ProxiesPool.ProxiesPool.md#object2proxymap)
- [options](_class_ProxiesPool.ProxiesPool.md#options)
- [proxy2instanceMap](_class_ProxiesPool.ProxiesPool.md#proxy2instancemap)
- [proxy2objectMap](_class_ProxiesPool.ProxiesPool.md#proxy2objectmap)
- [proxyRelationshipMap](_class_ProxiesPool.ProxiesPool.md#proxyrelationshipmap)

### Methods

- [cancelIntercept](_class_ProxiesPool.ProxiesPool.md#cancelintercept)
- [genLinkedProxy](_class_ProxiesPool.ProxiesPool.md#genlinkedproxy)
- [getInstance](_class_ProxiesPool.ProxiesPool.md#getinstance)
- [getProxy](_class_ProxiesPool.ProxiesPool.md#getproxy)
- [getRaw](_class_ProxiesPool.ProxiesPool.md#getraw)
- [has](_class_ProxiesPool.ProxiesPool.md#has)
- [hasProxy](_class_ProxiesPool.ProxiesPool.md#hasproxy)
- [hasRaw](_class_ProxiesPool.ProxiesPool.md#hasraw)
- [intercept](_class_ProxiesPool.ProxiesPool.md#intercept)
- [linkRelationShip](_class_ProxiesPool.ProxiesPool.md#linkrelationship)
- [linkTheSame](_class_ProxiesPool.ProxiesPool.md#linkthesame)
- [notifyInterceptor](_class_ProxiesPool.ProxiesPool.md#notifyinterceptor)
- [notifySubscriber](_class_ProxiesPool.ProxiesPool.md#notifysubscriber)
- [proxy](_class_ProxiesPool.ProxiesPool.md#proxy)
- [subscribe](_class_ProxiesPool.ProxiesPool.md#subscribe)
- [traverseRelationship](_class_ProxiesPool.ProxiesPool.md#traverserelationship)
- [unsubscribe](_class_ProxiesPool.ProxiesPool.md#unsubscribe)

## Constructors

### constructor

• **new ProxiesPool**(`manager?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `manager?` | [`ProxiesManager`](_class_ProxiesManager.ProxiesManager.md) |
| `options` | [`PoolOptions`](../interfaces/_class_ProxiesPool.PoolOptions.md) |

#### Defined in

[_class/ProxiesPool.ts:26](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L26)

## Properties

### manager

• `Optional` `Readonly` **manager**: [`ProxiesManager`](_class_ProxiesManager.ProxiesManager.md)

___

### object2proxyMap

• **object2proxyMap**: `WeakMap`<`object`, `object`\>

#### Defined in

[_class/ProxiesPool.ts:17](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L17)

___

### options

• `Private` `Readonly` **options**: [`PoolOptions`](../interfaces/_class_ProxiesPool.PoolOptions.md)

#### Defined in

[_class/ProxiesPool.ts:24](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L24)

___

### proxy2instanceMap

• **proxy2instanceMap**: `WeakMap`<`object`, [`ProxyInstance`](_class_ProxyInstance.ProxyInstance.md)\>

#### Defined in

[_class/ProxiesPool.ts:21](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L21)

___

### proxy2objectMap

• **proxy2objectMap**: `WeakMap`<`object`, `object`\>

#### Defined in

[_class/ProxiesPool.ts:18](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L18)

___

### proxyRelationshipMap

• **proxyRelationshipMap**: `WeakMap`<`object`, `Map`<`object`, `any`\>\>

#### Defined in

[_class/ProxiesPool.ts:22](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L22)

## Methods

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

[_class/ProxiesPool.ts:201](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L201)

___

### genLinkedProxy

▸ **genLinkedProxy**(`object`, `property`, `parentProxy`): `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `property` | `any` |
| `parentProxy` | `object` |

#### Returns

`object`

#### Defined in

[_class/ProxiesPool.ts:85](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L85)

___

### getInstance

▸ **getInstance**(`object`): [`ProxyInstance`](_class_ProxyInstance.ProxyInstance.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |

#### Returns

[`ProxyInstance`](_class_ProxyInstance.ProxyInstance.md)

#### Defined in

[_class/ProxiesPool.ts:260](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L260)

___

### getProxy

▸ **getProxy**<`T`\>(`proxy`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxy` | `T` |

#### Returns

`T`

#### Defined in

[_class/ProxiesPool.ts:279](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L279)

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

[_class/ProxiesPool.ts:269](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L269)

___

### has

▸ **has**(`object`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |

#### Returns

`boolean`

#### Defined in

[_class/ProxiesPool.ts:248](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L248)

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

[_class/ProxiesPool.ts:256](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L256)

___

### hasRaw

▸ **hasRaw**(`object`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |

#### Returns

`boolean`

#### Defined in

[_class/ProxiesPool.ts:252](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L252)

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

[_class/ProxiesPool.ts:161](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L161)

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

[_class/ProxiesPool.ts:163](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L163)

▸ **intercept**(`object`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[_class/ProxiesPool.ts:165](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L165)

▸ **intercept**(`object`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[_class/ProxiesPool.ts:167](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L167)

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

[_class/ProxiesPool.ts:106](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L106)

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

[_class/ProxiesPool.ts:94](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L94)

___

### notifyInterceptor

▸ **notifyInterceptor**(`proxy`, `type`, `args`): [`InterceptResult`](../interfaces/_interface.InterceptResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxy` | `object` |
| `type` | `string` |
| `args` | `any`[] |

#### Returns

[`InterceptResult`](../interfaces/_interface.InterceptResult.md)

#### Defined in

[_class/ProxiesPool.ts:227](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L227)

___

### notifySubscriber

▸ **notifySubscriber**(`proxy`, `type`, `args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxy` | `object` |
| `type` | `string` |
| `args` | `any`[] |

#### Returns

`void`

#### Defined in

[_class/ProxiesPool.ts:210](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L210)

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

[_class/ProxiesPool.ts:30](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L30)

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

[_class/ProxiesPool.ts:130](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L130)

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

[_class/ProxiesPool.ts:132](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L132)

▸ **subscribe**(`object`, `handlers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `handlers` | `Object` |

#### Returns

`string`

#### Defined in

[_class/ProxiesPool.ts:134](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L134)

▸ **subscribe**(`object`, `setter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `setter` | `Function` |

#### Returns

`string`

#### Defined in

[_class/ProxiesPool.ts:136](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L136)

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

[_class/ProxiesPool.ts:118](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L118)

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

[_class/ProxiesPool.ts:192](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxiesPool.ts#L192)

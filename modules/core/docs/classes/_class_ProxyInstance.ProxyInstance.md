[@proxies/core](../README.md) / [Modules](../modules.md) / [_class/ProxyInstance](../modules/_class_ProxyInstance.md) / ProxyInstance

# Class: ProxyInstance

[_class/ProxyInstance](../modules/_class_ProxyInstance.md).ProxyInstance

## Table of contents

### Constructors

- [constructor](_class_ProxyInstance.ProxyInstance.md#constructor)

### Properties

- [allInterceptorsMap](_class_ProxyInstance.ProxyInstance.md#allinterceptorsmap)
- [allSubscribersMap](_class_ProxyInstance.ProxyInstance.md#allsubscribersmap)
- [interceptorsMap](_class_ProxyInstance.ProxyInstance.md#interceptorsmap)
- [pool](_class_ProxyInstance.ProxyInstance.md#pool)
- [proxy](_class_ProxyInstance.ProxyInstance.md#proxy)
- [subscribersMap](_class_ProxyInstance.ProxyInstance.md#subscribersmap)
- [target](_class_ProxyInstance.ProxyInstance.md#target)

### Methods

- [cancelIntercept](_class_ProxyInstance.ProxyInstance.md#cancelintercept)
- [intercept](_class_ProxyInstance.ProxyInstance.md#intercept)
- [notifyInterceptor](_class_ProxyInstance.ProxyInstance.md#notifyinterceptor)
- [notifySubscriber](_class_ProxyInstance.ProxyInstance.md#notifysubscriber)
- [subscribe](_class_ProxyInstance.ProxyInstance.md#subscribe)
- [unsubscribe](_class_ProxyInstance.ProxyInstance.md#unsubscribe)

## Constructors

### constructor

• **new ProxyInstance**(`target`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `pool` | [`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md) |

#### Defined in

[_class/ProxyInstance.ts:17](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L17)

## Properties

### allInterceptorsMap

• `Private` **allInterceptorsMap**: `Object` = `{}`

#### Index signature

▪ [identity: `string`]: { [key: string]: (...`args`: `any`) => `any`;  }

#### Defined in

[_class/ProxyInstance.ts:12](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L12)

___

### allSubscribersMap

• `Private` **allSubscribersMap**: `Object` = `{}`

#### Index signature

▪ [identity: `string`]: { [key: string]: (...`args`: `any`) => `any`;  }

#### Defined in

[_class/ProxyInstance.ts:11](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L11)

___

### interceptorsMap

• `Private` **interceptorsMap**: `Map`<`any`[], `Object`\>

#### Defined in

[_class/ProxyInstance.ts:14](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L14)

___

### pool

• `Protected` **pool**: [`ProxiesPool`](_class_ProxiesPool.ProxiesPool.md)

___

### proxy

• `Readonly` **proxy**: `any`

#### Defined in

[_class/ProxyInstance.ts:15](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L15)

___

### subscribersMap

• `Private` **subscribersMap**: `Map`<`any`[], `Object`\>

#### Defined in

[_class/ProxyInstance.ts:13](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L13)

___

### target

• `Readonly` **target**: `object`

## Methods

### cancelIntercept

▸ **cancelIntercept**(`identity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |

#### Returns

`void`

#### Defined in

[_class/ProxyInstance.ts:232](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L232)

___

### intercept

▸ **intercept**(`isAll`, `keyChain`, `handlersMap?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isAll` | `boolean` |
| `keyChain` | `any`[] |
| `handlersMap` | `Object` |

#### Returns

`string`

#### Defined in

[_class/ProxyInstance.ts:205](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L205)

___

### notifyInterceptor

▸ **notifyInterceptor**(`keyChain`, `type`, `args`, `lastResult?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyChain` | `any`[] |
| `type` | `string` |
| `args` | `any`[] |
| `lastResult` | `any` |

#### Returns

`any`

#### Defined in

[_class/ProxyInstance.ts:100](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L100)

___

### notifySubscriber

▸ **notifySubscriber**(`keyChain`, `type`, `args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyChain` | `any`[] |
| `type` | `string` |
| `args` | `any`[] |

#### Returns

`void`

#### Defined in

[_class/ProxyInstance.ts:41](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L41)

___

### subscribe

▸ **subscribe**(`isAll`, `keyChain`, `handlersMap?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isAll` | `boolean` |
| `keyChain` | `any`[] |
| `handlersMap` | `Object` |

#### Returns

`string`

#### Defined in

[_class/ProxyInstance.ts:190](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L190)

___

### unsubscribe

▸ **unsubscribe**(`identity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `string` |

#### Returns

`void`

#### Defined in

[_class/ProxyInstance.ts:220](https://github.com/canguser/proxies/blob/0066e34/modules/core/main/_class/ProxyInstance.ts#L220)

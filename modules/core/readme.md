# @proxies/core

> 一个基于订阅和拦截的深度响应式框架 - 核心部分

订阅是冒泡式的，拦截是捕获式的。

订阅：
1. 订阅父级对象，可以选择性监听所有子级
2. 订阅是只读性质的
3. 订阅是冒泡的，有可能会被拦截

拦截：
1. 拦截一个对象时，只能拦截它直接属性的变化
2. 订阅也是可以被拦截的

代理池
1. 代理池可以统一订阅或拦截其内部所有的对象(不包括多级订阅)
2. 代理池可以有一个父级代理池，也可以有多个子级代理池

```javascript

const pool = new ProxiesPool()

subscribe(pool, (
    {
        proxy,
        origin,
        property,
        value,
        oldValue
    }
)=>{
    // ...
})

const a = pool.proxy({});

subscribe(a, (
    {
        proxy,
        origin,
        value,
        oldValue,
        property,
        propertyChain
    }
)=>{
})

intercept(a, (
    {
        proxy,
        origin,
        value,
        oldValue,
        property
    }
)=>{

})


抽象handler逻辑
Has Property：['get', 'set', 'has', 'deleteProperty', 'getOwnPropertyDescriptor', 'defineProperty']
No Property：[
 'apply', 'construct', 'getPrototypeOf', 'setPrototypeOf',
 'isExtensible', 'preventExtensions', 'ownKeys'
 ]

Not returned handlers: ['set', 'defineProperty']

Getter: ['get', 'getOwnPropertyDescriptor']
Setter: ['set', 'defineProperty']


```
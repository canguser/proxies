@proxies/core / [Modules](modules.md)

# @proxies/core

> 一个基于订阅和拦截的深度响应式框架 - 核心部分

## 简单示例/主要特性

- 订阅 Proxy 的变化，即便是深层次的

```javascript
import {proxy, subscribe} from '@proxies/core';
const proxy = proxy({a:1, b:{c:2}});

// 监听 a 的变化
subscribe(proxy, 'a', ({value, oldValue}) => {
  console.log(`property 'a' changed from ${oldValue} to ${value}`);
});

proxy.a = 2;
// print -> property 'a' changed from 1 to 2
```
```javascript
import {proxy, subscribe} from '@proxies/core';
const proxy = proxy({a:1, b:{c:2}});
// 监听 b.c 的变化
subscribe(proxy, 'b.c', ({value, oldValue}) => {
  console.log(`property 'b.c' changed from ${oldValue} to ${value}`);
});

proxy.b.c = 3;
// print -> property 'b.c' changed from 2 to 3

```
```javascript
import {proxy, subscribe} from '@proxies/core';
const proxy = proxy({a:1, b:{c:2}});
// 监听整个对象内部的所有变化
subscribe(proxy, (value, oldValue, property) => {
  console.log(`[all] property '${property}' changed from ${oldValue} to ${value}`);
});

proxy.a = 3;
// print -> [all] property 'a' changed from 2 to 3
proxy.b.c = 4;
// print -> [all] property 'b.c' changed from 3 to 4
```

- 拦截 Proxy 的变化，即便是深层次的

```javascript
import {proxy, intercept} from '@proxies/core';
const proxy = proxy({b:{c:2}});
intercept(proxy, 'b.c', (value, preventDefault, directTarget, directProperty)=>{
    preventDefault() // 阻止默认操作
    // 设置新值
    directTarget[directProperty] = value + 1;
    // 返回是否允许修改，这里的逻辑和 Proxy 中的 Setter 一致
    return true;
})

a.b.c = 3;
console.log(a.b.c); // > 4

```

- 除了对象属性的变化，我们还可以订阅/拦截更多的操作，比如 getter

```javascript
import {proxy, subscribe, intercept} from '@proxies/core';
const proxy = proxy({a:1, b:{c:2}});

subscribe(proxy, 'a', {
    get({getterValue}){
        console.log(`Value to getter: ${getterValue}`);
    }
});

intercept(proxy, 'b.c', {
    get({getterValue, preventDefault}){
        preventDefault();
        return getterValue + 1;
    }
});

console.log(proxy.a); // > 1
// print -> Value to getter: 1

console.log(proxy.b.c); // > 3

```

## 文档

Documentation: [https://github.com/canguser/proxies/blob/master/modules/core/docs/modules.md](https://github.com/canguser/proxies/blob/master/modules/core/docs/modules.md)

## 其他
### Intercept 思路

拦截原则：
1. 先于默认方法执行
2. 调用优先级：随着父级层数增加而降低，同一对象，会根据先后顺序影响优先级，先注册者，优先级较低
3. 任一子级通过 preventDefault 可取消默认动作，且只有通过调用该方法后，才能影响返回值，该次调用称为有效调用
4. 采用优先级最低的返回值，低优先级可以获取到上次有效调用的返回值

### Subscribe 思路

订阅原则
1. 于方法完成后调用，无法对原方法产生任何影响
2. 调用优先级：随着父级层数增加而降低，同一对象，会根据先后顺序影响优先级，这里和拦截相反，先注册者，优先级高
3. 订阅皆无返回值

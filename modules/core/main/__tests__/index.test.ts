import { createPool, intercept, proxy, readonly, shallow, subscribe, unsubscribe } from '../index';
import { wait } from '@rapidly/utils/lib/commom/async/wait';
import { setProperty } from '@rapidly/utils/lib/object/setProperty';
import any = jasmine.any

describe('test index', () => {
    it('should normal works - 01', () => {});

    it('should readonly works', function () {
        const p = readonly({ a: 1, b: 2 });
        p.a = 2;
        expect(p.a).toBe(1);
    });

    it('should shallow works - 2', function () {
        const p = shallow<any>({ a: 1, b: 2 });
        const p2 = proxy({ d: 2 });
        p.c = p2;
        subscribe(p, 'c.d', ({ value }) => {
            expect(value).toBe(3);
        });
        p2.d = 3;
        expect.assertions(0);
    });

    it('should proxy assign works', function () {
        const p = proxy<any>({ a: 1, b: 2 });
        const p2 = proxy({ d: 2 });
        p.c = p2;
        subscribe(p, 'c.d', ({ value }) => {
            expect(value).toBe(3);
        });
        p2.d = 3;
        expect.assertions(1);
    });

    it('should shallow works', async function () {
        const p = shallow({ a: 1, b: 2, c: { d: 3 } });
        subscribe(p, {
            get: ({ getterValue }) => {
                expect(getterValue).toEqual({ d: 4 });
            }
        });

        subscribe(p, 'c.d', ({ value }) => {
            // well not execute
            expect(value).toBe(4);
        });

        expect(p.c).toEqual({ d: 3 });

        p.c.d = 4;

        await wait(100);

        expect.assertions(2 + 1);
    });

    it('should link the same', async function () {
        const pool = createPool('test');
        const p = pool.proxy({ a: 1, b: 2 });
        const p2 = proxy<any>({ a: 11, b: 22 });
        const p3 = proxy<any>({ a: 111, b: 222 });

        p2.c = p;
        p3.c = p;
        subscribe(p, 'a', ({ value }) => {
            expect(value).toBe(3);
        });
        subscribe(p2.c, 'a', ({ value }) => {
            expect(value).toBe(3);
        });
        subscribe(p2, 'c.a', ({ value }) => {
            expect(value).toBe(3);
        });
        subscribe(p3.c, 'a', ({ value }) => {
            expect(value).toBe(3);
        });
        subscribe(p3, 'c.a', ({ value }) => {
            expect(value).toBe(3);
        });

        p.a = 3;
        p2.c.a = 3;
        p3.c.a = 3;

        await wait(100);

        expect.assertions(15);
    });

    it('should calling intercepts as expect', function () {
        let a = 1;
        const p = proxy({ a: 1, b: 2, c: { d: 3, e: { f: 4 } } });

        intercept(p, 'c.e.f', ({ value, preventDefault, lastReturnValue }) => {
            expect(a++).toBe(5);
            expect(lastReturnValue).toBe(2);
            preventDefault();
            return value + 1;
        });

        intercept(p.c, ({ value, preventDefault }) => {
            expect(value).toBe(2);
            expect(a++).toBe(4);
            preventDefault();
            return value;
        });

        intercept(p.c, 'e.f', ({ value, preventDefault }) => {
            expect(value).toBe(2);
            expect(a++).toBe(3);
            preventDefault();
            return value;
        });

        intercept(p.c.e, 'f', ({ value, preventDefault }) => {
            expect(value).toBe(2);
            expect(a++).toBe(2);
            preventDefault();
            return value;
        });

        intercept(p.c.e, ({ value, preventDefault }) => {
            expect(value).toBe(2);
            expect(a++).toBe(1);
            preventDefault();
            return value;
        });

        p.c.e.f = 2;

        expect(p.c.e.f).toBe(3);

        expect.assertions(11);
    });

    it('should works for demo 01', async function () {
        const _proxy = proxy({ a: 1, b: { c: 2 } });

        let id;

        // 监听 a 的变化
        id = subscribe(_proxy, 'a', ({ value, oldValue }) => {
            expect(oldValue).toBe(1);
            expect(value).toBe(2);
            // console.log(`property 'a' changed from ${oldValue} to ${value}`);
        });

        _proxy.a = 2;
        // print -> property 'a' changed from 1 to 2

        await Promise.resolve();

        unsubscribe(_proxy, id);

        // 监听 b.c 的变化
        id = subscribe(_proxy, 'b.c', ({ value, oldValue }) => {
            expect(oldValue).toBe(2);
            expect(value).toBe(3);
            // console.log(`property 'b.c' changed from ${oldValue} to ${value}`);
        });

        _proxy.b.c = 3;
        // print -> property 'b.c' changed from 2 to 3

        await Promise.resolve();

        unsubscribe(_proxy, id);

        // 监听整个对象内部的所有变化
        subscribe(_proxy, ({ value, oldValue, property }) => {
            if (property === 'a') {
                expect(oldValue).toBe(2);
                expect(value).toBe(3);
            }
            if (property === 'b.c') {
                expect(oldValue).toBe(3);
                expect(value).toBe(4);
            }
            // console.log(`[all] property '${property}' changed from ${oldValue} to ${value}`);
        });

        _proxy.a = 3;
        // print -> [all] property 'a' changed from 2 to 3
        _proxy.b.c = 4;
        // print -> [all] property 'b.c' changed from 3 to 4

        await wait(100);
        expect.assertions(8)
    });

    it('should remove relationship by reassign', async function() {
        const p: any = proxy({ a: 1, b: 2 });
        const p2 = proxy({ a: 11, b: 22 });
        const p3 = proxy({ a: 111, b: 222 });

        p.c = p2;

        subscribe(p, 'c.a', ({ value }) => {
            expect(value).toBe(999); // 2 + 3
        });

        subscribe(p2, 'a', ({ value }) => {
            expect(value).toBe(999); // 3 + 1
        });

        subscribe(p3, 'a', ({ value }) => {
            expect(value).toBe(999); // 2 + 1
        });

        p2.a = 999; // 2
        p.c.a = 999; // 2

        await wait(0);

        p.c = p3;
        p2.a = 999; // 1
        p3.a = 999; // 2
        p.c.a = 999; // 2

        await wait(0);
        p.c = {}
        p2.a = 999; // 1
        p3.a = 999; // 1
        p.c.a = 999; // 1

        await wait(0);

        expect.assertions(12);

    })
});

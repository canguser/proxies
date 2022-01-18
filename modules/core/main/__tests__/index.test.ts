import { createPool, proxy, readonly, shallow, subscribe } from '../index'
import { wait } from '@rapidly/utils/lib/commom/async/wait';

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
        subscribe(p, 'c.d',({value}) => {
            expect(value).toBe(3);
        });
        p2.d = 3;
        expect.assertions(0)
    });

    it('should proxy assign works', function () {
        const p = proxy<any>({ a: 1, b: 2 });
        const p2 = proxy({ d: 2 });
        p.c = p2;
        subscribe(p, 'c.d',({value}) => {
            expect(value).toBe(3);
        });
        p2.d = 3;
        expect.assertions(1)
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
});

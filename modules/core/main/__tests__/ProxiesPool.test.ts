import { ProxiesPool } from '../_class/ProxiesPool';
import { wait } from '@rapidly/utils/lib/commom/async/wait';

describe('test pool', () => {
    const pool = new ProxiesPool();
    it('should simply works - 01', async function () {
        const target = {
            a: 1
        };

        const proxy = pool.proxy(target);

        pool.intercept(proxy, 'a', {
            get: function ({ preventDefault, getterValue }) {
                preventDefault();
                return getterValue + 1;
            }
        });

        pool.subscribe(proxy, 'a', {
            get: function ({ getterValue, propertyChain }) {
                expect(getterValue).toBe(1);
                expect(propertyChain).toEqual(['a']);
            }
        });

        expect(proxy.a).toBe(2);

        await wait(100);

        expect.assertions(3);
    });

    it('should simply works - 02', async function () {
        const target = {
            a: 1,
            b: {
                c: 2
            }
        };

        const proxy = pool.proxy(target);

        pool.subscribe(proxy, {
            get: function ({ getterValue, propertyChain }) {
                if (propertyChain.length === 2) {
                    expect(propertyChain).toEqual(['b', 'c']);
                    expect(getterValue).toBe(2);
                }
                if (propertyChain.length === 1) {
                    expect(propertyChain).toEqual(['b']);
                }
            }
        });

        expect(proxy.b.c).toBe(2);

        await wait(100);
        expect.assertions(4);
    });

    it('should simply works - 03', async function () {
        const t1 = {
            c: 2
        };

        const target = {
            a: 1,
            b: t1
        };

        const proxy = pool.proxy(target);

        const proxy2 = pool.proxy(t1);

        pool.subscribe(proxy, 'b.c', {
            set: ({value}) => {
                expect(value).toBe(3);
            }
        });

        proxy2.c = 3;
        // proxy.b.c = 3;

        await wait(100);
        expect.assertions(1);
    });

    it('should simply works - 04', async function () {
        const t1 = {
            c: 2
        };

        const target: any = {
            a: 1,
        };

        const proxy = pool.proxy(target);

        const proxy2 = pool.proxy(t1);

        pool.subscribe(proxy, 'b.c', {
            set: ({value}) => {
                expect(value).toBe(3);
            }
        });

        proxy.b = proxy2;

        proxy2.c = 3;

        await wait(100);
        expect.assertions(1);

    })
});

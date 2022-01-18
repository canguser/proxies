import { readonly, shallow, subscribe } from '../index';
import { wait } from '@rapidly/utils/lib/commom/async/wait'

describe('test index', () => {
    it('should normal works - 01', () => {});

    it('should readonly works', function () {
        const p = readonly({ a: 1, b: 2 });
        p.a = 2;
        expect(p.a).toBe(1);
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

        expect.assertions(2 + 1)
    });
});

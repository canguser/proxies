import { ref } from '../ref'
import { subscribe } from '@proxies/core/main'
import { reactive } from '../reactive'

describe('test index', () => {
    it('should ref works - 01', () => {

        const text = ref('hello world');

        expect(text.value).toBe('hello world');

        text.value = 'hello vue';

        expect(text.value).toBe('hello vue');

        subscribe(text, ({ value, oldValue }) => {
            expect(value).toBe('hello react');
        });

        text.value = 'hello react';

        expect(text.value).toBe('hello react');

    });

    it('should link ref (normal object)', function() {
        const a = reactive({ a: 1 });

        const r = ref('hello');

        a.test = r;

        expect(a.test).toBe(r.value);

        let world = 'world';

        a.test = world;

        expect(a.test).toBe(world);
        expect(r.value).toBe(world);

        world = 'test';
        r.value = 'test';

        expect(a.test).toBe(world);
        expect(r.value).toBe(world);

        const r1 = ref('r1');

        a.test = r1;

        r1.value = 'r999';

        expect(r1.value).toBe('r999');
        expect(a.test).toBe('r999');
        expect(r.value).toBe(world);

        a.test = 'r1001';

        expect(r1.value).toBe('r1001');
        expect(a.test).toBe('r1001');
        expect(r.value).toBe(world);

        r.value = 'r-test';

        expect(r1.value).toBe('r1001');
        expect(a.test).toBe('r1001');
        expect(r.value).toBe('r-test');
    });

    it('should ref works with reactive - 01', () => {
        const age = ref(11);
        // const

    });

});

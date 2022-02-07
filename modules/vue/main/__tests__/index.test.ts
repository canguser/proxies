import { isRef, ref } from '../ref'
import { subscribe } from '@proxies/core/main'
import { reactive } from '../reactive'
import { wait } from '@rapidly/utils/lib/commom/async/wait'

describe('test index', () => {
    it('should ref works - 01', async () => {

        const text = ref('hello world');

        expect(text.value).toBe('hello world');

        text.value = 'hello vue';

        expect(text.value).toBe('hello vue');

        await wait(100)

        subscribe(text, ({ value, oldValue }) => {
            expect(value).toBe('hello react');
        });

        text.value = 'hello react';

        expect(text.value).toBe('hello react');

    });

    it('should link ref - 01', function() {
        const a = reactive({ a: 1 });

        const r = ref('hello');

        a.test = r;

        expect(a.test).toBe(r.value);
    })

    it('should link ref - 02', function() {
        const a = reactive({ a: 1 });

        const r = ref('hello');

        a.test = r;

        let world = 'world';

        a.test = world;

        expect(a.test).toBe(world);
        expect(r.value).toBe(world);
    })

    it('should link ref (normal object)', function() {
        const a = reactive({ a: 1 });

        const r = ref('hello');

        expect(isRef(r)).toBe(true);

        a.test = r;

        expect(a.test).toBe('hello');
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

        const person = reactive({})

        person.age = age;

        expect(person.age).toBe(11);

        person.age = 12;

        expect(person.age).toBe(12);
        expect(age.value).toBe(12);

        age.value = 13;
        expect(person.age).toBe(13);
        expect(age.value).toBe(13);
    });

    it('should ref works with reactive - 02', () => {
        const age = ref(11);

        const person = reactive({ age })

        expect(person.age).toBe(11);

        person.age = 12;

        expect(person.age).toBe(12);
        expect(age.value).toBe(12);

        age.value = 13;
        expect(person.age).toBe(13);
        expect(age.value).toBe(13);
    });

});

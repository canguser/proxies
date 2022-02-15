import { Subscriber } from '../class/Subscriber';

describe('Subscriber', () => {
    it('should be tested - 01', () => {
        const subscriber = new Subscriber();

        const a = {};
        const b = {};
        const c = {};

        subscriber.associate(a, b, '1');
        subscriber.associate(a, c, '2');

        const id1 = subscriber.subscribe(b, ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['1']);
            expect(args).toEqual([1, 2, 3]);
        });

        const id2 = subscriber.subscribe(c, ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['2']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.trigger(a, { args: [1, 2, 3] });
        subscriber.unsubscribe(b, id1);
        subscriber.unsubscribe(c, id2);

        subscriber.associate(b, c, '3');
        subscriber.subscribe(c, ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['3']);
            expect(args).toEqual([1, 2, 3, 4]);
        });

        subscriber.trigger(b, { args: [1, 2, 3, 4] });

        expect.assertions(6);
    });

    it('should be tested - 02', function () {
        const subscriber = new Subscriber();

        subscriber.associate('do1', 'do2', '1=>2');
        subscriber.associate('do2', 'do3', '2=>3');
        subscriber.associate('do3', 'do4', '3=>4');

        subscriber.subscribe('do2', ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['1=>2']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.subscribe('do3', ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['2=>3', '1=>2']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.subscribe('do4', ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['3=>4', '2=>3', '1=>2']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.trigger('do1', { args: [1, 2, 3] });

        expect.assertions(6);
    });

    it('should be tested for same item - 01', function () {
        const subscriber = new Subscriber();

        const dog = {};
        const Liming = {};
        const Lihua = {};

        subscriber.associate(Liming, Lihua, 'Nicko', 'Kitty');
        subscriber.associate(dog, Liming, 'Nicko');

        subscriber.subscribe(Lihua, ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['Kitty']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.trigger(dog, { args: [1, 2, 3] });

        expect.assertions(2);
    });

    it('should be tested for same item - 02', function () {
        const subscriber = new Subscriber();

        const dog = {};
        const Liming = {};
        const Lihua = {};

        subscriber.associate(Liming, Lihua, 'Nicko1', 'Kitty');
        subscriber.associate(dog, Liming, 'Nicko');

        subscriber.subscribe(Lihua, ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['Kitty']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.trigger(dog, { args: [1, 2, 3] });

        expect.assertions(0);
    });

    it('should be tested for same item - 03', function () {
        const subscriber = new Subscriber();
        const Liming = {};
        const Lihua = {};

        subscriber.associate(Liming, Lihua, 'Nicko', 'Kitty');

        subscriber.subscribe(Lihua, ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['Kitty']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.trigger(Liming, { args: [1, 2, 3], existChain: ['Nicko'] });
        expect.assertions(2);
    });

    it('should specified matched identity', function () {
        const subscriber = new Subscriber();

        const a = {};
        const b = {};
        const c = {};

        subscriber.associate(a, b, '1');
        subscriber.associate(b, c, '2');

        subscriber.subscribe(c, ({ identityChain }, ...args) => {
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.subscribe(c, ['2'], ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['2']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.subscribe(c, ['2', '1'], ({ identityChain }, ...args) => {
            expect(identityChain).toEqual(['2', '1']);
            expect(args).toEqual([1, 2, 3]);
        });

        subscriber.trigger(a, { args: [1, 2, 3] });
        subscriber.trigger(b, { args: [1, 2, 3] });

        expect.assertions(6);
    });
});

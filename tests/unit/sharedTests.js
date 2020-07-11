import { mount } from '@vue/test-utils';

export default function(localVue, Component) {
    return () => {
        let wrapper;
        let space;

        beforeEach(() => {
            wrapper = mount(Component, { localVue });
            space = wrapper.vm.$space('testing');
        });

        it('can access space with $space', async () => {
            expect(space.testString).toEqual('foo');
        });

        it('can access $space in templates', async () => {
            expect(wrapper.text()).toContain(space.testString);
        });

        it('has reactive $space', async () => {
            expect(wrapper.text()).toContain(space.testString);
            space.testBoolean = false;
            await localVue.nextTick();
            expect(wrapper.text()).toEqual('');
        });

        it('can toggle boolean', async () => {
            let currentValue = space.testBoolean;
            space.$toggle('testBoolean');
            expect(space.testBoolean).toEqual(!currentValue);
        });

        it('can toggle array', async () => {
            let value = ['a', 'b', 'c'];
            space.$set('testArray', value);
            space.$toggle('testArray', 'a');
            expect(space.testArray.sort()).toEqual(['b', 'c']);
            space.$toggle('testArray', 'a');
            expect(space.testArray.sort()).toEqual(['a', 'b', 'c']);
        });

        it('can set new nested values', async () => {
            space.$set('foo.bar', 'baz');
            expect(space.$get('foo')).toEqual({ bar: 'baz' });
        });

        it('can access methods', async () => {
            expect(typeof space.testMethod).toEqual('function');
            expect(space.testMethod()).toEqual(space.testString);
        });

        it('can access parent component in methods', async () => {
            expect(space.parentMethod()._isVue).toEqual(true);
        });

        it('can run init function', async () => {
            expect(space.abc).toEqual('foo');
        });
    };
}

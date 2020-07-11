import { createLocalVue, mount } from '@vue/test-utils';
import Space from '../../src/index';

const localVue = createLocalVue();
localVue.use(Space);

describe('Init component', () => {
    it('can eval component string init', async () => {
        let wrapper = mount(
            {
                template: `
                    <div>
                        <space
                            id="testing"
                            init="this.a = 'b'"
                            v-slot="space"
                        >
                        </space>
                    </div>
                `,
            },
            { localVue },
        );
        let space = wrapper.vm.$space('testing');
        await localVue.nextTick();
        expect(space.a).toEqual('b');
    });

    it('can eval component method init', async () => {
        let wrapper = mount(
            {
                template: `
                    <div>
                        <space
                            id="asdf"
                            :data="{
                                testString: 'foo',
                                testMethod(){
                                    this.testString = 'bar';
                                }
                            }"
                            init="testMethod"
                            v-slot="space"
                        >
                        </space>
                    </div>
                `,
            },
            { localVue },
        );
        let space = wrapper.vm.$space('asdf');
        await localVue.nextTick();
        expect(space.testString).toEqual('bar');
    });

    it('can eval directive method init', async () => {
        let wrapper = mount(
            {
                template: `
                    <div>
                        <div

                            v-space:stringinit="{ foo: 'bar', changeMe(){ this.foo = 'foo'; } }"
                            v-space:stringinit.init="'changeMe'"
                        >
                            <span></span>
                        </div>
                    </div>
                `,
            },
            { localVue },
        );
        let space = wrapper.vm.$space('stringinit');
        await localVue.nextTick();
        expect(space.foo).toEqual('foo');
    });
});

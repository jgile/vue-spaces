import { createLocalVue, mount } from '@vue/test-utils';
import Space from '../../src/index';
import sharedTests from './sharedTests';

const localVue = createLocalVue();
localVue.use(Space);

const Component = {
    template: `
        <div>
            <space
                id="testing"
                :data="{
                  testParentData: foo,
                  testString: 'foo',
                  testArray: ['foo', 'bar'],
                  testObject: { foo: { bar: 'baz' }},
                  testBoolean: true,
                  testMethod(){
                      return this.testString;
                  },
                  parentMethod(){
                      return $parent;
                  }
                }"
                :init="function(){
                   this.abc = 'foo';
                 }"
                v-slot="space"
            >
                <div v-if="space.testBoolean">
                    {{ space.testString }}
                </div>
            </space>
        </div>
    `,
    data() {
        return {
            foo: 'foo',
        };
    },
};

describe('Space component shared', sharedTests(localVue, Component));

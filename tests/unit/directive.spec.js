import { createLocalVue } from '@vue/test-utils';
import sharedTests from './sharedTests';
import Space from '../../src/index';

const localVue = createLocalVue();
localVue.use(Space);

const Component = {
    template: `
        <div>
            <div
                v-space:testing="{
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
                v-space:testing.init="function(){
                    this.abc = foo;
                }"
            >
                <div v-if="$space('testing').testBoolean">
                    {{ $space('testing').testString }}
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            foo: 'foo',
        };
    },
};

describe('Space directive', sharedTests(localVue, Component));

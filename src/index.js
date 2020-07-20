import SpaceManager from './SpaceManager';
import SpaceComponent from './SpaceComponent';
import SpaceDirective from './SpaceDirective';
import { createObservable } from './util';

export default {
    install(Vue) {
        const spaceManager = new SpaceManager();
        window.$space = createObservable(spaceManager);

        Vue.mixin({
            computed: {
                $space() {
                    return window.$space.spaces;
                },
            },
        });

        Vue.directive('space', SpaceDirective);
        Vue.component('space', SpaceComponent);
    },
};

import SpaceManager from './SpaceManager';
import SpaceComponent from './SpaceComponent';
import SpaceDirective from './SpaceDirective';

export default {
    install(Vue) {
        window.$space = Vue.observable(new SpaceManager());

        Vue.mixin({
            methods: {
                $space(id) {
                    return this.$spaces.getSpace(id);
                },
            },
            computed: {
                $spaces() {
                    return window.$space;
                },
            },
        });

        Vue.directive('space', SpaceDirective);
        Vue.component('space', SpaceComponent);
    },
};

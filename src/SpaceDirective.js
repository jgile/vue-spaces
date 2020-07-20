export default {
    bind(el, binding, vnode) {
        if (binding.arg === 'undefined') {
            throw 'Space directive requires argument as space id';
        }

        if (binding.modifiers.init) {
            window.$space.initSpace(binding.arg, binding.value, vnode.context);
        } else {
            window.$space.makeSpace(binding.arg, binding.value, {});
        }
    },
};

export default {
    bind(el, binding, vnode) {
        if (binding.arg === 'undefined') {
            throw 'Space directive requires argument as space id';
        }

        if (binding.modifiers.init) {
            window.__v_space_manager.initSpace(binding.arg, binding.value, vnode.context);
        } else {
            window.__v_space_manager.makeSpace(binding.arg, binding.value, {});
        }
    },
};

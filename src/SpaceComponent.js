export default {
    props: {
        id: {
            type: String,
        },
        init: {
            type: [String, Function],
            default: null,
        },
        data: {
            type: [String, Object],
            default: null,
        },
    },
    functional: true,
    render(createElement, context) {
        let space = window.__v_space_manager.makeSpace(context.props.id, context.props.data, {}, false, context.parent);

        if (context.props.init) {
            window.__v_space_manager.initSpace(space.$id, context.props.init, context.parent);
        }

        if (context.data.tag || context.props.tag) {
            return createElement(
                context.data.tag || context.props.tag,
                context.data,
                typeof context.scopedSlots.default === 'function' ? context.scopedSlots.default(space) : context.scopedSlots.default,
            );
        }

        return typeof context.scopedSlots.default === 'function' ? context.scopedSlots.default(space) : context.scopedSlots.default;
    },
};

export default {
    functional: true,
    props: {
        id: {
            type: String,
            required: true,
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
    render(createElement, context) {
        let space = window.$space.makeSpace(context.props.id, context.props.data, {}, false, context.parent);

        if (context.props.init) {
            window.$space.initSpace(space.$id, context.props.init, context.parent);
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

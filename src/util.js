import Vue from 'vue';
import castPath from 'lodash/_castPath';
import isIndex from 'lodash/_isIndex';
import isObject from 'lodash/isObject';
import toKey from 'lodash/_toKey';
import last from 'lodash/last';
import parent from 'lodash/_parent';

// A lot of this file is borrowed from alpine.js, by https://github.com/calebporzio.  Thanks!
// https://github.com/alpinejs/alpine

/**
 * Exact copy of lodash set but replace assignValue with Vue.set
 *
 * @param object
 * @param path
 * @param value
 * @param customizer
 * @returns {*}
 */
export function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
        return object;
    }

    path = castPath(path, object);

    let index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
        let key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
            let objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined;
            if (newValue === undefined) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
        }
        Vue.set(nested, key, newValue);
        // assignValue(nested, key, newValue);
        nested = nested[key];
    }
    return object;
}

/**
 * Set attributes in object. Uses Vue.js
 *
 * @param object
 * @param path
 * @param value
 * @returns {*}
 */
export function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
}

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
    path = castPath(path, object);
    let key = path.pop();
    object = parent(object, path);

    return object == null || Vue.delete(object[toKey(last(path))], key);
}

/**
 * Delete path from object. Uses Vue.js
 *
 * @param object
 * @param path
 * @param value
 * @returns {*}
 */
export function unset(object, path) {
    return object == null ? true : baseUnset(object, path);
}

/**
 * @param fn
 * @param ctx
 * @returns {function(*=): *}
 */
const polyfillBind = function(fn, ctx) {
    function boundFn(a) {
        const l = arguments.length;
        return l ? (l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a)) : fn.call(ctx);
    }

    boundFn._length = fn.length;
    return boundFn;
};

/**
 * @param fn
 * @param ctx
 * @returns {*}
 */
const nativeBind = function(fn, ctx) {
    return fn.bind(ctx);
};

/**
 * Eval.
 */
export const bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * Largely, if not directly borrowed from alpine.js.  Thanks!
 *
 * @param expression
 * @param context
 * @param additionalHelperVariables
 * @returns {{}|*}
 */
export const saferEval = function(expression, context, additionalHelperVariables = {}) {
    if (typeof expression === 'undefined') {
        return {};
    }

    if (typeof expression === 'function') {
        return expression.apply(context, ...Object.values(additionalHelperVariables));
    }

    if (typeof expression === 'string') {
        expression = expression.trim();
    }

    if (typeof expression === 'object') {
        return expression;
    }

    return new Function([...Object.keys(additionalHelperVariables)], `var __space_response; __space_response = ${expression} ; return __space_response`).bind(context)(
        ...Object.values(additionalHelperVariables),
    );
};

/**
 * @param expression
 * @param context
 * @param additionalHelperVariables
 * @returns {*}
 */
export const saferEvalNoReturn = function(expression, context, additionalHelperVariables = {}) {
    if (typeof expression === 'function') {
        return expression.bind(context).call(context);
    }

    if (Object.keys(context).includes(expression)) {
        let methodReference = new Function(['context', ...Object.keys(additionalHelperVariables)], ` return context.${expression}`)(
            context,
            ...Object.values(additionalHelperVariables),
        );

        if (typeof methodReference === 'function') {
            return methodReference.call(context);
        }
    }

    return new Function([...Object.keys(additionalHelperVariables)], `${expression}`).bind(context)(...Object.values(additionalHelperVariables));
};

/**
 * Get a random string.
 *
 * @param length
 * @returns {string}
 */
export function randomString(length = 16) {
    return (
        'r' +
        Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))
            .toString(36)
            .slice(1)
    );
}

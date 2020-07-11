import Vue from 'vue';
import isPlainObject from 'lodash/isPlainObject';
import has from 'lodash/has';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import intersection from 'lodash/intersection';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import xor from 'lodash/xor';
import { set, unset } from './util';

export default class Space {
    constructor(id) {
        if (id === 'undefined') {
            throw 'Space id is required.';
        }

        this.$id = id;
        this.$hasData = false;
    }

    $setData(data) {
        const self = this;
        this.$hasData = true;
        forEach(data, function(dataItem, name) {
            Vue.set(self, name, dataItem);
        });

        return this;
    }

    $get(key) {
        return get(this, key);
    }

    $set(key, val) {
        if (isPlainObject(key)) {
            forEach(key, (objVal, objKey) => {
                this.$set(objKey, objVal);
            });
        } else if (typeof val === 'function') {
            set(this, key, val);
        } else {
            set(this, key, val);
        }

        return this;
    }

    $unset(key) {
        unset(this, key);

        return this;
    }

    $has(key) {
        return has(this, key);
    }

    $includes(key, value) {
        if (isArray(value)) {
            return intersection(this.$get(key), value).length === value.length;
        }

        return includes(this.$get(key), value);
    }

    $call(key, ...args) {
        if (typeof this[key] === 'function') {
            return this[key].bind(this)(...args);
        }

        return false;
    }

    $toggle(key, val = null) {
        let currentVal = this.$get(key);

        if (typeof currentVal === 'boolean') {
            this.$set(key, !currentVal);
        }

        if (isArray(currentVal)) {
            this.$set(key, xor(currentVal, [val]));
        }

        return this;
    }
}

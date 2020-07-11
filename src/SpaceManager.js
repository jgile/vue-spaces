import Vue from 'vue';
import Space from './Space';
import { randomString, saferEval, saferEvalNoReturn } from './util';

export default class SpaceManager {
    constructor() {
        this.spaces = Vue.observable({});
        this.emptySpace = new Space();
    }

    hasSpace(id) {
        return id in this.spaces;
    }

    getSpace(id) {
        if (!this.hasSpace(id)) {
            return this.emptySpace;
        }

        return this.spaces[id];
    }

    storeSpace(space, reactive = true) {
        if (reactive) {
            Vue.set(this.spaces, space.$id, space);
        }

        this.spaces[space.$id] = space;

        return this;
    }

    initSpace(id, expression, context) {
        context.$nextTick(() => {
            saferEvalNoReturn(expression, this.getSpace(id), {});
        });
    }

    makeSpace(id, data = null, extra = {}, reactiveStore = true, context = null) {
        if (typeof id !== 'string') {
            id = randomString();
        }

        if (id in this.spaces) {
            return this.spaces[id];
        }

        let space = Vue.observable(new Space(id));

        if (data !== null) {
            space.$setData(saferEval(data, context || space, { ...extra }));
        }

        this.storeSpace(space, reactiveStore);

        return space;
    }
}

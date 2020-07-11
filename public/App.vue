<template>
    <div id="app">
        <div class="hello">
            <h1>Space</h1>
            <div
                v-space:asdf="{
                    abc: ['a', 'c'],
                    callme() {
                        console.log(space);
                        console.log(parent);
                        console.log(this);
                    },
                }"
                v-space:asdf.init="'console.log(parent)'"
            >
                <button @click="$space('asdf').callme">callme</button>
                <button @click="$space('asdf').$toggle('abc', 'c')">Update</button>
            </div>
            <!--            <space-->
            <!--                id="asdf"-->
            <!--                data="{-->
            <!--                    abc: ['a','c'],-->
            <!--                    callme(){-->
            <!--                        console.log(space);-->
            <!--                        console.log(parent);-->
            <!--                        console.log(this);-->
            <!--                    },-->
            <!--                }"-->
            <!--                init="console.log(parent)"-->
            <!--                v-slot="space"-->
            <!--            >-->
            <!--                <button @click="space.callme">callme</button>-->
            <!--                <button @click="space.$toggle('abc', 'c')">Update</button>-->
            <!--            </space>-->
        </div>

        <pre>
            {{ $spaces }}
        </pre>
    </div>
</template>

<script>
import Vue from 'vue';
import Space from '../src';

Vue.use(Space);

export default {
    name: 'App',
    data() {
        return {
            apple: 'orange',
        };
    },
    methods: {
        updateFoo() {
            this.$space('foofoo').$set('foo.bar', 'barbar');
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

<template>
    <div id="app">
        <space
            id="messageSpace"
            :data="{
                message: 'hello world',
                updateMessage(newMessage) {
                    this.message = newMessage;
                },
            }"
            v-slot="space"
        >
            {{ space.message }}
            <button @click="space.updateMessage('Foo Bar')">Update message</button>
        </space>
    </div>
</template>

<script>
import Vue from 'vue';
import Space from '../src';

Vue.use(Space);

export default {
    name: 'App',
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

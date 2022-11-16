<template>
    <Header v-if="auth.is_authenticated == true"></Header>
    <div id="section-body">
        <NavigationComponentVue v-if="auth.is_authenticated == true"/>
        <router-view class="section-router"></router-view>
    </div>
    <div id="section-player" v-if="auth.is_authenticated == true">
        <AudioPlayer />
    </div>
</template>
<script>
    import NavigationComponentVue from './components/NavigationComponent.vue';
    import { auth } from './stores/auth';
    export default {
    name: 'App',
    data() {
        return{
        auth
        }
    },
    components: {
        NavigationComponentVue,
    }
    }
</script>

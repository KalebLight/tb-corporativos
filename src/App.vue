<template>
    <div id="app">
        <router-view></router-view> 
    </div>
</template>

<script>

import './assets/css/style.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


export default {
    name: 'App',
    data(){
        return{
        }
    },

    Components:{
    },
    use: {
        'BootstrapVue': BootstrapVue,
        'IconsPlugin': IconsPlugin,  
    },
}
</script>

<style>
    #app {
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        min-height: 100vh;
        min-width: 100%;
        display: flex;
        overflow-x: hidden;
    }
    body{
        width: 100%;
        height: 100%;
    }
</style>

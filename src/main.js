console.log(123)
import Vue from 'vue'
import App from './App.vue'
import 'whatwg-fetch'
import './assets/css/style.css'

new Vue({
    el: '#app',
    render: h => h(App)
});
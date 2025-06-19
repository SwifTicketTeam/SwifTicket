import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from "./routes";
import { store } from './store/index';
import Client from "./client.vue";

Vue.use(VueRouter)

export const eventBus = new Vue();

const router = new VueRouter({
    routes: Routes,
    mode: 'history'
})

new Vue({
    store : store,
    router: router,
    render: h => h(Client)
}).$mount('#app')
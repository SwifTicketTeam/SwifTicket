import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from "./routes";
import { store } from './store/index';
import Client from "./client.vue";
import axios from "axios";

Vue.use(VueRouter)

export const eventBus = new Vue();

const router = new VueRouter({
    routes: Routes,
    mode: 'history',
});

export const authenticate = async () => {
    await axios.post(process.env.VUE_APP_SERVER + '/jwt', {
        token: store.state.token,
    }).then(res => {
        store.state.username = res.data.username;
        store.state.email = res.data.email;
        store.state.role = res.data.role;
    }).catch(() => {
        store.dispatch('deleteToken');
    });
}

router.beforeEach((to, from, next) => {
    authenticate().then(() => {
        next();
    });
})

// Start Client
new Vue({
    store: store,
    router: router,
    render: h => h(Client)
}).$mount('#app')
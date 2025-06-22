import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from "./routes";
import {AuthStore} from '@/stores/AuthStore';
import Client from "./client.vue";
import axios from "axios";

Vue.use(VueRouter)

export const eventBus = new Vue();

const router = new VueRouter({
    routes: Routes,
    mode: 'history',
});

export const authenticate = async () => {
    await axios.post(process.env.VUE_APP_SERVER + '/api/auth/jwt', {
        token: AuthStore.state.token,
    }).then(res => {
        AuthStore.state.username = res.data.username;
        AuthStore.state.email = res.data.email;
        AuthStore.state.role = res.data.role;
    }).catch(() => {
        AuthStore.dispatch('deleteToken');
    });
}

router.beforeEach((to, from, next) => {
    authenticate().then(() => {
        next();
    });
})

// Start Client
new Vue({
    store: AuthStore,
    router: router,
    render: h => h(Client)
}).$mount('#app')
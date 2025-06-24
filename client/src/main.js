import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Routes from "./routes";
import AuthStore from '@/stores/AuthStore';
import AccountStore from '@/stores/AccountStore';
import Client from "./client.vue";
import axios from "axios";

Vue.use(VueRouter)

export const eventBus = new Vue();

const router = new VueRouter({
    routes: Routes,
    mode: 'history',
});

// Store
const store = new Vuex.Store({
    modules: {
        auth: AuthStore,
        account: AccountStore,
    }
})

export const authenticate = async () => {
    await axios.post(`${process.env.VUE_APP_SERVER}/api/auth/jwt`, {
        token: store.state.auth.token,
    }).then(res => {
        store.state.auth.UID = res.data.UID;
        store.state.auth.username = res.data.username;
        store.state.auth.email = res.data.email;
        store.state.auth.role = res.data.role;
        store.state.account.bio = res.data.bio;
    }).catch(() => {
        try {
            store.dispatch('auth/deleteToken');
        } catch (err) {
            console.log("No Tokens to be Deleted.")
        }

    });
}

router.beforeEach((to, from, next) => {
    authenticate().then(() => {
        next();
    });
});

// Start Client
new Vue({
    store: store,
    router: router,
    render: h => h(Client)
}).$mount('#app')
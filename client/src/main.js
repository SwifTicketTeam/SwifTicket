import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from "./routes";
import SwifTicket from "./SwifTicket.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: Routes,
    mode: 'history'
})

new Vue({
    router: router,
    render: h => h(SwifTicket)
}).$mount('#app')
import Authentication from "../components/Authentication.vue";
import Dashboard from "../components/Dashboard.vue";

export default [
    {
        path: '/',
        component: Authentication,
    },
    {
        path: '/dashboard',
        component: Dashboard,
    }
]
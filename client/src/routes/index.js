import Authentication from "../components/authentication/Authentication.vue";
import Dashboard from "../components/authentication/Dashboard.vue";
import ChangePassword from "../components/authentication/ChangePassword.vue";

export default [
    {
        path: '/',
        component: Authentication,
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/change-password',
        component: ChangePassword,
    }
]
import Authentication from "../components/authentication/Authentication.vue";
import Dashboard from "../components/authentication/Dashboard.vue";
import ResetPassword from "../components/authentication/ResetPassword.vue";

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
        path: '/reset-password',
        component: ResetPassword,
    }
]
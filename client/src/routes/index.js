import Authentication from "../components/authentication/Authentication.vue";
import Dashboard from "../components/Dashboard.vue";
import ResetPassword from "../components/authentication/ResetPassword.vue";
import EventsPagePage from "../components/events/EventsPage.vue";
import VerificationError from "../components/authentication/VerificationError.vue";

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
    },
    {
        path: '/events',
        component: EventsPagePage,
    },
    {
        path: '/verification-error',
        component: VerificationError,
    },
    {
        path: '*',
        redirect: '/',
    }
]
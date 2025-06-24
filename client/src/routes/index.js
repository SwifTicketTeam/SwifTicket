import Authentication from "../components/authentication/Authentication.vue";
import MyAccount from "@/components/account/MyAccount.vue";
import ResetPassword from "../components/authentication/forms/ResetPassword.vue";
import HomePage from "../components/home/HomePage.vue";
import VerificationError from "../components/authentication/VerificationError.vue";

export default [
    {
        path: '/',
        component: Authentication,
    },
    {
        path: '/account',
        component: MyAccount,
    },
    {
        path: '/reset-password',
        component: ResetPassword,
    },
    {
        path: '/home',
        component: HomePage,
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
import Authentication from "../components/authentication/Authentication.vue";
import MyAccount from "@/components/account/MyAccount.vue";
import ResetPassword from "../components/authentication/forms/ResetPassword.vue";
import HomePage from "../components/home/HomePage.vue";
import VerificationError from "../components/authentication/VerificationError.vue";
import ShowTime from "@/components/events/Movies/ShowTime.vue";
import PaymentSuccess from "@/components/PaymentSuccess.vue";

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
        path: '/events',
        component: HomePage,
    },
    {
        path: '/showtime',
        component: ShowTime,
    },
    {
        path: '/verification-error',
        component: VerificationError,
    },
    {
      path: '/success',
      component: PaymentSuccess,
    },
    {
        path: '*',
        redirect: '/',
    }
]
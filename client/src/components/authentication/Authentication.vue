<template>
  <div id = "auth">
    <transition name = "fade" mode = "out-in">
      <keep-alive>
        <component :is = "authMode" @isUserTypeChanged = "changeUserType"></component>
      </keep-alive>
    </transition>
    <CardView @isUserTypeChanged = "changeUserType"></CardView>
  </div>
</template>

<script>
import LoginUser from "./Login";
import RegisterUser from "./Register";
import ForgotPassword from "./ForgotPassword.vue";
import ReRoute from "./ReRoute";
import CardView from "./Card";
import axios from "axios";

export default{
  name: "AuthUser",
  components: {
    LoginUser,
    RegisterUser,
    ForgotPassword: ForgotPassword,
    ReRoute,
    CardView
  },
  data() {
    return {
      authMode: 'LoginUser',
    }
  },
  methods: {
    changeUserType(authMode) {
      this.authMode = authMode;
    }
  },
  created() {
    if (this.$store.getters.isAuthenticated) {

      axios.post(process.env.VUE_APP_SERVER + '/jwt', {
        token: this.$store.getters.getToken
      }).then(res => {
        this.$store.state.username = res.data.username;
        this.$store.state.email = res.data.email;
        this.$store.state.role = res.data.role;
        this.$router.push("/events");
      }).catch(() => {
        this.$store.dispatch("deleteToken");
        alert("Your SwifTicket Session has expired. Please Login Again")
      })
    }
  }
};
</script>

<style scoped>

#auth {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.45s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0.2;
}

</style>
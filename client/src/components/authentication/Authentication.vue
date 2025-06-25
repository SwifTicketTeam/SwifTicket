<template>
  <div id = "auth">
    <CardView @isUserTypeChanged = "changeUserType"></CardView>
    <transition name = "fade" mode = "out-in">
      <keep-alive>
        <component :is = "authMode" @isUserTypeChanged = "changeUserType"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import LoginUser from "./forms/Login.vue";
import RegisterUser from "./forms/Register.vue";
import ForgotPassword from "./forms/ForgotPassword.vue";
import ReRoute from "./ReRoute";
import CardView from "./Card";

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
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$router.push("/events");
    }
  },
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

</style>
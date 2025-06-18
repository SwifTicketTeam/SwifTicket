<template>
  <div id = "auth">
    <transition name = "fade" mode = "out-in">
      <keep-alive>
        <component :is = "authMode"></component>
      </keep-alive>
    </transition>
    <CardView @isUserTypeChanged = "changeUserType"></CardView>
  </div>
</template>

<script>
import LoginUser from "./Login";
import RegisterUser from "./Register";
import CardView from "./Card";

export default{
  name: "AuthUser",
  components: {
    LoginUser,
    RegisterUser,
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
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0.2;
}

</style>
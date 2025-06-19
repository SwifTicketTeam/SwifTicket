<template>
  <div id = "entry">
    <div id = "Form">
      <h1>Your Events Await!</h1>
      <div class = "fields">
        <label for = "eMail">EMAIL</label>
        <input v-model = "email" type = "text" name = "eMail" id = "eMail" placeholder = "What’s your email?" spellcheck = "false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "passWord">PASSWORD</label>
        <input v-model = "password" type = "password" name = "passWord" id = "passWord" placeholder = "Unlock your SwifTicket Experience" spellcheck="false" autocomplete = "off">
      </div>
      <a @click = "passwordReset">Forgot Password?</a>
      <p :class = "{isWarn : isWarning}">{{ warning }}</p>
      <button @click = "login">SUBMIT</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginUser",
  data() {
    return {
      email: "",
      password: "",
      warning: "",
      isWarning: false,
    }
  },
  methods: {
    login() {
      this.isWarning = false;
      axios.post( process.env.VUE_APP_SERVER + "/login", {
        email: this.email,
        password: this.password,
      }).then(res => {
        this.isWarning = false;
        this.$store.dispatch("saveToken", res.data.token);
        this.$router.push({
          path: "/dashboard",
        });
      }).catch(err => {
        this.warning = err.response.data;
        this.isWarning = true;
      })
    },
    passwordReset() {
      this.$emit('isUserTypeChanged', 'ForgotPassword');
    }
  }
}
</script>

<style scoped src = "../../styles/form-styles.css"></style>
<style scoped>

a {
  width: 90%;
  padding-right: 1rem;
  text-align: right;
  font-size: 1.2rem;
  cursor: pointer;
}

</style>
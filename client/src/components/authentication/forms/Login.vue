<template>
  <div id = "entry">
    <div id = "Form">
      <h1>Your Events Await!</h1>
      <div class = "fields">
        <label for = "eMail" class = "no-select fieldLabel">EMAIL</label>
        <input class = "field" v-model = "email" type = "text" name = "eMail" id = "eMail" placeholder = "What’s your email?" spellcheck = "false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "passWord" class = "no-select fieldLabel">PASSWORD</label>
        <input class = "field" v-model = "password" type = "password" name = "passWord" id = "passWord" placeholder = "Unlock your SwifTicket Experience" spellcheck="false" autocomplete = "off">
      </div>
      <a @click = "passwordReset">Forgot Password?</a>
      <p :class = "{isWarn : isWarning}">{{ warning }}</p>
      <button @click = "login" class = "no-select">SUBMIT</button>
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
  mounted() {
    if (!this.$store.getters['auth/isAuthenticated']) {
      this.warning = "Your Session has Expired. Please Login Again";
      this.isWarning = true;
    }
  },
  methods: {
    login() {
      this.isWarning = false;
      axios.post( `${process.env.VUE_APP_SERVER}/api/auth/login`, {
        email: this.email,
        password: this.password,
      }).then(res => {
        this.isWarning = false;
        this.$store.dispatch("auth/saveToken", res.data.token);
        this.$router.push("/events");
      }).catch(err => {
        if (err.response?.data) this.warning = err.response.data.message;
        this.isWarning = true;
      })
    },
    passwordReset() {
      this.$emit('isUserTypeChanged', 'ForgotPassword');
    }
  }
}
</script>

<style scoped src = "../../../styles/forms.css"></style>
<style scoped src = "../../../styles/button.css"></style>
<style scoped>

a {
  width: 90%;
  padding-right: 1rem;
  text-align: right;
  font-size: 1.3rem;
  cursor: pointer;
}

</style>
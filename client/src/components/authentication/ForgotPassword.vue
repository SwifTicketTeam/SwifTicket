<template>
  <div id = "entry">
    <div id = "Form">
      <h1>No worries! Let’s get you back on track</h1>
      <div class = "fields">
        <label for = "eMail">EMAIL</label>
        <input v-model = "email" type = "text" name = "eMail" id = "eMail" placeholder = "What’s your email?" spellcheck="false" autocomplete = "off">
      </div>
      <p :class = "{isWarn : isWarning}">{{ warning }}</p>
      <button @click = "sendEmail">SEND EMAIL</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      warning: "",
      isWarning: false,
    }
  },
  methods: {
    sendEmail() {
      axios.post(process.env.VUE_APP_SERVER + '/forgotPassword', {
        email: this.email,
      }).then(() => {
        this.$emit('isUserTypeChanged', 'ReRoute');
      }).catch(err => {
        this.isWarning = true;
        this.warning = err.response.data;
      })
    }
  }
}

</script>

<style scoped src = "../../styles/form-styles.css"></style>
<style scoped>

button {
  margin: 0;
  width: 30%;
}

input {
  width: 70%;
}

</style>
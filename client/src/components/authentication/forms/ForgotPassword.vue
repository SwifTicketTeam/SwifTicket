<template>
  <div id = "entry">
    <div id = "Form">
      <h1>No worries! Let’s get you back on track</h1>
      <div class = "fields">
        <label for = "eMail" class = "no-select fieldLabel">EMAIL</label>
        <input class = "field" v-model = "email" type = "text" name = "eMail" id = "eMail" placeholder = "What’s your email?" spellcheck="false" autocomplete = "off">
      </div>
      <p :class = "{isWarn : isWarning}">{{ warning }}</p>
      <button @click = "sendEmail" class = "no-select">SEND EMAIL</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {eventBus} from "@/main";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      warning: "",
      isWarning: false,
    }
  },
  created() {
    eventBus.$on("starting reroute", () => {
      eventBus.$emit("rerouting", "reset");
    })
  },
  methods: {
    sendEmail() {
      this.isWarning = false;
      axios.post(`${process.env.VUE_APP_SERVER}/api/auth/forgot-password`, {
        email: this.email,
      }).then(() => {
        this.$emit('isUserTypeChanged', 'ReRoute');
      }).catch(err => {
        this.isWarning = true;
        this.warning = err.response.data.message;
      })
    }
  }
}

</script>

<style scoped src = "../../../styles/forms.css"></style>
<style scoped src = "../../../styles/button.css"></style>
<style scoped>

button {
  margin: 0;
  width: 30%;
}

input {
  width: 70%;
}

</style>
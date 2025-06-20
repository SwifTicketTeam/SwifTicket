<template>
  <div id = "entry">
    <div id = "Form">
      <h1>Join the Swift Side of Ticketing!</h1>
      <div class = "fields">
        <label for = "userName">USERNAME</label>
        <input v-model = "username" type = "text" name = "userName" id = "userName" placeholder = "What should we call you?" spellcheck="false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "eMail">EMAIL</label>
        <input v-model = "email" type = "text" name = "eMail" id = "eMail" placeholder = "What’s your email?" spellcheck="false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "passWord">PASSWORD</label>
        <input v-model = "password" type = "password" name = "passWord" id = "passWord" placeholder = "Secure your SwifTicket Account" spellcheck="false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "confirmPassword">CONFIRM PASSWORD</label>
        <input v-model = "confirmPassword" type = "password" name = "confirmPassword" id = "confirmPassword" placeholder = "Just to be sure…" spellcheck="false" autocomplete = "off">
      </div>
      <p :class = "{isWarn : isWarning}">{{ warning }}</p>
      <button @click = "register">REGISTER</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {eventBus} from "@/main";

export default {
  name: "RegisterUser",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      warning: "",
      isWarning: false,
    }
  },
  created() {
    eventBus.$on("starting reroute", () => {
      eventBus.$emit("rerouting", "register");
    })
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.warning = "Passwords do not match";
        this.isWarning = true;
        return;
      }
      this.isWarning = false;
      axios.post(process.env.VUE_APP_SERVER + "/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      }).then(() => {
        this.isWarning = false;
        this.$emit('isUserTypeChanged', 'ReRoute');
      }).catch(err => {
        try {
          this.warning = err.response.data;
          this.isWarning = true;
        } catch {
          alert("Network Error");
        }
      });
    }
  }
}
</script>


<style scoped src = "../../styles/forms.css"></style>
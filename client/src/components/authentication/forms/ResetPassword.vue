<template>
  <div id = "reset-password">
    <div id = "Form">
      <img src = "../../../assets/swifticket-logo.png" class = "no-select">
      <h1 class = "no-select">Choose your new SwifTicket Password</h1>
      <div class = "fields">
        <label for = "passWord" class = "no-select fieldLabel">PASSWORD</label>
        <input class = "field" v-model = "password" type = "password" name = "passWord" id = "passWord" placeholder = "Secure your SwifTicket Account" spellcheck="false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "confirmPassword" class = "no-select fieldLabel">CONFIRM PASSWORD</label>
        <input class = "field" v-model = "confirmPassword" type = "password" name = "confirmPassword" id = "confirmPassword" placeholder = "Just to be sure…" spellcheck="false" autocomplete = "off">
      </div>
      <p :class = "{isWarn : isWarning}">{{ warning }}</p>
      <button @click = "resetPassword" class = "no-select">RESET PASSWORD</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
      confirmPassword: "",
      warning: "",
      isWarning: false
    }
  },
  created() {
    this.token = this.$route.query.token;
  },
  methods: {
    resetPassword() {
      if (this.password !== this.confirmPassword) {
        this.warning = "Passwords do not match";
        this.isWarning = true;
        return;
      }
      axios.post( process.env.VUE_APP_SERVER + "/api/auth/reset-password", {
        password: this.password,
        token: this.token
      }).then(() => {
        this.isWarning = false;
        this.$router.push('/');
      }).catch(err => {
        this.isWarning = true;
        console.log(err);
        if (err.name !== "AxiosError") this.warning = err.response.data.message;
        else this.isWarning = "No Response from Server"
      })
    }
  }
}
</script>

<style src = "../../../styles/forms.css" scoped></style>

<style scoped>

#reset-password {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

img {
  margin-top: 3rem;
  width: min(30%, 31vh);
  height: auto;
}

#Form {
  display: flex;
  justify-content: flex-start;
  width: 60%;
  height: 80%;
}

</style>
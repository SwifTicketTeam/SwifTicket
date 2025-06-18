<template>
  <div id = "entry">
    <div id = "Form">
      <h1>Your Events Await!</h1>
      <div class = "fields">
        <label for = "eMail">EMAIL</label>
        <input type = "text" name = "eMail" id = "eMail" placeholder = "What’s your email?" spellcheck = "false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "passWord">PASSWORD</label>
        <input type = "password" name = "passWord" id = "passWord" placeholder = "Unlock your SwifTicket Experience" spellcheck="false" autocomplete = "off">
      </div>
      <a>Forgot Password?</a>
      <button>SUBMIT</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginUser"
}
</script>

<style src = "../styles/form-styles.css"></style>

<style scoped>


a {
  width: 90%;
  padding-right: 1rem;
  text-align: right;
  font-size: 1.2rem;
  cursor: pointer;
}

</style>
<template>
  <div id = "entry">
    <div id = "Form">
      <h1>Join the Swift Side of Ticketing!</h1>
      <div class = "fields">
        <label for = "userName">USERNAME</label>
        <input type = "text" name = "userName" id = "userName" placeholder = "What should we call you?" spellcheck="false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "eMail">EMAIL</label>
        <input type = "text" name = "eMail" id = "eMail" placeholder = "What’s your email?" spellcheck="false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "passWord">PASSWORD</label>
        <input type = "password" name = "passWord" id = "passWord" placeholder = "Secure your SwifTicket Account" spellcheck="false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "confirmPassword">CONFIRM PASSWORD</label>
        <input type = "password" name = "confirmPassword" id = "confirmPassword" placeholder = "Just to be sure…" spellcheck="false" autocomplete = "off">
      </div>
      <button>REGISTER</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupUser"
}
</script>


<style src = "../styles/form-styles.css"></style>
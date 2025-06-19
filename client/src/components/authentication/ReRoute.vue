<template>
  <div id = "entry">
    <div id = "Form">
      <h1>{{ message }}</h1>
    </div>
  </div>
</template>
<script>
import {eventBus} from "@/main";

export default {
  name: "ReRoute",
  data() {
    return {
      message: "",
    }
  },
  created() {
    eventBus.$on('rerouting', (message) => {
      console.log(message);
      if (message === 'register') {
        this.message = "🎉 Thank you for registering with SwifTicket!\nWe're thrilled to have you on board.";

      } else if (message === 'reset') {
        this.message = "🔐 You are all Set!\nPlease check your inbox and follow the link to reset your password.";

      }
    })
  }
}
</script>

<style scoped src = "../../styles/form-styles.css"></style>
<style>

h1 {
  text-align: center;
  padding: 1rem;
}

</style>
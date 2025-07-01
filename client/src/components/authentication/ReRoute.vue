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
      if (message === 'register') {
        this.message = "🎉 Thank you for registering with SwifTicket!\nWe're thrilled to have you on board.";

      } else if (message === 'reset') {
        this.message = "🔐 You are all Set!\nPlease check your inbox and follow the link to reset your password.";

      }
    });
    eventBus.$emit("starting reroute");
  },
  activated() {
    eventBus.$emit("starting reroute");
  }
}
</script>

<style scoped src = "../../styles/forms.css"></style>
<style scoped>

h1 {
  text-align: center;
  padding: 1rem;
  font-weight: normal;
}

</style>
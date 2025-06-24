<template>
  <transition name = "fade" mode = "out-in">
    <component :is = "selectedOption"></component>
  </transition>
</template>

<script>
import {eventBus} from "@/main";
import Profile from "./options/Profile.vue"
import MyTickets from "./options/MyTickets.vue"
import Security from "./options/Security.vue"

export default {
  name: "AccountSection",
  components: {
    Profile,
    MyTickets,
    Security
  },
  data() {
    return {
      selectedOption: "Profile",
    }
  },
  created() {
    eventBus.$on("select-option", (option) => {
      this.selectedOption = option.replace(/\s+/g, "");
    });
  }
}
</script>

<style scoped>

div {
  margin-top: 2rem;
  width: 70%;
  border-radius: 1.5rem;
  border: 0.1rem solid #000;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
}

</style>
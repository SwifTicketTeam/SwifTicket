<template>
  <transition name = "fade" mode = "out-in">
    <component :is = "selectedOption"></component>
  </transition>
</template>

<script>
import {eventBus} from "@/main";
import Profile from "./options/Profile.vue"
import Tickets from "./options/MyTickets.vue"
import Favorites from "./options/Favorites.vue"
import Events from "./options/Events.vue"
import Vendor from "./options/Vendor.vue"

export default {
  name: "AccountSection",
  components: {
    Profile,
    Tickets,
    Favorites,
    Events,
    Vendor,
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
  max-width: 70%;
  height: 75vh;
  border-radius: 1.5rem;
  border: 0.1rem solid #CCC;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

div::-webkit-scrollbar {
  display: none;
}

</style>
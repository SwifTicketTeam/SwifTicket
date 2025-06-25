<template>
  <div id = "homePage">
    <HomeHeader></HomeHeader>
    <transition name = "fade" mode = "out-in">
      <keep-alive>
        <component :is = "isComponent" :evt = "evt"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader.vue"
import EventsList from "../events/EventsList.vue"
import Event from "../events/Event.vue";
import {eventBus} from "@/main";

export default{
  name: "HomePage",
  components: {
    HomeHeader,
    EventsList,
    Event,
  },
  data() {
    return{
      isComponent: "EventsList",
      evt: {},
    }
  },
  created() {
    if (!this.$store.getters['auth/isAuthenticated']) {
      this.$router.push("/");
    }
    eventBus.$on("eventClicked", (evt) => {
      this.isComponent = (this.isComponent === "EventsList") ? "Event" : "EventsList";
      this.evt = evt
    });
  },
};

</script>

<style scoped>

#homePage {
  display: flex;
  justify-content: center;
  width: 100%;
  background: #FFF;
}

</style>
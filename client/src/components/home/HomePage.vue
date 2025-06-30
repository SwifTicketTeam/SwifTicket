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
import MoviesList from "../events/Movies/MoviesList.vue"
import Movie from "../events/Movies/Movie.vue";
import {eventBus} from "@/main";

export default{
  name: "HomePage",
  components: {
    HomeHeader,
    EventsList: MoviesList,
    Event: Movie,
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
    eventBus.$on("backClicked", (evt) => {
      this.isComponent = "EventsList";
      this.evt = evt
    });
    eventBus.$on("toAccount", (evt) => {
      this.isComponent = "Event";
      this.evt = evt
    });
    eventBus.$on("toEvents", (evt) => {
      this.isComponent = "Event";
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
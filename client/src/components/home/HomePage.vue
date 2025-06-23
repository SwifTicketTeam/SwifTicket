<template>
  <div id = "homePage">
    <HomeHeader></HomeHeader>
    <EventsList></EventsList>
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader.vue"
import EventsList from "../events/EventsList.vue"

export default{
  name: "HomePage",
  components: {
    HomeHeader,
    EventsList,
  },
  data() {
    return{
      isEvent: false,
    }
  },
  created() {
    if (!this.$store.getters['auth/isAuthenticated']) {
      this.$router.push("/");
    }
  },
};

</script>

<style scoped>

#homePage {
  display: flex;
  justify-content: center;
  width: 100%;
  background: linear-gradient(to right, #DFDFDE, #F5EDDC);
}

</style>
<template>
  <div id = "eventsPage">
    <NavBar></NavBar>
    <div id = "box">
      <SearchBar></SearchBar>
      <div id = "list">
        <EventInfo v-for = "(A, index) in 20" :key = "index"></EventInfo>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../NavBar.vue"
import SearchBar from "./SearchBar.vue"
import EventInfo from "./Event.vue";

export default{
  name: "EventsPage",
  components: {
    EventInfo,
    NavBar,
    SearchBar,
  }
};

</script>

<style scoped>

#eventsPage {
  display: flex;
  justify-content: center;
  width: 100%;
  background: linear-gradient(#DFDFDE, #F5EDDC);
}

#box {
  margin-top: 12vh;
  padding: 1rem;
  width: 100%;
}

#list {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
}

</style>
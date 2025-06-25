<template>
  <div id = "box">
    <SearchBar @movies = "getMovies"></SearchBar>
    <div id = "list">
      <EventCard v-for = "(event, index) in events" :key = "index" :event = "event"></EventCard>
    </div>
    <h1 v-if = "isNoResults">NO MOVIES FOUND</h1>
  </div>
</template>

<script>
import EventCard from "@/components/events/EventCard.vue";
import SearchBar from "@/components/home/SearchBar.vue";

export default{
  name: "EventsList",
  components: {
    SearchBar,
    EventCard
  },
  data() {
    return{
      events: {},
      isNoResults: false,
    }
  },
  methods: {
    getMovies(movies) {
      this.events = movies
      if (!Object.keys(this.events).length) {
        this.isNoResults = true;
      }
    }
  }
}
</script>

<style scoped>

#box {
  margin-top: 15vh;
  padding: 1rem;
  width: 100%;
  overflow: hidden;
}

#list {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  margin-left: 0.5rem;
}

h1 {
  font-size: 5rem;
  text-align: center;
  font-weight: normal;
}

</style>
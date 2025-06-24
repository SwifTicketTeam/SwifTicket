<template>
  <div id = "box">
    <SearchBar @movies = "getMovies"></SearchBar>
    <div id = "list">
      <EventCard v-for = "(event, index) in events" :key = "index" :event = "event"></EventCard>
    </div>
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
    }
  },
  methods: {
    getMovies(movies) {
      this.events = movies
    }
  }
}
</script>

<style scoped>

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
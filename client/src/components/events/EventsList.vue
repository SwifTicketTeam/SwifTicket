<template>
  <div id = "box">
    <SearchBar></SearchBar>
    <div id = "list">
      <EventCard v-for = "(event, index) in 20" :key = "index"></EventCard>
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
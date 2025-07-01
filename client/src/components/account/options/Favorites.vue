<template>
  <div id = "section">
    <h2>MY FAVORITES</h2>
    <div id = "favorites" v-if="!isLoading">
      <EventCard v-for = "(event, index) in events" :key = "index" :event = "event"></EventCard>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "@/components/events/Movies/MovieCard.vue";

export default {
  name: "MyFavorites",
  components: {EventCard: MovieCard},
  data() {
    return {
      events: {},
      isLoading: false,
    }
  },
  created () {
    this.isLoading = true;
    this.getFavorites();
  },
  activated () {
    this.isLoading = true;
    this.getFavorites();
  },
  methods: {
    getFavorites () {
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/movies/favorites`, {
        userId: this.$store.state.auth.UID,
      }).then((res) => {
        this.events = res.data.movies;
        this.isLoading = false;
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>

#section {
  padding-left: 1.5rem;
}

#favorites {
  display: flex;
  flex-direction: row;
  gap: 1.3rem;
  flex-wrap: wrap;
  padding: 0;
}

h2 {
  font-size: 1.6rem;
  margin: 2rem 0.1rem 1rem 0;
}

</style>
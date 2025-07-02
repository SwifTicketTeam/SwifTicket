<template>
  <div id = "section">
    <h2>MY FAVORITES</h2>
    <div id = "favorites" v-if="!isLoading">
      <MovieCard v-for = "(event, index) in events" :key = "index" :event = "event"></MovieCard>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "@/components/events/Movies/MovieCard.vue";

export default {
  name: "MyFavorites",
  components: {MovieCard},
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

#favorites {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.3rem;
  flex-wrap: wrap;
  padding: 1rem;
}

#card {
  width: 17%;
  border: 0.1rem solid #DDD;
}

#card:hover {
  box-shadow: 0.01rem 0.01rem 0.2rem 0.05rem rgba(0, 0, 0, 0.05);;
}

h2 {
  font-size: 1.6rem;
  margin: 2rem 0.1rem 1rem 0;
  text-align: center;
}

</style>
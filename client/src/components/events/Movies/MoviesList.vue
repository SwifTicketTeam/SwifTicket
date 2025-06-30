<template>
  <div id = "box">
    <SearchBar @movies = "getMovies"></SearchBar>
    <h2>CURRENTLY SHOWING</h2>
    <div class = "DiscoverList">
      <MovieCard v-for = "(event, index) in screening_movies" :key = "index" :event = "event"></MovieCard>
    </div>
    <br><br>
    <h2>DISCOVER NEW MOVIES</h2>
    <div class = "DiscoverList">
      <MovieCard v-for = "(event, index) in movies" :key = "index" :event = "event"></MovieCard>
    </div>
    <h1 v-if = "isNoResults">NO MOVIES FOUND</h1>
  </div>
</template>

<script>
import MovieCard from "@/components/events/Movies/MovieCard.vue";
import SearchBar from "@/components/home/SearchBar.vue";

export default{
  name: "moviesList",
  components: {
    SearchBar,
    MovieCard
  },
  data() {
    return{
      screening_movies: {},
      movies: {},
      isNoResults: false,
    }
  },
  methods: {
    getMovies(screening_movies, movies) {
      this.screening_movies = screening_movies
      this.movies = movies
      if (!Object.keys(this.screening_movies).length && !Object.keys(this.movies).length) {
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

.DiscoverList {
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

h2 {
  width: 100%;
  text-align: center;
  font-family: 'Roboto Slab', sans-serif;
  font-size: 1.5rem;
  font-weight: normal;
}

</style>
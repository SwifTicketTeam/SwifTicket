<template>
  <div id = "component">
    <input type = "text" v-model = "search" placeholder = "SwifTicket it —> Your Ticket to fun starts here!">
    <div id = "genres">
      <button v-for = "(genre, index) in genres" :key = "index" @click = "selectGenre(genre)" :class = "{selected : selectedGenres.includes(genre)}">{{genre}}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash/debounce";

export default {
  name: "SearchBar",
  data() {
    return {
      search: "",
      genres: ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Family", "Horror", "History", "Music", "Mystery", "Romance", "Sci-Fi", "Thriller", "TV Show", "War", "Western"],
      selectedGenres: [],
    }
  },
  created() {
    this.startSearch();
    this.debouncedSearch = debounce(this.startSearch, 400);
  },
  methods: {
    startSearch() {
      axios.get(`${process.env.VUE_APP_SERVER}/api/events/movies?search=${encodeURIComponent(this.search)}&genre=${this.selectedGenres}`)
          .then((res) => {
            this.$emit('movies', res.data.screening_movies, res.data.movies)
          }).catch((err) => {
            console.log(err)
      })
    },
    selectGenre(genre) {
      if (this.selectedGenres.includes(genre)) this.selectedGenres = this.selectedGenres.filter(selectedGenre => selectedGenre !== genre);
      else this.selectedGenres.push(genre);
      this.startSearch();
    }
  },
  watch: {
    search() {
      this.debouncedSearch()
    }
  }
}
</script>

<style scoped>

#component {
  display: flex;
  flex-direction: column;
}

#genres {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 2rem 0 1.5rem 0;
  overflow-x: auto;
  align-self: center;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#genres::-webkit-scrollbar {
  display: none;
}

input {
  border-radius: 3rem;
  width: 30%;
  height: 3rem;
  padding: 0 1rem;
  margin-right: 0.5rem;
  font-size: 1.1rem;
  font-family: 'Poppins', serif;
  box-shadow: -0.01rem 0.01rem 0.1rem 0.03rem rgba(0, 0, 0, 0.25);
  border: 0.01rem solid #CCC;
  align-self: flex-end;
}

input:focus {
  outline: none;
}


button {
  width: auto;
  height: 80%;
  padding: 0.5rem 1.3rem;
  margin: 0.5rem 1.3rem 0 0;
  text-wrap: nowrap;
  font-size: 1.3rem;
  font-family: 'Roboto Slab', sans-serif;
  background-color: inherit;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s ease,
  border-radius 0.5s ease;
}

button:hover {
  background-color: rgba(233, 106, 106, 0.6);
  border-radius: 0.5rem;
}

.selected, .selected:hover {
  background-color: rgb(233, 106, 106);
  border-radius: 1.5rem;
  color: white;
}

</style>
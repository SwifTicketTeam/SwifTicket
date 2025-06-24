<template>
  <div>
    <input type = "text" v-model = "search" placeholder = "SwifTicket it — Your Ticket to fun starts here!">
    <button v-for = "(genre, index) in genres" :key = "index" @click = "selectGenre(genre)" :class = "{selected : selectedGenres.includes(genre)}">{{genre}}</button>
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
      genres: ["Action", "Comedy", "Romance", "Sci-Fi", "Horror", "Crime", "Drama", "Family"],
      selectedGenres: [],
    }
  },
  created() {
    this.startSearch();
    this.debouncedSearch = debounce(this.startSearch, 400);
  },
  methods: {
    startSearch() {
      axios.get(`${process.env.VUE_APP_SERVER}/api/events/movies?search=${this.search}&genre=${this.selectedGenres}`)
          .then((res) => {
            this.$emit('movies', res.data.movies);
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

div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

input {
  border-radius: 1.5rem;
  width: 50%;
  height: 3.5rem;
  padding: 0 1rem;
  font-size: 1.4rem;
  font-family: 'Lora', serif;
  background-color: #EFEFEF;
  border: 0.15rem solid black;
}

input:focus {
  outline: none;
}


button {
  width: auto;
  height: 80%;
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  text-wrap: nowrap;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  background-color: #FFD586;
  border-radius: 0.8rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
  border: 0.1rem solid black;
  cursor: pointer;
  transition: background-color 0.3s ease,
  border-radius 0.3s ease;
}

button:hover {
  background-color: #FFC94D;
  border-radius: 2rem;
}

.selected {
  background-color: #FF9898;
}

.selected:hover {
  background-color: #FF9898;
}

</style>
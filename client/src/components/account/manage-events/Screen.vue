<template>
  <div id = "screen" :class = "{edit : isEdit, preview : isPreview && isEdit}" class = "no-select">
    <div id = "beforeEdit">
      <div id = "details">
        <h3 class = "no-select">{{editableScreen.name.toUpperCase()}}</h3>
        <h4 class = "no-select">CURRENT MOVIE : {{(!editableScreen.movie) ? "" : editableScreen.movie.title }}</h4>
        <h4 class = "no-select">MOVIE STARTS AT : </h4>
      </div>
      <button @click = "editScreen" class = "no-select">{{ isEdit ? "BACK" : "EDIT SCREEN"}}</button>
    </div>
    <div v-if = "isEdit" id = "afterEdit" :class = "{preview : isPreview && isEdit}">
      <input type = "text" placeholder = "Find Movies" v-model = "search">
      <div id = "movies">
         <EventCardScreen @MovieChanged = "NewMovie" v-for = "(movie, index) in movies" :key = "index" :Theatre = theatre :Screen = "editableScreen" :movie = "movie"></EventCardScreen>
      </div>
      <button id = "preview" @click = "previewLayout" class = "no-select">{{ isPreview ? "BACK" : "PREVIEW LAYOUT"}}</button>
      <SeatLayout v-if = "isPreview" :layout = "Screen.layout"></SeatLayout>
      <button v-if = "isPreview" id = "delete" @click = "deleteScreen" class = "no-select">DELETE SCREEN</button>
    </div>
  </div>
</template>

<script>
import EventCardScreen from "./EventCardScreen.vue";
import axios from "axios";
import debounce from "lodash/debounce";
import SeatLayout from "@/components/events/Layout.vue";

export default {
  name: "MovieScreen",
  components: {
    SeatLayout,
    EventCardScreen,
  },
  props: {
    Screen: Object,
    theatre: Object,
  },
  data() {
    return {
      isEdit: false,
      movies: [],
      search: "",
      editableScreen: {...this.Screen},
      isPreview: false,
    }
  },
  created() {
    this.startSearch();
    this.debouncedSearch = debounce(this.startSearch, 400);
  },
  methods: {
    editScreen() {
      this.isEdit = !this.isEdit
    },
    startSearch() {
      axios.get(`${process.env.VUE_APP_SERVER}/api/account/theatres/movies?search=${this.search}`)
          .then((res) => {
            this.movies = res.data.movies;
          }).catch((err) => {
        console.log(err)
      })
    },
    NewMovie(movie) {
      this.editableScreen.movie = movie;
    },
    previewLayout() {
      this.isPreview = !this.isPreview;
    },
    deleteScreen() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/screen/delete`, {
        city: this.theatre.city,
        TheatreName: this.theatre.name,
        ScreenName: this.Screen.name,
      }).then(() => {
        this.$emit("updatedScreen");
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    search() {
      this.debouncedSearch();
    }
  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

#screen {
  width: 97.5%;
  border-radius: 1rem;
  padding: 0 1rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
  border: 0.1rem solid #CCC;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: height 1s ease;
  overflow-x: hidden;
}

#screen::-webkit-scrollbar {
  display: none;
}

#screen.edit {
  height: 48rem;
}

#afterEdit {
  height: 40rem;
}

#screen.preview {
  height: 90rem;
}

#afterEdit.preview {
  height: 80rem;
}

#beforeEdit {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#movies {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
}

#details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  height: 8rem;
}

input {
  border-radius: 3rem;
  width: 40%;
  height: 3rem;
  padding: 0 1rem;
  margin: 1rem 0.5rem;
  font-size: 1.1rem;
  font-family: 'Poppins', serif;
  box-shadow: -0.01rem 0.01rem 0.1rem 0.03rem rgba(0, 0, 0, 0.25);
  border: 0.01rem solid #CCC;
  align-self: flex-end;
}

input:focus {
  outline: none;
}

h3 {
  font-size: 1.5rem;
  width: 30%;
}

h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: normal;
}

button {
  width: 10rem;
  margin-top: 2.5rem;
  height: 3rem;
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem;
}

#preview {
  width: 13rem;
  margin-top: 0.2rem;
  margin-left: 0.7rem;
  padding: 0 1.2rem;
}

#delete {
  margin-left: 0;
  width: 18%;
}

</style>
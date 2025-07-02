<template>
  <div id = "screen" :class = "{edit : isEdit, preview : isPreview && isEdit}" class = "no-select">
    <div id = "beforeEdit">
      <div id = "details">
        <h3 class = "no-select">{{editableScreen.name.toUpperCase()}}</h3>
        <h4 class = "no-select">CURRENT MOVIE : {{(!editableScreen.movie) ? "" : editableScreen.movie.title }}</h4>
        <h4 class = "no-select">MOVIE STARTS AT : {{convertToDayDateTime(editableScreen.time)}}</h4>
        <h4 class = "no-select">PRICE OF EACH TICKET : {{getSymbol()}}{{editableScreen.price}}</h4>
      </div>
      <button @click = "editScreen" class = "no-select">{{ isEdit ? "BACK" : "EDIT SCREEN"}}</button>
    </div>
    <div v-if = "isEdit" id = "afterEdit" :class = "{preview : isPreview && isEdit}">
      <div class = "horizontalAlign">
        <input type = "text" placeholder = "Find Movies" v-model = "search">
        <ConfirmationModal :show = "isRemoveCurrentMovie" :message = "`Remove ${editableScreen?.movie?.title} from ${editableScreen.name}?`" @confirm = "RemoveMovie" @cancel = "() => {isRemoveCurrentMovie = false}"></ConfirmationModal>
        <button @click = "confirmRemoveMovie">REMOVE CURRENT MOVIE</button>
      </div>
      <div id = "movies">
         <EventCardScreen @MovieChanged = "NewMovie" :is-select = "true" v-for = "movie in movies" :key = "movie._id" :movie = "movie" @selectMovie = "MovieSelected"></EventCardScreen>
      </div>
      <button id = "preview" @click = "previewLayout" class = "no-select">{{ isPreview ? "BACK" : "PREVIEW LAYOUT"}}</button>
      <MovieLayout v-if = "isPreview" :layout = "screen.seats" :is-booking = false></MovieLayout>
      <ConfirmationModal :show = "isDeleteShow" :message = "DeleteMessage" @confirm = "deleteScreen" @cancel = "() => {isDeleteShow = false}"></ConfirmationModal>
      <button v-if = "isPreview" id = "delete" @click = "showConfirmationDelete" class = "no-select">DELETE SCREEN</button>
    </div>
    <div v-if = "isSelectedMovie" class = "overlay">
      <div class = "modal">
        <EventCardScreen @MovieChanged = "NewMovie" :is-select = "false" :movie = "selectedMovie"></EventCardScreen>
        <div id = "selectDetails">
          <h3>{{selectedMovie.title.toUpperCase()}}</h3>
          <div class = "fields">
            <label for = "MovieStartDate" class = "fieldLabel">DATE : </label>
            <input type = "date" v-model = "selectedDate" class = "no-select" id = "MovieStartDate" :min = "new Date().toISOString().split('T')[0]">
          </div>
          <div class = "fields">
            <label for = "MovieStartDate" class = "fieldLabel">TIME : </label>
            <input type = "time" v-model = "selectedTime" step = "60" class = "no-select" id = "MovieStartTime" :min = "new Date().toISOString().split('T')[1].split('.')[0].slice(0, 5)">
          </div>
          <div class = "fields">
            <label for = "MovieStartDate" class = "fieldLabel">PRICE ({{getSymbol()}})</label>
            <input type = "number" v-model = "seatPrice" min = 0 class = "no-select" id = "MovieTicketPrice" @input = "stopNegative">
          </div>
          <p>STARTS AT : {{formatDateTime(selectedDate, selectedTime)}}</p>
          <div class = "fields">
            <button @click = "NoScheduleMovie" class = "back">BACK</button>
            <button @click = "scheduleMovie">SCHEDULE MOVIE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCardScreen from "./MovieCardScreen.vue";
import axios from "axios";
import debounce from "lodash/debounce";
import MovieLayout from "@/components/events/Movies/MovieLayout.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";

export default {
  name: "MovieScreen",
  components: {
    ConfirmationModal,
    MovieLayout: MovieLayout,
    EventCardScreen: MovieCardScreen,
  },
  props: {
    screen: Object,
  },
  data() {
    return {
      isEdit: false,
      movies: [],
      search: "",
      editableScreen: {...this.screen},
      isPreview: false,
      isDeleteShow: false,
      isDeleteConfirm: false,
      DeleteMessage: "",
      isSelectedMovie: false,
      isRemoveCurrentMovie: false,
      selectedMovie: {},
      selectedDate: this.getLocalDateYYYYMMDD(),
      selectedTime:new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      seatPrice: 0,
    }
  },
  created() {
    this.startSearch();
    this.debouncedSearch = debounce(this.startSearch, 400);

    this.DeleteMessage = `Delete ${this.editableScreen.name.toUpperCase()}? This Action cannot be reversed.`;
  },
  methods: {
    getLocalDateYYYYMMDD() {
      const Today = new Date();
      return `${Today.getFullYear()}-${String(Today.getMonth() + 1).padStart(2, 0)}-${String(Today.getDate()).padStart(2, '0')}`;
    },
    editScreen() {
      this.isEdit = !this.isEdit
    },
    startSearch() {
      axios.get(`${process.env.VUE_APP_SERVER}/api/account/theatres/movies?search=${encodeURIComponent(this.search)}`)
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
    showConfirmationDelete() {
      this.isDeleteShow = true;
    },
    deleteScreen() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/screen/delete`, {
        city: this.screen.theatre.city.name,
        theatre: this.screen.theatre.name,
        screen: this.screen.name,
      }).then(() => {
        this.$emit("updatedScreen");
      }).catch((err) => {
        console.log(err)
      })
      this.isDeleteShow = false;
    },
    MovieSelected(movie) {
      this.isSelectedMovie = true
      this.selectedMovie = movie;
    },
    NoScheduleMovie() {
      this.isSelectedMovie = false;
      this.selectedMovie = {};
    },
    scheduleMovie() {
      this.isSelectedMovie = false;
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/movie`, {
        city: this.screen.theatre.city.name,
        theatre: this.screen.theatre.name,
        screen: this.screen.name,
        movieId: this.selectedMovie._id,
        moviePrice: parseFloat(this.seatPrice).toFixed(2),
        movieTime: new Date(`${this.selectedDate}T${this.selectedTime.padStart(5, "0")}:00`).toISOString(),
        method: 'set',
      }).then(() => {
        this.editableScreen.movie = this.selectedMovie;
        this.editableScreen.time = new Date(`${this.selectedDate}T${this.selectedTime.padStart(5, "0")}:00`).toISOString();
        this.editableScreen.price = this.seatPrice;
        this.selectedMovie = {};
      }).catch((err) => {
        console.log(err);
      })
    },
    stopNegative() {
      (this.seatPrice < 0) ? this.seatPrice = 0 : this.seatPrice;
    },
    getSymbol() {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const zoneToCurrency = {
        "Asia/Kolkata": "INR",
        "America/New_York": "USD",
        "America/Los_Angeles": "USD",
        "Europe/London": "GBP",
        "Europe/Paris": "EUR",
        "Asia/Tokyo": "JPY",
        "Asia/Dubai": "AED",
        "Australia/Sydney": "AUD",
        "Africa/Johannesburg": "ZAR",
        "America/Sao_Paulo": "BRL",
        "Asia/Shanghai": "CNY",
      };

      const currency = zoneToCurrency[timeZone] || "INR";
      return (0).toLocaleString(undefined, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).replace(/\d/g, '').trim();
    },
    formatDateTime(date, time) {
      return `${new Date(date).toLocaleDateString("en-GB", {weekday: "short", day: "2-digit", month: "short"})} | ${new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })}`;
    },
    convertToDayDateTime(ISOString) {
      const TimeStr = new Date(ISOString).toLocaleString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });

      if (TimeStr !== "Invalid Date") return TimeStr;
    },
    confirmRemoveMovie() {
      if (this.editableScreen.movie) this.isRemoveCurrentMovie = true;
    },
    RemoveMovie() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/movie`, {
        city: this.screen.theatre.city.name,
        theatre: this.screen.theatre.name,
        screen: this.screen.name,
        method: 'delete',
      }).then(() => {
        this.isRemoveCurrentMovie = false;
        this.editableScreen.movie = {};
        this.editableScreen.time = "";
        this.editableScreen.price = 0;
      }).catch((err) => {
        console.log(err);
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
  transition: height 0.5s ease;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#screen::-webkit-scrollbar {
  display: none;
}

#screen.edit {
  height: 47rem;
}

#afterEdit {
  min-height: 38rem;
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
  width: 90%;
  height: 9rem;
  margin-left: 0.8rem;
}

.horizontalAlign {
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
}

.horizontalAlign button {
  margin: 0;
  width: 25%;
}

input {
  border-radius: 3rem;
  width: 40%;
  height: 3rem;
  padding: 0 1rem;
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
  margin-top: 0.9rem;
  margin-bottom: 0.4rem;
}

h4 {
  margin: 0 0 0.7rem 0;
  font-size: 1rem;
  font-weight: normal;
}

button {
  width: 12rem;
  margin-top: 2.5rem;
  height: 3rem;
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem;
}

#preview {
  width: 13rem;
  margin: 0 0 0 0.7rem;
  padding: 0 1.2rem;
}

#delete {
  margin: 0;
  width: 18%;
}

.overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.modal {
  display: flex;
  flex-direction: row;
  background: white;
  width: 40%;
  padding: 1.2rem;
  gap: 1rem;
  border-radius: 0.8rem;
  border: 0.15rem solid #CCC;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
}

#selectDetails {
  width: 80%;
}

#selectDetails p {
  width: 100%;
  font-size: 1.3rem;
  text-align: center;
}

.fields {
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  width: 100%;
  justify-content: center;
}

.fieldLabel {
  font-size: 1.2rem;
  width: 20%;
}

.modal h3 {
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.modal input {
  width: 60%;
}

.fields button {
  margin: 0 auto;
  width: 45%;
}

.fields .back {
  width: 20%;
}

</style>
<template>
  <div id = "event">
    <div>
      <div id = "mini-header">
        <button @click = "backClicked" id = "back">BACK</button>
      </div>
    </div>
    <div id = "section">
      <img :src = "`${storageUrl}/${evt._id}.jpg`">
      <div id = "info">
        <div class = "mini-section">
          <h1 id = "title">{{evt.title.toUpperCase()}}</h1>
          <transition name = "fade">
          <button class = "fav" @click = "updateFavorites">{{ isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}}</button></transition>
        </div>
        <p>{{evt.overview}}</p>
        <br>
        <div>
          <p>GENRES: </p>
          <ul>
            <li v-for = "(genre, index) in evt.genres" :key = "index">{{genre}}</li>
          </ul>
        </div>
        <div class = "line-box">
          <p>RELEASE DATE : {{getDate(new Date(evt.release))}}</p>
          <p>ORIGINAL LANGUAGE : {{evt.language.toUpperCase()}}</p>
        </div>
        <div class = "line-box last">
          <p>RATING : {{evt.rating}} / 10</p>
          <button class = "no-select" @click = "book">BOOK NOW</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";
import axios from "axios";

export default {
  name: "EventInfo",
  props: {
    evt: Object,
  },
  data() {
    return {
      storageUrl: process.env.VUE_APP_STORAGE_URL,
      isFavorite: false,
      toFavorites: false,
    }
  },
  created() {
    eventBus.$on("toEvents", () => {
      this.toFavorites = false;
    });
    eventBus.$on("toAccount", () => {
      this.toFavorites = true;
    });
    this.checkFavorites()
  },
  activated() {
    this.checkFavorites()
  },
  methods: {
    backClicked() {
      if (!this.toFavorites) eventBus.$emit("backClicked");
      else this.$router.push("/account");
    },
    getDate(date) {
      return `${date.getDate().toString().padStart(2, '0')} - ${String(date.getMonth() + 1).padStart(2, '0')} - ${date.getFullYear()}`;
    },
    book() {
      eventBus.$emit("book", this.evt);
    },
    updateFavorites() {
      axios.put(`${process.env.VUE_APP_SERVER}/api/account/movies/favorites`, {
        userId: this.$store.state.auth.UID,
        movieId: this.evt._id,
      }).then(() => {
        this.isFavorite = !this.isFavorite;
      }).catch((err) => {
        console.log(err);
      })
    },
    checkFavorites() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/events/movies/users/favorites`, {
        userId: this.$store.state.auth.UID,
        movieId: this.evt._id,
      }).then((res) => {
        this.isFavorite = res.data
      }).catch((err) => {
        console.log(err);
      })
    }
  },
};
</script>

<style scoped src = "../../styles/button.css"></style>
<style scoped>

#event {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
}

#mini-header {
  display: flex;
  margin-top: 12vh;
  justify-content: space-between;
  width: 100%;
  height: auto
}

#back {
  margin: 1rem 0 1rem 1rem;
}

#section {
  display: flex;
  flex-direction: row;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  margin: 1rem;
  border-radius: 2rem;
  padding: 1.1rem;
}

.mini-section {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

#title {
  position: absolute;
  font-size: 1.8rem;
  width: 60%;
  left: 50%;
  transform: translateX(-50%);
}

.fav {
  font-size: 1.1rem;
  margin: 1rem 0;
  width: 20%;
}



button {
  height: 3rem;
  padding: 0 1.3rem;
  text-wrap: nowrap;
  margin: 1.3rem 0 0 0;
}

img {
  margin: 1rem 2rem 1rem 1rem;
  width: 25%;
  border-radius: 1.2rem;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

#info {
  width: 100%;
}

h1{
  text-align: center;
  opacity: 0.85;
}

p, li {
  font-size: 1.3rem;
  opacity: 0.85;
}


.line-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 98%;
}

.last {
  align-self: flex-end;
}

</style>
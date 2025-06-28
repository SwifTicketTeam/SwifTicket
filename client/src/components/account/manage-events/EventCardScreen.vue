<template>
  <div id = "card">
    <transition name = "fade">
      <img v-show = "showImage" :src = "`${storageUrl}/${currentID}.jpg`">
    </transition>
    <div>
      <div class = "box">
        <p id = "rating">{{(movie.rating) ? movie.rating : "NaN"}} / 10</p>
        <p>{{movie.language}}</p>
      </div>
    </div>
    <button @click = "SelectMovie">SELECT MOVIE</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieCardScreen",
  props: {
    movie: Object,
    Screen: Object,
    Theatre: Object,
  },
  data() {
    return {
      currentID: this.movie._id,
      showImage: true,
      storageUrl: process.env.VUE_APP_STORAGE_URL,
    }
  },
  methods: {
    SelectMovie() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/movie`, {
        city: this.Theatre.city,
        TheatreName: this.Theatre.name,
        ScreenName: this.Screen.name,
        movieID: this.movie._id
      }).then(() => {
        this.$emit("MovieChanged", this.movie);
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  watch: {
    movie(movie) {
      this.showImage = false;
      setTimeout(() => {
        this.currentID = movie._id;
        this.showImage = true;
      }, 400);
    }
  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

#card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 18%;
  height: auto;
  margin: 1.2rem 0;
  border-radius: 1.5rem;
  box-shadow: 0.01rem 0.01rem 0.2rem 0.05rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 1s ease,
  transform 0.5s ease;
}

#card:hover {
  transform: scale(102%);
  box-shadow: 0.01rem 0.01rem 0.6rem 0.05rem rgba(0, 0, 0, 0.25);
}

div {
  width: 100%;
}

.box {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 55%;
  justify-content: space-between;
}

img {
  width: 100%;
  height: 80%;
  border-radius: 1.5rem 1.5rem 0 0;
}

#rating {
  width: 15%;
  height: 80%;
  border-radius: 1rem;
  text-align: center;
}

p {
  padding: 0 0.8rem;
  font-size: 0.8rem;
  text-wrap: nowrap;
}

button {
  margin: 1rem auto;
  padding: 0.3rem 1rem;
  font-size: 1.1rem;
}

</style>
<template>
  <div id = "card" @click = "SelectMovie">
    <transition name = "fade">
      <img v-show = "showImage" :src = "`${storageUrl}/${currentID}.jpg`">
    </transition>
    <div>
      <div class = "box">
        <p id = "rating">{{(movie.rating) ? movie.rating : "NaN"}} / 10</p>
        <p>{{movie.language}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCardScreen",
  props: {
    movie: Object,
    isSelect: Boolean,
  },
  data() {
    return {
      currentID: this.movie._id,
      showImage: true,
      storageUrl: `${process.env.VUE_APP_STORAGE_URL}/swifticket/movies`,
      isSelectedMovie: false,
    }
  },
  methods: {
    SelectMovie() {
      this.isSelectedMovie = true;
      this.$emit("selectMovie", this.movie);
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
  width: 13.3rem;
  height: auto;
  margin: 1.2rem 0;
  border-radius: 1.5rem;
  box-shadow: 0.01rem 0.01rem 0.2rem 0.05rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 1s ease,
  transform 0.5s ease;
}

#card:hover {
  transform: scale(1.02) translateY(-2%);
  box-shadow: 0.01rem 0.01rem 0.6rem 0.05rem rgba(0, 0, 0, 0.25);
}

div {
  width: 100%;
}

.box {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

img {
  width: 100%;
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
  font-size: 0.85rem;
  text-wrap: nowrap;
}

</style>
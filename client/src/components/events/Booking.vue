<template>
  <div>
    <HomeHeader></HomeHeader>
    <div id = "eventHeader">
      <img :src = "`${storageUrl}/${evt._id}.jpg`">
      <div id = "eventInfo">
        <h1>{{evt.title.toUpperCase()}}</h1>
        <div>
          <h3>{{evt.language}}</h3>
          <h3>|</h3>
          <h3>{{evt.rating}} / 10</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from "@/components/home/HomeHeader.vue";
export default {
  name: "BookingTickets",
  components: {HomeHeader},
  data() {
    return {
      evt: {
        _id: "6859aa60ba86f37d59553012",
        title: "Thunderball",
        overview: "A criminal organization has obtained two nuclear bombs and are asking for a 100 million pound ransom in the form of diamonds in seven days or they will use the weapons. The secret service sends James Bond to the Bahamas to once again save the world.",
        genres: [ "Adventure", "Action", "Thriller" ],
        rating: 6.6,
        language: "English",
        release: "1965-12-11T00:00:00.000Z",
        poster: "../../swifticket-storage/images/movies/6859aa60ba86f37d59553012.jpg",
        __v: 0
      },
      storageUrl: process.env.VUE_APP_STORAGE_URL,
    }
  },
}
</script>

<style scoped src = "../../styles/headers.css"></style>

<style scoped>

#eventHeader{
  padding: 0.7rem;
  margin-top: 12vh;
  width: 100%;
  border-bottom: 0.1rem solid #000;
}

#eventInfo {
  display: flex;
  flex-direction: column;
}

img {
  width: min(8%, 8vw);
  height: auto;
  margin: 0 1rem 0 4rem;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
}

h1, h3 {
  padding: 0 0.35rem;
  font-weight: normal;
  margin: 0;
  color: rgba(0, 0, 0, 0.75);
}

h1 {
  font-size: 2rem;
}

h3 {
  font-size: 1.1rem;
}

</style>
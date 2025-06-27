<template>
  <div>
    <HomeHeader></HomeHeader>
    <div id = "eventHeader" v-if = "!isLoading">
      <img :src = "`${storageUrl}/${evt._id}.jpg`">
      <div id = "eventInfo">
        <h1>{{evt.title.toUpperCase()}}</h1>
        <div>
          <h3>{{evt.language}}</h3>
          <h3>|</h3>
          <h3>{{evt.rating}} / 10</h3>
        </div>
        <div>
          <span class = "date" v-for = "(date, index) in dates" :key = index v-html = "date"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from "@/components/home/HomeHeader.vue";
import {eventBus} from "@/main";
export default {
  name: "ShowTime",
  components: {HomeHeader},
  data() {
    return {
      evt: {},
      storageUrl: process.env.VUE_APP_STORAGE_URL,
      dates: [this.getDate(0), this.getDate(1), this.getDate(2), this.getDate(3), this.getDate(4)],
      isLoading: true,
    }
  },
  created() {
    eventBus.$on("bookMovie", (event) => {
      this.evt = event;
      this.isLoading = false;
    });
  },
  methods: {
    getDate(increment) {
      const now = new Date(Date.now() + increment * 24 * 60 * 60 * 1000);
      const day = now.getDate()
      const month = now.toLocaleString('default', { month: 'long' })
      return `${day}<br>${month.toUpperCase()}`
    }
  },
  activated() {
    this.isLoading = true;
  }
}
</script>

<style scoped src = "../../styles/headers.css"></style>

<style scoped>

#eventHeader{
  padding: 0.7rem 0.7rem 0 0.7rem;
  margin-top: 12vh;
  width: 100%;
  height: 20vh;
}

#eventInfo {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
}

img {
  width: min(8%, 8vw);
  height: auto;
  margin-left: 4rem;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
}

.date {
  text-align: center;
  margin: 1rem 1rem 0 1rem;
  padding: 0.7rem;
  background-color: rgba(240, 128, 128, 0.75);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease,
              border-radius 0.3s ease;
}

.date:hover {
  background-color: #FFC94D;
  border-radius: 0.8rem;
}

h1, h3 {
  padding: 0 0.35rem;
  font-weight: normal;
  margin: 0;
  color: rgba(0, 0, 0, 0.75);
}

h1 {
  font-size: 1.8rem;
  text-wrap: wrap;
  width: 25vw;
  text-align: center;
}

h3 {
  font-size: 1.1rem;
}

</style>
<template>
  <div id = "showtime">
    <HomeHeader></HomeHeader>
    <div id = "booking" v-if = "!isLoading">
      <div id = "left">
        <div id = "eventHeader">
          <img :src = "`${storageUrl}/${evt._id}.jpg`">
          <div id = "eventInfo">
            <h1>{{evt.title.toUpperCase()}}</h1>
            <div>
              <h3>{{evt.language}}</h3>
              <h3>|</h3>
              <h3>{{evt.rating}} / 10</h3>
            </div>
            <div>
              <div class = "date" :class = "{selected : (selectedDate === index)}" v-for = "(date, index) in dates" :key = index v-html = "date" @click = "selectDate(index)"></div>
            </div>
          </div>
        </div>
        <div id = "screens">
          <div class = "screen" v-for = "(screen, index) in filteredScreens" :key = index>
            <h2>{{screen.theatre}}</h2>
            <h3>{{screen.city}}</h3>
            <div id = "shows">
              <div class = "show" v-for = "(show, index) in screen.screens" :key = index @click = "selectShow(screen, show)">
                <span>{{formatTime(show.time)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id = "right">
        <div id = "SeatsHeader">
          <h1>{{selectedScreen.theatre}}</h1>
          <h1>{{selectedShow.name}} | {{formatDate(selectedShow.time)}}</h1>
        </div>
        <div class = "ViewLayout">
          <MovieLayout :layout = "layout" v-if = "isChangeLayout" :is-booking = true></MovieLayout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from "@/components/home/HomeHeader.vue";
import {eventBus} from "@/main";
import axios from "axios";
import MovieLayout from "@/components/events/Movies/MovieLayout.vue";

export default {
  name: "ShowTime",
  components: {
    HomeHeader,
    MovieLayout,
  },
  data() {
    return {
      evt: {},
      storageUrl: process.env.VUE_APP_STORAGE_URL,
      dates: [this.getDate(0), this.getDate(1), this.getDate(2), this.getDate(3), this.getDate(4), this.getDate(5), this.getDate(6)],
      selectedDate: 0,
      isLoading: true,
      screens: [],
      selectedScreen: {},
      selectedShow: {},
      layout: [],
      isChangeLayout: false,
    }
  },
  created() {
    eventBus.$on("bookMovie", (event) => {
      this.evt = event;
      this.getScreens();
    });
    setTimeout(() => {
      if (!this.evt._id) this.$router.push("/events");
    },1000)
  },
  computed: {
    filteredScreens() {
      const selected = this.dates[this.selectedDate];
      return this.screens.filter(screen => {
        return screen.screens.some(show => {
          const date1 = new Date(show.time);
          const day = date1.getDate();
          const month = date1.toLocaleString("en-US", { month: "short" }).toUpperCase();
          return `${day}<br>${month}` === selected;
        });
      });
    }
  },
  methods: {
    getScreens() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/events/movies/screens`, {
        movieID: this.evt._id,
      }).then((res) => {
        this.screens = res.data.screens;
        this.isLoading = false;
      }).catch(() => {
        this.$router.push('/events')
      });
    },
    getDate(increment) {
      const now = new Date(Date.now() + increment * 24 * 60 * 60 * 1000);
      const day = now.getDate()
      const month = now.toLocaleString('default', { month: 'short' }).toUpperCase()
      return `${day}<br>${month}`
    },
    selectDate(date) {
      this.selectedDate = date
    },
    formatDate(date) {
      const FormatDate =  new Date(date).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      if (FormatDate !== "Invalid Date") return FormatDate;
      else return ""
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },
    selectShow(screen, show) {
      this.selectedScreen = screen;
      this.selectedShow = show;
      this.isChangeLayout = false;
      this.layout = show.layout;
      setTimeout(() => {
        this.isChangeLayout = true;
      }, 125);
    }
  },
}
</script>

<style scoped src = "../../../styles/headers.css"></style>

<style scoped>

#booking {
  margin-top: 12vh;
  width: 100%;
  max-width: 100%;
  height: 87vh;
}

#left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  height: 100%;
}

#right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  height: 100%;
}

#SeatsHeader {
  width: 90%;
  height: 12.5%;
  margin-top: 1rem;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.2rem 0.03rem rgba(0, 0, 0, 0.15);
  border: 0.01rem solid #CCC;
}

#SeatsHeader h1 {
  margin: 0 auto;
  width: auto;
  min-width: 30%;
  font-size: 1.2rem;
}

.ViewLayout {
  display: block;
  margin: 0 auto;
  width: 90%;
  height: 70%;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.2rem 0.03rem rgba(0, 0, 0, 0.15);
  border: 0.01rem solid #CCC;
  overflow: auto;
}

.ViewLayout::-webkit-scrollbar {
  display: none;
}

#layout-root {
  margin: 0 auto;
  padding: 1rem;
  width: 90%;
  min-height: 100%;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

#eventHeader{
  display: flex;
  justify-content: space-around;
  padding: 0.7rem;
  width: 91%;
  min-height: 25%;
  margin: 1rem;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.1rem 0.03rem rgba(0, 0, 0, 0.25);
  border: 0.01rem solid #CCC;
}

#eventInfo {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 80%;
}

#shows {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  margin: 1rem;
}

.show {
  display: flex;
  justify-content: center;
  width: 18%;
  height: 50%;
  padding: 0.7rem;
  font-size: 1.3rem;
  border-radius: 1.5rem;
  box-shadow: -0.01rem 0.01rem 0.1rem 0.05rem rgba(0, 0, 0, 0.15);
  border: 0.01rem solid #CCC;
  cursor: pointer;
  transition: box-shadow 0.5s ease,
              transform 0.5s ease;
}

.show:hover {
  transform: scale(1.05);
  box-shadow: -0.01rem 0.01rem 0.1rem 0.08rem rgba(0, 0, 0, 0.2);
}

#screens {
  display: flex;
  flex-direction: column;
  width: 94%;
  min-height: 67%;
  gap: 1rem;
  overflow: hidden auto;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.1rem 0.03rem rgba(0, 0, 0, 0.25);
  border: 0.01rem solid #EEE;
}

#screens::-webkit-scrollbar {
  display: none;
}

.screen {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 97%;
  min-height: 10rem;
  padding: 0.7rem;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.1rem 0.03rem rgba(0, 0, 0, 0.25);
  border: 0.01rem solid #CCC;
  overflow: hidden;
}

.screen h2 {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 0 0.5rem 1rem;
}

.screen h3 {
  font-size: 1.2rem;
  margin: 0 0 0 0.6rem;
}

img {
  width: min(19.5%, 7.5vw);
  height: auto;
  border: 0.1rem solid #333;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
}

.date {
  text-align: center;
  margin: 1rem 1rem 0 1rem;
  padding: 0.7rem;
  border: 0.02rem solid #CCC;
  background-color: rgba(240, 128, 128, 0.75);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease,
              border-radius 0.3s ease;
}

.date:hover {
  background-color: rgba(255, 201, 77, 0.7);
}

.selected, .selected:hover {
  background-color: #FFC94D;
}

h1, h3 {
  padding: 0 0.35rem;
  font-weight: normal;
  margin: 0;
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
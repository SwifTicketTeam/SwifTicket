<template>
  <div id = "showtime">
    <HomeHeader></HomeHeader>
    <div id = "booking" v-if = "!isLoading">
      <div id = "left">
        <div class = "back">
          <button id = "BackButton" @click = "() => {this.$router.push('/events')}">BACK</button>
        </div>
        <div id = "eventHeader">
          <div id = "eventInfo">
            <h1>{{evt.title.toUpperCase()}}</h1>
            <div>
              <h3>{{evt.language}}</h3>
              <h3>|</h3>
              <h3>{{evt.rating}} / 10</h3>
            </div>
            <div>
              <div class = "date" :class = "{selected : (selectedDate === index)}" v-for = "(date, index) in dates" :key = index @click = "selectDate(index)">{{date.day}}<br>{{date.month}}</div>
            </div>
          </div>
        </div>
        <div id = "screens">
          <div class = "screen" v-for = "(screen, index) in filteredScreens" :key = index>
            <h2>{{screen.theatre}}</h2>
            <h3>{{screen.city}}</h3>
            <div id = "shows">
              <div class = "show" :class = "{showSelected : (show === selectedShow)}" v-for = "(show, index) in screen.screens" :key = index @click = "selectShow(screen, show)">
                <span>{{formatTime(show.time)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id = "right">
        <div class = "SeatsHeader">
          <h1>{{selectedScreen.theatre}}</h1>
          <h1 v-if = "selectedShow && selectedShow.time">{{selectedShow.name}} | {{formatDate(selectedShow.time)}}</h1>
        </div>
        <div class = "ViewLayout">
          <MovieLayout :layout = "layout" v-if = "isChangeLayout" :is-booking = true @select = "selectSeat"></MovieLayout>
        </div>
        <div class = "SeatsFooter">
          <h1>SELECTED: {{[...selectedSeats].sort().join(', ') || "NONE"}}</h1>
          <button id = "pay" @click = "toSummary">PAY {{getSymbol()}}{{bookAmount.toFixed(2)}}</button>
        </div>
      </div>
      <div class = "overlay" v-if = "isSummary">
        <div class = "modal">
          <h1>{{evt.title.toUpperCase()}}</h1>
          <div>
            <h3>{{evt.language}}</h3>
            <h3>|</h3>
            <h3>{{evt.rating}} / 10</h3>
          </div>
          <div class = "summary">
            <div class = "SummaryFields">
              <h4 class = "SummaryField">SELECTED : </h4><h4 class = "SummaryDetails">{{[...selectedSeats].sort().join(', ')}}</h4>
            </div><br>
            <div class = "SummaryFields">
             <h4 class = "SummaryField">NUMBER OF TICKETS : </h4><h4 class = "SummaryDetails">{{selectedSeats.length}}</h4>
            </div>
            <div class = "SummaryFields">
              <h4 class = "SummaryField">PRICE OF ONE TICKET : </h4><h4 class = "SummaryDetails"> {{getSymbol()}}{{selectedShow.price.toFixed(2) || 0}}</h4>
            </div><br><br>
            <div class = "SummaryFields">
              <h4 class = "SummaryField">TICKET(S) PRICE : </h4><h4  class = "SummaryDetails">{{getSymbol()}}{{+bookAmount.toFixed(2)}}</h4>
            </div>
            <div class = "SummaryFields">
              <h4 class = "SummaryField">CONVENIENCE FEES : </h4><h4  class = "SummaryDetails">{{getSymbol()}}{{(bookAmount * ConvenienceFeesPercentage).toFixed(2)}}</h4>
            </div><br>
            <div class = "SummaryFields">
              <h4 class = "SummaryField">AMOUNT : </h4><h4  class = "SummaryDetails">{{getSymbol()}}{{(bookAmount * (1 + ConvenienceFeesPercentage)).toFixed(2)}}</h4>
            </div><br>
            <div class = "SummaryFields">
              <button class = "back" @click = "() => {isSummary = false}">BACK</button>
              <button class = "SummaryField" @click = "initPayments">PAY {{getSymbol()}}{{(bookAmount * (1 + ConvenienceFeesPercentage)).toFixed(2)}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";
import HomeHeader from "@/components/home/HomeHeader.vue";
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
      evt: this.$store.getters["event/getEvent"],
      storageUrl: process.env.VUE_APP_STORAGE_URL + 'movies',
      selectedDate: 0,
      isLoading: true,
      dates: [],
      screens: [],
      selectedScreen: {},
      selectedShow: {},
      layout: [],
      isChangeLayout: false,
      selectedSeats: [],
      selectedBackendSeats: [],
      bookAmount: 0,
      isSummary: false,
      ConvenienceFeesPercentage: parseFloat(process.env.VUE_APP_CONVENIENCE_FEE_PERCENTAGE),
    }
  },
  created() {
    this.dates = [this.getDate(0), this.getDate(1), this.getDate(2), this.getDate(3), this.getDate(4), this.getDate(5), this.getDate(6)];
    if (!this.evt._id) this.$router.push("/events");
    else axios.post(`${process.env.VUE_APP_SERVER}/api/events/movies/screens`, {
      movieId: this.evt._id,
    }).then((res) => {
      this.screens = res.data.screens;
      this.isLoading = false;
    }).catch(() => {
      this.$router.push('/events')
    });
  },
  computed: {
    filteredScreens() {
      const selected = this.dates[this.selectedDate].compare;
      return this.screens.filter(screen => {
        return screen.screens.some(show => {
          const date1 = new Date(show.time);
          const day = date1.getDate();
          const month = date1.toLocaleString("en-US", { month: "short" }).toUpperCase();
          return `${day}-${month}` === selected;
        });
      });
    }
  },
  methods: {
    getDate(increment) {
      const now = new Date(Date.now() + increment * 24 * 60 * 60 * 1000);
      const day = now.getDate()
      const month = now.toLocaleString('default', { month: 'short' }).toUpperCase()
      return { day, month, compare: `${day}-${month}` };
    },
    selectDate(date) {
      this.selectedDate = date;
      this.selectedScreen = {};
      this.selectedShow = {};
      this.selectedSeats = [];
      this.bookAmount = 0;
      this.isChangeLayout = false;
      this.layout = [];
      nextTick(() => {
        this.isChangeLayout = true;
      });
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
      this.selectedSeats = [];
      this.bookAmount = 0;
      this.isChangeLayout = false;
      this.layout = show.seats;
      nextTick(() => {
        this.isChangeLayout = true;
      });
    },
    selectSeat(seat, backendSeat) {
      if (this.selectedSeats.includes(seat)) {
        this.selectedSeats = this.selectedSeats.filter((Seat) => Seat !== seat);
        this.selectedBackendSeats = this.selectedBackendSeats.filter((Seat) => Seat !== backendSeat);
      }
      else {
        this.selectedSeats.push(seat);
        this.selectedBackendSeats.push(backendSeat);
      }
      this.bookAmount = this.selectedShow.price * this.selectedSeats.length;
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
    toSummary() {
      if (Object.keys(this.selectedShow).length && this.bookAmount) this.isSummary = true
    },
    initPayments() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/payments/init/movies`, {
        email: this.$store.state.auth.email,
        metadata: {
          user: this.$store.state.auth.UID,
          ticket_id: `${this.$store.state.auth.UID}-${Math.floor(Math.random() * 10000)}-${Date.now()}`,
          movie: this.evt.title,
          movie_id: this.evt._id,
          seats: [...this.selectedSeats].sort().join(', '),
          backend_seats: [...this.selectedBackendSeats].sort().join(', '),
          theatre: `${this.selectedScreen.theatre}`,
          city : `${this.selectedScreen.city}`,
          screen: this.selectedShow.name,
          time: this.selectedShow.time,
          amount: (this.bookAmount * (1 + this.ConvenienceFeesPercentage)).toFixed(2),
        }
      }).then((res) => {
        if (res.data.url) window.location.href = res.data.url;
      }).catch((err) => {
        alert(err.response.data.message);
      })
    }
  },
}
</script>

<style scoped src = "../../../styles/headers.css"></style>
<style scoped src = "../../../styles/button.css"></style>
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

.SeatsHeader {
  width: 90%;
  height: 12.5%;
  margin-top: 0.5rem;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.2rem 0.03rem rgba(0, 0, 0, 0.15);
}

.SeatsHeader h1 {
  margin: 0 auto;
  width: auto;
  min-width: 30%;
  font-size: 1.2rem;
}

.SeatsFooter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  height: 12.5%;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.2rem 0.03rem rgba(0, 0, 0, 0.15);
}

.SeatsFooter h1 {
  margin: 0 auto;
  width: auto;
  font-size: 1.1rem;
}

#pay {
  padding: 0.4rem 1rem;
  width: 30%;
  height: auto;
}

.ViewLayout {
  position: sticky;
  display: block;
  margin: 0 auto;
  width: 90%;
  height: 70%;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.2rem 0.03rem rgba(0, 0, 0, 0.15);
  overflow: auto;
}

.ViewLayout::-webkit-scrollbar {
  display: none;
}

.back {
  width: 91%;
  margin-top: 1rem;
 }

#BackButton {
  width: 12%;
  height: 100%;
  padding: 0.2rem 0;
  margin: 0;
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
  align-items: center;
  justify-content: space-around;
  padding-top: 0.7rem;
  width: 91%;
  min-height: 22%;
  margin: 0.2rem;
  border-radius: 0.8rem;
  box-shadow: -0.01rem 0.01rem 0.1rem 0.03rem rgba(0, 0, 0, 0.25);
}

#eventInfo {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: auto;
}

#shows {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  margin: 1.5rem 0 0 1rem;
}

.show {
  display: flex;
  justify-content: center;
  width: 18%;
  height: 2rem;
  padding: 0.7rem;
  font-size: 1.3rem;
  border-radius: 1.5rem;
  box-shadow: -0.01rem 0.01rem 0.1rem 0.05rem rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: box-shadow 0.5s ease,
              transform 0.5s ease;
}

.show:hover {
  transform: scale(1.05);
  box-shadow: -0.01rem 0.01rem 0.1rem 0.08rem rgba(0, 0, 0, 0.2);
}

.showSelected {
  transform: scale(1.02);
  background-color: rgb(233, 106, 106);
  color: white;
}

#screens {
  display: flex;
  flex-direction: column;
  width: 94%;
  min-height: 65%;
  padding-top: 0.2rem;
  gap: 1rem;
  overflow: hidden auto;
  border-radius: 0.8rem;
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
  box-shadow: -0.01rem 0.01rem 0.2rem 0.05rem rgba(0, 0, 0, 0.15);
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
  margin: 1rem 0.3rem 0 0.3rem;
  border-radius: 0.3rem;
  padding: 0.6rem 1.1rem;
  cursor: pointer;
  transition: background-color 0.5s ease,
              border-radius 0.5s ease,
              box-shadow 0.5s ease,
              transform 0.5s ease;
}

.date:hover {
  background-color: rgba(255, 201, 77, 0.7);
}

.selected, .selected:hover {
  transform: scale(1.05);
  background-color: rgb(233, 106, 106);
  box-shadow: 0.01rem 0.01rem 0.35rem 0.1rem rgba(0, 0, 0, 0.1);
  color: white;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
}

.modal {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: auto;
  background: white;
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 0.15rem solid #BBB;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
}

.modal .summary {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 95%;
  height: 80%;
}

.modal h1 {
  text-wrap: wrap;
  font-size: 1.8rem;
  padding: 0 2rem;
  width: 100%;
  margin-bottom: 1rem;
}

.modal h4 {
  width: 100%;
  margin: 0.5rem 0;
}

.SummaryFields {
  width: 100%;
}

.SummaryField {
  text-wrap: nowrap;
  width: 70%;
  font-size: 1.1rem;
}

.SummaryDetails {
  width: 30%;
  text-align: right;
  font-size: 1.1rem;
}

.modal button {
  font-size: 1.2rem;
  width: 45%;
  height: auto;
  padding: 0.5rem 0.2rem;
  margin: 0.3rem auto;
}

</style>
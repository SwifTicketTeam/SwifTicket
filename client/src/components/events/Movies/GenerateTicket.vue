<template>
  <div class = "inner-border" :class = "{loading: isLoading}" v-if = "!isLoading">
    <div class = "up">
      <img :src = "`${storageUrl}/${ticket.movie._id}.jpg`" class = "poster">
      <div class = "mini-block">
        <h2>{{ticket.movie.title.toUpperCase()}}</h2>
        <h3>{{formatDate(ticket.time)}}</h3>
        <h3>{{ticket.theatre}}</h3>
        <h3>Screen: {{ticket.show}}</h3>
        <h3>Seats: {{ticket.seats.join(', ')}}</h3>
      </div>
    </div>
    <hr>
    <div class = "down">
      <img :src = "qrUrl" alt = "Ticket QR" class = "QR">
      <h3>BOOKING ID : {{ticket.ticketId.split('-').slice(1).join('-')}}</h3>
    </div>
    <hr>
    <div class = "end">
      <h3>TOTAL AMOUNT : {{getSymbol()}}{{parseFloat(ticket.amount).toFixed(2)}}</h3>
      <h3>TICKET(S) PRICE : {{getSymbol()}}{{(ticket.amount / (1 + ConvenienceFeesPercentage)).toFixed(2)}}</h3>
      <h3>CONVENIENCE FEES : {{getSymbol()}}{{(ticket.amount * ConvenienceFeesPercentage / (1 + ConvenienceFeesPercentage)).toFixed(2)}}</h3>
    </div>
    <button @click = "saveTicket" class = "no-select" v-if = "!isSave">SAVE TICKET AS PDF</button>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import {nextTick} from "vue";

export default {
  name: "GenerateTicket",
  props: {
    ticket: {
      type: Object,
    }
  },
  data() {
    return {
      isLoading: true,
      isSave: false,
      storageUrl: process.env.VUE_APP_STORAGE_URL + 'movies',
      qrUrl: '',
      ConvenienceFeesPercentage: parseFloat(process.env.VUE_APP_CONVENIENCE_FEE_PERCENTAGE),
    }
  },
  created() {
    this.createQRCode();
  },
  methods: {
    formatDate(time) {
      const date = new Date(time);
      const WeekDay = date.toLocaleDateString('en-GB', { weekday: 'short' });
      const Day = date.getDate();
      const Month = date.toLocaleDateString('en-GB', { month: 'long' });
      const Time = date.toLocaleTimeString('en-GB', {
        hour12: true ,
        hour: "numeric",
        minute: "numeric",
      });

      return `${WeekDay}, ${Day} ${Month} | ${Time.toUpperCase()} `;
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
    createQRCode() {
      QRCode.toDataURL(`${process.env.VUE_APP_CLIENT}/tickets/movies/${this.ticket.ticketId}`).then((url) => {
        this.qrUrl = url;
        this.isLoading = false;
      }).catch(err => {
        console.log("QR Generation Failed: ", err);
      })
    },
    saveTicket() {
      this.isSave = true;
      this.$emit('save');
      nextTick(() => {
        this.isSave = false;
      })
    },
  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

.loading {
  opacity: 0;
}

.inner-border {
  border: 0.1rem solid rgb(233, 106, 106);
  border-radius: 1rem;
  padding: 0.5rem;
  z-index: 1;
  background-color: white;
}

.up, .end {
  display: flex;
  width: 100%;
  margin: 0;
  background-color: #EFEFEF;
  border-radius: 0.5rem;
}

.up {
  flex-direction: row;
}

.end {
  flex-direction: column;
}

.mini-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.poster {
  width: 32%;
  border-radius: 0.5rem;
  margin: 1rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0.3rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

h2 {
  font-size: 1.4rem;
  text-wrap: wrap;
}

h3 {
  margin: 0.2rem 0;
  font-weight: normal;
  text-wrap: wrap;
}

.down {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0 0.5rem 0;
  align-items: center;
}

.down h3 {
  margin-top: 2rem;
  font-size: 1.2rem;
}

hr {
  border-color: rgb(233, 106, 106);
}

.QR {
  width: 40%;
  transform-origin: left;
  border: 0.15rem solid;
}

.end h3 {
  margin: 0.25rem 1rem;
}

button {
  width: 100%;
  font-size: 1.5rem;
  margin: 1rem 0 0 0;
  height: 3rem;
}

</style>
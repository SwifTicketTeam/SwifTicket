<template>
  <div class = "root_component">
    <HomeHeader></HomeHeader>
    <div class = "ticket" :class = "{loading: isLoading}">
      <div class = "inner-border">
        <div class = "up">
          <img :src = "`${storageUrl}/${ticket.movie_id}.jpg`" class = "poster">
          <div class = "mini-block">
            <h2>{{ticket.movie.toUpperCase()}}</h2>
            <h3>{{formatDate(ticket.time)}}</h3>
            <h3>{{ticket.theatre}}</h3>
            <h3>Screen: {{ticket.show}}</h3>
            <h3>Seats: {{ticket.seats}}</h3>
          </div>
        </div>
        <hr>
        <div class = "down">
          <img :src = "qrUrl" alt = "Ticket QR" class = "QR">
          <h3>BOOKING ID : {{ticketId.split('-').slice(1).join('-')}}</h3>
        </div>
        <hr>
        <div class = "end">
          <h3>TOTAL AMOUNT : {{getSymbol()}}{{parseFloat(ticket.amount).toFixed(2)}}</h3>
          <h3>TICKET(S) PRICE : {{getSymbol()}}{{(ticket.amount * (1 - ConvenienceFeesPercentage)).toFixed(2)}}</h3>
          <h3>CONVENIENCE FEES : {{getSymbol()}}{{(ticket.amount * ConvenienceFeesPercentage).toFixed(2)}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QRCode from "qrcode";
import HomeHeader from "@/components/home/HomeHeader.vue";

export default {
  name: "PaymentSuccess",
  components: {HomeHeader},
  data() {
    return {
      ticket: {},
      isLoading: true,
      storageUrl: process.env.VUE_APP_STORAGE_URL,
      qrUrl: '',
      ticketId: "",
      ConvenienceFeesPercentage: process.env.VUE_APP_CONVENIENCE_FEE_PERCENTAGE,
    }
  },
  created() {
    axios.post(`${process.env.VUE_APP_SERVER}/api/payments/success?session_id=${this.$route.query.session_id}`)
        .then(res => {
          this.ticket = res.data.metadata;
          this.createQRCode();
        }).catch(err => {
          alert(err.response.data.message);
        })
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
      this.ticketId = `${this.ticket.user}-${Math.floor(Math.random() * 10000)}-${Date.now()}`;
      QRCode.toDataURL(`${process.env.VUE_APP_CLIENT}/ticket/movie/${this.ticketId}`).then((url) => {
        this.qrUrl = url;
      }).catch(err => {
        console.log("QR Generation Failed: ", err);
      })
    }
  }
}
</script>

<style scoped>

.root_component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading {
  opacity: 0;
}

.ticket {
  width: 33%;
  height: auto;
  border-radius: 1rem;
  padding: 0.3rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
  opacity: 1;
  transition: opacity 1s ease;
  background-color: rgb(233, 106, 106);
  transform: scale(1.05) translateY(3%);
}

.inner-border {
  border: 0.1rem solid rgb(233, 106, 106);
  border-radius: 1rem;
  padding: 0.5rem;
  z-index: 1;
  background-color: white;
}

.ticket .up, .ticket .end {
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

.ticket .poster {
  width: 32%;
  border-radius: 0.5rem;
  margin: 1rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0.3rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.ticket h2 {
  font-size: 1.4rem;
  text-wrap: wrap;
}

.ticket h3 {
  margin: 0.2rem 0;
  font-weight: normal;
  text-wrap: wrap;
}

.ticket .down {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0 0.5rem 0;
  align-items: center;
}

.ticket .down h3 {
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

.ticket .end h3 {
  margin: 0.25rem 1rem;
}

</style>
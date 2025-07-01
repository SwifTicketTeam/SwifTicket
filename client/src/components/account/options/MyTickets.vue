<template>
  <div>
    <h2>MY TICKETS</h2>
    <div class = "tickets">
      <div class="ticket" v-for = "ticket in tickets" :key = "ticket._id">
        <div class = "inner-ticket">
          <img :src = "`${storageUrl}/${ticket.movie._id}.jpg`" class = "poster">
          <h3>{{ticket.movie.title}}</h3>
          <h3>{{formatDate(ticket.time)}}</h3>
          <p @click = "expand(ticket)">EXPAND TICKET</p>
        </div>
      </div>
    </div>
    <div class = "overlay" v-if = "isModal" ref = "ticket" >
      <div class = "fill">
        <div class = "modal">
          <GenerateTicket :ticket = "selectedTicket" @save = save></GenerateTicket>
        </div>
        <button @click = "back">BACK</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GenerateTicket from "@/components/events/Movies/GenerateTicket.vue";
import html2pdf from "html2pdf.js";

export default {
  name: "MyTickets",
  components: {GenerateTicket},
  data() {
    return {
      tickets: [],
      selectedTicket: {},
      storageUrl: process.env.VUE_APP_STORAGE_URL,
      isModal: false,
    }
  },
  created() {
    axios.post(`${process.env.VUE_APP_SERVER}/api/account/tickets/movies/*`, {
      userId: this.$store.state.auth.UID
    }).then((res) => {
      this.tickets = res.data.tickets;
    }).catch((err) => {
      console.log(err);
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
    expand(ticket) {
      this.isModal = true;
      this.selectedTicket = ticket;
    },
    back() {
      this.isModal = false;
      this.selectedTicket = {};
    },
    save(){
      const ticket = this.$refs.ticket;
      ticket.classList.add("pdf-mode");

      html2pdf().set({
        margin: 0.5,
        filename: `swifticket-${this.selectedTicket.ticketId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      }).from(ticket).save().finally(() => {
        ticket.classList.remove("pdf-mode");
      });
    }
  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

.tickets {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
  padding: 1.2rem;
}

.ticket {
  border-radius: 0.5rem;
  width: 18%;
  padding: 0.25rem;
  background-color: rgb(233, 106, 106);
  box-shadow: -0.05rem 0.05rem 0.8rem 0.3rem rgba(0, 0, 0, 0.1);
}

.inner-ticket {
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  gap: 0;
}

img {
  width: 85%;
  border-radius: 0.5rem;
  margin: 0.5rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0.3rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

h2 {
  font-size: 1.6rem;
  margin: 1rem 0.1rem 1rem 1.2rem;
}

h3 {
  width: 85%;
  text-align: center;
  margin: 0;
  font-size: 1rem;
}

p {
  margin: 0.2rem 0 0 0;
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
}
.overlay {
  height: 100vh;
}

.overlay, .fill {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 3;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.overlay button {
  width: 33%;
  font-size: 1.5rem;
  padding: 0.5rem;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
}

.pdf-mode .modal {
  width: 595px !important;
}

.pdf-mode .poster {
  width: 250px !important;
  height: auto !important;
  object-fit: contain !important;
}

.pdf-mode .QR {
  width: 200px !important;
  height: 200px !important;
  object-fit: contain !important;
}


</style>
<template>
  <div>
    <h2>MY TICKETS</h2>
    <div class = "tickets">
      <div class="ticket" v-for = "ticket in tickets" :key = "ticket._id" :class = "{cancelled: ticket.status === 'cancelled'}">
        <div class = "inner-ticket">
          <img :src = "`${storageUrl}/${ticket.movie._id}.jpg`" class = "poster">
          <h3>{{ticket.movie.title}}</h3>
          <h3>{{formatDate(ticket.time)}}</h3>
          <p :class = "{notUpcoming : ticket.status !== 'upcoming'}">{{ ticket.status !== "upcoming" ? ticket?.status?.toUpperCase() : `SEATS :  ${ticket.seats.join(', ')}` }} </p>
          <p @click = "expand(ticket)" class = "expand">EXPAND TICKET</p>
        </div>
      </div>
    </div>
    <div class = "overlay" v-if = "isModal">
      <div class = "fill" ref = "ticket">
        <div class = "modal">
          <GenerateTicket :ticket = "selectedTicket" @save = save></GenerateTicket>
        </div>
      </div>
      <button @click = "back">BACK</button>
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
      storageUrl: `${process.env.VUE_APP_STORAGE_URL}/swifticket/movies`,
      isModal: false,
    }
  },
  created() {
    axios.post(`${process.env.VUE_APP_SERVER}/api/account/tickets/movies/*`, {
      userId: this.$store.state.auth.UID
    }).then((res) => {
      const tickets = res.data.tickets;
      const upcoming = tickets.filter(ticket => ticket.time > new Date().toISOString()).sort((ticket1, ticket2) => ticket1.time.localeCompare(ticket2.time));
      const completed = tickets.filter(ticket => ticket.time <= new Date().toISOString()).sort((ticket1, ticket2) => ticket2.time.localeCompare(ticket1.time));
      this.tickets = upcoming.concat(completed)
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
  justify-content: center;
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
  text-align: center;
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
}

.expand {
  text-decoration: underline;
  cursor: pointer;
}

.notUpcoming {
  background-color: #CCC;
  border-radius: 0.2rem;
  text-decoration: none;
  text-align: center;
  padding: 0 1.5rem;
}

.overlay {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
}

.overlay, .fill {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}

.fill {
  width: 100%;
  height: auto;
}

.cancelled {
  filter: grayscale(100%);
}

.overlay button {
  width: 33.5%;
  font-size: 1.5rem;
  padding: 0.5rem 0;
}

.modal {
  width: 33%;
  height: auto;
  border-radius: 1rem;
  padding: 0.3rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
  opacity: 1;
  transition: opacity 1s ease;
  background-color: rgb(233, 106, 106);
}

.pdf-mode .modal {
  width: 613px !important;
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
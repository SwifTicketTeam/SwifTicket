<template>
  <div class = "root_component" v-if = "!isLoading">
    <div class = "fill" ref = "ticket">
      <div class = "ticket">
        <GenerateTicket :ticket = "ticket" @save = "save"></GenerateTicket>
      </div>
    </div>
    <button @click = "() => {this.$router.push('/')}">BACK TO HOME</button>
  </div>
</template>

<script>
import GenerateTicket from "@/components/events/Movies/GenerateTicket.vue";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default {
  name: "PaymentSuccess",
  components: {GenerateTicket},
  data() {
    return {
      ticket: {},
      isLoading: false,
    }
  },
  created() {
    this.isLoading = true;
    axios.post(`${process.env.VUE_APP_SERVER}/api/payments/success/movies?session_id=${this.$route.query.session_id}`)
      .then(res => {
        this.ticket = res.data.metadata;
        this.isLoading = false;
      }).catch(err => {
        alert(err.response.data.message);
      })
  },
  methods: {
    save() {
      const ticket = this.$refs.ticket;
      ticket.classList.add("pdf-mode");

      html2pdf().set({
        margin: 0.5,
        filename: `swifticket-${this.ticket.ticketId}.pdf`,
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

<style scoped src = "../styles/button.css"></style>
<style scoped src = "../styles/ticket.css"></style>
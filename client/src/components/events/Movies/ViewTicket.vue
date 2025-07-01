<template>
  <div v-if = "!isLoading" class = "root_component">
    <HomeHeader></HomeHeader>
    <div class="ticket">
      <GenerateTicket :ticket = "ticket"></GenerateTicket>
    </div>
  </div>
</template>

<script>

import HomeHeader from "@/components/home/HomeHeader.vue";
import GenerateTicket from "@/components/events/Movies/GenerateTicket.vue";
import axios from "axios";

export default {
  name: "ViewTicket",
  components: {GenerateTicket, HomeHeader},
  data() {
    return {
      ticket: {},
      isLoading: false,
    }
  },
  created() {
    this.isLoading = true;
    axios.post(`${process.env.VUE_APP_SERVER}/api/account/tickets/movies/${this.$route.params.ticketId}`, {}).then(res => {
          this.ticket = res.data.ticket;
          this.isLoading = false;
        }).catch(err => {
      alert(err.response.data.message);
    })
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

</style>
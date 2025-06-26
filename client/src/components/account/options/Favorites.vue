<template>
  <div id = "section">
    <h2>MY FAVORITES</h2>
    <div id = "favorites" v-if="!isLoading">
      <EventCard v-for = "(event, index) in events" :key = "index" :event = "event"></EventCard>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EventCard from "@/components/events/EventCard.vue";

export default {
  name: "MyFavorites",
  components: {EventCard},
  data() {
    return {
      events: {},
      isLoading: false,
    }
  },
  created () {
    this.isLoading = true;
    this.getFavorites();
  },
  activated () {
    this.isLoading = true;
    this.getFavorites();
  },
  methods: {
    getFavorites () {
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/favorites`, {
        userId: this.$store.state.auth.UID,
      }).then((res) => {
        this.events = res.data.movies;
        this.isLoading = false;
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>

#section {
  padding-left: 1.5rem;
}

#favorites {
  display: flex;
  flex-direction: row;
  gap: 1.3rem;
  flex-wrap: wrap;
  padding: 0;
}

h2 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}

</style>
<template>
  <div id = "myTheatres" v-if = "!isLoading">
    <h1 v-if = "!theatres.length">No theatres found. Add one to get started!</h1>
    <div class = "theatre" v-for = "theatre in theatres" :key = "theatre._id">
      <h3>{{theatre.name}}</h3>
      <h4>{{theatre.city?.name || 'Could Not Fetch City'}}</h4>
      <h4>Screens : {{theatre.screens.length}}</h4>
      <button @click = "manageTheatre(theatre)" class = "no-select">MANAGE THEATRE</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {eventBus} from "@/main";

export default {
  name: "MyTheatres",
  data() {
    return {
      theatres: [],
      isLoading: false,
    }
  },
  created () {
    this.getMyTheatres();
  },
  activated () {
    this.getMyTheatres();
  },
  methods: {
    getMyTheatres () {
      this.isLoading = true;
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/get`, {
        vendorId: this.$store.state.auth.UID
      }).then((res) => {
        this.theatres = res.data.theatres;
        this.isLoading = false;
      }).catch((err) => {
        console.log(err);
      })
    },
    manageTheatre(theatre) {
      eventBus.$emit("manageTheatre", theatre);
    }
  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

#myTheatres {
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 1.5rem;
  width: 100%;
  height: auto;
  overflow-y: auto;
}

#myTheatres::-webkit-scrollbar {
  display: none;
}

.theatre {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 19.5%;
  height: 23vh;
  border-radius: 1.5rem;
  padding: 0 1rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
  border: 0.1rem solid #CCC;
}

.theatre h3 {
  height: 5vh;
  font-size: 1.2rem;
  font-weight: normal;
  text-align: center;
  margin-bottom: 0.2rem;
}

.theatre h4 {
  font-size: 1rem;
  font-weight: normal;
  text-align: center;
  margin-top: 0;
}

button {
  width: 90%;
  height: 18%;
  font-size: 1.2rem;
  margin: 1rem 0 0 0;
}

h1 {
  width: 100%;
  text-align: center;
  margin-top: 5rem;
}

</style>
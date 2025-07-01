<template>
  <div id = "theatre" v-if = "!isLoading">
    <h1 class = "no-select">{{theatre.name}}</h1>
    <h2 class = "no-select">{{theatre.city.name}}</h2>
    <div>
      <h1 v-if = "!screens.length">You have No Screens for this theatre. Add one to get started!</h1>
    </div>
    <div id = "screens">
      <Screen v-for = "screen in screens" :key = "screen._id" @updatedScreen = "getScreens" :screen = "screen"></Screen>
      <button @click = "createScreen" ref = "createScreen" class = "no-select">ADD SCREEN</button>
      <CreateScreen v-if = "isCreate" @updatedScreen = "createScreen" :theatre = "theatre"></CreateScreen>
    </div>
  </div>
</template>

<script>
import Screen from "@/components/account/manage-events/Screen.vue";
import CreateScreen from "@/components/account/manage-events/CreateScreen.vue";
import axios from "axios";

export default {
  name: "ManageTheatre",
  props: ["theatre"],
  components: {
    Screen,
    CreateScreen,
  },
  data() {
    return {
      screens: [],
      isCreate: false,
      isLoading: false,
    }
  },
  created() {
    this.getScreens();
  },
  activated() {
    this.getScreens();
  },
  methods: {
    createScreen() {
      if(!this.isCreate) this.$refs.createScreen.textContent = "CANCEL";
      else this.$refs.createScreen.textContent = "ADD SCREEN";
      this.isCreate = !this.isCreate;
      this.getScreens();
    },
    getScreens() {
      this.isLoading = true;
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/screens/get`, {
        city: this.theatre.city.name,
        theatre: this.theatre.name,
      }).then((res) => {
        this.screens = res.data.screens;
        this.isLoading = false;
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

#theatre {
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  min-height: 85.5%;
}

#screens {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 0;
}

h2 {
  text-align: center;
  margin-top: 0;
  font-weight: normal;
}

button {
  margin: 2rem 0;
  font-size: 1.2rem;
  width: 13%;
  padding: 0.5rem 1rem;
}

</style>
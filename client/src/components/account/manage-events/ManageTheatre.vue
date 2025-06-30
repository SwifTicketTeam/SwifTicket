<template>
  <div id = "theatre">
    <h1 class = "no-select">{{theatre.name}}</h1>
    <h2 class = "no-select">{{theatre.city}}</h2>
    <div id = "screens">
      <Screen v-for = "Screen in screens" :key = "Screen.name" :theatre = theatre :Screen = Screen @updatedScreen = "getScreens"></Screen>
      <button @click = "createScreen" ref = "createScreen" class = "no-select">ADD SCREEN</button>
      <CreateScreen v-if = "isCreate" :theatre = "theatre.name" :city = "theatre.city" @updatedScreen = "createScreen"></CreateScreen>
    </div>
  </div>
</template>

<script>
import Screen from "@/components/account/manage-events/Screen.vue";
import CreateScreen from "@/components/account/manage-events/CreateScreen.vue";
import axios from "axios";

export default {
  name: "ManageTheatre",
  components: {
    Screen,
    CreateScreen,
  },
  props: {
    theatre: Object,
  },
  data() {
    return {
      screens: [],
      isCreate: false,
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
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/screens/get`, {
        city: this.theatre.city,
        theatre: this.theatre.name,
      }).then((res) => {
        this.screens = res.data.screens;
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
<template>
  <div id = "theatre">
    <h1>{{theatre.name}}</h1>
    <h2>{{theatre.city}}</h2>
    <div id = "screens">
      <Screen></Screen>
      <button @click = "createScreen" ref = "createScreen">ADD SCREEN</button>
      <CreateScreen v-if = "isCreate"></CreateScreen>
    </div>
  </div>
</template>

<script>
import Screen from "@/components/account/manage-events/Screen.vue";
import CreateScreen from "@/components/account/manage-events/CreateScreen.vue";

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
      isCreate: false,
    }
  },
  methods: {
    createScreen() {
      if(!this.isCreate) this.$refs.createScreen.textContent = "CANCEL"
      else this.$refs.createScreen.textContent = "ADD SCREEN"
      this.isCreate = !this.isCreate
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
  margin-bottom: 0;
}

h2 {
  margin-top: 0;
  font-weight: normal;
}

button {
  margin: 2rem 0 0 0;
  width: 15%;
  padding: 0.3rem 0;
}

</style>
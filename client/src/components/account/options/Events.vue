<template>
  <div>
    <div id = "theatre-management">
      <h2 class = "no-select">MY THEATRES</h2>
      <button @click = "newTheatre" class = "no-select">{{(isComponent === "MyTheatres") ? "ADD NEW THEATRE" : "MANAGE THEATRES"}}</button>
    </div>
    <transition name = "fade" mode = "out-in">
      <component :is = "isComponent" :theatre = "theatre" @addedTheatre = "newTheatre"></component>
    </transition>
  </div>
</template>

<script>
import AddTheatre from "@/components/account/manage-events/AddTheatre.vue";
import MyTheatres from "@/components/account/manage-events/MyTheatres.vue";
import {eventBus} from "@/main";
import ManageTheatre from "@/components/account/manage-events/ManageTheatre.vue";

export default {
  name: "ManageEvents",
  components: {
    AddTheatre,
    MyTheatres,
    ManageTheatre
  },
  data() {
    return{
      isComponent: "MyTheatres",
      theatre: "",
    }
  },
  created() {
    eventBus.$on("manageTheatre", (theatre) => {
      this.isComponent = "ManageTheatre";
      this.theatre = theatre;
    });
  },
  methods: {
    newTheatre() {
      this.isComponent = (this.isComponent === "MyTheatres") ? "AddTheatre" : "MyTheatres";
    },

  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

#theatre-management {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

h2 {
  font-size: 1.6rem;
  margin: 0 1.2rem;
}

button {
  font-size: 1.2rem;
  width: 18%;
  padding: 0.4rem 1rem;
}

</style>
<template>
  <div>
    <div id = "theatre-management">
      <h2>MY THEATRES</h2>
      <button>ADD THEATRE</button>
    </div>
    <AddTheatre></AddTheatre>
  </div>
</template>

<script>
import AddTheatre from "./manage-events/AddTheatre.vue";

export default {
  name: "ManageEvents",
  components: {
    AddTheatre
  },
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
  margin: 0 0 1rem 0.5rem;
}

button {
  width: 15%;
  padding: 0.4rem 1rem;
}

</style>
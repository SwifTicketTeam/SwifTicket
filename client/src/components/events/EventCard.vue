<template>
  <div @click = "eventClicked">
    <h1>EVENT NAME</h1>
    <h1>EVENT IMAGE</h1>
  </div>
</template>

<script>
export default{
  name: "EventCard",
  methods: {
    eventClicked(){
      this.$router.push("/event");
    }
  }
}
</script>

<style scoped>

div {
  width: 23%;
  height: 50vh;
  margin: 1.2rem 0;
  border-radius: 1.5rem;
  border: 0.15rem solid black;
  cursor: pointer;
}

h1 {
  text-align: center;
}

</style>
<template>
  <header>
    <img @click = "home" class = "no-select" src = "../../assets/swifticket-logo.png">
    <button @click = "home" class = "no-select">Home</button>
  </header>
</template>

<script>
export default{
  name: "AccountHeader",
  data() {
    return {
    }
  },
  methods: {
    home() {
      this.$router.push("/events");
    },
  }
}
</script>

<style src = "../../styles/headers.css" scoped></style>

<style scoped>

img {
  padding-top: 0.5rem;
  padding-left: 2rem;
  width: min(16%, 14vw);
  height: auto;
  margin-right: 1rem;
  cursor: pointer;
}

button {
  width: 6%;
  height: 35%;
  font-size: 1.2rem;
  margin: 0 2rem 0 0;
}

button:hover {
  border-radius: 1rem;
}

</style>
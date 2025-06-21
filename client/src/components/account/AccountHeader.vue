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
      this.$router.push("/home");
    },
  }
}
</script>

<style src = "../../styles/headers.css" scoped></style>

<style scoped>

img {
  padding-top: 0.5rem;
  padding-left: 1rem;
  width: min(12%, 21vh);
  height: auto;
  margin-right: 1rem;
  cursor: pointer;
}

</style>
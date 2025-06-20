<template>
  <header>
    <div>
      <img @click = "toLogin" src = "../assets/swifticket-logo.png">
      <ul>
        <li v-for = "(ticketClass, index) in ticketClasses" :key = "index">{{ ticketClass }}</li>
      </ul>
    </div>
    <button @click = "dashboard">Dashboard</button>
  </header>
</template>

<script>
export default{
  name: "NavBar",
  data() {
    return {
      ticketClasses: ["Movies", "Events", "Sports", "Travels", "Virtual", "Others"]
    }
  },
  methods: {
    dashboard() {
      this.$router.push("/dashboard");
    },
    toLogin() {
      this.$router.push("/");
    }
  }
}
</script>

<style src = "../styles/headers.css" scoped></style>

<style scoped>

img {
  padding-top: 0.5rem;
  padding-left: 1rem;
  width: min(12%, 21vh);
  height: auto;
  margin-right: 1rem;
  cursor: pointer;
}

li {
  display: inline-block;
  list-style-type: none;
  font-size: 1.3rem;
  margin-right: 4rem;
  cursor: pointer;
}

</style>
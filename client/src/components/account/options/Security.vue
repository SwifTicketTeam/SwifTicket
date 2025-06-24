<template>
  <div>
    <button @click = "logout">LOGOUT</button>
  </div>
</template>

<script>
export default {
  name: "SecurityOption",
  methods: {
    logout() {
      this.$store.dispatch('auth/deleteToken');
      this.$router.push({ path: "/" });
    }
  }
}
</script>

<style scoped>

button {
  width: auto;
  height: auto;
  padding: 0.5rem 1.5rem;
  margin: 1rem;
  text-wrap: nowrap;
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  background-color: #FFD586;
  border-radius: 0.6rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
  border: 0.1rem solid black;
  cursor: pointer;
  transition: background-color 0.3s ease,
  border-radius 0.3s ease;
}

button:hover {
  background-color: #FFC94D;
  border-radius: 1.5rem;
}
</style>
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
  width: 12%;
  height: 7%;
  margin: 1.5rem;
  font-size: 1.4rem;
  font-family: 'Poppins', sans-serif;
  background-color: rgba(240, 128, 128, 0.55);
  border-radius: 0.6rem;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease,
  border-radius 0.3s ease;
}

button:hover {
  background-color: #FFC94D;
  border-radius: 1.5rem;
}

</style>
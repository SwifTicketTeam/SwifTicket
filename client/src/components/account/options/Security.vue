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

<style scoped src = "../../../styles/button.css"></style>

<style scoped>

button {
  width: 12%;
  height: 7%;
}

</style>
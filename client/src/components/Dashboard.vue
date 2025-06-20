<template>
  <div>
    <h1>Hello {{ this.$store.state.username }}!</h1>
  </div>
</template>

<script>
export default{
  name: "DashBoard",
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/");
    }
  }
};

</script>

<style scoped>

</style>
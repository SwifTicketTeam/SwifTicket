<template>
  <div>
    <header>
      <img @click = "toLogin" class = "no-select" src = "../../assets/swifticket-logo.png">
    </header>
    <h1>{{ error }}</h1>
    <button @click = "toLogin" class = "no-select">Take Me to the Login Page</button>
  </div>
</template>
<script>
export default {
  name: "VerificationError",
  data() {
    return {
      error: "",
    }
  },
  created() {
    this.error = this.$route.query.error;
  },
  methods: {
    toLogin() {
      this.$router.push("/");
    }
  }
}
</script>

<style src = "../../styles/headers.css" scoped></style>

<style scoped>

header {
  display: flex;
  justify-content: center;
}

div {
  margin-top: 12vh;
  padding: 1.5rem;
  flex-direction: column;
  height: 83vh;
}

img {
  width: min(12%, 21vh);
  cursor: pointer;
}
</style>
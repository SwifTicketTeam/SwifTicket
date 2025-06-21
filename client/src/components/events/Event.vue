<template>
  <div>
    <HomeHeader></HomeHeader>
    <button @click = "eventClicked">BACK</button>{
  </div>
</template>

<script>
import HomeHeader from "@/components/home/HomeHeader.vue";

export default {
  name: "EventInfo",
  components: {
    HomeHeader
  },
  methods: {
    eventClicked() {
      this.$router.push("/home");
    }
  }
}
</script>

<style scoped>

div {
  display: flex;
  margin-top: 12vh;
  justify-content: space-between;
  width: 100%;
  height: auto
}

button {
  height: 3rem;
  padding: 0 1.5rem;
  margin: 1rem 0 1rem 1rem;
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
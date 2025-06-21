<template>
  <div>
    <input type = "text" v-model = "searchedText" @keydown.enter = "search" placeholder = "SwifTicket it — Your Ticket to fun starts here!">
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchedText: ""
    }
  },
  methods: {
    search() {
    }
  }
}
</script>

<style scoped>

input {
  border-radius: 1.5rem;
  width: 50%;
  height: 3.5rem;
  padding: 0 1rem;
  font-size: 1.4rem;
  font-family: 'Lora', serif;
  background-color: #EFEFEF;
  border: 0.15rem solid black;
}

input:focus {
  outline: none;
}

</style>
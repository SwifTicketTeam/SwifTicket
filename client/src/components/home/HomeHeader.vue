<template>
  <header>
    <div>
      <img src = "../../assets/swifticket-logo.png" class = "no-select" @click = "toHome">
      <ul>
        <li @click = "selectTicketClass(ticketClass)" v-for = "(ticketClass, index) in ticketClasses" :key = "index" :class = "{selected : selectedTicketClass === ticketClass}" class = "no-select">{{ ticketClass }}</li>
      </ul>
    </div>
    <img id = "account" src = "../../assets/account.png" @click = "account" class = "no-select">
  </header>
</template>

<script>
export default{
  name: "HomeHeader",
  data() {
    return {
      ticketClasses: ["Movies", "Shows", "Sports", "Travels"],
      selectedTicketClass: "Movies"
    }
  },
  methods: {
    account() {
      this.$router.push("/account");
    },
    selectTicketClass(ticketClass) {
      if (ticketClass !== this.selectedTicketClass) this.selectedTicketClass = ticketClass;
      this.toHome();
    },
    toHome() {
      if(this.$route.path !== "/events") this.$router.push("/events");
    }
  }
}
</script>

<style src = "../../styles/headers.css" scoped></style>
<style scoped src = "../../styles/button.css"></style>

<style scoped>

img {
  padding-top: 0.5rem;
  padding-left: 2rem;
  width: min(16%, 14vw);
  height: auto;
  margin-right: 1rem;
  cursor: pointer;
}

#account {
  width: 2.5%;
  margin: 0 1.5rem 1rem 0
}

li {
  display: inline-block;
  list-style-type: none;
  font-size: 1.1rem;
  margin-right: 1.2rem;
  padding: 0.4rem 1.2rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.5s ease,
              border-radius 0.5s ease,
              box-shadow 0.5s ease;
}

li:hover {
  background-color: rgba(255, 201, 77, 0.7);
  border-radius: 0.6rem;
}

.selected, .selected:hover {
  background-color: rgb(233, 106, 106);
  border-radius: 0.6rem;
  color: white;
}

</style>
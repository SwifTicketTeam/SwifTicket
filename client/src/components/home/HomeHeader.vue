<template>
  <header>
    <div>
      <img src = "../../assets/swifticket-logo.png" class = "no-select">
      <ul>
        <li @click = "selectTicketClass(ticketClass)" v-for = "(ticketClass, index) in ticketClasses" :key = "index" :class = "{selected : selectedTicketClass === ticketClass}" class = "no-select">{{ ticketClass }}</li>
      </ul>
    </div>
    <button @click = "account" class = "no-select">My Account</button>
  </header>
</template>

<script>
export default{
  name: "HomeHeader",
  data() {
    return {
      ticketClasses: ["Movies", "Shows", "Sports", "Travels", "Virtual", "Others"],
      selectedTicketClass: "Movies"
    }
  },
  methods: {
    account() {
      this.$router.push("/account");
    },
    selectTicketClass(ticketClass) {
      this.selectedTicketClass = ticketClass;
    }
  }
}
</script>

<style src = "../../styles/headers.css" scoped></style>

<style scoped>

img {
  padding-top: 0.5rem;
  padding-left: 1rem;
  width: min(13.25%, 21vh);
  height: auto;
  margin-right: 1rem;
  cursor: pointer;
}

li {
  display: inline-block;
  list-style-type: none;
  font-size: 1.3rem;
  margin-right: 1.2rem;
  padding: 0.4rem 1.2rem;
  color: #333;
  cursor: pointer;
  border-radius: 0.8rem;
  transition: background-color 1s ease,
              box-shadow 0.15s ease;
}

li:hover {
  background-color: #F59B9B;
}

.selected, .selected:hover {
  background-color: #E26868;
  border: 0.1rem solid #000;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
}

</style>
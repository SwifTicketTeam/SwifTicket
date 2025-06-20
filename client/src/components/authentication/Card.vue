<template>
  <div id = "card">
    <img src = "../../assets/swifticket-logo.png">
    <p>Welcome to <strong>SwifTicket</strong> — your all-in-one platform for discovering, booking, and managing tickets to the events you love. Whether it’s a blockbuster movie, a local concert, a live sports match, or a weekend workshop, SwifTicket brings them all to your fingertips with speed and simplicity. Join thousands of users who trust us for a smoother, faster, and smarter ticketing experience.</p>
    <h3>{{ (isNewUser) ? 'Already have a SwifTicket account? Log in to continue booking your favorite events.' : 'New to SwifTicket? Create an account to start your event journey.' }}</h3>
    <button @click.stop = "isUserTypeChanged">{{ (isNewUser) ? 'Log In' : 'Register Now' }}</button>
  </div>
</template>

<script>
export default {
  name: "CardView",
  data() {
    return {
      isNewUser: false,
    }
  },
  methods: {
    isUserTypeChanged() {
      this.isNewUser = !this.isNewUser;
      this.$emit('isUserTypeChanged', this.isNewUser ? 'RegisterUser' : 'LoginUser');
    }
  }

}
</script>


<style scoped>

#card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 48%;
  height: 95%;
  margin: 0 1rem;
  background: linear-gradient(#CFD2CF, #FA9494);
  box-shadow: -0.75rem 0.5rem 0.8rem 0.05rem rgba(0, 0, 0, 0.25);
  border-radius: 2rem;
  border: 0.15rem solid black;
}

img {
  width: min(70%, 55vh);
  height: auto;
}

h3 {
  height: 5%;
}

h3, p {
  font-size: 1.3rem;
  padding: 0 1.5rem 1rem 1.5rem;
}

button {
  width: 20%;
  height: 6%;
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  background-color: #FFD586;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  border: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #FFC94D;
}

</style>
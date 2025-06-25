<template>
  <div id = "card">
    <img src = "../../assets/swifticket-logo.png" class = "no-select">
    <h3>{{ (isNewUser) ? 'Already have a SwifTicket account? Log in to continue booking your favorite events.' : 'New to SwifTicket? Create an account to start your event journey.' }}</h3>
    <button @click.stop = "isUserTypeChanged" class = "no-select">{{ (isNewUser) ? 'LOG IN' : 'REGISTER NOW' }}</button>
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
  height: 90%;
  margin: 0 3rem;
  background-color: #FFF;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  border-radius: 2rem;
}

img {
  width: min(70%, 55vh);
  height: auto;
}

h3 {
  height: 5%;
}

h3, p {
  font-size: 1.8rem;
  font-weight: normal;
  margin-bottom: 5rem;
  padding: 0 1.5rem 1rem 1.5rem;
}

button {
  width: 25%;
  height: 7%;
  font-size: 1.3rem;
  font-family: 'Poppins', sans-serif;
  background-color: rgba(240, 128, 128, 0.55);
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
  border-radius: 0.6rem;
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
<template>
  <div>
    <h2>NOTE: THIS FEATURE IS NOT PERMANENT. A FORM WILL BE CREATED HERE TO MAKE A REQUEST TO THE ADMIN FOR VENDOR ROLE. CLICK THIS BUTTON AND REFRESH YOUR PAGE</h2>
    <button @click = "sendRequest">BECOME A VENDOR</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BecomeVendor",
  methods: {
    sendRequest() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/vendor/request`, {
        userId: this.$store.state.auth.UID
      }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

button {
  padding:  0.5rem 1rem;
}

h2 {
  width: 95%;
  text-align: center;
}

</style>


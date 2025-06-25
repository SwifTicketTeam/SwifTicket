<template>
  <div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyFavorites",
  data() {
    return {
      favorites: {},
    }
  },
  created () {
    axios.post(`${process.env.VUE_APP_SERVER}/api/account/favorites`, {
      userId: this.$store.state.auth.UID,
    }).then((res) => {
      this.favorites = res.data.events;
    }).catch((err) => {
      console.log(err);
    })
  },
}
</script>

<style scoped>

</style>
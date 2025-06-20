<template>
  <div id = "swifticket">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "SwifTicket",
}
</script>

<style scoped>

#swifticket {
  height: 100%;
  background: linear-gradient(to right, #DFDFDE, #F5EDDC);
}

</style>


<style>

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: min(0.9vw, 1.5vh);
  font-family: 'Poppins', sans-serif;
}
html::-webkit-scrollbar {
  display: none;
}

</style>
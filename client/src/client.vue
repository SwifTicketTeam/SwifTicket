<template>
  <div id = "client">
    <transition name = "fade" mode = "out-in">
      <keep-alive :exclude = "['ShowTime']">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>

export default {
  name: "ClientApp",
}
</script>

<style scoped>

#client {
  height: 100%;
}

</style>


<style>

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: min(0.9vw, 1.5vh);
  font-family: 'Roboto Slab', sans-serif;
}
html::-webkit-scrollbar {
  display: none;
}

.fieldLabel {
  align-self: center;
  font-size: 1.5rem;
}

.field {
  width: 55%;
  height: 100%;
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  padding: 0 1.5rem;
  border-radius: 1rem;
  box-shadow: 0.4rem 0.25rem 0.8rem 0.05rem rgba(0, 0, 0, 0.25);
  border: none;
}

.field:focus {
  outline: none;
  border: none;
}

.no-select {
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0.1;
}

</style>
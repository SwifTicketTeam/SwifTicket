<template>
  <div v-if = "show" class = "overlay">
    <div class = "modal">
      <p>{{ message }}</p>
      <div class = "buttons">
        <button @click = "$emit('confirm')" id = "yes">Yes</button>
        <button @click = "$emit('cancel')" id = "no">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show', 'message'],
}
</script>

<style scoped src = "../styles/button.css"></style>
<style scoped>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
}
.modal {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 0.15rem solid #CCC;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
}

.modal p {
  font-size: 1.4rem;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

button {
  padding: 0.4rem 1.5rem;
  font-size: 1.4rem;
}

button:hover {
  border-radius: 1rem;
}

#yes {
  background-color: rgb(128, 240, 128);
}

#yes:hover {
  background-color: rgb(100, 200, 100);
}

#no {
  background-color: rgb(240, 128, 128);
}

#no:hover {
  background-color: rgb(200, 100, 100);
}


</style>

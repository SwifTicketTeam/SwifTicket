<template>
  <div @click = "eventClicked" id = "card">
    <transition name = "fade">
      <img v-show = "showImage" :src = "`${storageUrl}/${currentID}.jpg`">
    </transition>
    <div>
      <div class = "box">
        <p id = "rating">{{(event.rating) ? event.rating : "NaN"}} / 10</p>
        <p>{{event.language}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";

export default{
  name: "EventCard",
  props: {
    event: Object,
  },
  data() {
    return {
      currentID: this.event._id,
      showImage: true,
      storageUrl: process.env.VUE_APP_STORAGE_URL,
    }
  },
  methods: {
    eventClicked(){
      eventBus.$emit("eventClicked", this.event);
    },
  },
  watch: {
    event(event){
      this.showImage = false;
      setTimeout(() => {
        this.currentID = event._id;
        this.showImage = true;
      }, 400);
    }
  }
}
</script>

<style scoped>

#card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 15%;
  height: auto;
  margin: 1.2rem 0;
  border-radius: 1.5rem;
  box-shadow: 0.05rem 0.05rem 0.2rem 0.01rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 1s ease,
              transform 0.5s ease;
}

#card:hover {
  transform: translateY(-3%) scale(102%);
  box-shadow: 0.01rem 0.01rem 0.5rem 0.05rem rgba(0, 0, 0, 0.45);
}

div {
  width: 100%;
}

.box {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 55%;
  justify-content: space-between;
}

img {
  width: 100%;
  border-radius: 1.5rem 1.5rem 0 0;
}

#rating {
  width: 25%;
  height: 80%;
  border-radius: 1rem;
  text-align: center;
}

p {
  padding: 0 0.8rem;
  font-size: 1rem;
  text-wrap: nowrap;
}

</style>
<template>
  <div @click = "eventClicked" id = "card">
    <transition name = "fade">
      <img v-show = "showImage" :src = "'http://localhost:3000/storage/images/' + currentID + '.jpg'">
    </transition>
    <div>
      <div class = "box">
        <p>{{ event.title}}</p>
        <p>{{event.language}}</p>
      </div>
      <p id = "rating">{{event.rating}} / 10</p>
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
      }, 300);
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
  width: 18.3%;
  height: auto;
  margin: 1.2rem 0;
  border-radius: 1.5rem;
  cursor: pointer;
}

div {
  width: 100%;
}

.box {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  justify-content: space-between;
}

img {
  width: 100%;
  border-radius: 1.5rem;
}

#rating {
  background-color: #CBCBCB;
  width: 20%;
  border-radius: 1rem;
  text-align: center;
}

p {
  padding: 0 1rem;
  font-size: 1.1rem;
}

</style>
<template>
  <div id = "event">
    <div>
      <div id = "mini-header">
        <button @click = "eventClicked" id = "back">BACK</button>
        <button id = "fav"></button>
      </div>
    </div>
    <div id = "section">
      <img :src = "'http://localhost:3000/storage/images/' + (evt._id) + '.jpg'">
      <div id = "info">
        <div>
          <h1>{{evt.title.toUpperCase()}}</h1>
        </div>
        <div>
          <p>{{evt.overview}}</p>
        </div>
        <br>
        <div>
          <p>GENRES: </p>
          <ul>
            <li v-for = "(genre, index) in evt.genres" :key = "index">{{genre}}</li>
          </ul>
        </div>
        <div class = "line-box">
          <p>RELEASE DATE : {{getDate(new Date(evt.release))}}</p>
          <p>ORIGINAL LANGUAGE : {{evt.language.toUpperCase()}}</p>
        </div>
        <div class = "line-box last">
          <p>RATING : {{evt.rating}} / 10</p>
          <button class = "no-select">BOOK NOW</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";

export default {
  name: "EventInfo",
  props: {
    evt: Object,
  },
  methods: {
    eventClicked() {
      eventBus.$emit("eventClicked");
    },
    getDate(date) {
      return `${date.getDate().toString().padStart(2, '0')} - ${String(date.getMonth() + 1).padStart(2, '0')} - ${date.getFullYear()}`;
    }
  },
};
</script>

<style scoped>

#event {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
}

#mini-header {
  display: flex;
  margin-top: 12vh;
  justify-content: space-between;
  width: 100%;
  height: auto
}

#back {
  margin: 1rem 0 1rem 1rem;
}

#section {
  display: flex;
  flex-direction: row;
  border: 0.02rem solid black;
  margin: 0 1rem;
  border-radius: 2rem;
}

#fav {
  margin: 1rem 1rem 1rem 0;
}

button {
  height: 3rem;
  padding: 0 1.5rem;
  text-wrap: nowrap;
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  background-color: #FFD586;
  border-radius: 0.6rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
  border: 0.1rem solid black;
  cursor: pointer;
  transition: background-color 0.3s ease,
  border-radius 0.3s ease;
}

button:hover {
  background-color: #FFC94D;
  border-radius: 1.3rem;
}

img {
  margin: 1rem;
  width: 30%;
  border-radius: 1.2rem;
  border: 0.25rem solid black;
}

#info {
  width: 100%;
}

h1{
  text-align: center;
}

p, li {
  font-size: 1.2rem;
}

.line-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 98%;
}

.last {
  align-self: flex-end;
}

</style>
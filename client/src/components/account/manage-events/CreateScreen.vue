<template>
  <div id = "Main">
    <div class = "fields">
      <label>NAME</label>
      <input type="text" v-model="ScreenName" placeholder = "Enter Screen Name" spellcheck = "false" autocomplete = "off" />
      <label>ROWS</label>
      <input type="number" v-model="rows">
      <label>COLUMNS</label>
      <input type="number" v-model="columns">
    </div>
    <p>{{warning}}</p>
    <div id = "layout">
      <div id = "screen">
        <span>SCREEN</span>
        <div id = "ScreenLine"></div>
      </div>
      <div class = "row">
        <div v-for = "(seat, index) in parseInt(columns)" :key = index class = "SeatNumber no-select" @click = "toggleColumn($event, index)">{{seat}}</div>
      </div>
      <div v-for = "(row, index) in parseInt(rows)" :key = index class ="row">
        <div class = "RowNumber no-select" @click = "toggleRow($event)">{{numbersToLetters(row)}}</div>
        <button v-for = "(seat, index) in parseInt(columns)" :key = index :data-id = index class ="seat no-select" @click = "toggleGap($event)"></button>
        <div class = "RowNumber no-select" @click = "toggleRow($event)">{{numbersToLetters(row)}}</div>
      </div>
      <div class = "row">
        <div v-for = "(seat, index) in parseInt(columns)" :key = index class = "SeatNumber no-select" @click = "toggleColumn($event, index)"  >{{seat}}</div>
      </div>
      <button id = "create" @click = "createScreen">CREATE SCREEN</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateScreen",
  data() {
    return {
      ScreenName: "",
      rows: 10,
      columns: 10,
      warning: "Rows and Columns should be at least 1",
    }
  },
  methods: {
    numbersToLetters(num) {
      if (num <= 0) return '';
      let letters = '';
      while (num > 0) {
        num--;
        letters = String.fromCharCode((num % 26) + 65) + letters;
        num = Math.floor(num / 26);
      }
      return letters;
    },
    toggleGap(event) {
      if (event.target.classList.contains("isGap")) event.target.classList.remove("isGap");
      else event.target.classList.add("isGap");
    },
    toggleRow(event) {
      const seats = event.target.parentElement.querySelectorAll("button");
      if (event.target.classList.contains("isGap")) {
        event.target.classList.remove("isGap");
        seats.forEach(seat => {
          seat.classList.remove("isGap");
        })
      }
      else {
        event.target.classList.add("isGap");
        seats.forEach(seat => {
          seat.classList.add("isGap");
        })
      }
    },
    toggleColumn(event, index) {
      const seats = event.target.parentElement.parentElement.querySelectorAll("button");
      if (event.target.classList.contains("isGap")) {
        event.target.classList.remove("isGap");
        seats.forEach(seat => {
          if (seat.dataset.id === index.toString()) {
            seat.classList.remove("isGap");
          }
        })
      }
      else {
        event.target.classList.add("isGap");
        seats.forEach(seat => {
          if (seat.dataset.id === index.toString()) {
            seat.classList.add("isGap");
          }
        })
      }
    },
    createScreen() {
      if (this.rows < 1 || this.columns < 1) {
        this.warning = "Rows and Columns should be at least 1";
      } else {
        this.warning = "";
      }
    }
  }
}
</script>

<style scoped src = "../../../styles/button.css"></style>
<style scoped>

#Main {
  width: 100%;
}

.fields {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  margin: 2rem 0;
}

label {
  height: 1.7rem;
  font-size: 1.2rem;
  font-family: Poppins, sans-serif;
  margin: auto 1rem;
}

input {
  width: 100%;
  height: 2.5rem;
  border-radius: 1rem;
  border: none;
  padding: 0 1rem;
  font-size: 1rem;
  font-family: Poppins, sans-serif;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
}

input:focus {
  outline: none;
}

p {
  width: 100%;
  height: 2rem;
  text-align: center;
  color: red;
}

#layout {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: auto;
  gap: 2rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
  border: 0.1rem solid #CCC;
  overflow-x: auto;
}

#layout::-webkit-scrollbar {
  display: none;
}

#screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

#ScreenLine {
  width: 100%;
  border: 0.01rem solid #CCC;
}

.SeatNumber {
  width: 2rem;
  height: 2rem;
  margin: 0 0.5rem;
  cursor: pointer;
}

.RowNumber {
  cursor: pointer;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 1rem;
  text-align: center;
}

.seat {
  width: 2rem;
  height: 2rem;
  background-color: #EEE;
  border-radius: 0.5rem;
  box-shadow: -0.01rem 0.01rem 0.8rem 0 rgba(0, 0, 0, 0.05);
  border: 0.1rem solid #CCC;
  cursor: pointer;
}

.seat:hover {
  background-color: #CCC;
  border-radius: 0.5rem;
  box-shadow: -0.01rem 0.01rem 0.8rem 0 rgba(0, 0, 0, 0.05);
}

.isGap, .isGap:hover {
  background-color: inherit;
  border: 0 solid #FFF;
  box-shadow: none;
}

#create {
  padding: 0.4rem 1rem;
}

button {
  padding: 0;
  margin: 0.5rem;
  transition: background-color 0.35s ease,
              border 0.35s ease,
              box-shadow 0.35s ease;
}


</style>
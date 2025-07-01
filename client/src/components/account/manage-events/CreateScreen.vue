<template>
  <div id = "Main">
    <div class = "fields">
      <label>NAME</label>
      <input type="text" v-model="screenName" placeholder = "Enter Screen Name" spellcheck = "false" autocomplete = "off" />
      <label>ROWS</label>
      <input type="number" v-model="rows">
      <label>COLUMNS</label>
      <input type="number" v-model="columns">
    </div>
    <div id="ForNote">
      <h2>NOTE:</h2>
      <p id="note">
        <br><strong>Theatre Layout Creation Guide:</strong>
        <br><br>
        <strong>Rows & Columns:</strong>
        <br>
        - Each row is labeled with a letter (A, B, C...) and each movieSeat is numbered (1, 2, 3...).<br>
        - Seat IDs will follow the format like "B4", "C10".
        <br><br>
        <strong>Creating Gaps:</strong>
        <br>
        - To remove an entire row, click the row label. It will be considered a walking lane.<br>
        - To remove individual seats, click on them. Those seats will be excluded from layout.<br>
        - Use arrow buttons at the ends of rows to indicate vertical aisle gaps in that column.
        <br><br>
        <strong>Live Layout Update:</strong>
        <br>
        - No preview step required. The layout updates automatically as you make changes.
        <br><br>
      </p>
    </div>
    <p>{{warning}}</p>
    <div id = "layout" v-if = "!isRefresh">
      <div id = "screen">
        <span>SCREEN</span>
        <div id = "ScreenLine"></div>
      </div>
      <div class = "row">
        <div v-for = "(movieSeat, index) in parseInt(columns)" :key = index class = "SeatNumber no-select" @click = "toggleColumn($event.target, index + 1)">▼</div>
      </div>
      <div v-for = "(row, index) in parseInt(rows)" :key = index class = "row">
        <div class = "RowNumber no-select" @click = "toggleRow($event.target)">{{numbersToLetters(rows - row + 1)}}</div>
        <button v-for = "(movieSeat, index) in parseInt(columns)" :key = index :data-id = "`${numbersToLetters(rows - row + 1)}, ${index + 1}`" class ="movieSeat no-select" @click = "toggleGap($event.target)">{{movieSeat}}</button>
        <div class = "RowNumber no-select" @click = "toggleRow($event.target)">{{numbersToLetters(rows - row + 1)}}</div>
      </div>
      <div class = "row">
        <div v-for = "(movieSeat, index) in parseInt(columns)" :key = index class = "SeatNumber no-select" @click = "toggleColumn($event.target, index + 1 )"  >▲</div>
      </div>
      <button id = "create" @click = "createScreen($event.target)">CREATE SCREEN</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateScreen",
  props: {
    theatre: Object,
  },
  data() {
    return {
      screenName: "",
      rows: 10,
      columns: 10,
      warning: "",
      isRefresh: false,
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
    toggleGap(el) {
      if (el.classList.contains("isGap")) el.classList.remove("isGap");
      else el.classList.add("isGap");
      this.calculateLayout(el);
    },
    toggleRow(el) {
      const seats = el.parentElement.querySelectorAll(".movieSeat");
      if (el.classList.contains("isRGap")) {
        el.classList.remove("isRGap");
        seats.forEach(movieSeat => {
          movieSeat.classList.remove("isGap");
        })
      }
      else {
        el.classList.add("isRGap");
        seats.forEach(movieSeat => {
          movieSeat.classList.add("isGap");
        })
      }
      this.calculateLayout(el);
    },
    toggleColumn(el, index) {
      const seats = el.parentElement.parentElement.querySelectorAll(".movieSeat");
      if (el.classList.contains("isCGap")) {
        el.classList.remove("isCGap");
        seats.forEach(movieSeat => {
          if (movieSeat.dataset.id.split(', ')[1]  === index.toString()) {
            movieSeat.classList.remove("isGap");
          }
        })
      }
      else {
        el.classList.add("isCGap");
        seats.forEach(movieSeat => {
          if (movieSeat.dataset.id.split(', ')[1] === index.toString()) {
            movieSeat.classList.add("isGap");
          }
        })
      }
      this.calculateLayout(el);
    },
    calculateLayout(el) {
      const rows = Array.from(el.parentElement.parentElement.querySelectorAll(".row")).reverse();
      let RowNumber = 1;
      rows.forEach(row => {
        const seats = row.querySelectorAll(".movieSeat");

        if (seats.length === 0) return;

        let SeatNumber = 1
        seats.forEach(movieSeat => {
          if (!movieSeat.classList.contains("isGap")) {
            movieSeat.textContent = SeatNumber;
            SeatNumber++;
          }
        });
        if (!(SeatNumber === 1)) {
          const RowNumbers = row.querySelectorAll("div");
          RowNumbers.forEach(RowHeader => {
            RowHeader.textContent = this.numbersToLetters(RowNumber);
          })
          RowNumber++;
        } else {
          const RowNumbers = row.querySelectorAll("div");
          RowNumbers.forEach(RowHeader => {
            RowHeader.textContent = "";
          })
        }
      })
    },
    createScreen(el) {
      if (this.rows < 1 || this.columns < 1) {
        this.warning = "Rows and Columns should be at least 1";
      } else {
        this.warning = "";
        const seatsEl = el.parentElement.querySelectorAll(".movieSeat");
        let seats = [];
        seatsEl.forEach(seatEl => {
          seats.push([...seatEl.dataset.id.split(', '), seatEl.classList.contains("isGap")]);
        });
        axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/screens/create`, {
          city: this.theatre.city.name,
          theatre: this.theatre.name,
          name: this.screenName,
          seats: seats,
        }).then(() => {
          this.$emit("updatedScreen");
          this.warning = "";
        }).catch((err) => {
          this.warning = err.response.data.message;
        });
      }
    }
  },
  watch: {
    rows() {
      this.isRefresh = true;
      setTimeout(() => {
        this.isRefresh = false;
      }, 10);
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

#ForNote {
  border-radius: 1rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
  border: 0.1rem solid #CCC;
  margin: 0 0 1rem 0;
}

h2 {
  margin: 1rem 1rem 0 1rem;
}

#note {
  color: black;
  height: 22rem;
  margin: 0 1rem 1rem 1rem;
  text-wrap: wrap;
  text-align: left;
}

p {
  height: 2rem;
  color: red;
  text-align: center;
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
  gap: 0.5rem;
  height: 1rem;
  text-align: center;
}

.movieSeat {
  width: 2rem;
  height: 2rem;
  font-size: 0.9rem;
  background-color: #EEE;
  border-radius: 0.5rem;
  box-shadow: -0.01rem 0.01rem 0.8rem 0 rgba(0, 0, 0, 0.05);
  border: 0.1rem solid #CCC;
  cursor: pointer;
  color: black;
}

.movieSeat:hover {
  background-color: #CCC;
  border-radius: 0.5rem;
  box-shadow: -0.01rem 0.01rem 0.8rem 0 rgba(0, 0, 0, 0.05);
}

.isGap, .isGap:hover {
  opacity: 0;
}

#create{
  padding: 0.6rem 1.2rem;
  font-size: 1.2rem;
}

button {
  padding: 0;
  margin: 0.5rem;
  transition: background-color 0.35s ease,
              opacity 0.35s ease,
              box-shadow 0.35s ease,
              border-radius 0.35s ease;
}


</style>
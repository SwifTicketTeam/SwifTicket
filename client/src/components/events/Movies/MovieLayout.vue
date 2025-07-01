<template>
  <div id = "layout-root" ref = "layout">
    <div id = "screen">
      <span>SCREEN</span>
      <div id = "ScreenLine"></div>
    </div>
    <div v-for = "(row, index) in parseInt(rows)" :key = index class = "row">
      <div :data-id = "`${row}`" class = "RowNumber no-select"></div>
      <button v-for = "(seat, index) in parseInt(columns)" :key = index :data-id = "`${numbersToLetters(rows - row + 1)}, ${index + 1}`" class ="seat no-select" :class = "{isBook : isBooking}" @click = "selectSeat($event)">{{seat}}</button>
      <div :data-id = "`${row}`" class = "RowNumber no-select"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieLayout",
  props: {
    layout: Array,
    isBooking: Boolean,
  },
  data() {
    return {
      rows: 0,
      columns: 0,
      selectedSeats: 0,
    }
  },
  created() {
    this.rows = this.layout.length;
    this.columns = this.layout?.[0]?.length;
  },
  mounted() {
    const seats = this.$refs.layout.querySelectorAll(".seat");
    let SeatNumber = 0;
    let RowNumber = 0;
    let GapRows = 0

    for(const row of this.layout) {
      let ColNumber = 1
      for(const seat of row) {
        if (!seat.isGap) ColNumber++;
      }
      if (ColNumber === 1) GapRows++;
    }

    for(const row of this.layout) {
      let ColNumber = 1
      for(const seat of row) {
        if (seat.status === "Booked" && this.isBooking) seats[SeatNumber].classList.add("isBooked");
        if (seat.isGap) seats[SeatNumber].classList.add("isGap");
        else {
          seats[SeatNumber].textContent = ColNumber.toString();
          ColNumber++;
        }
        SeatNumber++;
      }
      if (ColNumber !== 1) {
        const RowIndicators = this.$refs.layout.querySelectorAll(".RowNumber");
        RowIndicators.forEach(RowIndicator => {
          if (parseInt(RowIndicator.dataset.id) === Math.floor((SeatNumber + 1) / this.columns)) RowIndicator.textContent = this.numbersToLetters(this.rows - GapRows - RowNumber);
        });
        RowNumber++;
      }
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
    selectSeat(event) {
      if (!this.isBooking || this.selectedSeats > 4 || event.target.classList.contains("isBooked")) return;
      if (event.target.classList.contains("isSelected")) {
        event.target.classList.remove("isSelected");
        this.selectedSeats--;
      }
      else {
        event.target.classList.add("isSelected");
        this.selectedSeats++;
      }
      const RowValue = event.target.parentElement.querySelector(".RowNumber").innerText;
      const ColumnValue = event.target.innerText;
      this.$emit('select', `${RowValue}${ColumnValue}`, event.target.dataset.id.replace(', ', '-'));
    }
  }
}
</script>

<style scoped>

#layout-root {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: auto;
  height: auto;
  gap: 2rem;
  padding: 3rem 1.5rem;
  margin: 1rem 0;
  border-radius: 1rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.15);
  border: 0.1rem solid #CCC;
  overflow: auto;
}

#layout-root::-webkit-scrollbar {
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
  gap: 1.2rem;
  height: 1rem;
  text-align: center;
}

.seat {
  width: 2rem;
  height: 2rem;
  font-size: 0.9rem;
  background-color: #EEE;
  border-radius: 0.5rem;
  box-shadow: -0.01rem 0.01rem 0.8rem 0 rgba(0, 0, 0, 0.05);
  border: none;
}

.isBook {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.isBook:hover {
  background-color: #BBB;
}

.isBooked, .isBooked:hover {
  background-color: #BBB;
  color: #EEE;
  cursor: initial;
}

.isSelected, .isSelected:hover {
  background-color: mediumseagreen;
  color: white;
}

.isGap{
  opacity: 0;
}


</style>
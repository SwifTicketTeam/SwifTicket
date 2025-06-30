<template>
  <div>
    <ul>
      <li @click = "selectOption(option)" v-for = "(option, index) in options" :key = "index" :class = "{selected: (selectedOption === option)}" class = "no-select">{{ option }}</li>
    </ul>
  </div>
</template>

<script>
import {eventBus} from "@/main";

export default{
  name: "AccountOptions",
  data() {
    return {
      options: ["Profile", "My Tickets", "My Favorites", "Transaction History"],
      selectedOption: "Profile",
    }
  },
  created() {
    if (this.$store.state.auth.role === "user") {
      this.options.push("Become a Vendor")
    } else if (this.$store.state.auth.role === "vendor") {
      this.options.push("Manage Events")
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      eventBus.$emit("select-option", option.split(' ')[option.split(' ').length - 1]);
    }
  },
};

</script>

<style scoped>

div {
  display: flex;
  flex-direction: column;
  width: 28%;
  height: auto;
}

ul {
  margin-top: 2rem;
}

li {
  list-style-type: none;
  font-size: 1.4rem;
  padding: 2.5rem 1rem;
  margin: 0 1rem 1.2rem 1rem;
  border-radius: 1rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
  border: 0.1rem solid #CCC;
  transition: background-color 0.3s ease,
              border-radius 0.3s ease;
}

li:hover {
  background-color: #EEE;
}

.selected, .selected:hover {
  background-color: #DDD;
  border-radius: 2rem;
  box-shadow: -0.05rem 0.05rem 0.8rem 0 rgba(0, 0, 0, 0.25);
}

</style>
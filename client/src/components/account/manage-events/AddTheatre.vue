<template>
  <div id = "Form">
    <div class = "fields">
      <label for = "vendorID" class = "no-select fieldLabel">Vendor ID</label>
      <input class = "field no-select" v-model = "vendorID" type = "text" name = "vendorID" id = "vendorID" spellcheck = "false" autocomplete = "off" readonly>
    </div>
    <div class = "fields">
      <label for = "city" class = "no-select fieldLabel">CITY</label>
      <select class = "dropdown" v-model = "city" name = "city" id = "city" spellcheck="false" autocomplete = "off">
        <option v-for = "(city, index) in cities" :key = index>{{city}}</option>
      </select>
    </div>
    <div class = "fields">
      <label for = "theatreName" class = "no-select fieldLabel">NAME</label>
      <input class = "field no-select" v-model = "theatreName" type = "text" name = "theatreName" id = "theatreName" spellcheck="false" autocomplete = "off">
    </div>
    <button @click = "addTheatre" class = "no-select">ADD</button>
    <p :class = "{isWarn: isWarn}">{{warning}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddTheatre",
  data() {
    return {
      vendorID: this.$store.state.auth.UID,
      city: "",
      theatreName: "",
      isWarn: false,
      warning: false,
      cities: [
        "Chennai",
        "Coimbatore",
        "Mumbai",
        "Pune",
        "Delhi",
        "Bengaluru",
        "Ahmedabad",
        "Hyderabad",
      ]

    }
  },
  methods: {
    addTheatre() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/create`, {
        vendorId: this.vendorID,
        city: this.city,
        name: this.theatreName,
      }).then(() => {
        this.isWarn = false;
        this.warning = "";
        this.$emit("addedTheatre");
      }).catch((err) => {
        this.isWarn = true;
        this.warning = err.response.data.message;
      })
    }
  }
}
</script>

<style scoped src = "../../../styles/forms.css"></style>
<style scoped src = "../../../styles/button.css"></style>
<style scoped>

#Form {
  width: 100%;
  height: 53%;
  margin: 0 auto;
  padding: 5rem 1rem;
  border-radius: 0;
  box-shadow: none;
  justify-content: flex-start;
}

.fields {
  justify-content: flex-start;
  height: 20%;
}

.fieldLabel {
  width: 35%;
}

.field {
  width: 60%;
}

.dropdown {
  width: 64%;
  height: 100%;
  background-color: #FFF;
  padding: 0 1.2rem;
  font-size: 1.1rem;
  font-family: Poppins, sans-serif;
  border-radius: 0.8rem;
  border: none;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
}

.dropdown:focus {
  outline: none;
}

.dropdown::-webkit-scrollbar {
  display: none;
}

button {
  margin: 0 4.5rem 0 0;
  width: 15%;
  height: 20%;
  align-self: flex-end;
}

p {
  height: 15%;
}

</style>
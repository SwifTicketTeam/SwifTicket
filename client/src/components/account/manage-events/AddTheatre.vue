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
        "New York City (North America, USA)",
        "Los Angeles (North America, USA)",
        "Toronto (North America, Canada)",
        "Chicago (North America, USA)",
        "Mexico City (North America, Mexico)",
        "San Francisco (North America, USA)",
        "Vancouver (North America, Canada)",
        "Houston (North America, USA)",
        "Montreal (North America, Canada)",
        "Atlanta (North America, USA)",
        "Boston (North America, USA)",
        "Dallas (North America, USA)",
        "Miami (North America, USA)",
        "Seattle (North America, USA)",
        "Philadelphia (North America, USA)",
        "Phoenix (North America, USA)",

        "São Paulo (South America, Brazil)",
        "Buenos Aires (South America, Argentina)",
        "Lima (South America, Peru)",
        "Bogotá (South America, Colombia)",
        "Santiago (South America, Chile)",
        "Caracas (South America, Venezuela)",
        "Quito (South America, Ecuador)",
        "Montevideo (South America, Uruguay)",
        "Asunción (South America, Paraguay)",
        "La Paz (South America, Bolivia)",
        "Guayaquil (South America, Ecuador)",
        "Medellín (South America, Colombia)",
        "Córdoba (South America, Argentina)",
        "Rosario (South America, Argentina)",
        "Recife (South America, Brazil)",
        "Belo Horizonte (South America, Brazil)",

        "London (Europe, UK)",
        "Paris (Europe, France)",
        "Berlin (Europe, Germany)",
        "Madrid (Europe, Spain)",
        "Rome (Europe, Italy)",
        "Amsterdam (Europe, Netherlands)",
        "Moscow (Europe, Russia)",
        "Vienna (Europe, Austria)",
        "Barcelona (Europe, Spain)",
        "Lisbon (Europe, Portugal)",
        "Munich (Europe, Germany)",
        "Prague (Europe, Czech Republic)",
        "Warsaw (Europe, Poland)",
        "Dublin (Europe, Ireland)",
        "Brussels (Europe, Belgium)",
        "Athens (Europe, Greece)",
        "Oslo (Europe, Norway)",
        "Stockholm (Europe, Sweden)",
        "Copenhagen (Europe, Denmark)",
        "Budapest (Europe, Hungary)",
        "Zurich (Europe, Switzerland)",
        "Helsinki (Europe, Finland)",
        "Milan (Europe, Italy)",
        "Frankfurt (Europe, Germany)",

        "Tokyo (Asia, Japan)",
        "Beijing (Asia, China)",
        "Shanghai (Asia, China)",
        "Seoul (Asia, South Korea)",
        "Bangkok (Asia, Thailand)",
        "Mumbai (Asia, India)",
        "Delhi (Asia, India)",
        "Jakarta (Asia, Indonesia)",
        "Kuala Lumpur (Asia, Malaysia)",
        "Manila (Asia, Philippines)",
        "Osaka (Asia, Japan)",
        "Chennai (Asia, India)",
        "Bangalore (Asia, India)",
        "Ahmedabad (Asia, India)",
        "Hanoi (Asia, Vietnam)",
        "Taipei (Asia, Taiwan)",
        "Ho Chi Minh City (Asia, Vietnam)",
        "Islamabad (Asia, Pakistan)",
        "Karachi (Asia, Pakistan)",
        "Dhaka (Asia, Bangladesh)",
        "Hyderabad (Asia, India)",
        "Colombo (Asia, Sri Lanka)",
        "Lahore (Asia, Pakistan)",
        "Nagoya (Asia, Japan)",
        "Pune (Asia, India)",

        "Dubai (Middle East, UAE)",
        "Istanbul (Middle East, Turkey)",
        "Riyadh (Middle East, Saudi Arabia)",
        "Tehran (Middle East, Iran)",
        "Doha (Middle East, Qatar)",
        "Amman (Middle East, Jordan)",
        "Jerusalem (Middle East, Israel)",
        "Abu Dhabi (Middle East, UAE)",
        "Muscat (Middle East, Oman)",
        "Baghdad (Middle East, Iraq)",
        "Jeddah (Middle East, Saudi Arabia)",
        "Kuwait City (Middle East, Kuwait)",
        "Manama (Middle East, Bahrain)",
        "Mashhad (Middle East, Iran)",
        "Aleppo (Middle East, Syria)",
        "Beirut (Middle East, Lebanon)",

        "Cairo (Africa, Egypt)",
        "Lagos (Africa, Nigeria)",
        "Nairobi (Africa, Kenya)",
        "Johannesburg (Africa, South Africa)",
        "Addis Ababa (Africa, Ethiopia)",
        "Casablanca (Africa, Morocco)",
        "Accra (Africa, Ghana)",
        "Algiers (Africa, Algeria)",
        "Kampala (Africa, Uganda)",
        "Tunis (Africa, Tunisia)",
        "Dakar (Africa, Senegal)",
        "Luanda (Africa, Angola)",
        "Khartoum (Africa, Sudan)",
        "Harare (Africa, Zimbabwe)",
        "Abuja (Africa, Nigeria)",
        "Gaborone (Africa, Botswana)",
        "Bamako (Africa, Mali)",
        "Maputo (Africa, Mozambique)",
        "Freetown (Africa, Sierra Leone)",
        "Libreville (Africa, Gabon)",

        "Sydney (Oceania, Australia)",
        "Melbourne (Oceania, Australia)",
        "Auckland (Oceania, New Zealand)",
        "Brisbane (Oceania, Australia)",
        "Perth (Oceania, Australia)",
        "Wellington (Oceania, New Zealand)",
        "Adelaide (Oceania, Australia)",
        "Gold Coast (Oceania, Australia)",
        "Canberra (Oceania, Australia)",
        "Hobart (Oceania, Australia)",
        "Darwin (Oceania, Australia)",
        "Christchurch (Oceania, New Zealand)",
        "Hamilton (Oceania, New Zealand)",
        "Townsville (Oceania, Australia)"
      ]

    }
  },
  methods: {
    addTheatre() {
      axios.post(`${process.env.VUE_APP_SERVER}/api/account/theatres/create`, {
        vendor: this.vendorID,
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
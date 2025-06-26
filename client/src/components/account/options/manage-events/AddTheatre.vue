<template>
  <div id = "Form">
    <div class = "fields">
      <label for = "vendorID" class = "no-select fieldLabel">Vendor ID</label>
      <input class = "field" v-model = "vendorID" type = "text" name = "vendorID" id = "vendorID" spellcheck = "false" autocomplete = "off" readonly>
    </div>
    <div class = "fields">
      <label for = "theatreName" class = "no-select fieldLabel">NAME</label>
      <input class = "field" v-model = "theatreName" type = "text" name = "theatreName" id = "theatreName" spellcheck="false" autocomplete = "off">
    </div>
    <button>ADD</button>
  </div>
</template>

<script>
export default {
  name: "AddTheatre",
  data() {
    return {
      vendorID: this.$store.state.auth.UID,
      theatreName: "",
    }
  }
}
</script>

<style scoped src = "../../../../styles/forms.css"></style>
<style scoped src = "../../../../styles/button.css"></style>
<style scoped>

#Form {
  width: 60%;
  height: 30%;
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

button {
  margin: 0 2.3rem 0 0;
  width: 15%;
  height: 20%;
  align-self: flex-end;
}

</style>
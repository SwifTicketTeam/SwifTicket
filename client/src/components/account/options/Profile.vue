<template>
  <div id = "section">
    <label id = "profile-picture">
      <img v-if = "image" :src = "image">
      <input type = "file" ref = "file" accept="image/**" @change = "preview" hidden>
    </label>
    <div id = "about">
      <div class = "fields">
        <label for = "userName" class = "fieldLabel no-select">USERNAME</label>
        <input class = "field" v-model = "username" type = "text" name = "userName" id = "userName" spellcheck="false" autocomplete = "off">
      </div>
      <div class = "fields">
        <label for = "eMail" class = "fieldLabel no-select">EMAIL</label>
        <input class = "field" v-model = "email" type = "text" name = "eMail" id = "eMail" spellcheck="false" autocomplete = "off">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileOption",
  data() {
    return {
      username: "",
      email: "",
      image: null,
    }
  },
  created() {
    this.username = this.$store.state.username;
    this.email = this.$store.state.email;

    axios.get(process.env.VUE_APP_SERVER + `/api/uploads/images/users?token=${this.$store.state.token}`, {
      responseType: "blob",
    }).
    then((res) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.image = evt.target.result;
      }
      reader.readAsDataURL(res.data)
    })
  },
  methods: {
    preview() {
      let file = this.$refs.file.files[0];

      const image = new FormData();
      image.append("userProfilePhoto", file);
      image.append("token", this.$store.state.token);

      axios.post(process.env.VUE_APP_SERVER + "/api/uploads/images/users", image, {
        headers: {"Content-Type": "multipart/form-data"},
        responseType: "blob"
      }).then(() => {
        console.log("Upload Success");
      }).catch((err) => {
        console.log(err);
      })

      const reader = new FileReader();
      reader.onload = (evt) => {
        this.image = evt.target.result;
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped src = "@/styles/forms.css"></style>

<style scoped>

#section {
  display: flex;
}

#profile-picture {
  display: flex;
  align-items: center;
  width: 15rem;
  height: 15rem;
  cursor: pointer;
  margin: 2rem;
  border-radius: 50%;
  border: 0.15rem solid black;
  transition: background-color 0.25s ease-in-out;
}

#profile-picture:hover {
  background-color: #D4D0C9;
}

img {
  margin: 0;
  width: 15rem;
  clip-path: circle(40%);
}

#about {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  width: 71%;
  height: 15rem;
  margin: 2rem 0;
}

.fields {
  height: auto;
}

.field {
  width: 75%;
  height: 3.25rem;
  margin: 0 0.5rem;
}

</style>
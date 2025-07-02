<template>
  <div id = "section">
    <div class = "first">
      <div>
        <label id = "profile-picture">
          <img v-if = "image" :src = "image">
          <input type = "file" ref = "file" accept="image/*" @change = "changeProfilePicture" hidden>
        </label>
        <p :class = "{isWarn : isWarn}">{{ warning }}</p>
      </div>
    </div>
    <div id = "about">
      <div class = "fields">
        <label for = "userName" class = "fieldLabel no-select">USERNAME</label>
        <input class = "field" v-model = "username" type = "text" name = "userName" id = "userName" ref = "name" spellcheck="false" autocomplete = "off" readonly>
        <button @click.prevent = "saveName" ref = "saveName" class = "no-select">EDIT USERNAME</button>
      </div>
      <div class = "fields">
        <label for = "email" class = "fieldLabel no-select">EMAIL</label>
        <input class = "field" v-model = "email" type = "text" name = "email" id = "email" ref = "email" spellcheck="false" autocomplete = "off" readonly>
      </div>
      <div class = "fields">
        <label for = "role" class = "fieldLabel no-select">ROLE</label>
        <input class = "field" v-model = "role" type = "text" name = "role" id = "role" spellcheck="false" autocomplete = "off" readonly>
      </div>
    </div>
    <button @click = "logout" id = "logout">LOGOUT</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileOption",
  data() {
    return {
      uID: this.$store.state.auth.UID,
      username: this.$store.state.auth.username,
      email: this.$store.state.auth.email,
      role: this.$store.state.auth.role,
      bio: this.$store.state.account.bio,
      image: null,
      isImage: false,
      warning: "",
      isWarn: false,
    }
  },
  created() {
    this.role = this.role.charAt(0).toUpperCase() + this.role.slice(1);
    axios.get(`${process.env.VUE_APP_SERVER}/api/uploads/images/users/${this.uID}`, {
      responseType: "blob",
    }).
    then((res) => {
      this.isImage = true;
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.image = evt.target.result;
      }
      reader.readAsDataURL(res.data)
    }).catch(() => {
      this.isWarn = true;
      this.warning = "You have not set up your Profile Picture!";
    })
  },
  methods: {
    changeProfilePicture() {
      let file = this.$refs.file.files[0];

      const image = new FormData();
      image.append("userProfilePhoto", file);

      axios.post(`${process.env.VUE_APP_SERVER}/api/uploads/images/users/${this.uID}`, image, {
        headers: {"Content-Type": "multipart/form-data"},
      }).then(() => {
        this.isWarn = false;
        this.warning = "";
        const reader = new FileReader();
        reader.onload = (evt) => {
          this.image = evt.target.result;
        }
        reader.readAsDataURL(file)
      }).catch((err) => {
        this.isWarn = true;
        this.warning = err.response.data.message;
      });
    },
    saveName() {
      if (this.$refs.saveName.textContent === "SAVE USERNAME") {
        this.$store.dispatch("auth/saveName", this.username)
        axios.put(process.env.VUE_APP_SERVER + '/api/account/users/' + this.uID, {
          username: this.$store.state.auth.username,
        }).then(() => {
        }).catch(() => {
        });
        this.$refs.saveName.textContent = "EDIT USERNAME"
        this.$refs.name.readOnly = true;
      } else {
        this.$refs.saveName.textContent = "SAVE USERNAME"
        this.$refs.name.readOnly = false;
      }
    },
    logout() {
      this.$store.dispatch('auth/deleteToken');
      this.$router.push({ path: "/" });
    }
  }
}
</script>

<style scoped src = "@/styles/forms.css"></style>
<style scoped src = "@/styles/button.css"></style>
<style scoped>

#section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.first {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}

span.field {
  display: flex;
  align-items: center;
}

p {
  width: 15rem;
  height: 1rem;
  font-size: 1rem;
  justify-self: center;
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
  width: 104%;
  height: 15rem;
  margin: 2rem 0;
}

.fields {
  height: auto;
  display: flex;
  justify-content: flex-start;
}

.fields label {
  width: 23.2%;
}

.field {
  width: 48.8%;
  height: 3.25rem;
  margin: 0 0.5rem;
  background-color: #FFF;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.01rem rgba(0, 0, 0, 0.2);
}

button {
  margin: 0 0 0 0.5rem;
  font-size: 1.3rem;
  width: 20%;
  height: 100%;
  box-shadow: 0.01rem 0.01rem 0.5rem 0.01rem rgba(0, 0, 0, 0.2);
  transition: border-radius 0.3s ease,
              background-color 0.3s ease,
              opacity 0.3s ease;
}

button:hover {
  border-radius: 1rem;
}

#logout {
  width: 12%;
  height: 6%;
  margin: 1rem auto;
}

</style>
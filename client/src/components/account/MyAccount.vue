<template>
  <div id = "account">
    <AccountHeader></AccountHeader>
    <div id = "myAccount">
      <AccountOptions></AccountOptions>
      <AccountSection></AccountSection>
    </div>
  </div>
</template>

<script>
import AccountHeader from "./AccountHeader.vue";
import AccountOptions from "./AccountOptions.vue";
import AccountSection from "./AccountSection.vue";

export default{
  name: "MyAccount",
  components: {
    AccountHeader,
    AccountOptions,
    AccountSection
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/");
    }
  }
};

</script>

<style scoped>

#account {
  display: flex;
  width: 100%;
}

#myAccount {
  display: flex;
  flex-direction: row;
  margin-top: 12vh;
  width: 100%;
  height: auto;
}
</style>
<template>
  <div>
    <div class="itemsbar">
      <v-app-bar app class="navbar">
        <v-img src="../assets/logo.png" max-height="25" max-width="25"></v-img>
        <v-toolbar-title>Game <b>Tracker</b></v-toolbar-title>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");
.navbar {
  background: #0b1641 !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;

  color: #ffffff;
}
</style>

<template>
  <div>
    <v-app id="inspire">
      <NavBar />
      <v-navigation-drawer v-model="drawer" fixed temporary>
        <!--  -->
      </v-navigation-drawer>

      <v-main class="fundo lighten-2">
        <v-container>
          <v-row>
            <template>
              <v-col :key="n" class="mt-2" cols="12" style="color: aliceblue">
                <strong>Ofertas</strong>
                <ProcurarItems />
              </v-col>
              <v-col v-for="j in 12" :key="`${n}${j}`" cols="6" md="2">
                <v-sheet class="itemsImg" height="150"> Teste </v-sheet>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-main>
      <FooterTracker />
    </v-app>
  </div>
</template>

<script>
import FooterTracker from "./components/FooterTracker.vue";
import NavBar from "./components/NavBar.vue";
import ProcurarItems from "./components/ProcurarItems.vue";
export default {
  data: () => ({ drawer: null }),
  components: { NavBar, ProcurarItems, FooterTracker },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");
.fundo {
  background: linear-gradient(45deg, #0b1641 0%, #c70160 100%) !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 42px;
}
.itemsImg {
  background: #0b1641;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  color: aliceblue;
}
</style>

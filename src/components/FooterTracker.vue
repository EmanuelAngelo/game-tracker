<template>
  <v-footer padless style="background: #0b1641">
    <v-card>
      <v-card-text class="white--text format pt-0" style="background: #0b1641">
        © 2023, Game Tracker Inc. Todos os direitos reservados. Nulla facilisi.
        Etiam sagittis congue tempor. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas. Suspendisse eu
        velit et ante luctus egestas. Aenean sed nisi tellus. Duis non ornare
        libero. Quisque suscipit maximus nisi, in gravida felis. Cras ornare
        mauris ac nisi congue, ut condimentum sem tincidunt. Phasellus semper
        tellus malesuada turpis gravida cursus. Duis nec eleifend nunc, vitae
        finibus elit. Aliquam eget diam vitae purus suscipit viverra.
      </v-card-text>
      <v-card-text style="background: #0b1641">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" text>
          <v-card-title class="titulos-footer">
            {{ icon }}
          </v-card-title>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text" style="background: #0b1641">
        {{ new Date().getFullYear() }} — <strong>Emanuel Angelo</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "FooterTracker",
  data: () => ({
    icons: [
      "Termos de Serviço",
      "Política de Privacidade",
      "Política de Privacidade",
      "Política de Privacidade",
    ],
  }),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");
.white--text {
  top: 40.51%;
  font-family: "Roboto" !important;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 180%;
  /* or 25px */
  text-align: justify;
  text-transform: capitalize;
}
.titulos-footer {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 180%;
  /* or 25px */
  text-align: justify;
  color: #ffffff;
}
</style>

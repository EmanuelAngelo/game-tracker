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
                Ofertas
                <ProcurarDescontos />
              </v-col>
              <v-container class="fill-height" fluid style="min-height: 434px">
                <v-fade-transition mode="out-in">
                  <v-row>
                    <v-col
                      v-for="produto of produtos"
                      :key="produto.storeID"
                      cols="6"
                      md="4"
                    >
                      <v-card class="v-card">
                        <v-img
                          :src="produto.thumb"
                          max-width="380"
                          max-height="147"
                          class="darken-4"
                        ></v-img>
                        <div>
                          <v-card-title class="text-h6">
                            {{ produto.title }} -
                            <s> ${{ produto.normalPrice }}</s> - ${{
                              produto.salePrice
                            }}
                          </v-card-title>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-container>
              <!-- Botão carregar mais -->
              <v-row class="btn-margin" align="center" justify="center">
                <v-btn
                  class="ma-3"
                  rounded
                  :loading="loading"
                  :disabled="loading"
                  color="secondary"
                  @click="loader = 'loading'"
                  >Carregar mais
                </v-btn>
              </v-row>
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
import ProcurarDescontos from "./components/ProcurarDescontos.vue";
import Produtos from "./services/produtos";

export default {
  data() {
    return {
      loader: null,
      loading: false,
      produtos: [],
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  mounted() {
    Produtos.listar().then((resposta) => {
      console.log(resposta.data);
      this.produtos = resposta.data;
    });
  },

  components: { NavBar, ProcurarDescontos, FooterTracker },
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
.v-card {
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: #0b1641;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 380px;
  height: 251px;

  color: azure;
}
.btn-margin {
  margin: auto !important;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

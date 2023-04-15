<template>
  <div>
    <v-app id="inspire">
      <NavBar />
      <v-main class="fundo lighten-2">
        <v-container>
          <v-row>
            <template>
              <v-col class="mt-2" cols="12" style="color: aliceblue">
                Ofertas
                <ProcurarDescontos
                  @input="handleFilterTextChange"
                  @change="handlerFilterSelectChange"
                />
              </v-col>
              <v-container class="fill-height" fluid style="min-height: 434px">
                <v-fade-transition mode="out-in">
                  <v-row>
                    <v-col
                      v-for="produto in produtos"
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
                            <span>{{ calcularDesconto(produto.savings) }}</span>
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
                  @click="handlerButtonClick"
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
      qtdProdutosNaLista: 9,
      filtroTexto: "",
      ordem: 0,
      ordenarPor: "Savings",
    };
  },

  mounted() {
    this.atualizarListaProdutos("", "");
  },

  methods: {
    atualizarListaProdutos() {
      Produtos.listar(
        this.ordenarPor,
        this.ordem,
        this.filtroTexto,
        this.qtdProdutosNaLista
      ).then((resposta) => {
        console.log(resposta.data);
        this.produtos = resposta.data;
      });
    },
    handlerButtonClick() {
      const incremento = 3;
      this.qtdProdutosNaLista += incremento;
      this.atualizarListaProdutos();
    },
    handleFilterTextChange(event) {
      this.filtroTexto = event;
      this.atualizarListaProdutos();
    },
    handlerFilterSelectChange(event) {
      console.log(event);
      switch (event) {
        case "% de Desconto":
          this.ordenarPor = "Savings";
          this.ordem = 0;
          break;
        case "Menor preço":
          this.ordenarPor = "Price";
          this.ordem = 0;
          break;
        case "Maior preço":
          this.ordenarPor = "Price";
          this.ordem = 1;
          break;
        case "Título":
          this.ordenarPor = "Title";
          this.ordem = 0;
          break;
      }
      this.atualizarListaProdutos();
    },
    ordenarLista(lista, atributo, ordem) {
      if (ordem === "asc") {
        lista.sort((a, b) => (a[atributo] > b[atributo] ? 1 : -1));
      } else if (ordem === "desc") {
        lista.sort((a, b) => (a[atributo] < b[atributo] ? 1 : -1));
      }
      return lista;
    },
    calcularDesconto(desconto) {
      const descontoInt = parseInt(desconto);
      let descontoTexto = "";
      switch (descontoInt) {
        case 100:
          descontoTexto = "GRÁTIS";
          break;
        default:
          descontoTexto = `-${descontoInt}%`;
          break;
      }
      return descontoTexto;
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
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

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
                      :key="produto.gameID"
                      cols="6"
                      lg="4"
                    >
                      <div class="card-wrapper">
                        <v-card class="card">
                          <v-img
                            :src="produto.thumb"
                            max-width="380"
                            max-height="147"
                          ></v-img>
                          <v-card-title class="text-h5">
                            {{ produto.title }}
                            <!-- <v-btn text class="ml-2">DETALHES</v-btn> -->
                          </v-card-title>
                          <v-card-text>
                            <s>{{ produto.normalPrice }}</s>
                            <span class="sale-price">{{
                              produto.salePrice
                            }}</span>
                          </v-card-text>
                          <v-card-actions class="actions">
                            <v-btn text color="white" class="ml-auto">
                              DETALHES
                            </v-btn>
                            <v-spacer />
                            <v-btn
                              width="84px"
                              height="39px"
                              border="8px"
                              class="mr-2 mr"
                            >
                              {{ calcularDesconto(produto.savings) }}
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </div>
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
  width: 100%;
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

/**/
.card-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.sale-price {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: right;
  color: white;
}

.actions {
  padding: 10px 0;
}

.btn-margin {
  margin-top: 20px;
}
/**/

.card {
  height: 255px;
  width: 380px;
  border-radius: 8px;
  position: relative;
}

.card .v-card__title {
  font-family: "Roboto", sans-serif;
}

.card .v-card__text > s {
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  text-decoration: line-through;
}

.card .v-card__text > .sale-price {
  font-size: 18px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  margin-left: 8px;
}

.card .v-card__actions {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
}
.card .v-card__actions > .v-btn {
  margin-left: 8px;
}

.card .details {
  font-family: "Roboto", sans-serif;
}

.ml-auto {
  background: #c70160;
  border-radius: 8px;
}
</style>

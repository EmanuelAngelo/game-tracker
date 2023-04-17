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
                      <div>
                        <v-card class="mx-auto v-card">
                          <v-img
                            class="itemsImg"
                            :src="produto.thumb"
                            height="120px"
                          ></v-img>
                          <div class="titulo">
                            <v-card-title class="text-h5">
                              {{ produto.title }}
                            </v-card-title>
                          </div>
                          <v-card-actions>
                            <div class="detalhes">
                              <v-btn style="background: #c70160; color: white">
                                DETALHES
                              </v-btn>
                            </div>
                            <v-spacer></v-spacer>
                            <div class="normalPrice">
                              <s>$ {{ produto.normalPrice }}</s>
                            </div>
                            <div class="sale-price">
                              <span>$ {{ produto.salePrice }} </span>
                            </div>
                            <div class="savings">
                              <v-btn style="background: #16857b; color: white">
                                {{ calcularDesconto(produto.savings) }}
                              </v-btn>
                            </div>
                          </v-card-actions>
                        </v-card>
                      </div>
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-container>
              <!-- Botão carregar mais -->
              <v-row
                class="btn-margin"
                align="center"
                justify="center"
                style="padding: 10px"
              >
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
  border-radius: 8px 8px 0px 0px !important;
  color: aliceblue;
  width: 100%;
}
.v-card {
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  max-width: 380px;
  max-height: 290px !important;
  background: #0b1641;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.normalPrice {
  position: absolute;
  left: 58.16%;
  right: 30%;
  top: 79.68%;
  bottom: 14.74%;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 100;
  font-size: 12px;
  line-height: 14px;

  text-align: right;
  text-decoration-line: line-through;

  color: #ffffff;
}
.sale-price {
  position: absolute;
  left: 57.63%;
  top: 85.26%;
  bottom: 6.37%;

  font-family: "Roboto";
  font-style: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: right;
  color: #ffffff;
}
.savings {
  position: absolute;
  right: 4.21%;
  top: 78.09%;
  bottom: 6.37%;
  border-radius: 8px;
  padding: 0 0px;
}
.detalhes {
  position: absolute;
  right: 65.26%;
  top: 78.09%;
  bottom: 6.37%;
}
.titulo {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;

  color: #ffffff;
}
.v-card__actions {
  align-items: center;
  display: flex;
  padding: 21px;
}
</style>

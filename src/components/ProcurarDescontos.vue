<template>
  <v-container fluid>
    <v-row align="center" justify="space-between">
      <v-col cols="12" sm="3" md="3">
        <v-text-field
          dark
          class="procurar"
          label="Procurar"
          outlined
          @input="$emit('input', $event)"
        ></v-text-field>
      </v-col>

      <v-col class="d-flex" cols="12" sm="auto">
        <div class="ordenar-por">Ordenar por:</div>
        <div class="select-wrapper">
          <v-select
            :items="items"
            label="% de Desconto"
            dense
            solo
            @change="$emit('change', $event)"
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProcurarDescontos",
  data: () => ({
    items: ["% de Desconto", "Maior preço", "Menor preço", "Título"],
  }),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");
.procurar {
  background: #0b1641;
  border-radius: 8px;
  width: 380px;
  height: 55px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
  line-height: 21px;
}
.d-flex {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */
  display: flex;
  align-items: center;
  text-align: right;
  color: #ffffff;
}
.ordenar-por {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  margin-left: 20px;
}

.select-wrapper {
  margin-left: 20px;
}

@media screen and (max-width: 600px) {
  .d-flex {
    flex-direction: column;
    align-items: center;
  }

  .ordenar-por,
  .select-wrapper {
    display: block;
    text-align: center;
  }

  .ordenar-por {
    margin-bottom: 10px;
  }
}
</style>

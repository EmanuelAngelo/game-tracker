<v-card-text class="text--primary">
<div>
    <s>{{ produto.normalPrice }}</s>
</div>
<div>
    <span class="sale-price">{{
    produto.salePrice
    }}</span>
</div>
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

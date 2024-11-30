<template>
  <div class="container">
    <h1 class="my-4">Detalhes do Carrinho</h1>
    <div v-if="cart">
      <p><strong>ID do Carrinho:</strong> {{ cart.id }}</p>
      <p><strong>ID do Usuário:</strong> {{ cart.userId }}</p>
      <p><strong>Data:</strong> {{ formatDate(cart.date) }}</p>

      <h3>Itens no Carrinho</h3>
      <ul class="list-group">
        <li v-for="item in cart.products" :key="item.productId" class="list-group-item">
          Produto ID: {{ item.productId }} - Quantidade: {{ item.quantity }} 
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Carregando...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartDetails',
  data() {
    return {
      cartId: this.$route.params.id, // Recupera o ID do carrinho da URL
    };
  },
  computed: {
    ...mapGetters(['cartDetails']),
    cart() {
      return this.cartDetails;  // Aqui você retorna diretamente o objeto do carrinho
    }
  },
  methods: {
    ...mapActions(['fetchCartDetails']),
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('pt-BR', options);
    }
  },
  created() {
    this.fetchCartDetails(this.cartId); // Busca os detalhes do carrinho ao criar o componente
  }
};
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>

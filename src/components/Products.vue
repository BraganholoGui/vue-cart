<template>
  <div class="container py-5">
    <h1 class="text-center mb-5 text-3xl font-bold">Produtos</h1>

    <div class="row mb-4">
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <input
          type="text"
          v-model="search"
          class="form-control"
          placeholder="Buscar produtos"
        />
      </div>
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <select
          v-model="selectedCategory"
          @change="filterByCategory"
          class="form-control"
        >
          <option value="">Todas as Categorias</option>
          <option v-for="category in allCategories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-12 col-md-4">
        <select
          v-model="sortOrder"
          @change="sortProducts"
          class="form-control"
        >
          <option value="price">Ordenar por Preço</option>
          <option value="rating">Ordenar por Avaliação</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <div class="card h-100">
          
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-3 text-truncate">{{ product.title }}</h5>
            <p class="card-text text-truncate mb-3">{{ product.description }}</p>
            <p class="font-weight-bold text-primary">R${{ product.price }}</p>
            <div class="mt-auto d-flex justify-content-between">
              <button
                @click="viewProduct(product.id)"
                class="btn btn-primary"
              >
                Visualizar
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="btn btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Products',
  data() {
    return {
      search: '',
      selectedCategory: '',
      sortOrder: 'price',
    };
  },
  computed: {
    ...mapGetters(['allProducts', 'allCategories']),
    filteredProducts() {
      let products = this.allProducts;
      if (this.search) {
        products = products.filter(product => product.title.toLowerCase().includes(this.search.toLowerCase()));
      }
      if (this.selectedCategory) {
        products = products.filter(product => product.category === this.selectedCategory);
      }
      return products;
    },
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories', 'deleteProduct']),
    viewProduct(id) {
      this.$router.push(`/products/${id}`);
    },
    sortProducts() {
      if (this.sortOrder === 'price') {
        this.allProducts.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === 'rating') {
        this.allProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      }
    },
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
};
</script>

<style scoped>
</style>

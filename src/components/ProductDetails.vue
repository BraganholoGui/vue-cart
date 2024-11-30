<template>
  <div class="container my-4" style="display: flex; justify-content: space-around;">
    <!-- Exibição de Informações do Produto -->
    <div v-if="product" class="text-center col-md-6"  >
      <h1 class="display-4">{{ product.title }}</h1>
      <img :src="product.image" alt="product.title" class="rounded-lg shadow mb-3" style="width: 200px; height: 200px;">
      <p>{{ product.description }}</p>
      <p class="h5 text-success"><strong>${{ product.price }}</strong></p>
    </div>

    <!-- Formulário de Cadastro ou Edição -->
    <div class="col-md-6">
      <h2 class="h4 text-center mb-4">
        {{ product ? 'Editar Produto' : 'Cadastrar Novo Produto' }}
      </h2>
      <form @submit.prevent="openModal" class="bg-white p-4 border rounded shadow-lg">
        <div class="mb-3">
          <label for="title" class="form-label">Título</label>
          <input
            type="text"
            id="title"
            v-model="newProduct.title"
            required
            class="form-control"
            placeholder="Digite o título do produto"
          />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Descrição</label>
          <textarea
            id="description"
            v-model="newProduct.description"
            required
            class="form-control"
            rows="3"
            placeholder="Digite uma descrição do produto"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Preço</label>
          <input
            type="number"
            id="price"
            v-model="newProduct.price"
            required
            min="0"
            step="0.01"
            class="form-control"
            placeholder="Digite o preço do produto"
          />
        </div>

        <div class="mb-3">
          <label for="image" class="form-label">Imagem (URL)</label>
          <input
            type="url"
            id="image"
            v-model="newProduct.image"
            required
            class="form-control"
            placeholder="Insira o link da imagem do produto"
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100"
        >
          {{ product ? 'Editar Produto' : 'Cadastrar Produto' }}
        </button>
      </form>
    </div>

    <div v-if="isModalVisible" class="modal d-block bg-opacity-50">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Cadastro</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Você deseja {{ product ? 'editar' : 'cadastrar' }} o produto com os seguintes dados?</p>
            <ul>
              <li><strong>Título:</strong> {{ newProduct.title }}</li>
              <li><strong>Descrição:</strong> {{ newProduct.description }}</li>
              <li><strong>Preço:</strong> ${{ newProduct.price }}</li>
              <li><strong>Imagem:</strong> {{ newProduct.image }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              @click="confirmSubmit"
              class="btn btn-success"
            >
              Confirmar
            </button>
            <button
              @click="closeModal"
              class="btn btn-danger"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductDetails',
  data() {
    return {
      newProduct: {
        title: '',
        description: '',
        price: 0,
        image: ''
      },
      isModalVisible: false // Controla a exibição do modal
    };
  },
  computed: {
    ...mapGetters(['singleProduct']),
    product() {
      return this.singleProduct;
    }
  },
  methods: {
    ...mapActions(['fetchProduct', 'addProduct', 'updateProduct']),
    
    // Abre o modal
    openModal() {
      this.isModalVisible = true;
    },
    
    // Fecha o modal
    closeModal() {
      this.isModalVisible = false;
    },
    
    // Confirma a ação de cadastro ou edição
    confirmSubmit() {
      if (this.product) {
        // Se estamos editando um produto, usamos a ação de update
        this.updateProduct({ id: this.product.id, ...this.newProduct }).then(() => {
          alert('Produto editado com sucesso!');
          this.closeModal(); // Fecha o modal após confirmação
        }).catch((error) => {
          console.error("Erro ao editar produto:", error);
          this.closeModal(); // Fecha o modal mesmo em caso de erro
        });
      } else {
        // Se estamos criando um novo produto, usamos a ação de add
        this.addProduct(this.newProduct).then(() => {
          this.newProduct = { title: '', description: '', price: 0, image: '' }; // Limpa o formulário
          alert('Produto cadastrado com sucesso!');
          this.closeModal(); // Fecha o modal após confirmação
        }).catch((error) => {
          console.error("Erro ao cadastrar produto:", error);
          this.closeModal(); // Fecha o modal mesmo em caso de erro
        });
      }
    }
  },
  created() {
    const productId = this.$route.params.id;
    if (productId) {
      this.fetchProduct(productId); // Carregar o produto se um ID for fornecido
    }
  },
  watch: {
    product(newProduct) {
      if (newProduct) {
        // Preenche o formulário com os dados do produto para edição
        this.newProduct = { ...newProduct };
      }
    }
  }
};
</script>

<style scoped>
.modal.d-block {
  display: block !important;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

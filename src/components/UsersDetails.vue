<template>
  <div class="container my-4">
    <div v-if="user" class="text-center mb-4">
      <h1 class="h3 font-weight-bold">{{ user.name.firstname }} {{ user.name.lastname }}</h1>
      <p>Email: {{ user.email }}</p>
      <p>Telefone: {{ user.phone }}</p>
      <p>Endereço: {{ user.address.street }}, {{ user.address.city }} - {{ user.address.zipcode }}</p>
    </div>

    <div>
      <h2 class="h4 text-center mb-4">{{ user ? 'Editar Dados do Usuário' : 'Cadastrar Novo Usuário' }}</h2>
      <form class="bg-light p-4 rounded shadow-sm">
        <div class="mb-3">
          <label for="firstname" class="form-label">Nome</label>
          <input
            type="text"
            id="firstname"
            v-model="newUser.name.firstname"
            required
            class="form-control"
            placeholder="Digite o nome"
          />
        </div>

        <!-- Sobrenome -->
        <div class="mb-3">
          <label for="lastname" class="form-label">Sobrenome</label>
          <input
            type="text"
            id="lastname"
            v-model="newUser.name.lastname"
            required
            class="form-control"
            placeholder="Digite o sobrenome"
          />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="newUser.email"
            required
            class="form-control"
            placeholder="Digite o email"
          />
        </div>

        <!-- Telefone -->
        <div class="mb-3">
          <label for="phone" class="form-label">Telefone</label>
          <input
            type="text"
            id="phone"
            v-model="newUser.phone"
            required
            class="form-control"
            placeholder="Digite o telefone"
          />
        </div>

        <!-- Endereço -->
        <div class="mb-3">
          <label for="street" class="form-label">Endereço</label>
          <input
            type="text"
            id="street"
            v-model="newUser.address.street"
            required
            class="form-control"
            placeholder="Digite o endereço"
          />
        </div>

        <!-- Cidade -->
        <div class="mb-3">
          <label for="city" class="form-label">Cidade</label>
          <input
            type="text"
            id="city"
            v-model="newUser.address.city"
            required
            class="form-control"
            placeholder="Digite a cidade"
          />
        </div>

        <!-- CEP -->
        <div class="mb-3">
          <label for="zipcode" class="form-label">CEP</label>
          <input
            type="text"
            id="zipcode"
            v-model="newUser.address.zipcode"
            required
            class="form-control"
            placeholder="Digite o CEP"
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100"
        >
          {{ user ? 'Atualizar Dados' : 'Cadastrar Usuário' }}
        </button>
      </form>
    </div>

    <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
      <div class="bg-white p-4 rounded-lg w-75">
        <h3 class="h5 text-center mb-4">Confirmar Alteração</h3>
        <p class="text-center mb-4">Você deseja {{ user ? 'editar' : 'cadastrar' }} os dados do usuário com as seguintes informações?</p>
        <ul class="mb-4">
          <li><strong>Nome:</strong> {{ newUser.name.firstname }} {{ newUser.name.lastname }}</li>
          <li><strong>Email:</strong> {{ newUser.email }}</li>
          <li><strong>Telefone:</strong> {{ newUser.phone }}</li>
          <li><strong>Endereço:</strong> {{ newUser.address.street }}, {{ newUser.address.city }} - {{ newUser.address.zipcode }}</li>
        </ul>
        <div class="d-flex justify-content-between">
          <button 
            @click="confirmSubmit" 
            class="btn btn-success">
            Confirmar
          </button>
          <button 
            @click="closeModal" 
            class="btn btn-danger">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserDetails',
  data() {
    return {
      newUser: {
        name: {
          firstname: '',
          lastname: ''
        },
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          zipcode: ''
        }
      },
      isModalVisible: false
    };
  },
  computed: {
    ...mapGetters(['singleUser']),
    user() {
      return this.singleUser;
    }
  },
  methods: {
    ...mapActions(['fetchUser', 'addUser', 'updateUser']),
    
    openModal() {
      this.isModalVisible = true; // Mostra o modal
    },
    
    closeModal() {
      this.isModalVisible = false; // Fecha o modal
    },
    
    confirmSubmit() {
      if (this.user) {
        // Se estamos editando um usuário, chamamos updateUser
        this.updateUser({ id: this.user.id, ...this.newUser }).then(() => {
          alert('Dados do usuário atualizados com sucesso!');
          this.closeModal();
        }).catch((error) => {
          console.error("Erro ao editar usuário:", error);
          this.closeModal();
        });
      } else {
        // Se estamos criando um novo usuário, chamamos addUser
        this.addUser(this.newUser).then(() => {
          this.newUser = { name: { firstname: '', lastname: '' }, email: '', phone: '', address: { street: '', city: '', zipcode: '' } };
          alert('Usuário cadastrado com sucesso!');
          this.closeModal();
        }).catch((error) => {
          console.error("Erro ao cadastrar usuário:", error);
          this.closeModal();
        });
      }
    }
  },
  created() {
    const userId = this.$route.params.id;
    if (userId) {
      this.fetchUser(userId); 
    }
  },
  watch: {
    user(newUser) {
      if (newUser) {
        this.newUser = { ...newUser };
      }
    }
  }
};
</script>

<style scoped>
/* Evitar scroll horizontal */
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* Estilizando a modal e o fundo */
.fixed {
  position: fixed;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.5);
}

.z-50 {
  z-index: 50;
}

.modal-dialog {
  max-width: 500px;
}
</style>

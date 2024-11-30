<template>
  <div>
    <h1 class="my-4">Usuários</h1>
    
    <!-- Barra de Pesquisa, Filtro e Ordenação -->
    <div class="row mb-4">
      <div class="col-md-4">
        <input type="text" class="form-control" v-model="search" placeholder="Buscar usuários">
      </div>
      <div class="col-md-4">
        <select class="form-control" v-model="selectedCategory" @change="filterByCategory">
          <option value="">Todas as Categorias</option>
          <option v-for="category in allCategories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <select class="form-control" v-model="sortOrder" @change="sortUsers">
          <option value="name">Ordenar por Nome</option>
          <option value="email">Ordenar por Email</option>
        </select>
      </div>
    </div>

    <!-- Lista de Usuários em Cartões -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="user in filteredUsers" :key="user.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ user.name.firstname }} {{ user.name.lastname }}</h5>
            <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
            <p class="card-text"><strong>Telefone:</strong> {{ user.phone }}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-info" @click="viewUser(user.id)">Visualizar</button>
              <button class="btn btn-danger" @click="deleteUser(user.id)">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulário de Adicionar Novo Usuário -->
    <form @submit.prevent="addUser" class="d-flex">
      <input v-model="newUser.firstname" class="form-control me-2" placeholder="Nome" />
      <input v-model="newUser.lastname" class="form-control me-2" placeholder="Sobrenome" />
      <button type="submit" class="btn btn-primary">Adicionar Usuário</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Users',
  data() {
    return {
      search: '',
      selectedCategory: '',
      sortOrder: 'name', // Ordenação inicial por nome
      newUser: {
        firstname: '',
        lastname: '',
      },
      selectedUser: null,
    };
  },
  computed: {
    ...mapGetters(['allUsers', 'allCategories']),
    
    // Filtra os usuários com base na pesquisa
    filteredUsers() {
      let users = this.allUsers;
      
      if (this.search) {
        users = users.filter(user => 
          `${user.name.firstname} ${user.name.lastname}`
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      }

      // Filtro por categoria, caso haja categorias
      if (this.selectedCategory) {
        users = users.filter(user => user.category === this.selectedCategory);
      }

      return users;
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'addUser', 'deleteUser', 'fetchUser']),
    
    // Função para adicionar novo usuário
    async addUser() {
      try {
        await this.addUser(this.newUser);
        this.newUser.firstname = '';
        this.newUser.lastname = '';
      } catch (error) {
        alert(error.message);
      }
    },
    
    // Visualizar detalhes do usuário
    async viewUser(id) {
      try {
        const response = await this.fetchUser(id);
        this.selectedUser = response.data;
        this.$router.push(`/users/${id}`);
      } catch (error) {
        alert(error.message);
      }
    },

    // Excluir usuário
    async deleteUser(id) {
      try {
        await this.deleteUser(id);
        alert("Usuário excluído com sucesso");
        this.fetchUsers(); // Recarrega a lista de usuários após a exclusão
      } catch (error) {
        alert(error.message);
      }
    },

    // Função de ordenação dos usuários
    sortUsers() {
      if (this.sortOrder === 'name') {
        this.allUsers.sort((a, b) => {
          const nameA = `${a.name.firstname} ${a.name.lastname}`.toLowerCase();
          const nameB = `${b.name.firstname} ${b.name.lastname}`.toLowerCase();
          return nameA > nameB ? 1 : -1;
        });
      } else if (this.sortOrder === 'email') {
        this.allUsers.sort((a, b) => a.email.localeCompare(b.email));
      }
    },

    // Função para filtrar por categoria, caso necessário
    filterByCategory() {
      this.fetchUsers(); // Recarrega os usuários filtrados por categoria
    }
  },
  created() {
    this.fetchUsers(); // Carrega os usuários no início
    // this.fetchCategories(); // Carrega as categorias caso exista algum filtro
  },
};
</script>

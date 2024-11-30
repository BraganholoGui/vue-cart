import axios from 'axios';
import { isSameDay, isWithinRange } from '../../utils/dateUtils'; // Certifique-se de que essas funções estão corretas

const state = {
  carts: [],
  cartDetails: {},
  filteredCarts: [],  // Vamos armazenar os carrinhos filtrados aqui, se necessário
};

const getters = {
  allCarts: (state) => state.carts,
  cartDetails: (state) => state.cartDetails,
  filteredCarts: (state) => (filter) => {
    let filtered = state.carts;

    // Filtrando por data
    if (filter.date) {
      const selectedDate = new Date(filter.date); // Converte a data do filtro em objeto Date

      // Usando isSameDay para comparar as datas
      filtered = filtered.filter(cart => isSameDay(new Date(cart.date), selectedDate));
    }

    // Filtrando por userId
    if (filter.userId) {
      filtered = filtered.filter(cart => cart.userId === parseInt(filter.userId));  // Filtro por userId
    }

    return filtered;
  },
};

const actions = {
  // Ação para buscar os carrinhos e aplicar o filtro
  async fetchCarts({ commit }, filter) {
    try {
      const response = await axios.get('https://fakestoreapi.com/carts');
      commit('setCarts', response.data);

      // Depois que os dados são carregados, podemos aplicar o filtro
      const filteredCarts = getters.filteredCarts(state)(filter);
      commit('setFilteredCarts', filteredCarts); // Armazena os carrinhos filtrados, se necessário
    } catch (error) {
      console.error('Erro ao carregar carrinhos:', error);
    }
  },
  
  async fetchCartDetails({ commit }, id) {
    try {
      const response = await axios.get(`https://fakestoreapi.com/carts/${id}`);
      commit('setCartDetails', response.data); // Garantir que seja um objeto único
    } catch (error) {
      console.error('Erro ao carregar detalhes do carrinho:', error);
    }
  },
  
  async addItemToCart({ commit }, { cartId, item }) {
    try {
      const response = await axios.post(`https://fakestoreapi.com/carts/${cartId}`, item);
      commit('updateCart', response.data);
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
    }
  },

  async updateCartItem({ commit }, { cartId, itemId, item }) {
    try {
      const response = await axios.put(`https://fakestoreapi.com/carts/${cartId}/items/${itemId}`, item);
      commit('updateCart', response.data);
    } catch (error) {
      console.error('Erro ao atualizar item do carrinho:', error);
    }
  },

  async removeItemFromCart({ commit }, { cartId, itemId }) {
    try {
      await axios.delete(`https://fakestoreapi.com/carts/${cartId}/items/${itemId}`);
      commit('removeItem', { cartId, itemId });
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
    }
  },
};

const mutations = {
  setCarts: (state, carts) => {
    state.carts = carts;
  },

  setCartDetails: (state, cart) => {
    state.cartDetails = cart;
  },
  
  setFilteredCarts: (state, filteredCarts) => {
    state.filteredCarts = filteredCarts; // Armazena os carrinhos filtrados
  },
  
  setCartDetails: (state, cart) => {
    state.cartDetails = cart;
  },

  updateCart: (state, updatedCart) => {
    const index = state.carts.findIndex(cart => cart.id === updatedCart.id);
    if (index !== -1) {
      state.carts.splice(index, 1, updatedCart);
    }
  },

  removeItem: (state, { cartId, itemId }) => {
    const cart = state.carts.find(cart => cart.id === cartId);
    if (cart) {
      cart.items = cart.items.filter(item => item.id !== itemId);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

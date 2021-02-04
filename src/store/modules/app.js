// Pathify
import { make } from 'vuex-pathify' 
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
   {
        title: 'dashboard',
        icon: 'mdi-desktop-mac-dashboard',
        to: 'Dashboard',
        url: '/Dashboard'
      },
      {
        title: 'users',
        icon: 'mdi-account',
        to: 'Users',
        url: '/Users'
      },
      {
        title: 'product',
        icon: 'mdi-package-variant',
        to: 'Products',
        url: '/Products'
      },
      {
        title: 'categoriers',
        icon: 'mdi-shape-outline',
        to: 'Categoriers',
        url: '/Categoriers'
      },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

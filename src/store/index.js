import { createStore } from 'vuex';

export default createStore({
  state: {
    showInvoiceModal: false,
    showModal: false,
  },
  mutations: {
    TOGGLE_INVOICE_MODAL (state) {
      state.showInvoiceModal =  !state.showInvoiceModal;
    },

    TOGGLE_MODAL (state) {
      state.showModal =  !state.showModal;
    }
  },
  actions: {
  },
  modules: {
  }
});

import { createStore } from 'vuex'

export default createStore({
  state: {
    showInvoiceModal: false
  },
  mutations: {
    TOGGLE_INVOICE_MODAL (state) {
      state.showInvoiceModal =  !state.showInvoiceModal;
    }
  },
  actions: {
  },
  modules: {
  }
})

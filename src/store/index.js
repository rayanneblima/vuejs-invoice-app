import { createStore } from 'vuex';
import { db } from "../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';

export default createStore({
  state: {
    invoiceData: [],
    showInvoiceModal: false,
    showModal: false,
    invoicesLoaded: false
  },

  mutations: {
    TOGGLE_INVOICE_MODAL (state) {
      state.showInvoiceModal =  !state.showInvoiceModal;
    },

    TOGGLE_MODAL (state) {
      state.showModal =  !state.showModal;
    },

    SET_INVOICE_DATA (state, payload) {
      state.invoiceData.push(payload);
    },

    SET_INVOICES_LOADED (state) {
      state.invoicesLoaded = true;
    }
  },

  actions: {
    async GET_INVOICES ({ commit, state }) {
      const dataCollection = collection(db, 'invoices');
      const results = await getDocs(dataCollection);

      results.docs.forEach((doc) => {
        if (!state.invoiceData.some((invoice) => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };
          commit('SET_INVOICE_DATA', data);
        }
      });
      commit('SET_INVOICES_LOADED');
    }
  },

  modules: {
  }
});

<template>
  <div @click.self="checkOutsideClick" :style="{ backgroundColor }" class="invoice__wrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice__content">
      <Loading v-if="isLoading" />
      <h1 v-if="!showEditInvoiceModal">New Invoice</h1>
      <h1 v-else>Edit Invoice</h1>

      <!-- Bill From -->
      <div class="bill__from flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Adress</label>
          <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
        </div>

        <div class="location__details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>

          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="billerZipCode" />
          </div>

          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill__to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>

        <div class="input flex flex-column">
          <label for="clientEmail">Client's E-mail</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>

        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
        </div>

        <div class="location__details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>

          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="clientZipCode" />
          </div>

          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input required type="text" id="clientCountry" v-model="clientCountry" />
          </div>
        </div>

        <!-- Invoice Work Details -->
        <div class="invoice__work flex-flex-column">
          <div class="payment flex">
            <div class="input flex flex-column">
              <label for="invoiceDate">Invoice Date</label>
              <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
            </div>

            <div class="input flex flex-column">
              <label for="paymentDueDate">Payment Due</label>
              <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
            </div>
          </div>

          <div class="input flex flex-column">
            <label for="paymentTerms">Payment Terms</label>
            <select id="paymentTerms" v-model="paymentTerms">
              <option value="30">Net 30 Days</option>
              <option value="60">Net 60 Days</option>
            </select>
          </div>

          <div class="input flex flex-column">
            <label for="productDescription">Product Description</label>
            <input required type="text" id="productDescription" v-model="productDescription" />
          </div>

          <div class="work__items">
            <h3>Item List</h3>
            <table class="item-list">
              <tr class="table-heading flex">
                <th class="item-name">Item Name</th>
                <th class="qty">Qty</th>
                <th class="price">Price</th>
                <th class="total">Total</th>
              </tr>

              <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
                <td class="item-name">
                  <input type="text" v-model="item.itemName" />
                </td>
                <td class="qty">
                  <input type="text" v-model="item.qty" />
                </td>
                <td class="price">
                  <input type="text" v-model="item.price" />
                </td>
                <td class="total flex">
                  ${{ item.total = item.qty * item.price }}
                </td>
                <img @click="deleteInvoiceItem(item.id)" src="@/assets/icon-delete.svg" alt="" />
              </tr>
            </table>

            <div @click="addNewInvoiceItem" class="button flex">
              <img src="@/assets/icon-plus.svg" alt="" />
              <span>Add new Item</span>
            </div>
          </div>
        </div>

        <!-- Save/Exit  -->
        <div class="save flex">
          <div class="save__left">
            <button type="button" @click="closeInvoice" class="red">
              Cancel
            </button>
          </div>
          <div class="save__right flex">
            <button v-if="!showEditInvoiceModal" type="submit" @click="saveDraft" class="dark-purple">
              Save Draft
            </button>
            <button v-if="!showEditInvoiceModal" type="submit" @click="publishInvoice" class="purple">
              Create Invoice
            </button>
            <button v-if="showEditInvoiceModal" type="submit" class="purple">
              Update Invoice
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { db } from "../firebase/firebase";
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';

import Loading from "../components/Loading";

export default {
  name: "InvoiceModal",

  components: { Loading },

  data () {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      isLoading: false,
      billerStreetAddress: "",
      billerCity: "",
      billerZipCode: "",
      billerCountry: "",
      clientName: "",
      clientEmail: "",
      clientStreetAddress: "",
      clientCity: "",
      clientZipCode: "",
      clientCountry: "",
      invoiceDateUnix: "",
      invoiceDate: "",
      paymentTerms: "",
      paymentDueDateUnix: "",
      paymentDueDate: "",
      productDescription: "",
      invoicePending: false,
      invoiceDraft: false,
      invoiceItemList: [],
      invoiceTotal: 0,
      backgroundColor: 'transparent'
    }
  },

  computed: {
    ...mapState(["showInvoiceModal", "showModal", "showEditInvoiceModal", "currentInvoiceArray"])
  },

  watch: {
    paymentTerms () {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleString('en-us', this.dateOptions);
    },

    showModal () {
      if (!this.showModal && !this.showInvoiceModal) {
        this.backgroundColor = 'transparent';
        document.querySelector('.invoice__wrap').style.backgroundColor = this.backgroundColor;
      }
    },

    showInvoiceModal () {
      if (!this.showModal && !this.showInvoiceModal) {
        this.backgroundColor = 'transparent';
        document.querySelector('.invoice__wrap').style.backgroundColor = this.backgroundColor;
      }
    }
  },

  created () {
    this.changeBackgroundColor();

    if (this.showEditInvoiceModal) {
      const currentInvoice = this.currentInvoiceArray[0];

      this.docId = currentInvoice.docId;
      this.billerStreetAddress = currentInvoice.billerStreetAddress;
      this.billerCity = currentInvoice.billerCity;
      this.billerZipCode = currentInvoice.billerZipCode;
      this.billerCountry = currentInvoice.billerCountry;
      this.clientName = currentInvoice.clientName;
      this.clientEmail = currentInvoice.clientEmail;
      this.clientStreetAddress = currentInvoice.clientStreetAddress;
      this.clientCity = currentInvoice.clientCity;
      this.clientZipCode = currentInvoice.clientZipCode;
      this.clientCountry = currentInvoice.clientCountry;
      this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
      this.invoiceDate = currentInvoice.invoiceDate;
      this.paymentTerms = currentInvoice.paymentTerms;
      this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
      this.paymentDueDate = currentInvoice.paymentDueDate;
      this.productDescription = currentInvoice.productDescription;
      this.invoicePending = currentInvoice.invoicePending;
      this.invoiceDraft = currentInvoice.invoiceDraft;
      this.invoiceItemList = currentInvoice.invoiceItemList;
      this.invoiceTotal = currentInvoice.invoiceTotal;

      return;
    }

    this.invoiceDateUnix = Date.now();
    this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString('en-us', this.dateOptions);
  },

  methods: {
    ...mapMutations(["TOGGLE_INVOICE_MODAL", "TOGGLE_MODAL", "TOGGLE_EDIT_INVOICE_MODAL"]),
    ...mapActions(["UPDATE_INVOICE", "GET_INVOICES"]),

    changeBackgroundColor () {
      if (this.showInvoiceModal) {
        return setTimeout(() => this.backgroundColor = '#030303b8', 650);
      }

      this.backgroundColor = 'transparent';
    },

    checkOutsideClick () {
      this.TOGGLE_MODAL();
    },

    closeInvoice () {
      this.TOGGLE_INVOICE_MODAL();

      if (this.showEditInvoiceModal) {
        this.TOGGLE_EDIT_INVOICE_MODAL();
      }
    },

    addNewInvoiceItem () {
      this.invoiceItemList.push({
        id: crypto.randomUUID().slice(0, 6),
        itemName: "",
        qty: "",
        price: 0,
        total: 0
      });
    },

    deleteInvoiceItem (id) {
      this.invoiceItemList = this.invoiceItemList.filter(item => item.id !== id);
    },

    callInvoiceTotal () {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach(item => this.invoiceTotal += item.total);
    },

    publishInvoice () {
      this.invoicePending = true;
    },

    saveDraft () {
      this.invoiceDraft = true;
    },

    async sendInvoice () {
      if (this.invoiceItemList.length <= 0) {
        alert('Please ensure you filled out work items!');
        return;
      }

      this.isLoading = true;

      this.callInvoiceTotal();

      await addDoc(collection(db, "invoices"), {
        invoiceId: crypto.randomUUID().slice(0, 6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
      });

      this.isLoading = false;

      this.TOGGLE_INVOICE_MODAL();
      this.GET_INVOICES();
    },

    async updateInvoice () {
      if (this.invoiceItemList.length <= 0) {
        alert('Please ensure you filled out work items!');
        return;
      }

      this.isLoading = true;

      this.callInvoiceTotal();

      await updateDoc(doc(db, "invoices", this.docId), {
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal
      });

      this.isLoading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.id
      };

      this.UPDATE_INVOICE(data);
    },

    submitForm () {
      this.showEditInvoiceModal ? this.updateInvoice() : this.sendInvoice();
    }
  },
}
</script>

<style lang="scss" scoped>
.invoice__wrap {
  height: 100vh;
  overflow-y: scroll;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 99;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    left: 90px;    
  }

  .invoice__content {
    background: #141625;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
    color: #FFFFFF;
    max-width: 700px;
    padding: 56px;
    position: relative;
    width: 100%;

    h1 {
      color: #FFFFFF;
      margin-bottom: 48px;
    }

    h3 {
      color: #777F98;
      font-size: 16px;
      margin-bottom: 16px;
    }

    h4 {
      color: #7C5DFA;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .bill__to,
    .bill__from {
      margin-bottom: 48px;

      .location__details {
        gap: 16px;

        div {
          flex: 1;
        }
      }
    }

    // Invoice Work
    .invoice__work {
      .payment {
        gap: 24px;
        
        div {
          flex: 1;
        }
      }

      .work__items {
        .item-list {
          width: 100%;

          // Item Table
          .table-heading,
          .table-items {
            font-size: 12px;
            gap: 16px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }
            
            .price {
              flex-basis: 20%;
            }

            .total {
              align-self: center;
              flex-basis: 20%;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            margin-bottom: 24px;
            position: relative;

            img {
              height: 16px;
              position: absolute;
              right: 0;
              top: 15px;
              width: 12px;
            }
          }
        }

        .button {
          background: #252945;
          color: #FFFFFF;
          
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      &__right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  .label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    background: #1E2139;
    border: none;
    border-radius: 4px;
    color: #FFFFFF;
    padding: 12px 4px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
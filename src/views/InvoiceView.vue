<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="" />
      Go back
    </router-link>

    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>

        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>

      <div class="right flex">
        <button
          @click="toggleEditInvoiceModal"
          class="dark-purple"
        >
          Edit
        </button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="red">
          Delete
        </button>
        <button
          v-if="currentInvoice.invoicePending"
          @click="updateStatusToPaid(currentInvoice.docId)"
          class="green"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="updateStatusToPending(currentInvoice.docId)"
          class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="invoice-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="item flex"
          >
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "InvoiceView",

  data() {
    return {
      currentInvoice: null,
    };
  },

  computed: {
    ...mapState(["currentInvoiceArray", "showEditInvoiceModal"]),
  },

  watch: {
    showEditInvoiceModal () {
      if (!this.showEditInvoiceModal) {
        this.currentInvoice = this.currentInvoiceArray[0];
      }
    }
  },

  created() {
    this.getCurrentInvoice();
  },

  methods: {
    ...mapMutations(["SET_CURRENT_INVOICE", "TOGGLE_EDIT_INVOICE_MODAL", "TOGGLE_INVOICE_MODAL"]),

    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.id);
      this.currentInvoice = this.currentInvoiceArray[0];
    },

    toggleEditInvoiceModal () {
      this.TOGGLE_EDIT_INVOICE_MODAL();
      this.TOGGLE_INVOICE_MODAL();
    }
  },
};
</script>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    color: #fff;
    font-size: 12px;
    align-items: center;
    margin-bottom: 32px;

    img {
      margin-right: 16px;
      height: 10px;
      width: 7px;
    }
  }

  .header,
  .invoice-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    font-size: 12px;

    align-items: center;
    padding: 24px 32px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .invoice-details {
    margin-top: 24px;
    padding: 48px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;

        p:first-child {
          color: #fff;
          font-size: 24px;
          text-transform: uppercase;

          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;

        align-items: flex-end;
      }
    }

    .middle {
      color: #dfe3fa;

      gap: 16px;
      margin-top: 50px;

      h4 {
        font-size: 12px;
        font-weight: 400;

        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }

        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        background-color: #252945;
        border-radius: 20px 20px 0 0;

        padding: 32px;

        .heading {
          color: #dfe3fa;
          font-size: 12px;

          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          color: #fff;
          font-size: 13px;

          margin-bottom: 32px;

          &:last-child {
            margin-bottom: 0;
          }
          p:first-child {
            flex: 3;
            text-align: left;
          }
          
          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        background-color: rgba(12, 14, 22, 0.7);
        border-radius: 0 0 20px 20px;
        color: #fff;

        align-items: center;
        padding: 32px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
</style>

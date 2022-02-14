<template>
  <div class="home container">
    <!-- Header -->
    <div class="home__header header flex">
      <div class="header__left flex flex-column">
        <h1>Invoices</h1>
        <span v-if="invoiceData.length">There are <b>{{ invoiceData.length }}</b> total invoices</span>
      </div>
      <div class="header__right flex">
        <div @click="toggleFilterMenu" class="header__filter filter flex">
          <span>Filter by status</span>
          <img src="@/assets/icon-arrow-down.svg" alt="" />
          <ul v-show="showFilterMenu" class="filter__menu">
            <li>Draft</li>
            <li>Pending</li>
            <li>Paid</li>
            <li>Clear Filter</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="button__icon flex">
            <img src="@/assets/icon-plus.svg" alt="" />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>
    <!-- Invoices -->
    <div v-if="invoiceData.length">
      <Invoice 
        v-for="(invoice, index) in invoiceData" :key="index"
        :invoice="invoice"
      />
    </div>

    <div class="empty flex flex-column" v-else>
       <img src="@/assets/illustration-empty.svg" alt="" />
       <h3>There is nothing here</h3>
       <p>Create a new invoice by clicking the <b>New Invoice</b> button and get started.</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Invoice from "../components/Invoice";

export default {
  name: "Home",

  components: {
    Invoice
  },

  data () {
    return {
      showFilterMenu: false
    }
  },

  computed: {
    ...mapState(['invoiceData'])
  },

  methods: {
    ...mapMutations(['TOGGLE_INVOICE_MODAL']),
    
    newInvoice () {
      this.TOGGLE_INVOICE_MODAL();
    },

    toggleFilterMenu () {
      this.showFilterMenu = !this.showFilterMenu;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: #FFFFFF;

  .header {
    margin-bottom: 65px;

    &__left,
    &__right {
      flex: 1;
    }
    
    &__right {
      align-items: center;
      justify-content: flex-end;

      .filter,
      .button {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        cursor: pointer;
        margin-right: 40px;
        position: relative;

        img {
          height: 5px;
          margin-left: 12px;
          width: 9px;
        }

        &__menu {
          background: #1E2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px, rgba(0, 0, 0, 0.06);

          list-style: none;
          position: absolute;
          top: 25px;
          width: 120px;

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              background: #FFFFFF;
              color: #1E2139;
            }
          }
        }
      }

      .button {
        background: #7C5DFA;
        border-radius: 40px;
        padding: 8px 10px;

        &__icon {
          background: #FFFFFF;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          padding: 8px;

          img {
            height: 10px;
            width: 10px;
          }
        }
      }
    }
  }

  .empty {
    align-items: center;
    margin-top: 60px;

    img {
      height: 200px;
      width: 214px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
      max-width: 224px;
      text-align: center;
    }
  }
}
</style>

<template>
  <router-link 
    class="invoice flex"
    :to="{ name: 'Invoice', params: { id: invoice.invoiceId } }"
  >
    <div class="invoice__left flex">
      <div>
        <span class="tracking-numer">#{{ invoice.invoiceId }}</span>
      </div>

      <div>
        <p>Payment Due Date</p>
        <span class="due-date">{{ invoice.paymentDueDate }}</span>
      </div>

      <div>
        <p>Client Name</p>
        <span class="client-name">{{ invoice.clientName }}</span>
      </div>
    </div>

    <div class="invoice__right flex">
      <div>
        <p>Total</p>
        <span class="price">${{ invoice.invoiceTotal }}</span>
      </div>

      <div 
        class="status-button flex" 
        :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>

      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Invoice",

  props: {
    invoice: {
      default: () => ({}),
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice {
  background-color: #1e2139;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;

  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 28px 32px;

  div:not(.invoice__left):not(.invoice__right):not(.status-button):not(.icon) {
    flex: 1;
  }

  p {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  span {
    font-size: 13px;
  }
  
  &__left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    .tracking-number {
      text-transform: uppercase;
    }
  }

  &__right {
    align-items: center;
    flex-basis: 40%;
    gap: 16px;

    .price {
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
</style>
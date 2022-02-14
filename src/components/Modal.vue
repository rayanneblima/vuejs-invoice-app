<template>
  <div class="modal flex">
    <div class="modal__content">
      <h4>Are you sure you want to exit?</h4>
      <p>Your changes will not be saved.</p>

      <div class="modal__actions flex">
        <button @click="closeModal" class="purple">Return</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Modal",

  methods: {
    ...mapMutations(['TOGGLE_MODAL', 'TOGGLE_INVOICE_MODAL']),

    closeModal () {
      this.TOGGLE_MODAL();
    },

    closeInvoice () {
      this.TOGGLE_MODAL();
      this.TOGGLE_INVOICE_MODAL();
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  background: #4f4f509E;
  align-items: center;
  height: 100vh;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 100;

  &__content {
    background-color: #252945;
    border-radius: 20px;
    color: #FFFFFF;
    max-width: 450px;
    padding: 48px 32px;

    p {
      text-align: center;
    }
  }

  &__actions {
    margin-top: 24px;

    button {
      flex: 1;
    }
  }
}
</style>

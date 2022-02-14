<template>
  <header class="header flex">
    <router-link :to="{ name: (!showInvoiceModal || !showEditInvoiceModal ? 'Home': '') }">
      <div class="header__branding flex">
        <img src="@/assets/file-invoice-dollar-solid.png" alt="Logomarca" />
      </div>
    </router-link>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navigation",

  computed: {
    ...mapState(["showInvoiceModal", "showEditInvoiceModal"])
  },
}
</script>

<style lang="scss" scoped>
.header {
  background: #1E2139;
  flex-direction: row;
  z-index: 99;

  @media (min-width: 900px) {
    border-radius: 0 20px 20px 0;
    flex-direction: column;
    min-height: 100%;
    min-width: 90px;
  }

  &__branding {
    background: #7C5DFA;
    border-radius: 0 20px 20px 0;
    justify-content: center;
    padding: 24px;

    @media (min-width: 900px) {
      width: 100%;
    }

    img {
      height: 30px;
      width: auto;
    }
  }
}
</style>
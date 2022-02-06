<template>
  <header class="header flex">
    <div class="header__branding flex">
      <img src="@/assets/file-invoice-dollar-solid.png" alt="Logomarca" />
    </div>
  </header>
</template>

<script>
export default {
  name: "Navigation"
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
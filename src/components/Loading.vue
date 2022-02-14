<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style lang="scss">
.loading {
  background-color: rgba(0, 0, 0, 0.5);
  
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 101;

  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }

  span {
    animation: spin ease 1000ms infinite;
    border: 3px solid transparent;
    border-bottom-color: #fff;
    border-radius: 50%;
    border-top-color: #fff;

    display: block;
    height: 60px;
    margin: 0 auto;
    width: 60px;
  }
}
</style>
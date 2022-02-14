<template>
  <div v-if="invoicesLoaded">
    <div v-if="!isMobile" class="app flex flex-column">
      <Navigation />
      <div class="app__content flex flex-column">
        <Modal v-if="showModal" />
        <transition name="invoice-modal">
          <InvoiceModal v-if="showInvoiceModal" />
        </transition>
        <router-view />
      </div>
    </div>

    <div v-else class="mobile__message flex flex-column">
      <h2>Sorry! This app is not supported on Mobile Devices.</h2>
      <p>To use this app, please use a computer or tablet.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navigation from "./components/Navigation";
import InvoiceModal from "./components/InvoiceModal";
import Modal from "./components/Modal";

export default {
  name: "App",

  components: {
    Navigation,
    InvoiceModal,
    Modal
  },

  data () {
    return {
      isMobile: false
    }
  },

  computed: {
    ...mapState(['showInvoiceModal', 'showModal', 'invoicesLoaded'])
  },

  created () {
    this.GET_INVOICES();
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen);
  },

  methods: {
    ...mapActions(['GET_INVOICES']),

    checkScreen () {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 750) {
        this.isMobile = true;
        return;
      }

      this.isMobile = false;
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

$dark-blue: #141625;
$light-blue: #1E2139;
$dark-purple: #252945;
$red: #EC5757;
$purple: #7C5DFA;
$green: #33D69F;
$orange: #FF8F00;
$white: #FFFFFF;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

/* scrollbars */
::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
::-webkit-scrollbar-thumb:vertical,
::-webkit-scrollbar-thumb:horizontal {
  background-color: $purple;
  border-radius: 4px;
}

.app {
  background: $dark-blue;
  min-height: 100vh;

  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  &__content {
    flex: 1;
    padding: 0 20px;
    position: relative;
  }
}

.mobile__message {
  background: $dark-blue;
  color: $white;
  text-align: center;

  align-items: center;
  height: 100vh;
  justify-content: center;

  p {
    margin-top: 16px;
  }
}

// Animated Invoice Modal
.invoice-modal-enter-active,
.invoice-modal-leave-active {
  transition: 0.8s ease all;
}

.invoice-modal-enter-from,
.invoice-modal-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

button:hover,
.button:hover {
  transform: scale(1.1);
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>

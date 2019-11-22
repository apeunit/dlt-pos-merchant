<template>
  <div>
    <header-component :view-title="'Generate Wallet'" />
    <div class="wrapper">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>
<script>
  import HeaderComponent from './HeaderComponent.vue'
  export default {
    name: 'GenerateWallet',
    components: {
      HeaderComponent
    },
    data () {
      return {
        msg: 'Show the following QR Code to give away a wallet'
      }
    }
  }
</script>
<style scoped>
  div.wrapper {
    margin-left: 30px;
    margin-top: 30px;
    width: 267px;
    height: 667px;
  }
  p {
    font-size: 28px;
    line-height: 34px;
  }
</style>

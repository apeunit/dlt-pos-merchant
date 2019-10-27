<template>
  <div>
    <header-component :view-title="'Generate Wallet'" />
    <p>{{ msg }}</p>
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
  p {
    font-size: 28px;
    line-height: 34px;
  }
</style>

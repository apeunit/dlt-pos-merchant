<template>
  <div>
    <header-component :view-title="'Top Up Ape Coins'" />
    <div class="wrapper">
      <p>{{ msg }}</p>
      <explorer-link :url="''" />
    </div>
  </div>
</template>
<script>
  import HeaderComponent from './HeaderComponent.vue'
  import ExplorerLink from './ExplorerLink.vue'
  export default {
    name: 'TopUpCoins',
    components: {
      HeaderComponent,
      ExplorerLink
    },
    data () {
      return {
        msg: 'You just successfully gave 5AE to'
      }
    }
  }
</script>
<style scoped>
  div.wrapper {
    margin-left: 30px;
    margin-top: 40px;
    width: 267px;
    height: 667px;
  }
  p {
    font-size: 40px;
    line-height: 47px;
  }
</style>

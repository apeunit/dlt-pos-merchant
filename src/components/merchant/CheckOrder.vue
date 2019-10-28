<template>
  <div>
    <header-component :view-title="'Check Order'"/>
    <div class="wrapper">
      <p id="confirmation-message">{{ confirmationMsg }}</p>
      <explorer-link :url="'/'" />
    </div>
  </div>
</template>
<script>
  import HeaderComponent from './HeaderComponent.vue'
  import ExplorerLink from './ExplorerLink.vue'
  export default {
    name: 'CheckOrder',
    components: {
      HeaderComponent,
      ExplorerLink
    },
    data () {
      return {
        confirmationMsg: 'successfully ordered 1 beer, give it!',
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
  p#confirmation-message {
    font-size: 40px;
    line-height: 47px;
  }
</style>

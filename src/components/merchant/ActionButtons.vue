<template>
  <div>
    <div v-for="label in buttonLabels" :key="label.key">
      <router-link :to="getRoute(label)">{{ label }}</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      buttonLabels: {
        type: Array,
        required: true
      }
    },
    methods: {
      getRoute(label) {
        let route ='/'
        switch (label) {
          case 'Generate Wallet':
            route += 'generate-wallet'
            break
          case 'Check Order':
            route += 'check-order'
            break
          case 'Top Up Ape Coins':
            route += 'top-up-coins'
            break
        }
        return route
      }
    }
  }
</script>
<style scoped>
  a {
    line-height: 28px;
    text-decoration: none;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    /*width: 161px;*/
  }
  a, a:visited, a:hover, a:active {
    color: inherit;
  }
  a::after {
    content: ' →';
  }
</style>

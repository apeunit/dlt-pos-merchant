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
            route += ''
            break
        }
        return route
      }
    }
  }
</script>
<style scoped>
  button {
    height: 55px;
    /*width: 161px;*/
  }
  button::after {
    content: ' →';
  }
</style>

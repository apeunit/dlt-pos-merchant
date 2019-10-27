<template>
  <div>
    <header-component />
    <p>{{ msg }}</p>
  </div>
</template>
<script>
  import HeaderComponent from './HeaderComponent.vue'
  export default {
    components: {
      HeaderComponent
    },
    data () {
      return {
        msg: 'hello from generate wallet'
      }
    }
  }
</script>

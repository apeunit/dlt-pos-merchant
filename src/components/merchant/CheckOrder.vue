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
      HeaderComponent: HeaderComponent
    },
    data () {
      return {
        msg: 'hello from check order'
      }
    }
  }
</script>


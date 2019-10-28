<template>
  <div><button @click="handleClick">Log out</button></div>
</template>
<script>
  export default {
    name: 'LogoutButton',
    methods: {
      handleClick() {
        this.$emit('handle-click')
      }
    }
  }
</script>
<style scoped>
  button {
    color: #FFFFFF;
    opacity: 0.4;
    /*border: 1px solid white;*/
    border-radius: 0px;
    padding: 5px;
    margin: 5px;
    font-size: 8px;
  }
</style>

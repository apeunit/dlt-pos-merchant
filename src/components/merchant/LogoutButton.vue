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
    border: 1px solid black;
    border-radius: 0px;
    padding: 5px;
    margin: 5px;
    font-size: 8px;
  }
</style>

<template>
  <div><button @click="handleClick">Log out</button></div>
</template>
<script>
  export default {
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
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
  }
</style>

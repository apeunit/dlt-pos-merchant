<template>
  <p>{{ msg }}</p>
</template>
<script>
  export default {
    props: {
      msg: {
        type: String,
        required: true
      }
    }
  }
</script>
<style scoped>
  p {
    font-size: 40px;
    line-height: 47px;
  }
</style>

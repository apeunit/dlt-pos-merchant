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

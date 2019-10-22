<template>
  <div>
    <input type="text" v-model="mnemonic" @change="handleChange">
    <p v-if="mnemonic.length > 0">mnemonic: {{ mnemonic }}</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mnemonic: ''
      }
    },
    methods: {
      handleChange() {
        this.$emit('on-change', this.mnemonic)
      }
    }
  }
</script>
<style scoped>
  input {
    border: 1px solid black;
  }
</style>

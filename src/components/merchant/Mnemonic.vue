<template>
  <div>
    <p>Enter mnemonic phrase</p>
    <textarea v-model="mnemonic" @change="handleChange"></textarea>
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
  textarea {
    border: 0;
    height: 139px;
    width: 284px;
    /*opacity: 0.1;*/
    background-color: #EDF3F7;
    resize: none;
    font-size: 17px;
    line-height: 27px;
    padding: 15px;
  }
  p {
    font-size: 12px;
    line-height: 54px;
    height: 54px;
  }
</style>

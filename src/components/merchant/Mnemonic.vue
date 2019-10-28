<template>
  <div>
    <p>Enter mnemonic phrase</p>
    <textarea v-model="mnemonic" @change="handleChange"></textarea>
    <a @click="handleClick">Start<span>→</span></a>
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
      },
      handleClick() {
        this.$emit('on-click')
      }
    }
  }
</script>
<style scoped>
  p {
    font-size: 12px;
    line-height: 54px;
    height: 54px;
  }
  textarea {
    border: 0;
    height: 139px;
    width: 284px;
    opacity: 0.1;
    background-color: #EDF3F7;
    resize: none;
    font-size: 17px;
    line-height: 27px;
    padding: 15px;
  }
  a {
    font-size: 17px;
    height: 54px;
    margin-top: 18px;
    text-decoration: none;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
  a, a:visited, a:hover, a:active {
    color: inherit;
  }
  a > span {
    margin-left: 5px;
  }
</style>

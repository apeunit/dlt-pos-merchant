<template>
  <div>
    <button @click="handleClick">{{ buttonLabel }}</button>
  </div>
</template>
<script>
  export default {
    props: {
      buttonLabel: {
        type: String,
        required: true
      }
    },
    methods: {
      handleClick() {
        this.$emit('handle-click', this.buttonLabel)
      }
    }
  }
</script>


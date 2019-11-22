<template>
  <div class="container">
    <a :href="url">{{ browserMessage }}<span>↗</span></a>
  </div>
</template>
<script>
  export default {
    props: {
      url: {
        type: String,
        required: false,
        default: null
      }
    },
    data () {
      return {
        browserMessage: 'View on Explorer'
      }
    }
  }
</script>
<style scoped>
  div.container {
    font-size: 28px;
    line-height: 32px;
    margin-top: 40px;
  }
  a {
    text-decoration: none;
  }
  a, a:visited, a:hover, a:active {
    color: inherit;
  }
  a > span {
    content: '↗';
    margin-left: 5px;
  }
</style>

<template>
  <div>
    <div class="container">
      <div class="content">
        <router-link to="/">Back</router-link>
        <h5>{{ viewTitle }}</h5>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HeaderComponent',
    props: {
      viewTitle: {
        type: String,
        required: false,
        default: null
      }
    }
  }
</script>

<style scoped>
  div.container {
    height: 134px;
    width: 100%;
    color: black;
    /*background-color: black;*/
    position: relative;
    /*border-bottom: 1px solid black;*/
  }
  div.content {
    position: absolute;
    top: 25%;
  }
  a {
    font-size: 16px;
    line-height: 28px;
    text-decoration: none;
    margin: 0;
  }
  a, a:visited, a:hover, a:active {
    color: inherit;
  }
  a::before {
    content: '← ';
  }
  h5 {
    height: 34px;
    width: 100%;
    font-size: 28px;
    line-height: 34px;
  }
</style>

<template>
  <div>
    <div class="wrapper">
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
  div.wrapper {
    height: 134px;
    /*width: 500px;*/
    color: white;
    background-color: black;
    position: relative;
    /*border-bottom: 1px solid black;*/
  }
  div.content {
    margin-left: 30px;
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

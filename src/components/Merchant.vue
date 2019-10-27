<template>
  <div>
    <div class="body">
      <logout-button @handle-click="logout"/>
      <router-view/>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import LogoutButton from './merchant/LogoutButton.vue'
  export default {
    name: 'Merchant',
    components: {
      LogoutButton,
    },
    data() {
      return {
      }
    },
    methods: {
      ...mapActions(['flushData']),
      logout() {
        console.log('logging out')
        this.loggedIn = false
        this.flushData()
      }
    }
  }
</script>
<style scoped>
  div.body {
    width: 375px;
    height: 100%;
    padding-left: 46px;
    padding-right: 62px;
    margin: 0 auto;
    border: 1px solid black;
  }
  #showcase-greeting {
    height: 248px;
    width: 267px;
    /*color: #FFFFFF;*/
    font-size: 40px;
    line-height: 47px;
  }
  .action-button {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
</style>

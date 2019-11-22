<template>
  <div>
    <header-component :view-title="'Check Order'"/>
    <div class="wrapper">
          <p v-if="showLoader"> Checking your transaction. Please wait...</p>
          <p v-if=explorerUrl id="confirmation-message">{{ confirmationMsg }} </p>
          <explorer-link :url="explorerUrl" v-if="explorerUrl"/>
          <SendComponent @onFinish="onDone" v-if="scanQR"/>
    </div>
  </div>
</template>
<script>
  import SendComponent from '../Send.vue'
  import HeaderComponent from './HeaderComponent.vue'
  import ExplorerLink from './ExplorerLink.vue'
  import merchantContract from '../../../contract/merchant'
  import { decode } from '@aeternity/aepp-sdk/es/tx/builder/helpers'

  export default {
    name: 'CheckOrder',
    components: {
      HeaderComponent,
      SendComponent,
      ExplorerLink
    },
    data () {
      return {
        scanQR: true,
        explorerUrl: null,
        showLoader: false,
        confirmationMsg: 'successfully ordered 1 beer, give it!',
      }
    },
    methods: {
      async onDone ([hash, sig]) {
          if (!hash || !sig) return
          this.scanQR = false
          this.showLoader = true
          try {
              // Create contract instance
              const cInstance = await this.$store.state.ae.getContractInstance(merchantContract, { contractAddress: 'ct_WbMSB4FySwzJhCmNsDjxm5P7nefMJGdzuoxc3VfUhzsTyvta2' })
              const { block_height,  tx: { senderId: customerAddress }} = await this.$store.state.ae.tx(hash)
              if (block_height === -1) {
                  this.scanQR = true
                  this.showLoader = false
                  alert('Your transaction is not yet mined!')
                  return
              }
              // Call the contract
              const sigBuffer = decode(sig)
              const hashBuffer = decode(hash)
              await cInstance.methods.fulfill_order(customerAddress, hashBuffer, sigBuffer)
              this.explorerUrl = 'https://testnet.explorer.aepps.com/transactions/' + hash
              this.showLoader = false
          } catch (e) {
              if (e.decodedError && e.decodedError.indexOf('err:exec') !== -1) {
                  this.explorerUrl = 'https://testnet.explorer.aepps.com/transactions/' + hash
                  this.showLoader = false
              } else {
                  this.scanQR = true
                  this.showLoader = false
                  console.log(e)
                  alert('Oops. Something went wrong, please check the dev console for details')
              }
          }
      }
    }
  }
</script>
<style scoped>
  div.wrapper {
    margin-left: 30px;
    margin-top: 40px;
    width: 267px;
    height: 667px;
  }
  p#confirmation-message {
    font-size: 40px;
    line-height: 47px;
  }
</style>

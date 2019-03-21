<template>
  <div class="order-row">
    <div>{{noOfBeer}} Beer</div>
    <div>
      <span v-if="!wasMined">
        <ae-loader />
      </span>
      <span v-if="wasMined && !wasScanned"></span>
      <span v-if="wasMined && wasScanned">
        <ae-icon name="check" />
      </span>
    </div>
    <div class="arrow">
      <ae-icon name="chevron" />
    </div>
  </div>
</template>

<script>
import { AeIcon, AeLoader } from '@aeternity/aepp-components'

export default {
  name: 'OrderRow',
  components: {
    AeIcon,
    AeLoader
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    client () {
      return this.$store.getters.ae
    },
    wasMined () {
      if (!this.beerTx) {
        return false
      }
      return this.beerTx.block_height >= 0
    },
    noOfBeer () {
      if (this.beerTx && this.beerTx.tx && this.beerTx.tx.amount) {
        return Math.ceil(this.beerTx.tx.amount / this.$store.state.itemPrice)
      }
      return ''
    }
  },
  data () {
    return {
      beerTx: null,
      wasScanned: false
    }
  },
  props: {
    beerHash: {
      type: String
    }
  },
  methods: {
    async getBeerState (txHash) {
      return new Promise((resolve, reject) => {
        console.log('asking beer state')
        this.$socket.emit('was_beer_scanned', txHash, (beerState) => {
          console.log('beerState', beerState)
          if (beerState && typeof beerState.scanned === 'boolean') {
            return resolve(beerState.scanned)
          }
          return reject(new Error('Error asking beer status'))
        })
      })
    }
  },
  async mounted () {
    if (this.beerHash) {
      try {
        this.beerTx = await this.client.tx(this.beerHash)
        this.wasScanned = await this.getBeerState(this.beerHash)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

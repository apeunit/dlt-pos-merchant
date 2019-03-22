<template>
  <div class="about">
    <div class="bg-black text-white pb-8 pt-32">
      <div class="container flex px-4 text-28 font-sans leading-normal">
        IMAGE
      </div>
    </div>
    <div class="container flex flex-wrap px-4 leading-normal pt-8 pb-8">

      <p class="text-28 font-sans leading-normal">
        Find us in Halle 6 🖐☝️<br/>
        In the Berlin Partners booth, E39.
      </p>

      <div class="list-reset w-full mt-8">
        <router-link to="/orders" class="text-28 font-sans flex justify-between no-underline text-black">
          <span>
            My Orders
          </span>
          <ArrowRight class=""/>
        </router-link>
        <router-link to="/transactions" class="text-28 font-sans flex justify-between no-underline text-black">
          <span>
            My Transactions
          </span>
          <ArrowRight class=""/>
        </router-link>
        <div class="mt-8 text-28 font-sans flex flex-wrap flex-col justify-between no-underline text-black">
          <span>
            My Identicon
          </span>
          <ae-identity-avatar :address="address"></ae-identity-avatar>
        </div>
        <div class="mt-8 text-28 font-sans flex flex-wrap flex-col justify-between no-underline text-black">
          <span>
            My Unique Identifier
          </span>
          Prenzlauer Allee 169
        </div>
        <div class="mt-8 text-28 font-sans flex flex-wrap flex-col justify-between no-underline text-black">
          <span>
            My Public Key
          </span>
          <div class="flex">
            <div class="item font-mono" :class="(key+1) % 5 === 0 ? '' : 'float-left'"
              :key="key" v-for="(part, key) in splitAddress">
              {{part}}
            </div>
          </div>
        </div>
      </div>

      <div class="font-sans mt-4">
        <p class="py-4">
          Messegelände<br/>
          30521 Hannover<br/>
          Germany<br/>
        </p>
        <p class="py-4">
          1st until 5th of April 2019<br/>
          Daily from 12:00<br/>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import ArrowRight from './ArrowRight.vue'
import { AeIdentityAvatar } from '@aeternity/aepp-components'

export default {
  name: 'About',
  components: {
    ArrowRight,
    AeIdentityAvatar
  },
  data () {
    return {
      address: this.$store.state.account.pub
    }
  },
  computed: {
    splitAddress () {
      let i = this.address.length % 2;
      let parts = i ? [ this.address.substr( 0, i ) ] : [];
      for( ; i < this.address.length ; i += 3 )
      {
          parts.push( this.address.substr( i, 3 ) );
      }
      return parts
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

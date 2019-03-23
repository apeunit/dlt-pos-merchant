import Router from 'vue-router'
import ChatArea from './components/ChatArea.vue'
import Impressum from './components/Impressum.vue'
import About from './components/About.vue'
import Venue from './components/Venue.vue'
import Orders from './components/Orders.vue'
import Profile from './components/Profile.vue'
import Transactions from './components/Transactions.vue'
import Send from './components/Send.vue'

export default (store) => {
  const routes = [
    {
      path: '/',
      name: 'ChatArea',
      props: route => ({
        query: route.query
      }),
      component: ChatArea
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: Impressum
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/scan',
      name: 'scan',
      component: Send
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/venue',
      name: 'venue',
      component: Venue
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    }
  ]

  const router = new Router({
    mode: 'history',
    routes
  })

  router.beforeEach(async (to, from, next) => {
    // when account credentials are passed as query
    const {
      p: pub,
      k: priv,
      n: name
    } = to.query
    if (pub && priv && name) {
      const account = {
        pub,
        priv,
        name
      }
      if (!store.state.account.pub || store.state.account.pub !== account.pub) {
        // set account in store
        if (!store.state.ae) {
          await store.dispatch('initAe')
        }
        store.commit('setAccount', account)
        // remove existing beers
        store.commit('setBeerHashes', [])
      }
      // remove query params and keep on routing
      next({
        name: to.name,
        query: null
      })
    } else {
      next()
    }
  })
  return router
}

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import { firestorePlugin } from 'vuefire'

import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(firestorePlugin)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

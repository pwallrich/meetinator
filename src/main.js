import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import { firestorePlugin } from 'vuefire'

import { store } from './store/store'

import * as fb from './firebaseDatabase'

// realtime firebase
fb.personsCollection.onSnapshot(snapshot => {
  let personsArray = []
  snapshot.forEach(doc => {
    let person = doc.data()
    person.id = doc.id
    personsArray.push(person)
  })
  store.commit('setPersons', personsArray)
})

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(firestorePlugin)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

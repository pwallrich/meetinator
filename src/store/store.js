import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    persons: [
      {
        name: "Kerstin",
      },
      {
        name: "Pete",
      },
      {
        name: "Corinna",
      }
    ]
  },
  mutations: {
    removePerson(state, index) {
      state.persons.splice(index, 1)
    },
    addPerson(state, person) {
      state.persons.push(person)
    }
  },
  getters: {
    persons: state => state.persons
  }
})
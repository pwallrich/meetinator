import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    persons: []
  },
  mutations: {
    removePerson(state, index) {
      state.persons.splice(index, 1)
    },
    addPerson(state, person) {
      state.persons.push(person)
    },
    setPersons(state, persons) {
      state.persons = persons
    }
  },
  getters: {
    persons: state => state.persons
  }
})
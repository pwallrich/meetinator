import Vue from 'vue'
import Vuex from 'vuex'

import db from '../Data/Database'

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
  },
  actions: {
    async addPerson(_, person) {
      let persons = this.state.persons.map((abc) => {
        return {
          name: abc.name,
        }
      })
      persons.push(person)
      db.updatePersons(persons)
    },
    async removePersonAt(_, indexToDelete) {
      let persons = this.state.persons.map((abc) => {
        return {
          name: abc.name,
        }
      })
      persons.splice(indexToDelete, 1)
      db.updatePersons(persons)
    }
  }
})
import Vue from 'vue'
import Vuex from 'vuex'

import * as fb from '../firebaseDatabase'

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
      await fb.personsCollection.add(person)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    async removePerson(_, person) {
      await fb.personsCollection
        .doc(person.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  }
})
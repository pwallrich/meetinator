import Vue from 'vue'
import Vuex from 'vuex'

import db from '../Data/Database'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meeting: {},
  },
  mutations: {
    removePerson(state, index) {
      state.meeting.persons.splice(index, 1)
    },
    addPerson(state, person) {
      state.meeting.persons.push(person)
    },
    setPersons(state, persons) {
      state.meeting.persons = persons
    }
  },
  getters: {
    meeting: state => state.meeting,
    persons: state => state.meeting.persons
  },
  actions: {
    async addPerson(_, person) {
      const id = this.state.meeting.id
      return db.addPerson(person, id)
        .then(() => {
          this.dispatch('getMeeting', this.state.meeting.id)
        })
    },
    async removePerson(_, person) {
      const id = this.state.meeting.id
      return db.removePerson(person, id)
        .then(() => {
          this.dispatch('getMeeting', this.state.meeting.id)
        })
    },
    async getMeeting(_, meetingId) {
      let ref = await db.getMeeting(meetingId)
      this.state.meeting = ref
    }
  }
})
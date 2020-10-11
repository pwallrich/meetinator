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
    async addPerson(_, data) {
      console.log(data)
      return db.addPerson(data.person, data.meetingId)
        .then(() => {
          this.dispatch('getMeeting', data.meetingId)
        })
    },
    async removePerson(_, data) {
      console.log(data)
      return db.removePerson(data.person, data.meetingId)
        .then(() => {
          this.dispatch('getMeeting', data.meetingId)
        })
    },
    async getMeeting(_, meetingId) {
      let ref = await db.getMeeting(meetingId)
      this.state.meeting = ref
    }
  }
})
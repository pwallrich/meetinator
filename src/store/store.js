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
      await db.addPerson(person, id)
      this.dispatch('getMeeting', this.state.meeting.id)
      // let meeting = this.state.meeting
      // let persons = meeting.persons.map((abc) => {
      //   return {
      //     name: abc.name,
      //   }
      // })
      // persons.push(person)
      // meeting.persons = persons
      // await db.updateMeeting(meeting)
      // this.dispatch('getMeeting', this.state.meeting.id)
    },
    async removePerson(_, person) {
      console.log("in store")
      const id = this.state.meeting.id
      await db.removePerson(person, id)
      this.dispatch('getMeeting', this.state.meeting.id)
    },
    async getMeeting(_, meetingId) {
      let ref = await db.getMeeting(meetingId)
      this.state.meeting = ref
    }
  }
})
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
  },
  actions: {
    async addPerson(_, person) {
      let meeting = this.state.meeting
      let persons = meeting.persons.map((abc) => {
        return {
          name: abc.name,
        }
      })
      persons.push(person)
      meeting.persons = persons
      await db.updateMeeting(meeting)
      this.dispatch('getMeeting', this.state.meeting.id)
    },
    async removePersonAt(_, indexToDelete) {
      let meeting = this.state.meeting
      let persons = meeting.persons.map((abc) => {
        return {
          name: abc.name,
        }
      })
      persons.splice(indexToDelete, 1)
      meeting.persons = persons
      await db.updateMeeting(meeting)
      this.dispatch('getMeeting', this.state.meeting.id)
    },
    async getMeeting(_, meetingId) {
      let ref = await db.getMeeting(meetingId)
      console.log("got meeting")
      console.log(ref)
      this.state.meeting = ref
    }
  }
})
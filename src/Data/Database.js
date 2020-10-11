import * as fb from '../firebaseDatabase'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

const db = {
    async getMeeting(id) {
        const doc = await fb.personsCollection.doc(id).get()
        return doc.data()
    },
    async removePerson(person, id) {
        await fb.personsCollection.doc(id)
            .update({
                persons: firebase.firestore.FieldValue.arrayRemove(person)
            })
    },
    async addPerson(person, id) {
        return fb.personsCollection.doc(id)
            .update({
                persons: firebase.firestore.FieldValue.arrayUnion(person)
            })
    },
    async createNewMeeting(meeting) {
        const dateString = meeting.startDate
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(dateString))

        let newMeeting = meeting
        newMeeting.startDate = timestamp
        return fb.personsCollection
            .add(newMeeting)
            .then(ref => {
                return ref.id
            })
    }
}

export default db